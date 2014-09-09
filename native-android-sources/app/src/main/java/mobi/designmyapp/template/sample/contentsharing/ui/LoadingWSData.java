package mobi.designmyapp.template.sample.contentsharing.ui;

import android.os.AsyncTask;
import android.util.Log;

import com.thales.feedsync.module.database.DataBaseSchema;
import com.thales.feedsync.module.network.infra.FeedSyncInfra;
import com.thales.feedsync.module.protocol.atom.DefaultAtomFeed;
import com.thales.feedsync.module.protocol.xml.FeedHandler;

import org.xml.sax.SAXException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

/**
 * Class LoadingWSData, type: AsyncTask
 * 
 * it Downloading the different entries from a feed
 * This class receive several parameters in arguments
 * - the activity from which the class is instantiated
 * - a string(payload) which represents the address from which the feed and the entries will be downloaded
 * This string comes from the websocket
 * 
 * @author flo
 *
 */
public class LoadingWSData extends AsyncTask<Object, Void, Boolean>{
	protected static final String TAG = "LoadingWSData";
	
	/*** Others variables ***/
	FeedSyncInfra feedSyncInfra;
	String payload;
	SampleContentSharingActivity mActivity;
	String mTitle;
	private long startTime;
	
	/**
	 * Instantiates a new loading feed task from websocket.
	 */
	public LoadingWSData() {
		super();
		Log.d(TAG,"LoadingWSData()");
	}
	
	/**
	 * Instantiates a new loading feed task from websocket.
	 */
	public LoadingWSData(SampleContentSharingActivity mActivity) {
		super();
		Log.d(TAG,"LoadingWSData()");
		this.mActivity = mActivity;
	}
	
	protected Boolean doInBackground(Object...params) {
		
		startTime=System.currentTimeMillis();
		mActivity = (SampleContentSharingActivity) params[0];
		payload = (String) params[1];
		
		FeedHandler mFeedHandler = new FeedHandler();
        List<DefaultAtomFeed> mList = new ArrayList<DefaultAtomFeed>();
		
        try {
        	/**
        	 * mFeedHandler.handleFeed(payload) will get the feed from the payload(address of the feed on the server)
        	 * and it will parse it to a list of feeds depends on the Feed Title
        	 */
    	    mList = mFeedHandler.handleFeed(payload); 
    	    Log.d(TAG,"TITLE: "+mList.get(0).getTitle());
    	    if(mList.size() != 0){
    	    	mList.get(0).setFeedId(payload);
    		}
    	    
    	    if(mList.get(0).getTitle()!=null){
	            if(mActivity.feedSyncInfra!=null){
	            	mActivity.feedSyncInfra.dBa.populateFeeds(mList, DataBaseSchema.INFRA,null);
	            	mTitle = "News";
	            }
    	    }
    	   
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
		
		
		Log.d(TAG, "STOP LoadingFeedTask");
		Log.d(TAG, "DOWNLOAD Time="+(System.currentTimeMillis()-startTime));
		Log.d(TAG,"Bytes Received:"+mFeedHandler.getTotalBytes()+"--------------------------------");
		return null;
	}
	
	protected void onPreExecute() {
		Log.d(TAG, "onPreExecute");
		mActivity.loadingWSDataDone = true;
	}
	
	protected void onPostExecute(Boolean msg) {
		Log.d(TAG, "onPostExecute");
		mActivity.loadingWSDataDone = false;
	}
}
