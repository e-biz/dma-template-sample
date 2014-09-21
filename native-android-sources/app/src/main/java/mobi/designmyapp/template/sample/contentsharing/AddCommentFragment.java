package mobi.designmyapp.template.sample.contentsharing;

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

import com.thales.feedsync.database.DataBaseAdapter;
import com.thales.feedsync.format.atom.AtomCategory;
import com.thales.feedsync.format.atom.AtomPerson;
import com.thales.feedsync.format.atom.DefaultAtomCategory;
import com.thales.feedsync.format.atom.DefaultAtomEntry;
import com.thales.feedsync.format.atom.DefaultAtomFeed;
import com.thales.feedsync.format.atom.DefaultAtomPerson;

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
 * This fragment lets the user to add a comment to a news, he can write some texts and add a photo
 *
 * @author Florian COSNIER
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

    private String mCurrentPhotoPath;

    String Base64Bitmap;

    /*** Fragments and FeedSync module ***/
    SampleContentSharingActivity mActivity;
    String addressToPost;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mActivity = (SampleContentSharingActivity) getActivity();
        Bundle arguments = getArguments();

        if (arguments == null){
            Toast.makeText(getActivity(), "Arguments is NULL", Toast.LENGTH_LONG).show();
        }else{
            idEntry=arguments.getLong(SampleContentSharingActivity.EXTRA_COMMENT);
            addressToPost = arguments.getString(SampleContentSharingActivity.ADDRESS_TO_POST);
            Log.d(TAG,"id: "+idEntry);
        }
    }

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.contentsharing_add_comment, null);

        final EditText editUser=(EditText)v.findViewById(R.id.comment_user);

        if(!mActivity.mUser.isEmpty()){
            editUser.setText(mActivity.mUser);
        }

        final EditText editComment=(EditText)v.findViewById(R.id.comment_body);

        Button submitComment=(Button) v.findViewById(R.id.add_comment_activity);
        submitComment.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                try {
                    addComment(editUser.getText().toString(),editComment.getText().toString(),idEntry);
                }catch (RemoteException e) {
                    Log.e(TAG,"RemoteException!!!!!");
                    e.printStackTrace();
                }
            }
        });

        //Button to add a picture from the gallery in the comment
        Button add_pic=(Button) v.findViewById(R.id.select_pics);
        add_pic.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
                startActivityForResult(intent, SELECT_IMAGE);

            }
        });

        //Button to take a picture and add it in the comment
        Button camera=(Button) v.findViewById(R.id.camera);
        camera.setOnClickListener(new OnClickListener(){
            public void onClick(View v)	{
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
     * <p>
     * This function posts data to the server
     * The title corresponds to the author name(the user) and the comment is the content of the bubble
     * Firstly, an entry is created, added to the database, post to the server
     * </p>
     *
     * @param title
     * @param comment
     * @param referToId
     * @throws android.os.RemoteException
     */
    private void addComment(String title,String comment, long referToId) throws RemoteException{
        String android_id = Secure.getString(getActivity().getContentResolver(), Secure.ANDROID_ID);
        Date date=new Date();

        DefaultAtomEntry newEntry= new DefaultAtomEntry();
        List<AtomPerson> persons=new ArrayList<AtomPerson>();
        DefaultAtomPerson person=new DefaultAtomPerson();
        DefaultAtomCategory category = new DefaultAtomCategory();
        List<AtomCategory> categories = new ArrayList<AtomCategory>();

        person.setName(title);
        persons.add(person);

        if ( mCurrentPhotoPath!=null){
            newEntry.setContent("<img src=\""+mCurrentPhotoPath+"\">");
            newEntry.setSummary(comment+"///IMG");
            mCurrentPhotoPath = null;
        }else{
            newEntry.setContent(comment);
            newEntry.setSummary("TEXT");
        }
        newEntry.setTitle(title);
        newEntry.setAuthors(persons);
        newEntry.setReferTo(referToId);
        newEntry.setPublished(date);
        category.setLabel(new Date().toString());
        categories.add(category);
        newEntry.setEntryId(android_id+new Date());
        newEntry.setCategories(categories);
        Log.d(TAG,"location: "+mActivity.myLocation);
        if(mActivity.myLocation!=null && mActivity.fakeLocation == false){
            newEntry.setGeoPoint(mActivity.myLocation.getLatitude(), mActivity.myLocation.getLongitude());
        }

        if(newEntry.getSummary().contains("IMG")){
            mActivity.mApiClient.postRequestMediaComment(newEntry,Base64Bitmap);
        }else{
            mActivity.mApiClient.postRequestComment(newEntry);
        }

        FragmentManager fm = mActivity.getSupportFragmentManager();
        fm.popBackStack();

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

    /**
     * This function encodes a BASE64 string from an URI
     * @param selectedImage
     */
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

    /**
     * This function encodes a BASE64 string from a String
     * @param selectedImage
     */
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
                mActivity.getContentResolver().openInputStream(selectedImage), null, o);

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
                mActivity.getContentResolver().openInputStream(selectedImage), null, o2);
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
        mActivity.sendBroadcast(mediaScanIntent);
    }
}