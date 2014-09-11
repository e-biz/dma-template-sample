package mobi.designmyapp.template.sample.contentsharing;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
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

import com.thales.feedsync.content.CommentListItem;
import com.thales.feedsync.content.ItemListSync;

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
 * <p/>
 * This fragment represents the detail view of the News Fragment, it is the detail of a news
 * with the whole content and the comments associated, the user can add a comment to this news with a simple button on the top right
 * If he clicks on it, the fragment AddCommentFragment will be launched
 *
 * @author flo
 */
public class DetailNewsFragment extends Fragment{
    private static final String TAG = "DetailNewsFragment";

    /*** Date variables ***/

    /**
     * UI variables **
     */
    ListView listViewComment;

    /**
     * Others variables **
     */
    private ItemListSync iLD;
    private String titleExtras;
    private String descriptionExtras;
    private String dateExtras;
    private String contentExtras;
    private int positionExtras;
    private String addressToPost;

    public long idEntry;

    private List<CommentListItem> commentsList;

    /**
     * UI notifications **
     */
    BroadcastReceiver receiver;

    /**
     * List Adapter **
     */
    private CommentListFragmentAdapter mCLA;

    /*** Adhoc ***/

    /**
     * Fragment and FeedSync module **
     */
    public SampleContentSharingActivity mActivity;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        Bundle arguments = getArguments();
        mActivity = (SampleContentSharingActivity) getActivity();
        if (arguments == null)
            Toast.makeText(getActivity(), "Arguments is NULL", Toast.LENGTH_LONG).show();
        else {
            iLD = arguments.getParcelable(SampleContentSharingActivity.EXTRA_ITEM);
            titleExtras = iLD.getTitleDialog();
            descriptionExtras = iLD.getDescriptionDialog();
            dateExtras = iLD.getDateDialog();
            contentExtras = iLD.getContentDialog();
            positionExtras = iLD.getPositionDialog();

            idEntry = mActivity.mApiClient.getEntry("News", positionExtras).getId();

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
                                                 WebStorage.QuotaUpdater quotaUpdater) {
                quotaUpdater.updateQuota(spaceNeeded * 2);
            }
        });

        webview.getSettings().setDomStorageEnabled(true);
        // Set cache size to 64 mb by default. should be more than enough
        webview.getSettings().setAppCacheMaxSize(1024 * 1024 * 64);
        // This next one is crazy. It's the DEFAULT location for your app's cache
        // But it didn't work for me without this line
        webview.getSettings().setAppCachePath("/data/data/fr.anr.crowd/cache");
        webview.getSettings().setAllowFileAccess(true);
        webview.getSettings().setAppCacheEnabled(true);
        webview.setBackgroundColor(0x00000000);
        String message = "<font color='black'>" + descriptionExtras + "</font>";
        webview.loadData(message, "text/html", "utf8");
        TextView dateTV = (TextView) v.findViewById(R.id.dateDialog);
        listViewComment = (ListView) v.findViewById(R.id.listDialog);
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM HH:mm");
        Date date = new Date(dateExtras);
        String newFormat = sdf.format(date);
        dateTV.setText(newFormat);

        commentsList = mActivity.mApiClient.getCommentsList(positionExtras, "News");
        Log.d(SampleContentSharingActivity.TAG, "comments size: " + commentsList.size());

        mCLA = new CommentListFragmentAdapter(getActivity().getApplicationContext(), commentsList);
        listViewComment.setAdapter(mCLA);
        setListViewHeightBasedOnChildren(listViewComment);
        mCLA.notifyDataSetChanged();

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

        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (action.equals("UPDATE")) {
                    if (intent.getStringExtra("messageTitle") != null) {
                        if (intent.getStringExtra("messageTitle").equals("News")) {
                            syncWebsocket(true);
                        }
                    } else if (intent.getStringExtra("message") != null) {
                        if (intent.getStringExtra("message").equals("put")) {
                            syncWebsocket(true);
                        } else if (intent.getStringExtra("message").equals("post")) {
                            syncWebsocket(true);
                        }
                    }
                }
            }
        };

        return v;
    }

    public void onResume() {
        super.onResume();
        mActivity = (SampleContentSharingActivity) getActivity();
        mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        IntentFilter filter = new IntentFilter();
        filter.addAction("UPDATE");

        mActivity.registerReceiver(receiver, filter);
    }

    public void onPause() {
        super.onPause();
        mActivity.unregisterReceiver(receiver);
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
        private static final String TAG = "CommentListFragmentAdapter";

        public CommentListFragmentAdapter(Context context, List<CommentListItem> listItem) {
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

        private class ViewHolderComment {
            TextView author;
            TextView comments;
            TextView summary;
            TextView date;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolderComment holder = new ViewHolderComment();

            if (convertView == null) {
                holder = new ViewHolderComment();
                LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                //convertView = inflater.inflate(R.layout.listview_comment_item, null);
                convertView = inflater.inflate(R.layout.contentsharing_listview_comment_item, null);
                holder.author = (TextView) convertView.findViewById(R.id.textViewCommentAuthorDialog);
                holder.summary = (TextView) convertView.findViewById(R.id.textViewCommentSummaryDialog);
                holder.comments = (TextView) convertView.findViewById(R.id.textViewCommentContentDialog);
                holder.date = (TextView) convertView.findViewById(R.id.textViewCommentDateDialog);
                convertView.setTag(holder);
            }

            holder.author.setText(listItem.get(position).getAuthor());
            holder.comments.setText(listItem.get(position).getComments());
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM HH:mm");
            String newFormat = sdf.format(listItem.get(position).getDate());
            holder.date.setText(newFormat);
            if (!listItem.get(position).getSummary().contains("TEXT")) {
                if (listItem.get(position).getSummary().contains("IMG")) {
                    holder.summary.setText(listItem.get(position).getSummary().split("///IMG")[0]);
                } else {
                    holder.summary.setText(listItem.get(position).getSummary());
                }
            }

            Log.d(TAG, "listItem.get(position).getComments() " + listItem.get(position).getComments());


            holder.comments.setText(Html.fromHtml(listItem.get(position).getComments(), imgGetter, null));

            return convertView;
        }

        public ImageGetter imgGetter = new ImageGetter() {
            public Drawable getDrawable(String source) {

                Drawable drawable = null;
                if (source.contains("http")) {
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
                    Log.d(TAG, "From WEB");
                } else {
                    drawable = Drawable.createFromPath(source);  // Or fetch it from the URL
                    Log.d(TAG, "From Local");
                }

                if (drawable == null) {
                    drawable = getResources().getDrawable(android.R.drawable.ic_menu_report_image);
                }

                drawable.setBounds(0, 0, 200, 200);

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
            case android.R.id.home:
                FragmentManager fm = getActivity().getSupportFragmentManager();
                FragmentTransaction ft = fm.beginTransaction();
                DetailNewsFragment detailFragment = this;
                ft.remove(detailFragment);
                ft.commit();
                fm.popBackStack();
                break;

            case R.id.add_comment:
                Bundle extras = new Bundle();
                extras.putLong(SampleContentSharingActivity.EXTRA_COMMENT, idEntry);
                extras.putString(SampleContentSharingActivity.ADDRESS_TO_POST, addressToPost);

                AddCommentFragment mAddCommentFragment = new AddCommentFragment();
                mAddCommentFragment.setArguments(extras);

                getActivity().getSupportFragmentManager().beginTransaction()
                        .replace(R.id.main_frame, mAddCommentFragment)
                        .addToBackStack(null)
                        .commit();

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
    public void syncWebsocket(boolean success) {
        Log.d(TAG, "syncWebsocket");
        Log.d(SampleContentSharingActivity.TAG, "positionExtras: " + positionExtras);
        Log.d(SampleContentSharingActivity.TAG, "descriptionExtras: " + descriptionExtras);
        commentsList = mActivity.mApiClient.getCommentsList(positionExtras, "News");
        Log.d(SampleContentSharingActivity.TAG, "comments size: " + commentsList.size());
        mCLA = new CommentListFragmentAdapter(mActivity, commentsList);
        listViewComment.setAdapter(mCLA);
        setListViewHeightBasedOnChildren(listViewComment);
        mCLA.notifyDataSetChanged();
    }
}
