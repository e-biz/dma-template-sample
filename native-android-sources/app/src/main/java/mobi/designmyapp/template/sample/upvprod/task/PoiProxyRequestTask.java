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
package mobi.designmyapp.template.sample.upvprod.task;

import android.os.AsyncTask;
import android.util.Log;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import mobi.designmyapp.template.sample.upvprod.listener.OnTaskCompletedListener;
import mobi.designmyapp.template.sample.upvprod.model.PoiProxyResult;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Collections;

/**
 * Created by Loic Ortola on 17/07/2014.
 * PoiProxyRequestTask
 * AsyncTask for PoiProxy request retrieval
 */
public class PoiProxyRequestTask extends AsyncTask<URI,Void,PoiProxyResult> {

  private static final String TAG = PoiProxyRequestTask.class.getSimpleName();

  private static final String TWITTER_KEY = "FQW0Xm5VdGZCLdCBgEo8KxxsJ";
  private static final String TWITTER_SECRET = "sYPPFKmbIYPvkNQ8e7FieQwx3rfTgEwsiKS7xjYiVQVmK0Opb7";

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private OnTaskCompletedListener<PoiProxyResult> onTaskCompletedListener;

  /**
   * PoiProxyRequestTask constructor
   * @param onTaskCompletedListener can be null
   */
  public PoiProxyRequestTask(OnTaskCompletedListener onTaskCompletedListener) {
    this.onTaskCompletedListener = onTaskCompletedListener;
  }

  /**
   * Retrieves the PoiProxy data and processes mapping of the JSON response to a PoiProxyResult POJO
   * @param url should contain the url call to PoiProxy services
   * @return
   */
  @Override
  protected PoiProxyResult doInBackground(URI... url) {
    PoiProxyResult result = null;

    HttpClient client = new DefaultHttpClient();

    //For each URI provided, we call and get the result
    for(URI callURI : url) {
      // Process http request
      try {
        HttpGet request = new HttpGet(callURI);
        HttpResponse response = client.execute(request);

        StatusLine statusLine = response.getStatusLine();

        // If request has returned correctly, process JSON
        if(statusLine.getStatusCode() == HttpStatus.SC_OK) {

          InputStream resultStream = response.getEntity().getContent();

          ObjectMapper mapper = new ObjectMapper();
          mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
          mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);

          // If first call, the result is the object
          if(result == null)
            result = mapper.readValue(resultStream, PoiProxyResult.class);
            // Otherwise, add the results to the previous result
          else
            result.getFeatures().addAll(mapper.readValue(resultStream, PoiProxyResult.class).getFeatures());

          resultStream.close();

        } else{
          //Closes the connection.
          response.getEntity().getContent().close();
          throw new IOException(statusLine.getReasonPhrase());
        }
      } catch (IOException e) {
        Log.e(TAG, "Error while retrieving POI Proxy query: "+ callURI +" data:" + e);
      }
    }
    if(result != null)
      Collections.shuffle(result.getFeatures());
    return result;
  }

  @Override
  protected void onPostExecute(PoiProxyResult result) {
    super.onPostExecute(result);
    if(onTaskCompletedListener != null)
      onTaskCompletedListener.onTaskCompleted(result);
  }
}
