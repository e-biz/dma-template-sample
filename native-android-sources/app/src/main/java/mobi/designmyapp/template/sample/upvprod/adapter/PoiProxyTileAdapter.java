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
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.upvprod.model.Feature;

import java.util.Collections;
import java.util.List;

/**
 * Custom Adapter to manage PoiProxy custom Grid View
 */
public class PoiProxyTileAdapter extends BaseAdapter {

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private List<Feature> results = Collections.emptyList();
  private Context ctx;

  public PoiProxyTileAdapter(Context ctx) {
    super();
    this.ctx = ctx;
  }

  /**
   * updates the current adapter with the provided result list
   * updateAdapter will automatically call notifyDataSetChanged
   * @param results
   */
  public void updateAdapter(List<Feature> results) {
    this.results = results;
    notifyDataSetChanged();
  }

  @Override
  public int getCount() {
    return results.size();
  }

  @Override
  public Feature getItem(int i) {
    return results.get(i);
  }

  @Override
  public long getItemId(int i) {
    return i;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {

    if (convertView == null)
      convertView = LayoutInflater.from(ctx).inflate(R.layout.tile_upv_prod, parent, false);

    ImageView imageView = ViewHolder.get(convertView, R.id.image);
    TextView descriptionView = ViewHolder.get(convertView, R.id.description);

    Feature result = getItem(position);
    descriptionView.setText(result.getProperties().getName());
    loadBitmap(result.getProperties().getImage(),convertView);

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

  /**
   * load bitmap in a dedicated thread using the Picasso library
   * @param url
   * @param view
   */
  public void loadBitmap(String url, View view) {
    ImageView imageView = (ImageView) view.findViewById(R.id.image);
    Picasso.with(ctx).load(url).into(imageView);
  }


}
