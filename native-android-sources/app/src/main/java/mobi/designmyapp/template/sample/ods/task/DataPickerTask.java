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
package mobi.designmyapp.template.sample.ods.task;

import android.os.AsyncTask;
import android.util.Log;
import mobi.designmyapp.template.sample.ods.listener.OnTaskCompletedListener;
import mobi.designmyapp.template.sample.ods.listener.OnTaskStartedListener;
import mobi.designmyapp.template.sample.ods.model.ODSResult;
import mobi.designmyapp.template.sample.ods.util.StreamUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Loic Ortola on 23/06/2014.
 * DataPickerTask
 * AsyncTask for OpenDataSoft search
 */
public class DataPickerTask extends AsyncTask<Object, Void, List<ODSResult>> {

  // ---------------------------------------------------------------------------
  // ODS Normalized fields
  // ---------------------------------------------------------------------------
  public static final String TAG_ENTRY = "records";
  public static final String TAG_ID = "recordid";
  public static final String TAG_DATA = "fields";

  // ---------------------------------------------------------------------------
  // Custom Sample related fields
  // ---------------------------------------------------------------------------
  public static final String TAG_NAME = "nom_station";
  public static final String TAG_AREA = "arrondissement";
  public static final String TAG_LAT = "latitude";
  public static final String TAG_LONG = "longitude";

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private URI callURI;
  private OnTaskCompletedListener onTaskCompletedListener;
  private OnTaskStartedListener onTaskStartedListener;

  /**
   * DataPickerTask constructor
   * only callURI argument is mandatory
   * @param onTaskStartedListener can be null
   * @param onTaskCompletedListener can be null
   * @param callURI
   */
  public DataPickerTask(OnTaskStartedListener onTaskStartedListener, OnTaskCompletedListener onTaskCompletedListener, URI callURI) {
    this.onTaskCompletedListener = onTaskCompletedListener;
    this.onTaskStartedListener = onTaskStartedListener;
    if(callURI == null)
      throw new IllegalArgumentException("Call URI must be provided");
    this.callURI = callURI;
  }

  @Override
  protected void onPreExecute() {
    super.onPreExecute();
    if(onTaskStartedListener != null)
      onTaskStartedListener.onTaskStarted();
  }

  @Override
  protected void onPostExecute(List<ODSResult> results) {
    super.onPostExecute(results);
    if(onTaskCompletedListener != null)
      onTaskCompletedListener.onTaskCompleted(results);
  }

  /**
   * Retrieves the ODS call result and processes JSON parsing
   * @param params
   * @throws java.lang.IllegalStateException if an error occurs during HTTP call or during JSON parsing
   * @return
   */
  @Override
  protected List<ODSResult> doInBackground(Object... params) {

    InputStream resultStream = null;

    // Processing Http request
    try {
      HttpClient client = new DefaultHttpClient();
      HttpGet request = new HttpGet(callURI);
      HttpResponse response = client.execute(request);

      resultStream = response.getEntity().getContent();

    } catch (ClientProtocolException e) {
      Log.e("Error with the used protocol: ", e.getLocalizedMessage());
      throw new IllegalStateException(e);
    } catch (IOException e) {
      Log.e("Error while getting stream: ", e.getLocalizedMessage());
      throw new IllegalStateException(e);
    }

    // Converting response to string
    String result = StreamUtils.inputStreamToString(resultStream);



    // Parsing string to JSON and mapping to result List
    List<ODSResult> results = new ArrayList<ODSResult>();
    try {
      JSONObject json = new JSONObject(result);

      JSONArray entries = json.getJSONArray(TAG_ENTRY);

      for (int i = 0; i < entries.length(); i++) {
        JSONObject s = entries.getJSONObject(i);

        ODSResult entry = new ODSResult().builder()
            .id(s.getString(TAG_ID))
            .title(s.getJSONObject(TAG_DATA).getString(TAG_NAME))
            .description(s.getJSONObject(TAG_DATA).getString(TAG_AREA))
            .latitude(Double.parseDouble(s.getJSONObject(TAG_DATA).getString(TAG_LAT)))
            .longitude(Double.parseDouble(s.getJSONObject(TAG_DATA).getString(TAG_LONG)))
            .build();

        results.add(entry);

      }
    } catch (JSONException e) {
      Log.e("Error while parsing JSON: ", e.getLocalizedMessage());
      throw new IllegalStateException(e);
    }
    return results;
  }


}
