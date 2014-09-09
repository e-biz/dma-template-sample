package mobi.designmyapp.template.sample.contentsharing.ui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;

import com.thales.feedsync.module.security.AuthGeneralRadius;

import mobi.designmyapp.template.sample.R;

/**
 * Created by flo on 16/07/14.
 */
public class SampleContentSharingAuthActivity extends Activity{
    static final String TAG = "AuthFragment";

    /*** UI Variables ***/
    private Button buttonAuth;
    private EditText editTextUser;
    private EditText editTextPassword;
    private EditText editTextAddress;
    private CheckBox chexBoxPassword;
    private String mUser;
    private String mPassword;
    private String mAddress;

    /*** Authentication ***/
    public AuthGeneralRadius authGeneralRadius;
    public SampleContentSharingActivity mMainActivity;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample_contentsharing_auth);
        Log.d(TAG, "onCreate");
        // Inflate the layout for this fragment

        editTextUser = (EditText)findViewById(R.id.editTextUser);
        editTextPassword = (EditText)findViewById(R.id.editTextPassword);
        editTextAddress = (EditText)findViewById(R.id.editTextAddress);
        chexBoxPassword = (CheckBox)findViewById(R.id.checkBoxPassword);

        // add onCheckedListener on checkbox
        // when user clicks on this checkbox, this is the handler.
        chexBoxPassword.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {

            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                // checkbox status is changed from uncheck to checked.
                if (!isChecked) {
                    // show password
                    editTextPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
                } else {
                    // hide password
                    editTextPassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                }
            }
        });

        buttonAuth = (Button)findViewById(R.id.buttonAuth);
        buttonAuth.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                mUser = editTextUser.getText().toString();
                mPassword = editTextPassword.getText().toString();
                mAddress = editTextAddress.getText().toString();
                authGeneralRadius = new AuthGeneralRadius(mUser, mPassword);

                /*** Without Radius Authentication ***/
                Intent myIntent = new Intent(SampleContentSharingAuthActivity.this, SampleContentSharingActivity.class);
                Bundle extras = new Bundle();
                extras.putString(SampleContentSharingActivity.EXTRA_NAME, mUser);
                extras.putString(SampleContentSharingActivity.EXTRA_ADDRESS, mAddress);
                //extras.putString(MainActivity.EXTRA_NAME_GROUP, authGeneralRadius.groupUser);
                myIntent.putExtras(extras);
                startActivity(myIntent);

                /*** With Radius Authentication ***/
//				if(authGeneralRadius.accessRadius()){
//					Intent myIntent = new Intent(AuthActivity.this, MainActivity.class);
//					Bundle extras = new Bundle();
//					extras.putString(MainActivity.EXTRA_NAME, mUser);
//					//extras.putString(MainActivity.EXTRA_NAME_GROUP, authGeneralRadius.groupUser);
//					myIntent.putExtras(extras);
//					startActivity(myIntent);
//				}else{
//					Crouton croutonAuth = new Crouton(AuthActivity.this,"Error login and/or password", Style.ALERT);
//					croutonAuth.setConfiguration(Configuration.DEFAULT);
//					croutonAuth.show();
//				}
            }
        });
    }

    public void onResume(){
        Log.d(TAG,"onResume");
        super.onResume();
    }

    public void onPause(){
        Log.d(TAG,"onPause");
        super.onPause();
    }
}
