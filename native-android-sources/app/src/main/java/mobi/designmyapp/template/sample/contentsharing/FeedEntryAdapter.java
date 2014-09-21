package mobi.designmyapp.template.sample.contentsharing;

import java.util.ArrayList;
import java.util.Date;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.thales.feedsync.format.atom.DefaultAtomEntry;

import mobi.designmyapp.template.sample.R;

/**
 * <p>
 * This class implements an ArrayAdapter of DefaultAtomEntry </br>
 * This adapter has been implemented to show in a listview all entries of a specific feed, </br>
 * Each item is composed by the title of the entry and his date
 * </p>
 * 
 * @author Florian COSNIER
 *
 */
public class FeedEntryAdapter extends ArrayAdapter<DefaultAtomEntry>{
	private ArrayList<DefaultAtomEntry> feedEntryList;
	private Context context;
	
	/*** Date variables ***/
	public static final long MINUTE=60;
	public static final long HOUR=3600;
	public static final long DAY=24*HOUR;
	public static final long WEEK=7*DAY;

	public FeedEntryAdapter(ArrayList<DefaultAtomEntry> feedEntryList, Context context) {
		super(context, R.layout.contentsharing_atom_list_row, feedEntryList);
		this.feedEntryList = feedEntryList;
		this.context = context;
	}

	public int getCount() {
		return feedEntryList.size();
	}

	public DefaultAtomEntry getItem(int position) {
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

		DefaultAtomEntry p = feedEntryList.get(position);
		holder.title.setText(p.getTitle());
		holder.date.setText(returnTimeDiff(p.getPublished().getTime()));

		return v;
	}

	class FeedEntryHolder {
		public TextView title;
		public TextView date;
		public ImageView img;
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
}
