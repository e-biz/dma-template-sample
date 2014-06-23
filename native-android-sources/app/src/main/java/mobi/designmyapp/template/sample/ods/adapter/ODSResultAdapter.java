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
package mobi.designmyapp.template.sample.ods.adapter;

import android.content.Context;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.ods.model.ODSResult;

import java.util.Collections;
import java.util.List;

/**
 * Custom Adapter to manage ODS Sample ListView
 */
public class ODSResultAdapter extends BaseAdapter {

  // ---------------------------------------------------------------------------
  // Attributes
  // ---------------------------------------------------------------------------
  private List<ODSResult> results = Collections.emptyList();
  private Context ctx;

  public ODSResultAdapter(Context ctx) {
    super();
    this.ctx = ctx;
  }

  /**
   * updates the current adapter with the provided result list
   * updateResults will automatically call notifyDataSetChanged
   * @param results
   */
  public void updateResults(List<ODSResult> results) {
    this.results = results;
    notifyDataSetChanged();
  }

  @Override
  public int getCount() {
    return results.size();
  }

  @Override
  public ODSResult getItem(int i) {
    return results.get(i);
  }

  @Override
  public long getItemId(int i) {
    return i;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {

    if (convertView == null)
      convertView = LayoutInflater.from(ctx).inflate(R.layout.result_entry, parent, false);

    TextView titleView = ViewHolder.get(convertView, R.id.title);
    TextView descriptionView = ViewHolder.get(convertView, R.id.description);
    TextView latitudeView = ViewHolder.get(convertView, R.id.latitude);
    TextView longitudeView = ViewHolder.get(convertView, R.id.longitude);

    ODSResult result = getItem(position);
    titleView.setText(result.getTitle());
    descriptionView.setText(result.getDescription());
    latitudeView.setText(Double.toString(result.getLatitude()));
    longitudeView.setText(Double.toString(result.getLongitude()));

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
}
