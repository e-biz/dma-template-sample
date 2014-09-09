package mobi.designmyapp.template.sample.contentsharing.ui;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.database.Cursor;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.SimpleCursorAdapter;
import android.widget.TextView;

import com.thales.feedsync.module.database.DataBaseSchema;
import com.thales.feedsync.module.network.infra.AsyncDelegate;
import com.thales.feedsync.module.network.infra.FeedEntry;
import com.thales.feedsync.module.network.infra.FeedSyncInfra;
import com.thales.feedsync.module.network.infra.LoadingFeedTask;
import com.thales.feedsync.module.network.infra.websocketDelegate;
import com.thales.feedsync.module.protocol.atom.DefaultAtomEntry;

import org.module.widget.dialog.ItemListSyncDialog;

import java.util.ArrayList;
import java.util.Date;

import mobi.designmyapp.template.sample.R;

/**
 * Class NewsFragment, type: Fragment(Fragment), implements AsyncDelegate(Delegate)
 * 
 * This fragment represents the news list to which the user is subscribed
 * 
 * @author flo
 *
 */
public class NewsFragment extends Fragment implements AsyncDelegate{
	private static final String TAG = "NewsFragment";
	
	/*** Date variables ***/
	public static final long MINUTE=60;
	public static final long HOUR=3600;
	public static final long DAY=24*HOUR;
	public static final long WEEK=7*DAY;
	
	/*** UI variables ***/
	public ListView simpleListView;
	public TextView usernameTextView;
	public RelativeLayout rel1;
	
	/*** Others variables ***/
	private ArrayList<FeedEntry> items = new ArrayList<FeedEntry>();
	String feedTitle;

	
	/*** List Adapter ***/
	public FeedEntryAdapter adapter;
	public CustomListAdapter customAdapter;
	
	/*** Adhoc ***/
	/*private static final int OK_CANCEL_DIALOG = 0;
	private boolean ADHOC_MODE = false;
	private AdhocCreation mAdhocCreation = null;*/
	
	/*** Fragment and FeedSync module ***/
	public FeedSyncInfra feedSyncInfra;
	private SampleContentSharingActivity mActivity;
	public DetailNewsFragment mDetailEntryFragment;

	/*** Websocket ***/
	public websocketDelegate wsDelegate;
	
	public void onCreate(Bundle savedInstanceState){
		Log.d(TAG,"onCreate");
		super.onCreate(savedInstanceState);
		
		/*** Adhoc ***/
		//mAdhocCreation = new AdhocCreation(getActivity()); 
		
		setHasOptionsMenu(true);  
		mActivity = (SampleContentSharingActivity) getActivity();
		feedSyncInfra = mActivity.feedSyncInfra;
		feedSyncInfra.address = mActivity.mainHTTPAddress+"/feedsync/rest/myfeeds/1/entries";
		wsDelegate = mActivity.wsDelegate;
		
		feedTitle = "News";
		
	}
	
	public void onResume(){
		Log.d(TAG,"onResume");
		super.onResume();
		setHasOptionsMenu(true);  
		mActivity = (SampleContentSharingActivity) getActivity();
		mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		feedSyncInfra = mActivity.feedSyncInfra;
		wsDelegate = mActivity.wsDelegate;
		
	}
	
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// Inflate the layout for this fragment
		View v = inflater.inflate(R.layout.contentsharing_fragment_stream_with_simple_listview, null);
		
		simpleListView = (ListView)v.findViewById(R.id.listViewSimple);
        
        adapter = new FeedEntryAdapter(items, getActivity());
        
        rel1=(RelativeLayout) v.findViewById(R.id.progress_indicator);
        rel1.setVisibility(View.GONE);
        feedSyncInfra.rel1 = rel1;
 
        simpleListView.setAdapter(adapter);
         
        /**
         * A customAdapter is built for the listview
         * Each item contains the title of the entry and its date
         * Firstly it tests the content of the database for this feed,
         * if the database is empty for this feed, we will download the data
         * else we update the listview
         */
        if(feedSyncInfra.getMode() == FeedSyncInfra.INFRA){
	        if(items.size()==0 && feedSyncInfra.address!=null && feedSyncInfra.getListEntry("News").size() == 0){
	        	customAdapter = new CustomListAdapter(getActivity(),
						R.layout.contentsharing_atom_list_row,feedSyncInfra.getCursorEntries(feedSyncInfra.getCursorFeedId("News")),
						new String[] {feedSyncInfra.getDbColumnTitle(),feedSyncInfra.getDbColumnAuthorName(), feedSyncInfra.getDbColumnRead() },
						new int[]{R.id.titleAtomRow,R.id.dateAtomRow, R.id.row_container}); 
	        	
	        	new LoadingFeedTask(feedSyncInfra,this).execute(feedSyncInfra,simpleListView,customAdapter,mActivity.npContent,mActivity.npComment);
	        }else if(items.size()==0 && feedSyncInfra.address!=null  && feedSyncInfra.getListEntry().size()!=0){
	        	
	        	customAdapter = new CustomListAdapter(getActivity(),
						R.layout.contentsharing_atom_list_row,feedSyncInfra.getCursorEntries(feedSyncInfra.getCursorFeedId("News")),
						new String[] {feedSyncInfra.getDbColumnTitle(),feedSyncInfra.getDbColumnAuthorName(), feedSyncInfra.getDbColumnRead() },
						new int[]{R.id.titleAtomRow,R.id.dateAtomRow, R.id.row_container});
	        	
	        	simpleListView.setAdapter(customAdapter);
	        	customAdapter.notifyDataSetChanged();
	        }
        }
        /*** Adhoc ***/
        /*else if(feedSyncInfra.getMode() == FeedSyncInfra.ADHOC){
        	Log.d(TAG,"MODE ADHOC");
        	if(feedSyncInfra.address!=null && feedSyncInfra.getListEntry().size() != 0){
	        	customAdapter = new CustomListAdapter(getActivity(),
						R.layout.atom_list_row,feedSyncInfra.getCursorEntries(feedSyncInfra.getCursorFeedId("News")), 
						new String[] {feedSyncInfra.getDbColumnTitle(),feedSyncInfra.getDbColumnAuthorName(), feedSyncInfra.getDbColumnRead() },
						new int[]{R.id.titleAtomRow,R.id.dateAtomRow, R.id.row_container}); 
	        	simpleListView.setAdapter(customAdapter);
	        	customAdapter.notifyDataSetChanged();
			}
        }*/

        
        simpleListView.setOnItemClickListener(new OnItemClickListener() {

			@Override
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				DefaultAtomEntry mEntry = feedSyncInfra.getSampleEntry(arg2,feedTitle);
				// TODO Auto-generated method stub
				Log.d(TAG,"getContent: "+mEntry.getContent());
				Log.d(TAG,"getSummary: "+mEntry.getSummary());
				Log.d(TAG,"position: "+arg2);
				Log.d(TAG,"id: "+mEntry.getEntryId());
				Log.d(TAG,"id: "+mEntry.getId());
				boolean test = true;
				for(int i=0;i<mActivity.mListLongId.size();i++){
					if(mActivity.mListLongId.get(i)==mEntry.getId()){
						test=false;
						i = mActivity.mListLongId.size();
					}
				}
				if(test==true){
					mActivity.mListLongId.add(mEntry.getId());
				}
				
				ItemListSyncDialog iLD = new ItemListSyncDialog();
				iLD.setTitleDialog(mEntry.getTitle());
				iLD.setDescriptionDialog(mEntry.getSummary());
				iLD.setDateDialog(mEntry.getPublished().toGMTString());
				iLD.setContentDialog(mEntry.getContent());
				iLD.setPositionDialog(arg2);
				Bundle extras = new Bundle();
				extras.putParcelable(SampleContentSharingActivity.EXTRA_ITEM, iLD);
				
				mDetailEntryFragment = new DetailNewsFragment();
				mDetailEntryFragment.setArguments(extras);
				
				getActivity().getSupportFragmentManager().beginTransaction()
				.replace(R.id.main_frame, mDetailEntryFragment,"detailnews")
				.addToBackStack("detailnews")
				.commit();	
			}
		});
		
        return v;
	}
    
    private class FeedEntryAdapter extends ArrayAdapter<FeedEntry> {

    	private ArrayList<FeedEntry> feedEntryList;
    	private Context context;

    	public FeedEntryAdapter(ArrayList<FeedEntry> feedEntryList, Context ctx) {
    		super(ctx, R.layout.contentsharing_atom_list_row, feedEntryList);
    		this.feedEntryList = feedEntryList;
    		this.context = ctx;
    	}

    	public int getCount() {
    		return feedEntryList.size();
    	}

    	public FeedEntry getItem(int position) {
    		return feedEntryList.get(position);
    	}

    	public long getItemId(int position) {
    		return feedEntryList.get(position).hashCode();
    	}

    	public View getView(int position, View convertView, ViewGroup parent) {
    		View v = convertView;

    		FeedEntryHolder holder = new FeedEntryHolder();

    		// First let's verify the convertView is not null
    		if (convertView == null) {
    			// This a new view we inflate the new layout
    			LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    			v = inflater.inflate(R.layout.contentsharing_atom_list_row, null);
    			// Now we can fill the layout with the right values
    			TextView titleAtom = (TextView) v.findViewById(R.id.titleAtomRow);
    			TextView dateAtom = (TextView) v.findViewById(R.id.dateAtomRow);

    			holder.title = titleAtom;
    			holder.date = dateAtom;

    			v.setTag(holder);
    		}
    		else 
    			holder = (FeedEntryHolder) v.getTag();

    		FeedEntry p = feedEntryList.get(position);
    		holder.title.setText(p.getTitle());
    		holder.date.setText("" + p.getDate());

    		return v;
    	}

    	class FeedEntryHolder {
    		public TextView title;
    		public TextView date;
    	}
    }
    
    public class CustomListAdapter extends SimpleCursorAdapter{
    	
    	private LayoutInflater mInflater;
		private Cursor cur;
		private final static int WIDTH=200;
		private final static int HEIGHT=200;

		public CustomListAdapter(Context context, int layout, Cursor c,
				String[] from, int[] to) {
			super(context, layout, c, from, to);
			//this.layout = layout;
			this.mInflater=LayoutInflater.from(context);
			this.cur=c;
		}
		
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolder viewHolder;
			this.cur.moveToPosition(position);
			
			viewHolder = new ViewHolder();

			convertView = this.mInflater.inflate(R.layout.contentsharing_atom_list_row, null);
			if(convertView == null){
				convertView = this.mInflater.inflate(R.layout.contentsharing_empty_atom_list_row, null);
				convertView.setVisibility(View.GONE);
				convertView.setTag(viewHolder);
			}
	
			viewHolder.title = (TextView)convertView.findViewById(R.id.titleAtomRow);
			viewHolder.date = (TextView)convertView.findViewById(R.id.dateAtomRow);
			viewHolder.title.setText(this.cur.getString(this.cur.getColumnIndex(DataBaseSchema.EntrySchema.COLUMN_TITLE)));  
			viewHolder.date.setText(returnTimeDiff(this.cur.getDouble(this.cur.getColumnIndex(DataBaseSchema.EntrySchema.COLUMN_PUBDATE))));

			viewHolder = (ViewHolder) convertView.getTag();
			
			return convertView;
		}
    }
    
    class ViewHolder{
		ImageView img;
		TextView title;
		TextView description;
		TextView date;
		TextView pos;
	}
    /**
     * Function: returnTimeDiff
     * 
     * This function returns the time difference between 2 dates, in general between 2 updates of content
     * The return in a String which contains the number of minutes/hours/days since the previous update
     * 
     * @param time
     * @return String
     */
    private final String returnTimeDiff(double time){
		Date actualTime= new Date();

		double diff=actualTime.getTime()-time;
		int diff1=(int) (diff/1000);
		if (diff1<MINUTE){
			return("1 minute ago");
		}
		else if(diff1<HOUR){
			return((int)(diff1/60)+" minutes ago");
		}
		else if (diff1<DAY){
			return((int)(diff1/60/60)+" hours ago");
		}
		else if (diff1<WEEK){
			return((int)(diff1/60/60/24)+" days ago");
		}
		return("More than one week ago");
	}

    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.contentsharing, menu);
	}
	
    public boolean onOptionsItemSelected(MenuItem item) {
    	switch (item.getItemId()) {
    		case R.id.menu_alert_refresh_feed:

    			if(feedSyncInfra.address!=null){	
    				customAdapter = new CustomListAdapter(getActivity(),
    						R.layout.contentsharing_atom_list_row,feedSyncInfra.getCursorEntries(feedSyncInfra.getCursorFeedId("News")),
    						new String[] {feedSyncInfra.getDbColumnTitle(),feedSyncInfra.getDbColumnAuthorName(), feedSyncInfra.getDbColumnRead() },
    						new int[]{R.id.titleAtomRow,R.id.dateAtomRow, R.id.row_container}); 
    	        	
    	        	new LoadingFeedTask(feedSyncInfra,this).execute(feedSyncInfra,simpleListView,customAdapter,mActivity.npContent,mActivity.npComment);  
    			}
    			
    			break;

    	}
    	return super.onOptionsItemSelected(item);
 	}
    
    /**

     * Function to sync and update data in listview after get data from content server
     */
    public void asyncComplete(boolean success){
    	if(feedSyncInfra!=null){
	    	if(feedSyncInfra.getMode() == FeedSyncInfra.INFRA){
		    	customAdapter = new CustomListAdapter(getActivity(),
						R.layout.contentsharing_atom_list_row,feedSyncInfra.getCursorEntries(feedSyncInfra.getCursorFeedId("News")),
						new String[] {feedSyncInfra.getDbColumnTitle(),feedSyncInfra.getDbColumnAuthorName(), feedSyncInfra.getDbColumnRead() },
						new int[]{R.id.titleAtomRow,R.id.dateAtomRow, R.id.row_container});
		    	
		    	simpleListView.setAdapter(customAdapter);
		    	customAdapter.notifyDataSetChanged();
	    	}
    	}
    }
    
    /**
     * Function: webSync
     * 
     * When the MainActivity receive a message(update/new data of the feed SMS) in the websocket,
     * this function is called and the data has been updated in the phone database and in the listview 
     * 
     * @param success
     */
    public void webSync(boolean success){
    	Log.d(TAG,"webSync");
    	if(mDetailEntryFragment != null){
    		mDetailEntryFragment.asyncWebsocket(success);
    	}
    }
}
