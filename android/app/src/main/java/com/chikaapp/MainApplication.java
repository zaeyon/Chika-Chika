package com.chikaapp;

import android.app.Application;
import android.content.Context;

//import com.facebook.react.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.github.quadflask.react.navermap.RNNaverMapPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;

import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;

import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.ijzerenhein.sharedelement.RNSharedElementPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
          //return BuildConfig.DEBUG;
            return true;
        }

        /*
        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }
        */

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNNaverMapPackage(),
            new SplashScreenReactPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNCWebViewPackage(),
            new RNSharedElementPackage(),
            new RNCPickerPackage(),
            new RNFSPackage(),
            new AsyncStoragePackage(),
            new RNPermissionsPackage(),
            new ReactNativeFirebaseAppPackage(),
            new ReactNativeFirebaseMessagingPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected JSIModulePackage getJSIModulePackage() {
            return new ReanimatedJSIModulePackage(); // <- add
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
//  private static void initializeFlipper(
//      Context context, ReactInstanceManager reactInstanceManager) {
//    if (BuildConfig.DEBUG) {
//      try {
//        /*
//         We use reflection here to pick up the class that initializes Flipper,
//        since Flipper library is not available in release mode
//        */
//        Class<?> aClass = Class.forName("com.chikaapp.ReactNativeFlipper");
//        aClass
//            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
//            .invoke(null, context, reactInstanceManager);
//      } catch (ClassNotFoundException e) {
//        e.printStackTrace();
//      } catch (NoSuchMethodException e) {
//        e.printStackTrace();
//      } catch (IllegalAccessException e) {
//        e.printStackTrace();
//      } catch (InvocationTargetException e) {
//        e.printStackTrace();
//      }
//    }
//  }
}
