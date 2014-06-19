package mobi.designmyapp.template.sample;

import android.app.Activity;
import android.app.ProgressDialog;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static mobi.designmyapp.template.sample.Util.*;


public class SampleODSActivity extends Activity {

    private final String URL_BASE = "http://public.opendatasoft.com/api/records/1.0/search?";
    private final String URL_DATASET = "positions_geographiques_des_stations_du_reseau_ratp";
    private final String ROWS = "500";
    private final String FACET = "reseau";
    private final String EXCLUDE = "exclude.reseau=bus&exclude.reseau=rer";


    private final String URL = URL_BASE+"dataset="+URL_DATASET+"&rows="+ROWS+"&facet="+FACET+"&"+EXCLUDE;

    private List<HashMap<String, String>> listEntries;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample_ods);

        retrieve();

        final EditText editText = (EditText) findViewById(R.id.searchBox);
        editText.addTextChangedListener(new TextWatcher() {

            public void afterTextChanged(Editable s) {
                String search = editText.getText()
                                        .toString();

                doSearch(search);

            }

            public void beforeTextChanged(CharSequence s,
                                          int start,
                                          int count,
                                          int after) {
            }

            public void onTextChanged(CharSequence s,
                                      int start,
                                      int before,
                                      int count) {

            }
        });

    }

    public boolean isConnected() {
        ConnectivityManager connMgr = (ConnectivityManager) getSystemService(Activity.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        return (networkInfo != null && networkInfo.isConnected());
    }

    private void doSearch(String search) {
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();

        if (search == null || search.trim()
                                    .length() > 0) {

              for(HashMap<String, String> map : listEntries){
                if(map.get(TAG_NAME).toLowerCase()
                        .contains(search.toLowerCase())) {
                    list.add(map);
                }
            }

        } else {
            list = listEntries;
        }
        fillListView(list);

    }

    private void retrieve() {
        if (isConnected()) {
            Log.d("URL", URL);
            new DataPicker().execute(URL);
        } else {
            //FIXME Adapt toast
            Toast.makeText(getBaseContext(), "No Connection...", Toast.LENGTH_LONG)
                 .show();
        }
    }

    private void fillListView(List<HashMap<String, String>> searchList) {
        ListAdapter adapter = new SimpleAdapter(
                SampleODSActivity.this, searchList,
                R.layout.list_entries, new String[]{TAG_NAME, TAG_AREA,
                TAG_NETWORK}, new int[]{R.id.name,
                R.id.area, R.id.network});
        ListView myList = (ListView) findViewById(android.R.id.list);

        myList.setAdapter(adapter);
    }

    private class DataPicker extends AsyncTask<String, Void, String> {

        private ProgressDialog progressDialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progressDialog = new ProgressDialog(SampleODSActivity.this);
            progressDialog.setMessage("Loading...");
            progressDialog.show();
        }

        @Override
        protected String doInBackground(String... params) {

            String result = "";
            BufferedReader reader = null;

            try {
                URL url = new URL(params[0]);
                URLConnection conn = url.openConnection();
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                StringBuilder sb = new StringBuilder();
                String line;

                // Read Server Response
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append(" ");
                }

                // Append Server Response To Content String
                result = sb.toString();
                Log.d("Response: ", result);

            } catch (Exception e) {
                Log.e("Error getting data", e.getLocalizedMessage());
            } finally {
                try {
                    reader.close();
                } catch (Exception ex) {
                    ///FIXME Adapt Error display
                    Log.e("BufferReader", ex.getMessage());
                    ex.printStackTrace();
                }
            }
            return result;

        }

        @Override
        protected void onPostExecute(String result) {

            List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();

            Toast.makeText(getBaseContext(), "Received!", Toast.LENGTH_LONG)
                 .show();

            try {
                JSONObject json = new JSONObject(result);

                JSONArray entries = json.getJSONArray(TAG_ENTRY);

                for (int i = 0; i < entries.length(); i++) {
                    JSONObject s = entries.getJSONObject(i);

                    // tmp hashmap for single entry
                    HashMap<String, String> entry = new HashMap<String, String>();

                    entry.put(TAG_ID, s.getString(TAG_ID));

                    entry.put(TAG_NAME,
                              s.getJSONObject(TAG_DATA)
                               .getString(TAG_NAME));

                    entry.put(TAG_NETWORK,
                              s.getJSONObject(TAG_DATA)
                               .getString(TAG_NETWORK));
                    entry.put(TAG_AREA,
                              s.getJSONObject(TAG_DATA)
                               .getString(TAG_AREA));
                    entry.put(TAG_LAT,
                              s.getJSONObject(TAG_DATA)
                               .getString(TAG_LAT));
                    entry.put(TAG_LONG,
                              s.getJSONObject(TAG_DATA)
                               .getString(TAG_LONG));

                    list.add(entry);

                }

                listEntries = list;
                fillListView(list);

                progressDialog.dismiss();

            } catch (JSONException e) {
                //FIXME Adapt Error display
                Log.e("JSONException", e.getMessage());
                e.printStackTrace();
            }

        }
    }

}