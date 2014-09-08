package mobi.designmyapp.template.sample.pixelpark;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import mobi.designmyapp.template.sample.R;
import org.apache.cordova.Config;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by loic on 05/09/2014.
 */
public class SocialNetworkActivity extends Activity implements CordovaInterface {

  CordovaWebView webView;
  CordovaPlugin activityResultCallback;
  boolean activityResultKeepRunning;
  boolean keepRunning;
  ExecutorService executor = Executors.newFixedThreadPool(5);

  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_pixelpark);
    webView = (CordovaWebView) findViewById(R.id.ppnet_webview);
    Config.init(this);
    webView.setDrawingCacheEnabled(true);
    webView.loadUrl("file:///android_asset/sne/index.html");
  }

  @Override
  public void setActivityResultCallback(CordovaPlugin plugin) {
    this.activityResultCallback = plugin;
  }

  @Override
  public Activity getActivity() {
    return this;
  }

  @Override
  public Object onMessage(String s, Object o) {
    return o;
  }

  @Override
  public ExecutorService getThreadPool() {
    return executor;
  }

  /**
   * Launch an activity for which you would like a result when it finished. When this activity exits,
   * your onActivityResult() method is called.
   *
   * @param command           The command object
   * @param intent            The intent to start
   * @param requestCode       The request code that is passed to callback to identify the activity
   */
  public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
    this.activityResultCallback = command;
    this.activityResultKeepRunning = this.keepRunning;


// If multitasking turned on, then disable it for activities that return results
    if (command != null) {
      this.keepRunning = false;
    }


// Start activity
    super.startActivityForResult(intent, requestCode);


  }


  @Override
/**
 * Called when an activity you launched exits, giving you the requestCode you started it with,
 * the resultCode it returned, and any additional data from it.
 *
 * @param requestCode       The request code originally supplied to startActivityForResult(),
 *                          allowing you to identify who this result came from.
 * @param resultCode        The integer result code returned by the child activity through its setResult().
 * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
 */
  protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
    super.onActivityResult(requestCode, resultCode, intent);
    CordovaPlugin callback = this.activityResultCallback;
    if (callback != null) {
      callback.onActivityResult(requestCode, resultCode, intent);
    }
  }

  @Override
  public void onBackPressed() {
    finish();
  }
}