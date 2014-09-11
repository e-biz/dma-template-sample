package mobi.designmyapp.template.sample.contentsharing;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
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

import com.thales.feedsync.content.ItemListSync;
import com.thales.feedsync.format.atom.DefaultAtomEntry;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mobi.designmyapp.template.sample.R;

/**
 * Class NewsFragment, type: Fragment(Fragment), implements AsyncDelegate(Delegate)
 * 
 * This fragment represents the news list to which the user is subscribed
 * 
 * @author flo
 *
 */
public class NewsFragment extends Fragment{
    private static final String TAG = "NewsFragment";

    /*** Date variables ***/
    public static final long MINUTE=60;
    public static final long HOUR=3600;
    public static final long DAY=24*HOUR;
    public static final long WEEK=7*DAY;

    /*** Fragment and FeedSync module ***/
    private SampleContentSharingActivity mActivity;
    private String newsAddress;
    BroadcastReceiver receiver;

    String feedTitle = "News";

    /*** List Adapter ***/
    public FeedEntryAdapter adapter;

    public ListView simpleListView;

    public void onCreate(Bundle savedInstanceState){
        Log.d(TAG,"onCreate");
        super.onCreate(savedInstanceState);

        setHasOptionsMenu(true);
        setHasOptionsMenu(true);
        mActivity = (SampleContentSharingActivity) getActivity();
        newsAddress = mActivity.mServerAddress+"/feedsync/rest/myfeeds/1/entries";

        feedTitle = "News";
    }

    public void onResume(){
        Log.d(TAG,"onResume");
        super.onResume();
        setHasOptionsMenu(true);
        mActivity = (SampleContentSharingActivity) getActivity();
        mActivity.getActionBar().setTitle("News");
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        IntentFilter filter = new IntentFilter();
        filter.addAction("UPDATE");

        //Register the receiver to get the update from the server
        mActivity.registerReceiver(receiver, filter);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.contentsharing_fragment_stream_with_simple_listview, null);

        simpleListView = (ListView)v.findViewById(R.id.listViewSimple);
        List<DefaultAtomEntry> mList = mActivity.mApiClient.getListEntriesChronological(feedTitle);
        ArrayList<DefaultAtomEntry> mArrayList = new ArrayList<DefaultAtomEntry>();
        mArrayList.addAll(mList);

        //If the database is empty, we get the entries from the server
        if(!mArrayList.isEmpty()){
            adapter = new FeedEntryAdapter(mArrayList, mActivity.context);
            simpleListView.setAdapter(adapter);
        }else{
            mActivity.mApiClient.getRequestEntries(newsAddress, -1);
        }

        //When we select an entry, we open a new detail fragment of this entry, at first we get the entry and passe it in argument
        simpleListView.setOnItemClickListener(new OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
                                    long arg3) {
                DefaultAtomEntry mEntry = mActivity.mApiClient.getEntry(feedTitle,arg2);
                // TODO Auto-generated method stub
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

                ItemListSync iLD = new ItemListSync();
                iLD.setTitleDialog(mEntry.getTitle());
                iLD.setDescriptionDialog(mEntry.getSummary());
                iLD.setDateDialog(mEntry.getPublished().toGMTString());
                iLD.setContentDialog(mEntry.getContent());
                iLD.setPositionDialog(arg2);
                Bundle extras = new Bundle();
                extras.putParcelable(SampleContentSharingActivity.EXTRA_ITEM, iLD);

                DetailNewsFragment mDetailNewsFragment = new DetailNewsFragment();
                mDetailNewsFragment.setArguments(extras);

                getActivity().getSupportFragmentManager().beginTransaction()
                        .replace(R.id.main_frame, mDetailNewsFragment,"detailnews")
                        .addToBackStack("detailnews")
                        .commit();
            }
        });

        //The receiver to update the list if we receive a message in an intent
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if(action.equals("UPDATE")){
                    if(intent.getStringExtra("messageTitle")!=null){
                        if(intent.getStringExtra("messageTitle").equals("News")){
                            syncComplete(true);
                        }
                    }else if(intent.getStringExtra("message")!=null){
                        if( intent.getStringExtra("message").equals("put")){
                            syncComplete(true);
                        }
                    }
                }
            }
        };

        return v;
    }

    public void onPause(){
        super.onPause();
        mActivity.unregisterReceiver(receiver);
    }

    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        menu.clear();
        inflater.inflate(R.menu.contentsharing, menu);
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_alert_refresh_feed:
                mActivity.mApiClient.getRequestEntries(newsAddress, -1);
                break;

        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Function to sync and update data in listview after get data from content server
     */
    public void syncComplete(boolean success){
        Log.d(TAG,"syncComplete");
        List<DefaultAtomEntry> mList = mActivity.mApiClient.getListEntriesChronological(feedTitle);
        ArrayList<DefaultAtomEntry> mArrayList = new ArrayList<DefaultAtomEntry>();
        mArrayList.addAll(mList);

        if(!mArrayList.isEmpty()){
            adapter = new FeedEntryAdapter(mArrayList, mActivity.context);
            simpleListView.setAdapter(adapter);
            adapter.notifyDataSetChanged();
        }
    }
}