package mobi.designmyapp.template.sample.contentsharing;

import android.annotation.SuppressLint;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Configuration;
import android.location.Location;
import android.location.LocationManager;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.Menu;

import com.thales.feedsync.api.APIClient;
import com.thales.feedsync.module.geo.GPSTracker;
import com.thales.feedsync.module.geo.GeoFence;

import java.util.ArrayList;
import java.util.List;

import mobi.designmyapp.template.sample.R;

@SuppressLint("NewApi")
public class SampleContentSharingActivity extends FragmentActivity{
    public static final String TAG = "ContentSharingTemplate";

    /*** Others variables ***/
    public String mUser;
    public String mGroupUser;
    public String mServerAddress = "http://192.168.0.1:8083";
    public String mWSServerAddress = "";
    String mUserIDString = "";
    String mUserID = "";
    public Context context;
    SampleContentSharingActivity mActivity;

    public APIClient mApiClient;

    /*** Notification variables ***/
    NotificationManager notificationManager;
    int notif = 0;

    /*** Delete Database ***/
    public List<Long> mListLongId = new ArrayList<Long>();

    /*** UI notifications ***/
    BroadcastReceiver receiver;

    /*** Intent ***/
    public static String EXTRA_ITEM = "ITEM";
    public static String EXTRA_NAME = "NAME";
    public static String EXTRA_NAME_GROUP = "NAME_GROUP";
    public static String EXTRA_ITEM_SMS = "ITEM_SMS";
    public static String EXTRA_ITEM_GROUP_SMS = "ITEM_GROUP_SMS";
    public static String EXTRA_ITEM_GEO = "EXTRA_ITEM_GEO";
    public static String EXTRA_COMMENT = "COMMENT";
    public static String EXTRA_ITEM_CONTACT = "CONTACT";
    public static String EXTRA_ADDRESS = "ADDRESS";
    public static String ADDRESS_TO_POST = "ADDRESS";
    public static String EXTRA_LOCATION_LATITUDE = "LOCATION_LATITUDE";
    public static String EXTRA_LOCATION_LONGITUDE = "LOCATION_LONGITUDE";

    public PendingIntent pIntent;
    public Intent notifIntent;

    /*** GPS ***/
    public WifiManager wifiManager;

    public LocationManager locationManager;
    public Location location;
    public Location myLocation;

    public GPSTracker gps;

    public Boolean fakeLocation = false;

    /*** Fence ***/
    public List<GeoFence> mListGeoFence = new ArrayList<GeoFence>();
    public List<GeoFence> mListGeoFenceBFT = new ArrayList<GeoFence>();

    /*** Fragments ***/
    public NewsFragment mNewsFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample_contentsharing);

        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy); }

        /*** Others variables ***/
        Bundle b = getIntent().getExtras();
        mUser = b.getString(EXTRA_NAME);
        if(!b.getString(EXTRA_ADDRESS).isEmpty()){
            mServerAddress  = "http://"+b.getString(EXTRA_ADDRESS)+":8083";
            mWSServerAddress = "ws://"+b.getString(EXTRA_ADDRESS)+":8083";
        }

        context = this.getApplicationContext();
        mActivity = this;

        mNewsFragment = new NewsFragment();

        /*** Wifi Manager ***/
        wifiManager = (WifiManager)this.context.getSystemService(Context.WIFI_SERVICE);

        /*** On TeSquad GPS Not Working ***/
        myLocation = new Location("newLocation");
        if(mUser.equals("Officer213")){
            myLocation.setLatitude(48.878123);
            myLocation.setLongitude(2.284114);
        }else if(mUser.equals("Officer214")){
            myLocation.setLatitude(48.934229);
            myLocation.setLongitude(2.307789);
        }else if(mUser.equals("Officer215")){
            myLocation.setLatitude(48.9413433);
            myLocation.setLongitude(2.3067837);
        }

        gps = new GPSTracker(this.getApplicationContext());
        // check if GPS enabled
        if(gps.canGetLocation()){
            myLocation = gps.getLocation();
        }else{
            // can't get location
            // GPS or Network is not enabled
            // Ask user to enable GPS/network in settings
            gps.showSettingsAlert();
        }

        if(myLocation==null){
            myLocation = new Location("newLocation");
            myLocation.setLatitude(48.88079);
            myLocation.setLongitude(2.28405);
        }

        mApiClient = new APIClient(context, mUser, b.getString(EXTRA_ADDRESS));
        mApiClient.init();

        /*** Notification Management ***/
        notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        notifIntent = new Intent(this, NotificationManager.class);
        pIntent = PendingIntent.getActivity(this, 0, notifIntent, PendingIntent.FLAG_ONE_SHOT);

        /*** Display Settings ***/
        getActionBar().setHomeButtonEnabled(true);
        getActionBar().setTitle("Home");
        getActionBar().setDisplayShowTitleEnabled(true);

        //The receiver to update the list if we receive a message in an intent
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if(action.equals("UPDATE")){
                    if(intent.getStringExtra("messageTitle")!=null){
                        if(intent.getStringExtra("messageTitle").equals("GroupMessaging")){
                            Log.d(TAG,"Notification GroupMessaging");
                        }else if(intent.getStringExtra("messageTitle").equals("News")){
                            Log.d(TAG, "Notification News");
                        }else if(intent.getStringExtra("messageTitle").equals("OT")){
                            Log.d(TAG, "Notification OT");
                        }
                    }
                }
            }
        };

        FragmentTransaction t = getSupportFragmentManager().beginTransaction();
        getActionBar().setTitle("Home");
        t.add(R.id.main_frame, mNewsFragment, "home");
        t.commit();
    }

    public void onResume(){
        super.onResume();

        IntentFilter filter = new IntentFilter();
        filter.addAction("UPDATE");

        mActivity.registerReceiver(receiver, filter);
    }

    public void onPause(){
        super.onPause();
        mActivity.unregisterReceiver(receiver);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.contentsharing_main, menu);
        return true;
    }

    /**
     * Depends on the phone orientation and the tag fragment, we shows different fragment
     * In portrait, classic fragment, in landscape, geo fragment.
     * <p/>
     * tag fragment lets detect which fragment is shown
     */
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }


    /**
     * It returns the active fragment(which fragment is shown on the device)
     * Each fragment when it launches add a tag to represent itself
     *
     * @return String tag
     */
    public String getActiveFragment() {
        if (getSupportFragmentManager().getBackStackEntryCount() == 0) {
            return null;
        }
        String tag = getSupportFragmentManager().getBackStackEntryAt(getSupportFragmentManager().getBackStackEntryCount() - 1).getName();
        return tag;
    }
}
