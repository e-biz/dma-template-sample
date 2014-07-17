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
package mobi.designmyapp.template.sample.upvprod.ui;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.widget.ImageView;

/**
 * Created by loic on 17/07/2014.
 */
public class CustomImageView extends ImageView {
  private static final float RADIUS_DIP = 3;
  private float radius;

  public CustomImageView(Context context) {
    super(context);
    init();
  }

  public CustomImageView(Context context, AttributeSet attrs) {
    super(context, attrs);
    init();
  }

  public CustomImageView(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    init();
  }

  public void init() {
    radius = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, RADIUS_DIP, getResources().getDisplayMetrics());
  }

  @Override
  protected void onDraw(Canvas canvas) {

    //float radius = 36.0f;
    Path clipPath = new Path();
    RectF rect = new RectF(0, 0, this.getWidth(), this.getHeight());
    clipPath.addRoundRect(rect, radius, radius, Path.Direction.CW);
    canvas.clipPath(clipPath);
    super.onDraw(canvas);
  }


}
