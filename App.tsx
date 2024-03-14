/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Section from './src/components/Section';
import {Button} from '@rneui/themed';
import { useCameraDevice, Camera } from 'react-native-vision-camera';

const Stack = createNativeStackNavigator();

function Home({navigation}: any): React.JSX.Element {
  
  const isDarkMode = useColorScheme() === 'dark';
  const {SampleModule} = NativeModules;

  

  const cameraPermissionCheck = () => {
    request(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('Error::', error);
      });
  };

  const moduleCallbackHandler = () => {
    SampleModule.createMessageCallback('sent from js to be read back in js', function(err:any, msg:any){
      console.log(`JS Thread :: ${msg}`);
    })
  }

  return (
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Section title="Native Module Example">
          This is to show the communication between native modules and
          javascript.
        </Section>
        <Button
          title="Trigger Native Event"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 300,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => {
            SampleModule.createMessageLog('Hi from js code!!');
          }}
        />
        <Button
          title="Trigger Native Event with Callback"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 300,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={moduleCallbackHandler}
        />
        <Button
          title="Get Camera Permissions"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 300,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={cameraPermissionCheck}
        />
        <Button
          containerStyle={styles.button}
          title='Go to Camera'
          onPress={() => navigation.navigate('CameraView')}
        />
      </View>
  );
}

function NoCameraDeviceError(): React.JSX.Element{
  
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Section title="No Camera View">
          You might need to set your camera permisssions.
        </Section>
      </View>
  )
}

function CameraView(): React.JSX.Element {
  const device = useCameraDevice('back')

  if (device == null) return <NoCameraDeviceError />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  ) 
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name='CameraView' component={CameraView} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 50,
    width: 300
  }
});

export default App;
