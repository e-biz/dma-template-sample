package mobi.designmyapp.template.sample.upvprod.ui;

import android.app.Activity;
import android.os.Bundle;
import com.etsy.android.grid.StaggeredGridView;
import mobi.designmyapp.template.sample.R;
import mobi.designmyapp.template.sample.upvprod.adapter.PoiProxyTileAdapter;
import mobi.designmyapp.template.sample.upvprod.model.Post;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by loic on 15/07/2014.
 */
public class SamplePoiProxyActivity extends Activity {
  StaggeredGridView gridView;

  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_sample_poiproxy);
    gridView = (StaggeredGridView) findViewById(R.id.staggeredGridView);

    List<Post> posts = new ArrayList<Post>();
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock1).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock2).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock3).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock4).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock5).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock6).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock7).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock8).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock9).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock10).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock1).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock2).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock3).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock4).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock5).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock6).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock7).build());
    posts.add(Post.builder().description("This is another mock test").image(R.drawable.mock8).build());
    posts.add(Post.builder().description("This is  yet another mock test").image(R.drawable.mock9).build());
    posts.add(Post.builder().description("This is a mock test").image(R.drawable.mock10).build());

    PoiProxyTileAdapter adapter = new PoiProxyTileAdapter(this);
    adapter.updateAdapter(posts);
    gridView.setAdapter(adapter);


  }
}