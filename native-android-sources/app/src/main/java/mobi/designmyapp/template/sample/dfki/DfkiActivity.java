package mobi.designmyapp.template.sample.dfki;

import android.app.Activity;
import android.os.Bundle;
import mobi.designmyapp.template.sample.R;
import org.xwalk.core.XWalkView;

/**
 * Created by loic on 15/07/2014.
 */
public class DfkiActivity extends Activity {

  XWalkView webView;

  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_dfki_poi_client);
    webView = (XWalkView) findViewById(R.id.xWalkView);
    webView.load("http://130.206.80.175/poi-client/xml3d", null);
  }
}