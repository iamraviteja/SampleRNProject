package com.sampleproject
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import android.util.Log
class SampleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override
    fun getName() = "SampleModule"
    @ReactMethod
    fun createMessageLog(message: String) {
        Log.d("SampleModule", "Message: $message")
    }

    @ReactMethod
    fun createMessageCallback(message: String, cb: Callback) {
        Log.d("SampleModule", "Message: $message")
        cb.invoke(null, "message from native module")
    }
}