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
package mobi.designmyapp.template.sample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import mobi.designmyapp.template.sample.dfki.DfkiActivity;
import mobi.designmyapp.template.sample.ods.ui.SampleODSActivity;
import mobi.designmyapp.template.sample.upvprod.ui.SamplePoiProxyActivity;
import org.xwalk.core.XWalkView;


public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    final Button odsButton = (Button) findViewById(R.id.sample_ods_btn);
    final Intent intent = new Intent(this, SampleODSActivity.class);
    odsButton.setOnClickListener(new View.OnClickListener() {
      public void onClick(View v) {
        startActivity(intent);
      }
    });

    final Button dkfiButton = (Button) findViewById(R.id.sample_dfki_poi_client_btn);
    final Intent intent2 = new Intent(this, DfkiActivity.class);
    dkfiButton.setOnClickListener(new View.OnClickListener() {
      public void onClick(View v) {
        startActivity(intent2);
      }
    });

    final Button poiProxyButton = (Button) findViewById(R.id.sample_upb_prod_poi_proxy_btn);
    final Intent intent3 = new Intent(this, SamplePoiProxyActivity.class);
    poiProxyButton.setOnClickListener(new View.OnClickListener() {
      public void onClick(View v) {
        startActivity(intent3);
      }
    });

  }

}
