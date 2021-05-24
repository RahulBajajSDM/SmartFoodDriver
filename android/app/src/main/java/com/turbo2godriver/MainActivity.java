package com.turbo2godriver;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle; // here
// import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this); // here
        super.onCreate(savedInstanceState);
    }
}
