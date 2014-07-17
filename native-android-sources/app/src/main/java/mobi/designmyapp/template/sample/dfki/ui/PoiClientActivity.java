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
package mobi.designmyapp.template.sample.dfki.ui;

import android.app.Activity;
import android.os.Bundle;
import mobi.designmyapp.template.sample.R;
import org.xwalk.core.XWalkView;

/**
 * Created by Loic Ortola on 15/07/2014.
 * This sample demonstrates two things:
 * 1-The ability to use the XWalk view from the Crosswalk library
 * which implements the latest chromium features, especially WebGl compatibility
 * 2-The ability to run a XML3D app from android
 * The XML3D poi-client project is developed and sustained by Stefan Lemme
 * source code available on https://github.com/stlemme/poi-client
 */
public class PoiClientActivity extends Activity {

  XWalkView webView;

  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_sample_poi_client);
    webView = (XWalkView) findViewById(R.id.xWalkView);
    webView.setAlwaysDrawnWithCacheEnabled(true);
    webView.load("http://130.206.80.175/poi-client/xml3d ", null);
  }
}