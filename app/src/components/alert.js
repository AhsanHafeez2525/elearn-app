import 'react-native-gesture-handler';
import React ,{useState,useEffect}from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import COLOR from '../consts/colors'
import STYLES from '../styles';
function LoadingAlert({loading,message}) {
   
    
    return ( 
    <AwesomeAlert
                actionContainerStyle={{width:800, backgroundColor:'rgba(52, 52, 52, 0)'}}
          show={loading}
          showProgress={true}
          progressColor={COLOR.primary}
        //   title="AwesomeAlert"
          message={message}
          progressSize={40}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        //   showCancelButton={true}
        //   showConfirmButton={true}
        //   cancelText="No, cancel"
        //   confirmText="Yes, delete it"
        //   confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
           setloading(false)
          }}
        //   onConfirmPressed={() => {
        //     this.hideAlert();
        //   }}
        />
      );
}



export default LoadingAlert;