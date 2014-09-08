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
package mobi.designmyapp.template.sample.upvprod.ui;

import android.app.Activity;
import android.app.ProgressDialog;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;
import com.etsy.android.grid.StaggeredGridView;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesClient;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.location.LocationClient;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.upvprod.adapter.PoiProxyTileAdapter;
import mobi.designmyapp.template.sample.upvprod.listener.OnTaskCompletedListener;
import mobi.designmyapp.template.sample.upvprod.model.PoiProxyResult;
import mobi.designmyapp.template.sample.upvprod.task.PoiProxyRequestTask;
import mobi.designmyapp.template.sample.upvprod.util.PoiProxyQueryBuilder;

/**
 * Created by Loic Ortola on 15/07/2014.
 * This Sample demonstrates queries to the PoiProxy API to retrieve
 * surrounding contributions from social networks
 * Original project is developed and sustained by Alberto Romeu
 * source code available on github at
 * https://github.com/alrocar/POIProxy
 */
public class PoiProxyActivity extends Activity implements
    GooglePlayServicesClient.ConnectionCallbacks,
    GooglePlayServicesClient.OnConnectionFailedListener, OnTaskCompletedListener<PoiProxyResult> {

  // ---------------------------------------------------------------------------
  // Sample params
  // ---------------------------------------------------------------------------
  private static final String TAG = PoiProxyActivity.class.getSimpleName();
  // Milliseconds per second
  private static final int MILLISECONDS_PER_SECOND = 1000;
  // Update frequency in seconds
  public static final int UPDATE_INTERVAL_IN_SECONDS = 5;
  // Update frequency in milliseconds
  private static final long UPDATE_INTERVAL = MILLISECONDS_PER_SECOND * UPDATE_INTERVAL_IN_SECONDS;
  // The fastest update frequency, in seconds
  private static final int FASTEST_INTERVAL_IN_SECONDS = 1;
  // A fast frequency ceiling in milliseconds
  private static final long FASTEST_INTERVAL = MILLISECONDS_PER_SECOND * FASTEST_INTERVAL_IN_SECONDS;

  // ---------------------------------------------------------------------------
  // Views
  // ---------------------------------------------------------------------------
  StaggeredGridView gridView;
  ProgressDialog progressDialog;

  // ---------------------------------------------------------------------------
  // Adapters
  // ---------------------------------------------------------------------------
  PoiProxyTileAdapter tileAdapter;

  // ---------------------------------------------------------------------------
  // Tasks
  // ---------------------------------------------------------------------------
  PoiProxyRequestTask task;

  // ---------------------------------------------------------------------------
  // Location Attributes
  // ---------------------------------------------------------------------------
  LocationClient locationClient;
  Location currentLocation;


  // ---------------------------------------------------------------------------
  // Activity LifeCycle Management
  // ---------------------------------------------------------------------------
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Set content view
    setContentView(R.layout.activity_sample_poiproxy);

    // Retrieve views
    gridView = (StaggeredGridView) findViewById(R.id.staggeredGridView);

    // Check that Google Play services is available
    int resultCode = GooglePlayServicesUtil.isGooglePlayServicesAvailable(this);

    // If Google Play services is not available, then show error and destroy activity
    if (!(ConnectionResult.SUCCESS == resultCode)) {
      // In debug mode, log the status
      Log.w(TAG,"Google Play services is not available.");
      Toast.makeText(this, R.string.gmsRequired, Toast.LENGTH_LONG).show();
      finish();
      return;
    }

    locationClient = new LocationClient(this, this, this);

    progressDialog = ProgressDialog.show(PoiProxyActivity.this, getString(R.string.pleaseWait), getString(R.string.waitingForLocation), true);

  }

  @Override
  protected void onResume() {
    super.onResume();
    // Connect location client
    locationClient.connect();
  }

  @Override
  protected void onPause() {
    // Disconnect location client
    locationClient.disconnect();
    super.onPause();
  }

  @Override
  protected void onDestroy() {
    // Cancel all tasks if running
    if(task != null)
      task.cancel(true);
    if(progressDialog != null)
      progressDialog.dismiss();
    super.onDestroy();
  }

  // ---------------------------------------------------------------------------
  // Code
  // ---------------------------------------------------------------------------

  /**
   * Updates the tiles of the custom grid view
   * @param results
   */
  private void updateView(PoiProxyResult results) {
    tileAdapter = new PoiProxyTileAdapter(PoiProxyActivity.this);
    tileAdapter.updateAdapter(results.getFeatures());
    gridView.setAdapter(tileAdapter);
  }

  // ---------------------------------------------------------------------------
  // Listeners impl
  // ---------------------------------------------------------------------------

  /**
   * Called when LocationClient has connected
   * Launches the PoiProxy request task with current location if available,
   * otherwise will select arbitrary location
   * @param bundle
   */
  @Override
  public void onConnected(Bundle bundle) {
    currentLocation = locationClient.getLastLocation();
    task = new PoiProxyRequestTask(this);
    if(currentLocation != null) {
      progressDialog.setMessage(getString(R.string.locationRetrievedOk));
      task.execute(
          PoiProxyQueryBuilder.retrieve().service("flickr").lon(currentLocation.getLongitude()).lat(currentLocation.getLatitude()).distance(500).build(),
          PoiProxyQueryBuilder.retrieve().service("panoramio").lon(currentLocation.getLongitude()).lat(currentLocation.getLatitude()).distance(500).build(),
          PoiProxyQueryBuilder.retrieve().service("instagram").lon(currentLocation.getLongitude()).lat(currentLocation.getLatitude()).distance(500).build()
      );
    }
    else {
      progressDialog.setMessage(getString(R.string.locationRetrievedKo));
      task.execute(
          PoiProxyQueryBuilder.retrieve().service("flickr").lon(2.334314).lat(48.861541).distance(5000).build(),
          PoiProxyQueryBuilder.retrieve().service("panoramio").lon(2.334314).lat(48.861541).distance(5000).build(),
          PoiProxyQueryBuilder.retrieve().service("instagram").lon(2.334314).lat(48.861541).distance(5000).build()
      );
    }
  }

  /**
   * Called when LocationClient has disconnected
   */
  @Override
  public void onDisconnected() {

  }

  /**
   * Called if LocationClient has failed to connect
   * @param connectionResult
   */
  @Override
  public void onConnectionFailed(ConnectionResult connectionResult) {
    Log.w(TAG,"Cannot connect LocationClient:"+connectionResult);
  }

  /**
   * Will be called after AsyncTask has completed
   * @param result
   */
  @Override
  public void onTaskCompleted(PoiProxyResult result) {
    progressDialog.hide();
    progressDialog.dismiss();
    // If task failed, finish activity and notify user
    if(result == null) {
      Toast.makeText(this,R.string.errorRetrievingData,Toast.LENGTH_LONG).show();
      finish();
      return;
    }
    // Else update views and dismiss dialog
    updateView(result);

  }

  /**
   * Will be called on AsyncTask update
   * @param result
   */
  @Override
  public void onTaskUpdated(String result) {
    progressDialog.setMessage(result);
  }
}