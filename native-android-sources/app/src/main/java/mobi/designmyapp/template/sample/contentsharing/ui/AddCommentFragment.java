package mobi.designmyapp.template.sample.contentsharing.ui;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.RemoteException;
import android.provider.MediaStore;
import android.provider.Settings.Secure;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.thales.feedsync.module.database.DataBaseAdapter;
import com.thales.feedsync.module.database.DataBaseSchema;
import com.thales.feedsync.module.network.infra.EntryToSync;
import com.thales.feedsync.module.network.infra.FeedSyncInfra;
import com.thales.feedsync.module.protocol.atom.AtomCategory;
import com.thales.feedsync.module.protocol.atom.AtomPerson;
import com.thales.feedsync.module.protocol.atom.DefaultAtomCategory;
import com.thales.feedsync.module.protocol.atom.DefaultAtomEnclosure;
import com.thales.feedsync.module.protocol.atom.DefaultAtomEntry;
import com.thales.feedsync.module.protocol.atom.DefaultAtomFeed;
import com.thales.feedsync.module.protocol.atom.DefaultAtomLink;
import com.thales.feedsync.module.protocol.atom.DefaultAtomPerson;
import com.thales.feedsync.module.sync.infra.ServerDialog;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mobi.designmyapp.template.sample.R;

@SuppressLint("NewApi")
/**
 * Class AddCommentFragment, type: Fragment(Fragment)
 * 
 * This fragment lets the user to add a comment to a news, he can write some texts and add a photo
 * 
 * @author flo
 *
 */
public class AddCommentFragment extends Fragment {
	private static final String TAG = "AddCommentFragment";
	
	/*** UI variables ***/
	private ImageView img;
	
	/*** Others variables ***/
	public long idEntry;
	
	static final int ATOM_CREATE_COMMENT=99;
	protected static final int SELECT_IMAGE = 15;
	protected static final int CAMERA = 18;
	
	private String cameraPhotoPath;
	private String mCurrentPhotoPath;
	private DataBaseAdapter mDba; 
	DefaultAtomEnclosure enc;
	private DefaultAtomFeed comFeed;
	DefaultAtomEntry newEntry;
	
	String Base64Bitmap;
	
	/*** Fragments and FeedSync module ***/
	SampleContentSharingActivity mainActivity;
	
	public FeedSyncInfra syncFeedInfra;
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    
	    mainActivity = (SampleContentSharingActivity) getActivity();
	    syncFeedInfra = mainActivity.feedSyncInfra;
	    mDba = syncFeedInfra.getdBa();

	    Bundle arguments = getArguments(); 
	    
	    if (arguments == null)
	        Toast.makeText(getActivity(), "Arguments is NULL", Toast.LENGTH_LONG).show();
	    else
	    	{
	    	idEntry=arguments.getLong(SampleContentSharingActivity.EXTRA_COMMENT);
	    	Log.d(TAG,"id: "+idEntry);
		}
	    
	    Cursor cur=mDba.mDb.query(DataBaseSchema.EntrySchema.TABLE_NAME, new String[]{DataBaseSchema.EntrySchema.COLUMN_FEED_ID}, DataBaseSchema.EntrySchema._ID+"=?", new String[]{String.valueOf(idEntry)}, null, null, null);
		cur.moveToFirst();
		cur.close();

	}
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// Inflate the layout for this fragment
		View v = inflater.inflate(R.layout.contentsharing_add_comment, null);
		
		final EditText editUser=(EditText)v.findViewById(R.id.comment_user);
		
		if(!mainActivity.mUser.isEmpty()){
			editUser.setText(mainActivity.mUser);
		}
		
		final EditText editComment=(EditText)v.findViewById(R.id.comment_body);
			
		Button submitComment=(Button) v.findViewById(R.id.add_comment_activity);
		submitComment.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				try {
					// add the comment locally and upload it in the server if the WIFI is Infrastructure
					addComment(editUser.getText().toString(),editComment.getText().toString(),idEntry);
				
					//if it is ADHOC send the message in broadcast

				}catch (RemoteException e) {
					Log.e(TAG,"RemoteException!!!!!");
					e.printStackTrace();
				}
			}
		});
		
		Button add_pic=(Button) v.findViewById(R.id.select_pics);
		add_pic.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
				startActivityForResult(intent, SELECT_IMAGE);

			}
		});
		
		Button camera=(Button) v.findViewById(R.id.camera);
		camera.setOnClickListener(new OnClickListener(){
			public void onClick(View v)	{ 
//				Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
//				intent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, Uri.fromFile(new File("/sdcard/download/tmp")));
//				startActivityForResult(intent, CAMERA);
				File f = null;
				
				try {
					f = setUpPhotoFile();
					mCurrentPhotoPath = f.getAbsolutePath();
					Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
					intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(f));
					startActivityForResult(intent, CAMERA);
				} catch (IOException e) {
					e.printStackTrace();
					f = null;
					mCurrentPhotoPath = null;
				}
			}
		});	
		
		img=(ImageView) v.findViewById(R.id.added_img);
		
        return v;
	}
	
	/**
	 * Function addComment(String title,String comment, long referToId)
	 * 
	 * This function implements a thread in order to post data to the server
	 * The title corresponds to the author name(the user) and the comment is the content of the bubble
	 * Firstly, an entry is created, added to the database, post to the server
	 * 
	 * @param title
	 * @param comment
	 * @param referToId
	 * @throws android.os.RemoteException
	 */
	private void addComment(String title,String comment, long referToId) throws RemoteException{
		(new PostThread(title,comment,referToId)).execute(); 
	}
	
	class PostThread extends AsyncTask<Void, Void, Boolean>{


		long referToId;
		String title;
		String comment;
		int mode;
		Boolean showCrouton = false;

		PostThread(String title,String comment, long referToId){
			super();
			this.referToId=referToId;
			this.title=title;
			this.comment=comment;
		}

		@Override
		protected Boolean doInBackground(Void...params) {
			String android_id = Secure.getString(getActivity().getContentResolver(), Secure.ANDROID_ID); 

			mode=syncFeedInfra.getMode();

			if (android_id == null) { 
				Log.d(TAG,"NULL") ;
			} else { 

				if(!mDba.isOpen())
					mDba.open();

				Date date=new Date();
				//Timestamp time= new Timestamp(date.getTime());//unique timestamp of creation

				Log.d(TAG,"addComment("+referToId+")");

				DefaultAtomEntry entry=mDba.getEntry(referToId);
				
				Log.d(TAG,entry.toString());
				Log.d(TAG,entry.getEntryId());
				newEntry= new DefaultAtomEntry();
				List<AtomPerson> persons=new ArrayList<AtomPerson>();
				DefaultAtomPerson person=new DefaultAtomPerson();
				DefaultAtomCategory category = new DefaultAtomCategory();
				List<AtomCategory> categories = new ArrayList<AtomCategory>();

				person.setName(title);
				persons.add(person);

				if ( mCurrentPhotoPath!=null){
//					comment="<table><tr><th>"+comment+"           "+"</th><th><img src=\""+Base64Bitmap+"\"></th></tr></table>";
					newEntry.setContent("<img src=\""+mCurrentPhotoPath+"\">");
					newEntry.setSummary(comment+"///IMG");
					mCurrentPhotoPath = null;
				}else{
					newEntry.setContent(comment); 
					newEntry.setSummary("TEXT");
				}
//				
//				newEntry.setContent(comment); 
//				newEntry.setContent(mCurrentPhotoPath);
//				newEntry.setSummary(comment+"///IMG");
				newEntry.setTitle(title);
				newEntry.setAuthors(persons);
				newEntry.setReferTo(referToId);
				newEntry.setPublished(date);
				category.setLabel(new Date().toString());
				categories.add(category);
				newEntry.setEntryId(android_id+new Date());
				newEntry.setCategories(categories);
//				Log.d(TAG,"location: "+mainActivity.myLocation);
//				if(mainActivity.myLocation!=null && mainActivity.fakeLocation == false){
//					newEntry.setGeoPoint(mainActivity.myLocation.getLatitude(), mainActivity.myLocation.getLongitude());
//				}
//				else if(mainActivity.fakeLocation == true){
//					int random = (int)(Math.random() * 3);
//					switch (random){
//						case 0:
//							newEntry.setGeoPoint(47.158381,-1.600584); //NANTES AIRPORT
//							break;
//						case 1:
//							newEntry.setGeoPoint(47.217907,-1.540298); //NANTES RAILWAY STATION
//							break;
//						case 2:
//							newEntry.setGeoPoint(47.232581,-1.556348); //NANTES CITY HALL
//							break;
//					}	
//				}
				
				long commentId;
				Cursor cur=mDba.mDb.query(DataBaseSchema.FeedSchema.TABLE_NAME, new String[]{DataBaseSchema.FeedSchema._ID,DataBaseSchema.FeedSchema.COLUMN_URL}, DataBaseSchema.FeedSchema.COLUMN_REFER_TO_ENTRY+"=?",new String[]{String.valueOf(referToId)},null, null, null);
				if (cur.moveToFirst()){
					Log.d(TAG,cur.getString(cur.getColumnIndex(DataBaseSchema.FeedSchema._ID)));
					newEntry.setParentId(cur.getString(cur.getColumnIndex(DataBaseSchema.FeedSchema._ID)));
					commentId=mDba.insertEntry(mDba.mDb, newEntry,cur.getLong(cur.getColumnIndex(DataBaseSchema.FeedSchema._ID)), mode, 0);
					//newEntry.setEntryId(commentId+"");
				}
				//if the replies feed does not exist
				else{

					comFeed= new DefaultAtomFeed();
					comFeed.setFeedId(entry.getEntryId()+"/feed/atom");
					comFeed.setTitle(entry.getEntryId()+"/feed/atom");

					newEntry.setParentId(String.valueOf( mDba.insertFeed(mDba.mDb, comFeed, referToId)));

					DefaultAtomLink newLink = new DefaultAtomLink();
					newLink.setRel("replies");
					newLink.setHref(entry.getEntryId()+"/feed/atom");
					newLink.setType("application/atom+xml");

					newEntry.addLink(newLink);
					mDba.insertLink(mDba.mDb, newLink, referToId, mode);
					commentId= mDba.insertEntry(mDba.mDb, newEntry,Long.valueOf(newEntry.getParentId()), mode, 0);
				}

				//if i have a photo to add---> new enclosure		
				if(mode==DataBaseSchema.INFRA){
					String address=cur.getString(cur.getColumnIndex(DataBaseSchema.FeedSchema.COLUMN_URL));

					if(newEntry.getSummary().contains("IMG")){
						newEntry.setContent(Base64Bitmap);
						Log.d(TAG,"Address "+address);
						String[] splitMyAddress = address.split("myfeeds/");
						String mediaMyAddress = splitMyAddress[0]+"myfeeds/media/"+splitMyAddress[1];
						Log.d(TAG,"Address1 "+splitMyAddress[0]);
						Log.d(TAG,"Address2 "+splitMyAddress[1]);
						Log.d(TAG,"Address3 "+mediaMyAddress);
						
						address = mediaMyAddress;
						
						Log.d(TAG,"Address4 "+address);
					}
					
					Log.d(TAG,"Address5 "+address);
					if (newEntry.hasEnclosures()){
						int code=ServerDialog.executeHttpPostData(new File(cameraPhotoPath),address, newEntry,enc).getStatusLine().getStatusCode();
						if(code==201||code==204) {
							mDba.insertEnclosure(mDba.mDb,enc , commentId,DataBaseSchema.INFRA);
//							BftService.notifyFeedChanged();
						}
						else Log.d(TAG,"PROBLEM!!!!");
					}
					else{
						
						//// -> change address to media
						Log.d(TAG,"Address6 "+address);
						HttpResponse res = ServerDialog.executeHttpPostEntry(newEntry,address);
						if(res!=null) {
							//Crouton.makeText(getActivity(), "Comment added",Style.INFO).show();
//							BftService.notifyFeedChanged();
							showCrouton = true;
							String responseString;
							try {
								responseString = EntityUtils.toString(res.getEntity(), "UTF-8");
								Log.d(TAG,"responseString "+responseString);
								//mainActivity.mConnectionWS.sendTextMessage(responseString);
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							mainActivity.mListLongId.add(commentId);
							syncFeedInfra.entryToSync.add(new EntryToSync(address, newEntry));
							
							
							DefaultAtomEntry mEntry=syncFeedInfra.getdBa().getEntry(idEntry);
							Log.d(TAG,"date uptated: "+mEntry.getUpdated());
							Log.d(TAG,"date published: "+mEntry.getPublished());
							mEntry.setUpdated(new Date());
							Log.d(TAG,"date uptated: "+mEntry.getUpdated());
							
							int mode=syncFeedInfra.getMode();
							
							if(mode==DataBaseSchema.INFRA){
								String mAddress=syncFeedInfra.address;
								if(mAddress!=null){
									HttpResponse mRes = ServerDialog.executeHttpPutEntry(mEntry,mAddress);
									if(mRes!=null) {
										//Crouton.makeText(getActivity(), "Comment added",Style.INFO).show();
//											BftService.notifyFeedChanged();
										//showCrouton = true;
										
										ContentValues values = new ContentValues();
										values.put(DataBaseSchema.EntrySchema.COLUMN_PUBDATE,String.valueOf(new Date().getTime()));
//										values.put(DataBaseSchema.EntrySchema.COLUMN_LATITUDE,mainActivity.myLocation.getLatitude());
//										values.put(DataBaseSchema.EntrySchema.COLUMN_LONGITUDE,mainActivity.myLocation.getLongitude());
										syncFeedInfra.getdBa().updateEntry(syncFeedInfra.getdBa().mDb, values, mEntry.getId());	
									}
								}
							}
							
						}
						
					}
				}
				else{
					if (newEntry.hasEnclosures()){
						mDba.insertEnclosure(mDba.mDb,enc , commentId,DataBaseSchema.ADHOC);
					}
				}

				cur.close();
			}
			return null;
		}


		protected void onPreExecute() {
			Log.d(TAG,"dialog");
		}

		protected void onPostExecute(Boolean result) {
			FragmentManager fm = mainActivity.getSupportFragmentManager();
            
            fm.popBackStack();
		}
	}
	
	public Drawable rescaleImage(String imagePath, int newWidth, int newHeight){
		try{
			BitmapFactory.Options o = new BitmapFactory.Options();
			o.inJustDecodeBounds=true;

			//o.inSampleSize=4;

			if (imagePath!=null){
				BitmapFactory.decodeStream(new FileInputStream(imagePath),null,o);
			}

			//Find the correct scale value. It should be the power of 2.
			int width_tmp=o.outWidth, height_tmp=o.outHeight;
			int scale=1;
			while(true){
				if(width_tmp/2<newWidth || height_tmp/2<newHeight)
					break;
				width_tmp/=2;
				height_tmp/=2;
				scale*=2;
			}

			BitmapFactory.Options o2 = new BitmapFactory.Options();
			o2.inSampleSize=scale;

			// create a matrix for the manipulation
			Matrix matrix = new Matrix();
					// resize the bit map

			if(height_tmp<width_tmp)
				matrix.postRotate(90);

			// recreate the new Bitmap
			// make a Drawable from Bitmap to allow to set the BitMap
			// to the ImageView, ImageButton or what ever
			BitmapDrawable bmd = new BitmapDrawable(BitmapFactory.decodeStream(new FileInputStream(imagePath), null, o2));
			return bmd;

		} catch (FileNotFoundException e){
			Log.d(TAG,"File Not Found");
			return null;
		}
	}

	/**
	 * Depends on the user selection and the code result, 
	 * it launches the gallery or the camera to take to photo and add it to the comment as content
	 */
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);  
		Log.d(TAG,"onActivityResult()");

		if (resultCode == getActivity().RESULT_OK){

			if(requestCode == CAMERA) {
//				File fi = new File("/sdcard/Download/tmp");
//				Uri u = null;
//				try {
//					u = Uri.parse(android.provider.MediaStore.Images.Media.insertImage(getActivity().getContentResolver(), fi.getAbsolutePath(), null, null));
//					
//				} catch (FileNotFoundException e) {
//					e.printStackTrace();
//				}
//
//				if (!fi.delete()) {Log.i("From Camera intent", "Failed to delete " + fi);}
//				Log.i(TAG, "CAMERA uri = " + u);
//				cameraPhotoPath = getRealPathFromURI(u);
				Log.i(TAG, "CAMERA photo filepath = " + mCurrentPhotoPath);
				
				
				if (mCurrentPhotoPath != null) {
					setPic();
					galleryAddPic();
					encodeBase64BitmapString(mCurrentPhotoPath);
				}

			}

			if (requestCode == SELECT_IMAGE){
				if (resultCode == Activity.RESULT_OK) {
					Uri selectedImage = data.getData();
					mCurrentPhotoPath = getRealPathFromURI(selectedImage);
					Log.i(TAG, "Gallery photo filepath = " + mCurrentPhotoPath);
					img.setVisibility(View.VISIBLE);
					img.setBackgroundDrawable(rescaleImage(mCurrentPhotoPath,img.getWidth(),img.getHeight()));
				
					encodeBase64BitmapUri(selectedImage);
				} 
			}
		}
	}
	
	private File lastFile(File f){
		File[] files = f.listFiles();
		return files[files.length - 1];
	}
	
	private void encodeBase64BitmapUri(Uri selectedImage){
		BitmapDrawable bmp = null;
		try {
			bmp = new BitmapDrawable(decodeUri(selectedImage));
			ByteArrayOutputStream baos = new ByteArrayOutputStream();  
			bmp.getBitmap().compress(CompressFormat.PNG, 0 , baos); //bmp is the bitmap object   
			byte[] b = baos.toByteArray(); 
			Base64Bitmap = Base64.encodeToString(b, Base64.DEFAULT); 
			Log.d(TAG,"Base64Bitmap: "+Base64Bitmap);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void encodeBase64BitmapString(String selectedImage){
		BitmapDrawable bmp = null;
		try {
			bmp = new BitmapDrawable(decodeString(selectedImage));
			ByteArrayOutputStream baos = new ByteArrayOutputStream();  
			bmp.getBitmap().compress(CompressFormat.PNG, 0 , baos); //bmp is the bitmap object   
			byte[] b = baos.toByteArray(); 
			Base64Bitmap = Base64.encodeToString(b, Base64.DEFAULT); 
			Log.d(TAG,"Base64Bitmap: "+Base64Bitmap);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private Bitmap decodeString(String selectedImage) throws FileNotFoundException {
        BitmapFactory.Options o = new BitmapFactory.Options();
        o.inJustDecodeBounds = true;
        BitmapFactory.decodeStream(new FileInputStream(selectedImage), null, o);

        final int REQUIRED_SIZE = 70;

        int width_tmp = o.outWidth, height_tmp = o.outHeight;
        int scale = 1;
        while (true) {
            if (width_tmp / 2 < REQUIRED_SIZE || height_tmp / 2 < REQUIRED_SIZE) {
                break;
            }
            width_tmp /= 2;
            height_tmp /= 2;
            scale *= 2;
        }

        BitmapFactory.Options o2 = new BitmapFactory.Options();
        o2.inSampleSize = scale;
        return BitmapFactory.decodeStream(new FileInputStream(selectedImage), null, o2);
    }
	
	private Bitmap decodeUri(Uri selectedImage) throws FileNotFoundException {
        BitmapFactory.Options o = new BitmapFactory.Options();
        o.inJustDecodeBounds = true;
        BitmapFactory.decodeStream(
                mainActivity.getContentResolver().openInputStream(selectedImage), null, o);

        final int REQUIRED_SIZE = 100;

        int width_tmp = o.outWidth, height_tmp = o.outHeight;
        int scale = 1;
        while (true) {
            if (width_tmp / 2 < REQUIRED_SIZE || height_tmp / 2 < REQUIRED_SIZE) {
                break;
            }
            width_tmp /= 2;
            height_tmp /= 2;
            scale *= 2;
        }

        BitmapFactory.Options o2 = new BitmapFactory.Options();
        o2.inSampleSize = scale;
        return BitmapFactory.decodeStream(
        		mainActivity.getContentResolver().openInputStream(selectedImage), null, o2);
    }
	
	
	public String getRealPathFromURI(Uri contentUri) {
		//String[] proj = { MediaStore.Images.Media.DATA};
		String[] proj = {};
		Cursor cursor = getActivity().managedQuery(contentUri, proj, null, null, null);

		int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
//		int column_index = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATA);
		cursor.moveToFirst();

		return cursor.getString(column_index);
	}
	
	
	private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
            imageFileName,  /* prefix */
            ".jpg",         /* suffix */
            storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
       
        return image;
    }
	
	
	private File setUpPhotoFile() throws IOException {
		
		File f = createImageFile();
		mCurrentPhotoPath = f.getAbsolutePath();
		
		return f;
	}
	
	
	private void setPic() {

//		/* There isn't enough memory to open up more than a couple camera photos */
//		/* So pre-scale the target bitmap into which the file is decoded */
//
//		/* Get the size of the ImageView */
//		int targetW = mImageView.getWidth();
//		int targetH = mImageView.getHeight();
//
//		/* Get the size of the image */
//		BitmapFactory.Options bmOptions = new BitmapFactory.Options();
//		bmOptions.inJustDecodeBounds = true;
//		BitmapFactory.decodeFile(mCurrentPhotoPath, bmOptions);
//		int photoW = bmOptions.outWidth;
//		int photoH = bmOptions.outHeight;
//		
//		/* Figure out which way needs to be reduced less */
//		int scaleFactor = 1;
//		if ((targetW > 0) || (targetH > 0)) {
//			scaleFactor = Math.min(photoW/targetW, photoH/targetH);	
//		}
//
//		/* Set bitmap options to scale the image decode target */
//		bmOptions.inJustDecodeBounds = false;
//		bmOptions.inSampleSize = scaleFactor;
//		bmOptions.inPurgeable = true;
//
//		/* Decode the JPEG file into a Bitmap */
//		Bitmap bitmap = BitmapFactory.decodeFile(mCurrentPhotoPath, bmOptions);
//		
//		/* Associate the Bitmap to the ImageView */
//		mImageView.setImageBitmap(bitmap);
//		mVideoUri = null;
//		mImageView.setVisibility(View.VISIBLE);
//		mVideoView.setVisibility(View.INVISIBLE);
//		
		img.setVisibility(View.VISIBLE);
		img.setBackgroundDrawable(rescaleImage(mCurrentPhotoPath,img.getWidth(),img.getHeight()));
	}
	
	
	private void galleryAddPic() {
	    Intent mediaScanIntent = new Intent("android.intent.action.MEDIA_SCANNER_SCAN_FILE");
		File f = new File(mCurrentPhotoPath);
	    Uri contentUri = Uri.fromFile(f);
	    mediaScanIntent.setData(contentUri);
	    mainActivity.sendBroadcast(mediaScanIntent);
	}
}