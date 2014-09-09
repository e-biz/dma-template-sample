package mobi.designmyapp.template.sample.contentsharing.ui;

import android.annotation.SuppressLint;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.location.Location;
import android.location.LocationManager;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.Menu;

import com.thales.feedsync.module.geo.GPSTracker;
import com.thales.feedsync.module.network.ThreadItem;
import com.thales.feedsync.module.network.infra.AsyncGetDelegate;
import com.thales.feedsync.module.network.infra.FeedSyncInfra;
import com.thales.feedsync.module.network.infra.websocketDelegate;
import com.thales.feedsync.module.network.websocket.WS;
import com.thales.feedsync.module.network.websocket.WSConnection;
import com.thales.feedsync.module.network.websocket.WSException;

import java.util.ArrayList;
import java.util.List;

import mobi.designmyapp.template.sample.R;

@SuppressLint("NewApi")
public class SampleContentSharingActivity extends FragmentActivity implements AsyncGetDelegate {
	public static final String TAG = "ContentSharingTemplate";
	
	/*** Delegate and Websockets  ***/
	public WSConnection mConnectionWS;
	public websocketDelegate wsDelegate;
	public AsyncGetDelegate getDelegate;
	
	/*** Others variables ***/
	public String mUser;
	public String mainHTTPAddress = "http://192.168.0.1:8083";
	public String mainWSAddress = "ws://192.168.0.1:8083";
	String mUserIDString = "";
	String mUserID = "";
	public Context context;	
	SampleContentSharingActivity mActivity;
	public List<ThreadItem> mListThreadItems = new ArrayList<ThreadItem>();
	
	/*** Notification variables ***/
	NotificationManager notificationManager;
	int notif = 0;

	public List<Long> mListLongId = new ArrayList<Long>();
	
	/*** Fragments ***/

	public NewsFragment mNewsFragment;
	
	/*** Module FeedSync ***/
	public FeedSyncInfra feedSyncInfra;
	
	/*** Preferences ***/	
	public int npComment = 0;
	public int npContent = 0;
	
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
	
	/*** Variables for the SyncThread
	 * Runnable to get and/or to push data to the server ***/
	int value = -1;
	boolean loadingWSDataDone = false;
    final Handler mHandler = new Handler();
    final Runnable mUpdateResults = new Runnable() {
        public void run() {
            updateResult(value);
        }
    };
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_sample_contentsharing);
		
		if (Build.VERSION.SDK_INT > 9) {
			StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); 
			StrictMode.setThreadPolicy(policy); }
		
		/*** Others variables ***/
		Bundle b = getIntent().getExtras();
		mUser = b.getString(EXTRA_NAME);
//		mUser = "Officer 105";
		if(!b.getString(EXTRA_ADDRESS).isEmpty()){
			mainHTTPAddress  = "http://"+b.getString(EXTRA_ADDRESS)+":8083";
			mainWSAddress  = "ws://"+b.getString(EXTRA_ADDRESS)+":8083";
		}
//		mGroupUser = b.getString(EXTRA_NAME_GROUP);
		
		context = this.getApplicationContext();
		mActivity = this;

		/*** Websockets ***/
		mConnectionWS = new WSConnection();
		
		/*** Adhoc ***/
//		mAdhocCreation = new AdhocCreation(this);
		
		/*** FeedSync Module ***/
		feedSyncInfra = new FeedSyncInfra(context, this);

        /*** Fragments ***/

		mNewsFragment = new NewsFragment();
	    
		/*** On TeSquad GPS Not Working ***/ 
		myLocation = new Location("newLocation");
		if(mUser.equals("Officer 104")){
			myLocation.setLatitude(48.878123);
			myLocation.setLongitude(2.284114);
		}else if(mUser.equals("Officer 105")){ 
			myLocation.setLatitude(48.934229);
			myLocation.setLongitude(2.307789);
		}else if(mUser.equals("Officer 206")){ 
			myLocation.setLatitude(48.9413433);
			myLocation.setLongitude(2.3067837);
		}
		
		/*** Notification Management ***/
		notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
		notifIntent = new Intent(this, NotificationManager.class);
		pIntent = PendingIntent.getActivity(this, 0, notifIntent, PendingIntent.FLAG_ONE_SHOT);
		
		/*** Display Settings ***/
		getActionBar().setHomeButtonEnabled(true);
        getActionBar().setTitle("Home");
        getActionBar().setDisplayShowTitleEnabled(true);

		FragmentTransaction t = getSupportFragmentManager().beginTransaction();
        getActionBar().setTitle("Home");
		t.add(R.id.main_frame, mNewsFragment,"home");
	    t.commit(); 
	    
	    /*** Start Websocket ***/
	    startWS();
	    
	    /*** Start WatchDog ***/
	    getPushThreadStart();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.contentsharing_main, menu);
        return true;
	}
	
	/**
	 * Depends on the phone orientation and the tag fragment, we shows different fragment
	 * In portrait, classic fragment, in landscape, geo fragment.
	 * 
	 * tag fragment lets detect which fragment is shown 
	 */
	public void onConfigurationChanged(Configuration newConfig) {
	    super.onConfigurationChanged(newConfig);
	}

	/**
	 * Function: Start Websocket
	 * Launch a websocket on the address (mainWSAddress)
	 * in the function onTextMessage(String payload):
	 * 	- a new data (comment and/or entry) wad added, the String payload represents the address where she is
	 *  - we add a new ThreadItem in the list mListThreadItems
	 *  This list represents a list of actions has to be done (it could be a get or a push)
	 *   - 1 to get data
	 *   - 0 to push data
	 */
	public void startWS() {
			
	      final String wsuri = mainWSAddress+"/feedsync/websocket";
	 
	      try {
	    	  
	         mConnectionWS.connect(wsuri, new WS.ConnectionHandler() {
	 
	            @Override
	            public void onOpen() {
	               Log.d(TAG, "Status: Connected to " + wsuri);
	               mConnectionWS.sendTextMessage(mUserID);
	            }
	 
	            @Override
	            public void onTextMessage(String payload) {
	               Log.d(TAG, "Got echo: " + payload);
	               mListThreadItems.add(new ThreadItem(1, mainHTTPAddress+"/feedsync/rest/myfeeds/"+payload+"/entries"));
	            }
	 
	            @Override
	            public void onClose(int code, String reason) {
	               Log.d(TAG, "Connection lost.");
	            }
	         });
	      } catch (WSException e) {
	 
	         Log.d(TAG, e.toString());
	      }
   }
	
	/**
	 * Function: asyncNotification(String title)
	 * Firstly depends on the String title, it creates a notification
	 * Secondly it gets the actual fragment shown 
	 * and calls different functions to update listview and database
	 */
	public void asyncNotification(String title) {
        if(getActiveFragment().equals("news") || getActiveFragment().equals("detailnews")){
            mNewsFragment.asyncComplete(true);
            mNewsFragment.webSync(true);
        }
	}
	
	/**
	 * Function: getActiveFragment()
	 * It returns the active fragment(which fragment is shown on the device)
	 * Each fragment when it launches add a tag to represent itself
	 * @return String tag
	 */
	public String getActiveFragment() {
	    if (getSupportFragmentManager().getBackStackEntryCount() == 0) {
	        return null;
	    }
	    String tag = getSupportFragmentManager().getBackStackEntryAt(getSupportFragmentManager().getBackStackEntryCount() - 1).getName();
	    return tag;
	}
	
	/** 
	 * Watch Dog - Thread to get and/or push data to the server
	 * Read the list mListThreadItems, and launch the command of each ThreadItem until 
	 * mListThreadItems is not empty
	 */
	protected void getPushThreadStart() {
        Thread t = new Thread() {
            public void run() {
            	// Do this thread in background
            	android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
            	while(true){
            		getTypeThreadItem();
            		if(value!=-1){
                		mHandler.post(mUpdateResults);
            		}
            	}     
            }
        };
        t.start();
        Log.d(TAG,"getPushThreadStart() lanched");
    }
	
	/**
	 * Function: getTypeThreadItem()
	 * only if the list (mListThreadItems) is not empty
	 * Depends on the type of the ThreadItem, it returns the number of the box of the ThreadItem
	 * The push always has be done before a get
	 * If there is no push in the list, the first get will be done
	 * the value equals -1 if the list is empty
	 */
	private void getTypeThreadItem() {
        if(!mListThreadItems.isEmpty()){
        	if(mListThreadItems.size()>0){
        		for(int j=0;j<mListThreadItems.size();j++){
            		if(mListThreadItems.get(j).getTypeThread()==0){
            			value = j;
            			j = mListThreadItems.size();
            		}else{
            			value = 0;
            		}
            	}
        	}
        }else{
        	value = -1;
        }
    }
	
	/**
	 * Function: updateResult(int i)
	 * @param i, number of the box of the list mListThreadItems, have to be executed
	 * get the data from the box, execute the command and remove the data
	 * the command allows the download of the data from the server
	 */
	private void updateResult(int i) {
		if(i!=-1 && !mListThreadItems.isEmpty() && loadingWSDataDone==false){
			ThreadItem mThreadItem = new ThreadItem(mListThreadItems.get(i));
			mListThreadItems.remove(i);
			new LoadingWSData(mActivity).execute(mActivity,mThreadItem.getAddress());
		}
	}
}
