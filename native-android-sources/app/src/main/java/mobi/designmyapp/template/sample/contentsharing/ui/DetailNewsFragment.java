package mobi.designmyapp.template.sample.contentsharing.ui;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Html;
import android.text.Html.ImageGetter;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebStorage;
import android.webkit.WebView;
import android.widget.BaseAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.thales.feedsync.module.network.infra.FeedSyncInfra;
import com.thales.feedsync.module.network.infra.websocketDelegate;

import org.module.widget.dialog.CommentListItem;
import org.module.widget.dialog.ItemListSyncDialog;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import mobi.designmyapp.template.sample.R;


/**
 * Class DetailNewsFragment, type: SherlockFragment(Fragment), implements websocketDelegate(Delegate)
 * 
 * This fragment represents the detail view of the News Fragment, it is the detail of a news 
 * with the whole content and the comments associated, the user can add a comment to this news with a simple button on the top right
 * If he clicks on it, the fragment AddCommentFragment will be launched
 * 
 * @author flo
 *
 */
public class DetailNewsFragment extends Fragment implements websocketDelegate{
	private static final String TAG ="DetailNewsFragment";
	
	/*** Date variables ***/
	
	/*** UI variables ***/
	ListView listViewComment;
	
	/*** Others variables ***/
	private ItemListSyncDialog iLD;
	private String titleExtras;
	private String descriptionExtras;
	private String dateExtras;
	private String contentExtras;
	private int positionExtras;
	
	public long idEntry;
	
	private List<CommentListItem> commentsList;
	
	/*** UI notifications ***/
	
	/*** List Adapter ***/
	private CommentListFragmentAdapter mCLA;
	
	/*** Adhoc ***/
	
	/*** Fragment and FeedSync module ***/
	public SampleContentSharingActivity mActivity;
	private FeedSyncInfra syncFeedInfra;
	
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setHasOptionsMenu(true); 
	    Bundle arguments = getArguments();
	    mActivity = (SampleContentSharingActivity) getActivity();
	    syncFeedInfra = mActivity.feedSyncInfra; 
	    if (arguments == null)
	        Toast.makeText(getActivity(), "Arguments is NULL", Toast.LENGTH_LONG).show();
	    else
	    	{
			iLD = arguments.getParcelable(SampleContentSharingActivity.EXTRA_ITEM);
			titleExtras = iLD.getTitleDialog();
			descriptionExtras = iLD.getDescriptionDialog();
			dateExtras = iLD.getDateDialog();
			contentExtras = iLD.getContentDialog();
			positionExtras = iLD.getPositionDialog();
			
			Log.d("DetailEntryFragment","titleExtras: "+titleExtras);
			Log.d("DetailEntryFragment","dateExtras: "+dateExtras);
			Log.d("DetailEntryFragment","contentExtras: "+contentExtras);
			Log.d("DetailEntryFragment","descriptionExtras: "+descriptionExtras);
			
			idEntry = syncFeedInfra.getIdEntry(positionExtras,"News");
			
			Log.d("DetailEntryFragment","idEntry: "+idEntry);
		}
	}
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// Inflate the layout for this fragment
		View v = inflater.inflate(R.layout.contentsharing_fragment_detail_entry, null);
		
		
		final WebView webview = (WebView) v.findViewById(R.id.webViewDialog);
		 	webview.getSettings().setJavaScriptEnabled(true);
		
   		 // From http://alex.tapmania.org/2010/11/html5-cache-android-webview.html
   		 webview.setWebChromeClient(new WebChromeClient() {
   		      @Override
   		      public void onReachedMaxAppCacheSize(long spaceNeeded, long totalUsedQuota,
   		                   WebStorage.QuotaUpdater quotaUpdater)
   		      {
   		            quotaUpdater.updateQuota(spaceNeeded * 2);
   		      }
   		});
		 
   		 webview.getSettings().setDomStorageEnabled(true);
   		// Set cache size to 64 mb by default. should be more than enough
   		 webview.getSettings().setAppCacheMaxSize(1024*1024*64);
   		// This next one is crazy. It's the DEFAULT location for your app's cache
   		// But it didn't work for me without this line
   		 webview.getSettings().setAppCachePath("/data/data/fr.anr.crowd/cache");
   		 webview.getSettings().setAllowFileAccess(true);
   		 webview.getSettings().setAppCacheEnabled(true);
   		 webview.setBackgroundColor(0x00000000);
   		 String message ="<font color='black'>"+descriptionExtras+"</font>";
   		 //String message =contentExtras;
   		 webview.loadData(message, "text/html", "utf8");
   		 //webview.loadData(message, "text", "utf8");

        //TextView descriptionTV = (TextView) v.findViewById(R.id.descriptionDialog);
        TextView dateTV = (TextView) v.findViewById(R.id.dateDialog);
        listViewComment = (ListView) v.findViewById(R.id.listDialog);
        //descriptionTV.setText(descriptionExtras);
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM HH:mm");
        Date date = new Date(dateExtras);
        String newFormat = sdf.format(date);
        dateTV.setText(newFormat);
        
		commentsList = syncFeedInfra.getCommentsList(positionExtras,"News");
		Log.d(SampleContentSharingActivity.TAG,"comments size: "+commentsList.size());
		
		mCLA = new CommentListFragmentAdapter(getActivity().getApplicationContext(), commentsList);
        listViewComment.setAdapter(mCLA);
        setListViewHeightBasedOnChildren(listViewComment);
        mCLA.notifyDataSetChanged();
        
        /*Intent mIntentComment = new Intent(getBaseContext(), AddCommentActivity.class);
                	Log.d(TAG,"id: "+idEntry);
                	mIntentComment.putExtra("id", idEntry);*/
        
        /**
         * If the user clicks on an item like a comment, the activity will be launched for a preview of the content
         * The user can see a better view of the comments especially for the photo added to the comment
         */
//        listViewComment.setOnItemClickListener(new OnItemClickListener() {
//
//			@Override
//			public void onItemClick(AdapterView<?> parent, View arg1, int position,
//					long arg3) {
//				CommentListItem mCommentListItem = (CommentListItem) parent.getAdapter().getItem(position);
//				Intent myIntent = new Intent(mActivity, PreviewNewsCommentActivity.class);
//				Bundle extras = new Bundle();
//				extras.putString(PreviewNewsCommentActivity.EXTRA_COMMENT, mCommentListItem.getComments());
//				myIntent.putExtras(extras);
//				startActivity(myIntent);
//			}
//
//		});
		
        return v;
	}
	
	public void onResume(){
		super.onResume();
		mActivity = (SampleContentSharingActivity) getActivity();
		mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
	}
	
	public static void setListViewHeightBasedOnChildren(ListView listView) {
		ListAdapter listAdapter = listView.getAdapter(); 
        if (listAdapter == null) {
            // pre-condition
            return;
        }

        int totalHeight = 0;
        for (int i = 0; i < listAdapter.getCount(); i++) {
            View listItem = listAdapter.getView(i, null, listView);
            listItem.measure(0, 0);
            totalHeight += listItem.getMeasuredHeight();
        }

        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        listView.setLayoutParams(params);
	}
	
	private class CommentListFragmentAdapter extends BaseAdapter {

		List<CommentListItem> listItem;
		LayoutInflater inflater;
		private Context context;
		private static final String TAG ="CommentListFragmentAdapter";
		
		public CommentListFragmentAdapter(Context context,List<CommentListItem> listItem) {
			inflater = LayoutInflater.from(context);
			this.listItem = listItem;
			this.context = context;
		}
		
		@Override
		public int getCount() {
			return listItem.size();
		}

		@Override
		public Object getItem(int position) {
			return listItem.get(position);
		}

		@Override
		public long getItemId(int position) {
			return position;
		}
		
		private class ViewHolderComment{
			TextView author;
			TextView comments;
			TextView summary;
			TextView date;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolderComment holder = new ViewHolderComment();
			
			if(convertView == null) {
				holder = new ViewHolderComment();
				LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
				//convertView = inflater.inflate(R.layout.listview_comment_item, null);
				convertView = inflater.inflate(R.layout.contentsharing_listview_comment_item, null);
				holder.author = (TextView)convertView.findViewById(R.id.textViewCommentAuthorDialog);
				holder.summary =  (TextView)convertView.findViewById(R.id.textViewCommentSummaryDialog);
				holder.comments = (TextView)convertView.findViewById(R.id.textViewCommentContentDialog);
				holder.date = (TextView)convertView.findViewById(R.id.textViewCommentDateDialog);
				convertView.setTag(holder);
			}
			
			holder.author.setText(listItem.get(position).getAuthor());
			holder.comments.setText(listItem.get(position).getComments());
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM HH:mm");
	        String newFormat = sdf.format(listItem.get(position).getDate());
			holder.date.setText(newFormat);
			if(!listItem.get(position).getSummary().contains("TEXT")){
				if(listItem.get(position).getSummary().contains("IMG")){
					holder.summary.setText(listItem.get(position).getSummary().split("///IMG")[0]);
				}else{
					holder.summary.setText(listItem.get(position).getSummary());
				}
			}
			holder.comments.setText(Html.fromHtml(listItem.get(position).getComments(), imgGetter, null));
			
			return convertView;
		}
		
		 private ImageGetter imgGetter = new ImageGetter() {

			 /*public Drawable getDrawable(String source) {
	             Drawable drawable = null;
	             drawable = Drawable.createFromPath(source);  // Or fetch it from the URL
	             // Important
	             
	             Bitmap bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), Config.ARGB_8888);
	             Canvas canvas = new Canvas(bitmap); 
	             drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
	             drawable.draw(canvas);
	             
	             int width =  bitmap.getWidth();
	             int height = bitmap.getHeight();

	             float scaleWidth;
	             float scaleHeight;

	             // calculate the scale 

	             scaleWidth = ((float) drawable.getIntrinsicWidth()) / width;
	             scaleHeight = ((float) drawable.getIntrinsicHeight()) / height;

	             // create a matrix for the manipulation
	             Matrix matrix = new Matrix();
	             // resize the bit map
	             matrix.postScale(scaleWidth, scaleHeight);
	             if(height<width)
	            	 matrix.postRotate(90);

	             // recreate the new Bitmap
	             // make a Drawable from Bitmap to allow to set the BitMap
	             // to the ImageView, ImageButton or what ever
	             BitmapDrawable bmd = new BitmapDrawable(Bitmap.createBitmap(bitmap, 0, 0,
	            		 width, height, matrix, true));
	             bitmap.recycle();
	             
	             drawable.setBounds(0, 0, drawable.getIntrinsicWidth(), drawable
	                           .getIntrinsicHeight());
	             
	             Drawable d = new BitmapDrawable(getResources(),bitmap);
	             
	             //return drawable;
	             return d;
	       }*/
			 public Drawable getDrawable(String source) {
				 
				 
	             Drawable drawable = null;
	             if(source.contains("http")){
	            	 InputStream is = null;
					try {
						is = (InputStream) new URL(source).getContent();
					} catch (MalformedURLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	            	 drawable = Drawable.createFromStream(is, "src name");
	            	 Log.d(TAG,"From WEB");
	             }else{
	            	 drawable = Drawable.createFromPath(source);  // Or fetch it from the URL
	            	 Log.d(TAG,"From Local");
	             }

	            
	             // Important
//	             Log.d(TAG,"source: "+source);
//	             byte[] data = Base64.decode(source, Base64.DEFAULT);
//	             Bitmap bitmap = BitmapFactory.decodeByteArray(data , 0, data.length);
//	             Log.d(TAG,"bitmap.getHeight(): "+bitmap.getHeight());
//	             Log.d(TAG,"bitmap.getWidth(): "+bitmap.getWidth());
	             //drawable = new BitmapDrawable(Bitmap.createScaledBitmap(bitmap, 200, 200, false));
//	             drawable = new BitmapDrawable(bitmap);
	             if(drawable == null){
	            	 drawable = getResources().getDrawable(android.R.drawable.ic_menu_report_image);
	             }
	             
	             drawable.setBounds(0, 0, 200, 200);
//	             drawable.setBounds(0, 0, drawable.getIntrinsicWidth(), drawable
//	                     .getIntrinsicHeight());
	             return drawable;
	       }
		 };
	}
	
	public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
		menu.clear();
		inflater.inflate(R.menu.contentsharingdetailentry, menu);
	}
	
	public boolean onOptionsItemSelected(MenuItem item) {
	    	switch (item.getItemId()) {
	    	
	    		case R.id.add_comment:
	    			Bundle extras = new Bundle();
					extras.putLong(SampleContentSharingActivity.EXTRA_COMMENT, idEntry);
	    			
					/*Intent mIntentComment = new Intent(getActivity().getBaseContext(), AddCommentActivity.class);
                	mIntentComment.putExtra(MainActivity.EXTRA_COMMENT, idEntry);
                	startActivity(mIntentComment);*/
					
					AddCommentFragment mAddCommentFragment = new AddCommentFragment();
					mAddCommentFragment.setArguments(extras);
					
					getActivity().getSupportFragmentManager().beginTransaction()
					.replace(R.id.main_frame, mAddCommentFragment)
					.addToBackStack(null)
					.commit();

                    break;
					
	    	}
	    	return super.onOptionsItemSelected(item);
	 }
	 
	 /**
	  * Function asyncWebsocket(boolean success)
	  * The delegate will notify the fragment, the database has updated so it gets the new data,
	  * and update the listview, scroll to down to show the last message
	  * 
	  * @param success
	  */
	 public void asyncWebsocket(boolean success){
			Log.d(TAG,"asyncWebsocket");
			Log.d(SampleContentSharingActivity.TAG,"positionExtras: "+positionExtras);
			Log.d(SampleContentSharingActivity.TAG,"descriptionExtras: "+descriptionExtras);
			commentsList = syncFeedInfra.getCommentsList(positionExtras,"News");
			
			Log.d(SampleContentSharingActivity.TAG,"comments size: "+commentsList.size());
			
			mCLA = new CommentListFragmentAdapter(mActivity, commentsList);
	        listViewComment.setAdapter(mCLA);
	        setListViewHeightBasedOnChildren(listViewComment);
	        mCLA.notifyDataSetChanged();
	        /*listViewSMS.post( new Runnable	() {
	            @Override
	            public void run() {
	            	mScrollViewSMS.fullScroll(View.FOCUS_DOWN);
	            }
	          });*/
	 }
}