/*
 Copyright 2014 eBusiness Information

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
package mobi.designmyapp.template.sample.upvprod.adapter;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.support.v4.util.LruCache;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import com.etsy.android.grid.ExtendableListView;
import com.etsy.android.grid.StaggeredGridView;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.upvprod.model.Post;

import java.lang.ref.SoftReference;
import java.lang.ref.WeakReference;
import java.util.Collections;
import java.util.List;

/**
 * Custom Adapter to manage PoiProxy custom Grid View
 */
public class PoiProxyTileAdapter extends BaseAdapter {

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private List<Post> results = Collections.emptyList();
  private Context ctx;
  private Bitmap placeHolderBitmap;
  private int maxWidth;
  private LruCache<String, Bitmap> bitmapCache;


  public PoiProxyTileAdapter(Context ctx) {
    super();
    this.ctx = ctx;
    bitmapCache = new LruCache<String, Bitmap>((int)(Runtime.getRuntime().maxMemory() / (1024*8))) {
      @Override
      protected int sizeOf(String key, Bitmap bitmap) {
        // The cache size will be measured in kilobytes rather than
        // number of items.
        return (int)(bitmap.getByteCount() / 1024);
      }
    };
  }

  public void addBitmapToMemoryCache(String key, Bitmap bitmap) {
    if (getBitmapFromMemCache(key) == null) {
      bitmapCache.put(key, bitmap);
    }
  }

  public Bitmap getBitmapFromMemCache(String key) {
    return bitmapCache.get(key);
  }

  /**
   * updates the current adapter with the provided result list
   * updateAdapter will automatically call notifyDataSetChanged
   * @param results
   */
  public void updateAdapter(List<Post> results) {
    this.results = results;
    notifyDataSetChanged();
  }

  @Override
  public int getCount() {
    return results.size();
  }

  @Override
  public Post getItem(int i) {
    return results.get(i);
  }

  @Override
  public long getItemId(int i) {
    return i;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {

    maxWidth = parent.getMeasuredWidth()/2;

    if (convertView == null)
      convertView = LayoutInflater.from(ctx).inflate(R.layout.tile_upv_prod, parent, false);

    ImageView imageView = ViewHolder.get(convertView, R.id.image);
    TextView descriptionView = ViewHolder.get(convertView, R.id.description);

    Post result = getItem(position);
    descriptionView.setText(result.getDescription());
    loadBitmap(result.getImage(),convertView);

    return convertView;
  }

  private static class ViewHolder {

    @SuppressWarnings("unchecked")
    public static <T extends View> T get(View view, int id) {
      SparseArray<View> viewHolder = (SparseArray<View>) view.getTag();
      if (viewHolder == null) {
        viewHolder = new SparseArray<View>();
        view.setTag(viewHolder);
      }
      View childView = viewHolder.get(id);
      if (childView == null) {
        childView = view.findViewById(id);
        viewHolder.put(id, childView);
      }
      return (T) childView;
    }
  }

  public void loadBitmap(int resId, View view) {
    final Bitmap bitmap = getBitmapFromMemCache(Integer.toString(resId));
    ImageView imageView = (ImageView) view.findViewById(R.id.image);
    if (bitmap != null) {
      imageView.setImageBitmap(bitmap);
    } else {
      if (cancelPotentialWork(resId, view)) {

        final BitmapWorkerTask task = new BitmapWorkerTask(new SoftReference<View>(view));
        if (placeHolderBitmap == null)
          placeHolderBitmap = BitmapFactory.decodeResource(ctx.getResources(), R.drawable.placeholder);

        final AsyncDrawable asyncDrawable = new AsyncDrawable(ctx.getResources(), placeHolderBitmap, task);

        imageView.setImageDrawable(asyncDrawable);
        task.execute(resId);
      }
    }
  }

  public static boolean cancelPotentialWork(int data, View view) {
    final BitmapWorkerTask bitmapWorkerTask = getBitmapWorkerTask(view);

    if (bitmapWorkerTask != null) {
      final int bitmapData = bitmapWorkerTask.data;
      // If bitmapData is not yet set or it differs from the new data
      if (bitmapData == 0 || bitmapData != data) {
        // Cancel previous task
        bitmapWorkerTask.cancel(true);
      } else {
        // The same work is already in progress
        return false;
      }
    }
    // No task associated with the ImageView, or an existing task was cancelled
    return true;
  }

  static class AsyncDrawable extends BitmapDrawable {
    private final WeakReference<BitmapWorkerTask> bitmapWorkerTaskReference;

    public AsyncDrawable(Resources res, Bitmap bitmap, BitmapWorkerTask bitmapWorkerTask) {
      super(res, bitmap);
      bitmapWorkerTaskReference = new WeakReference<BitmapWorkerTask>(bitmapWorkerTask);
    }

    public BitmapWorkerTask getBitmapWorkerTask() {
      return bitmapWorkerTaskReference.get();
    }
  }

  private static BitmapWorkerTask getBitmapWorkerTask(View view) {
    if (view != null) {
      final Drawable drawable = ((ImageView)view.findViewById(R.id.image)).getDrawable();
      if (drawable instanceof AsyncDrawable) {
        final AsyncDrawable asyncDrawable = (AsyncDrawable) drawable;
        return asyncDrawable.getBitmapWorkerTask();
      }
    }
    return null;
  }

  public static int calculateInSampleSize(
      BitmapFactory.Options options, int reqWidth, int reqHeight) {
    // Raw height and width of image
    final int height = options.outHeight;
    final int width = options.outWidth;
    int inSampleSize = 1;
    //If image is bigger than requested dimensions
    if (height > reqHeight || width > reqWidth) {

      final int halfHeight = height / 2;
      final int halfWidth = width / 2;

      // Calculate the largest inSampleSize value that is a power of 2 and keeps both
      // height and width larger than the requested height and width.
      while ((halfHeight / inSampleSize) > reqHeight
          && (halfWidth / inSampleSize) > reqWidth) {
        inSampleSize *= 2;
      }
    }

    return inSampleSize;
  }

  public static Bitmap decodeSampledBitmapFromResource(Resources res, int resId,
                                                       int reqWidth) {

    // First decode with inJustDecodeBounds=true to check dimensions
    final BitmapFactory.Options options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true;
    BitmapFactory.decodeResource(res, resId, options);
    // Calculate inSampleSize
    options.inSampleSize = calculateInSampleSize(options, reqWidth, reqWidth*options.outHeight/options.outWidth);


    // Decode bitmap with inSampleSize set
    options.inJustDecodeBounds = false;

    return BitmapFactory.decodeResource(res, resId, options);
  }

  class BitmapWorkerTask extends AsyncTask<Integer, Void, Bitmap> {

    SoftReference<View> viewReference;
    int data;

    public BitmapWorkerTask(SoftReference<View> viewSoftReference) {
      this.viewReference = viewSoftReference;
    }

    @Override
    protected Bitmap doInBackground(Integer... integers) {
      data = integers[0];

      final Bitmap bitmap = decodeSampledBitmapFromResource(ctx.getResources(), data, maxWidth);
      addBitmapToMemoryCache(Integer.toString(data),bitmap);
      return bitmap;
    }

    @Override
    protected void onPostExecute(Bitmap bitmap) {

      if (isCancelled()) {
        bitmap = null;
      }

      if (viewReference != null && bitmap != null) {
        final View view = viewReference.get();
        final BitmapWorkerTask bitmapWorkerTask = getBitmapWorkerTask(view);
        if (this == bitmapWorkerTask && view != null) {
          ImageView imageView = (ImageView) view.findViewById(R.id.image);
          imageView.setImageBitmap(bitmap);
        }
      }
    }
  }
}
