1. run npm run prebuild.
    - When using android emulator, ensure that it has at least 2GB of memory
    - Open AndroidManifest.xml file in android folder. On the _application_ tag add **android:largeHeap="true** it will look something like this
      - `<application android:name=".MainApplication" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:allowBackup="true" android:theme="@style/AppTheme" android:largeHeap="true">`
      - This is necessary to avoid Out of memory exceptions when running the app. This is due to expo-video dependency.
      - Yes this should have been a custom expo plugin but no more time to implement it.
2. adjust gradle.properties of org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
3. npm run start on one terminal
4. npm run android on another terminal. Note that the emulator should have at least
5. npm run ios on another terminal



remaining
1. elements on top of video tab 2
4. fix readme
5. code review, remove dead code
6. review google docs if something is missed out
7. send to email the github repo
