# Tiktok clone Sample App

1. run npm run prebuild.

   - When using android emulator, ensure that it has at least 2GB of memory
   - Open AndroidManifest.xml file in android folder. On the _application_ tag add **android:largeHeap="true** it will look something like this
     - This is necessary to avoid Out of memory exceptions when running the app. This is due to expo-video dependency.
     - Yes this should have been a custom expo plugin but no more time to implement it.

       `<application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:allowBackup="true" android:theme="@style/AppTheme" android:largeHeap="true" />`
1. adjust gradle.properties of org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
2. npm run start on one terminal
3. npm run android on another terminal. Note that the emulator should have at least 2GB of memory to work
4. npm run ios on another terminal to test on simulator as well
