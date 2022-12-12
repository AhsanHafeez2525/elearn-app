import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
  Badge,
  FAB 
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HomeScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('')
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [displayEmail, setdisplayEmail] = useState('none');

  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // check logins
  const [login, setlogin] = useState(1);

  // check logins end
  // data

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Class Name',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Class Name',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Class Name',
    },
  ];
  // data end
  // function to Split string on the first white space occurrence
  

  // get object values from async storage
  const getData = async () => {
    await AsyncStorage.getItem('resturantDetail').then(value => {
      var x = JSON.parse(value);

      // splitString(x.fullname);
     setUsername(x.fullname);
     setUserid(x.id);
     getClasses(x.class_id);
      // console.log)
     ;
    });
  };

  // flat lsit

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        width: '100%',
        paddingVertical: 5,
      }}
      onPress={() => {
        navigation.navigate('ClassDetailScreen', {item: item});
      }}
      >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems:'center'
        }}>
          <FastImage
          style={{
            width: 50,
            height:50,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 30,
          }}
          source={{
            uri: image_url+'/'+item.image,
           
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text>{item.name}</Text>
        <Icon name="arrow-right-drop-circle" size={20} color={COLORS.primary} />
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: COLORS.greylight,
        }}></View>
    </TouchableOpacity>
  );

  const getClasses = (id) => {
    // setloading(true);
    var InsertAPIURL = base_url + '/student/getStudentClass.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      class_id:id,
     
    };
     fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        setData(response);
        console.log(data);
      })
      .catch(error => {
        
        alert('error' + error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: '4%',
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
     
      <Snackbar
        duration={200}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: height / 4,
          zIndex: 999,
        }}>
        {snackbarValue.value}
      </Snackbar>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: '4%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 17,
            }}>
            Home
          </Text>
        </View>
        <TouchableOpacity
        style={{
          padding:5,
          // backgroundColor: COLORS.greylight,
        }}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}
        >
        <Icon name="logout" size={25} color={COLORS.light} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: '4%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 30,
            
          }}
          source={{
            uri: 'https://www.nicepng.com/png/detail/126-1268265_download-svg-download-png-student-icon-png.png',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View
        style={{
          flexDirection: 'column',
          marginHorizontal: '4%',
          alignContent:'flex-end',
          alignItems:'flex-end',
          alignSelf:'center',
        
        }}>
          <Headline>{username}</Headline>
          <Badge style={{backgroundColor: COLORS.primary,
            alignSelf:'flex-start',
            color:COLORS.white,
            paddingHorizontal:10
          }}>Student</Badge>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
            color: COLORS.dark,
            fontWeight: '800',
          }}>
          My Class
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
