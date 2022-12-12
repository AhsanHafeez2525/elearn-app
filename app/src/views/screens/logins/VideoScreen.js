import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  Paragraph,
  FAB,
  Dialog,
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { WebView } from 'react-native-webview';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function VideoScreen({route, navigation}) {
  const {item} = route.params;
  // console.log(item);

  // fabs
  const [state, setState] = useState({open: false});

  useEffect(() => {
  }, []);
  return (
    
    <View
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
  <WebView source={{ uri: item.link }} />
    </View>
  );
}

export default VideoScreen;
