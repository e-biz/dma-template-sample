/*
 Copyright 2014 eBusiness Information

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
package mobi.designmyapp.template.sample.ods.ui;

import android.app.Activity;
import android.app.ProgressDialog;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.ods.adapter.ODSResultAdapter;
import mobi.designmyapp.template.sample.ods.listener.OnTaskCompletedListener;
import mobi.designmyapp.template.sample.ods.listener.OnTaskStartedListener;
import mobi.designmyapp.template.sample.ods.model.ODSResult;
import mobi.designmyapp.template.sample.ods.task.DataPickerTask;
import mobi.designmyapp.template.sample.ods.util.ODSQueryBuilder;

import java.net.URI;
import java.util.List;

/**
 * Created by Loic Ortola on 23/06/2014.
 * This Sample demonstrates queries to the OpenDataSoft API
 * Complete API Documentation is available at
 * http://public.opendatasoft.com/api/doc/
 */
public class ODSActivity extends Activity implements OnTaskCompletedListener<List<ODSResult>>, OnTaskStartedListener {

  // ---------------------------------------------------------------------------
  // Sample params
  // ---------------------------------------------------------------------------
  private static final Integer SAMPLE_LIMIT = 500;
  private static final String SAMPLE_DATASET = "positions_geographiques_des_stations_du_reseau_ratp";
  private static final String SAMPLE_FACET = "reseau";

  // ---------------------------------------------------------------------------
  // Android bundle Keys
  // ---------------------------------------------------------------------------
  private static final String KEY_SEARCH = "search_string";

  // ---------------------------------------------------------------------------
  // Views
  // ---------------------------------------------------------------------------
  ProgressDialog progressDialog;
  ListView resultListView;
  EditText searchBox;

  // ---------------------------------------------------------------------------
  // Adapters
  // ---------------------------------------------------------------------------
  ODSResultAdapter odsResultAdapter;

  // ---------------------------------------------------------------------------
  // Tasks
  // ---------------------------------------------------------------------------
  DataPickerTask odsTask;

  // ---------------------------------------------------------------------------
  // Activity LifeCycle Management
  // ---------------------------------------------------------------------------
  @Override
  protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    // Set content view
    setContentView(R.layout.activity_sample_ods);

    // Retrieve views
    resultListView = (ListView) findViewById(android.R.id.list);
    searchBox = (EditText) findViewById(R.id.searchBox);
    odsResultAdapter = new ODSResultAdapter(ODSActivity.this);
    resultListView.setAdapter(odsResultAdapter);


    String searchString = null;
    // If previous state was retrieved, retrieving search string
    if(savedInstanceState != null && savedInstanceState.containsKey(KEY_SEARCH)) {
      searchString = savedInstanceState.getString(KEY_SEARCH);
      searchBox.setText(searchString);
    }

    //Let's search
    doSearch(searchString);

    searchBox.addTextChangedListener(new TextWatcher() {

      public void afterTextChanged(Editable s) {
        String search = searchBox.getText().toString();
        doSearch(search);
      }

      public void beforeTextChanged(CharSequence s, int start, int count, int after) {
      }

      public void onTextChanged(CharSequence s, int start, int before, int count) {
      }
    });

  }

  @Override
  protected void onPause() {

    // Cancel asyncTask on Pause
   cancelDataPickerTask();

    super.onPause();
  }

  @Override
  protected void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    outState.putString(KEY_SEARCH,searchBox.getText().toString());
  }

  // ---------------------------------------------------------------------------
  // Code
  // ---------------------------------------------------------------------------

  /**
   * Analyzes the current state of internet connectivity
   * @return true if connected, false otherwise
   */
  private boolean isConnected() {
    ConnectivityManager connMgr = (ConnectivityManager) getSystemService(Activity.CONNECTIVITY_SERVICE);
    NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
    return (networkInfo != null && networkInfo.isConnected());
  }

  private void cancelDataPickerTask() {
    if(odsTask != null)
      odsTask.cancel(true);

    if(progressDialog != null)
      progressDialog.dismiss();
  }

  /**
   * Builds the right URI to query ODS according to sample presets
   * @param search can be null
   */
  private void doSearch(String search) {
    // Custom search builder
    ODSQueryBuilder.SearchBuilder query =
        ODSQueryBuilder.search()
            .dataset(SAMPLE_DATASET)
            .facet(SAMPLE_FACET)
            .exclude(SAMPLE_FACET,"bus")
            .exclude(SAMPLE_FACET,"rer")
            .limit(SAMPLE_LIMIT);

    // A non null search string will be filtered
    if (search != null && search.trim().length() > 0)
      query.contains(search.trim());

    retrieve(query.build());

  }

  /**
   * Triggers the AsyncTask which will load the data and query ODS
   * @param path
   */
  private void retrieve(URI path) {

    if (isConnected()) {
      Log.d("Search URI: ", path.toString());

      // Cancel previously running tasks
      if(odsTask != null && odsTask.getStatus() == AsyncTask.Status.RUNNING) {
        cancelDataPickerTask();
        odsTask = null;
      }
      // Load new task if relevant
      if(odsTask == null || odsTask.getStatus() == AsyncTask.Status.FINISHED)
        odsTask = new DataPickerTask(this,this,path);

      // Execute task
      odsTask.execute();
    } else {
      Toast.makeText(this, getString(R.string.noNetwork), Toast.LENGTH_LONG).show();
    }
  }

  /**
   * Updates the ListView filled with the new search results
   * @param results
   */
  private void fillListView(List<ODSResult> results) {
    odsResultAdapter.updateResults(results);
  }



  // ---------------------------------------------------------------------------
  // Listeners impl
  // ---------------------------------------------------------------------------
  /**
   * Will be called after AsyncTask has completed
   * @param results
   */
  @Override
  public void onTaskCompleted(List<ODSResult> results) {
    fillListView(results);
    if(progressDialog != null)
      progressDialog.dismiss();
  }

  /**
   * Will be called after AsyncTask is started
   * @param params
   */
  @Override
  public void onTaskStarted(Object... params) {
    progressDialog = ProgressDialog.show(ODSActivity.this,getString(R.string.search),getString(R.string.loading)+"...",true,true);
  }
}