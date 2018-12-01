# Android权限

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.CAMERA"/>
```
# React-Native Links

连接原生模块

```
react-native link react-native-tcp
react-native link react-native-permissions
react-native link react-native-vector-icons
react-native link react-native-camera
react-native link react-native-gesture-handler
react-native link react-native-orientation
```

# 安装react-native-tcp

react-native-tcp是在nodejs原生net模块基础上的封装，为了在RN环境下使用，需要使用rn-nodeify进行hack，也就是说rn-nodeify会安装一系列的shim模块并修改rn环境。虽然可以使用，但是这样可能会导致一些副作用。


```javascript
//先安装
> yarn install react-native-tcp
> 

include ':react-native-tcp'
project(':react-native-tcp').projectDir = new File(rootProject.projectDir, '../libs/react-native-tcp/android')
