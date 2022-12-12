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
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  Paragraph,
  Badge,
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function CreateClassScreen({navigation}) {
  const isFocused = useIsFocused();
  const [userid, setUserid] = useState('')
  const [className, setclassName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({
    uri: 'https://wp-media.petersons.com/blog/wp-content/uploads/2018/10/10123812/iStock-837483562.jpg',
  });
  const [email, setEmail] = useState('');
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // image picker

  const takePhotoFromGallery = async () => {
    // console.warn('gallery')
    const data = await ImagePicker.openPicker({
      width: 500,
      height: 500,
      // cropping: true,
    }).then(imageDetail => {
      // uplaod image to db
      console.log(imageDetail.path);
      setImage({uri: imageDetail.path});
      // uploadImg(imageDetail);
    });
  };
  // image picker end

  
  // get object values from async storage
  const getData = async () => {
    await AsyncStorage.getItem('resturantDetail').then(value => {
      var x = JSON.parse(value);

      // splitString(x.fullname);
     setUserid(x.id);
     ;
    });
  };
  // get user data end 

  const insertValue = async () => {
   

if(image.uri=='https://wp-media.petersons.com/blog/wp-content/uploads/2018/10/10123812/iStock-837483562.jpg'
|| className=='' || description==''){
setsnackbarValue({value: 'Please fill all fields', color: 'red'});
setVisible(true);
} else {
  setloading(1);
  setdisable(1);
var uniq =(new Date()).getTime();
  RNFetchBlob.fetch(
    'POST',
    base_url + '/class/createClass.php',
    {
      Authorization: 'Bearer access-token',
      otherHeader: 'foo',
      'Content-Type': 'multipart/form-data',
    },
    [
      {
        name: 'image',
        filename: uniq + '.png',
        type: 'image/foo',
        data: RNFetchBlob.wrap(image.uri),
      },
      {name: 'userid',  data:  userid},
      {name: 'className', data:  className},
      {name: 'description', data:  description},
    ],
  )
    .then(response => response.json())
    .then(response => {
      setdisable(0);
      setloading(0);
      if(response[0].message=='Upload Succesful') {
        setsnackbarValue({value: 'Class Created Successfully', color: 'green'});
        setVisible(true);
      }
      
    })
    .catch(error => {
      alert('error' + error);
    });
}

    
  };
  useEffect(() => {
    getData();
  }, [isFocused]);
  return (
    <ScrollView
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View>
        <SafeAreaView
          style={{
            marginHorizontal: '4%',
            backgroundColor: COLORS.white,
          }}>
          <Snackbar
            duration={200}
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={
              {
                // label: 'Undo',
                // onPress: () => {
                //   // Do something
                // },
              }
            }
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
            <Text
              style={{
                fontSize: 17,
              }}>
              Create Class
            </Text>
          </View>
          {image.uri==='https://wp-media.petersons.com/blog/wp-content/uploads/2018/10/10123812/iStock-837483562.jpg'?
          <TouchableOpacity
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            paddingVertical: 60,

            felxDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => takePhotoFromGallery()}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Icon name="upload" size={30} color={COLORS.primary} />
            <Text>Upload Image</Text>
          </View>
        </TouchableOpacity>
        :<View
        style={{
          felxDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <FastImage
            style={{
              width: '100%',
              height: 200,
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 10,
            }}
            source={image}
            resizeMode={FastImage.resizeMode.cover}
          />

          <Badge
            style={{
              backgroundColor: COLORS.primary,
              alignSelf: 'center',
              color: COLORS.white,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}
            
            onPress={()=>{
              takePhotoFromGallery()
            }}>
            Change image
          </Badge>
        </View>
      </View>
        }
          

          

          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: '5%',
              justifyContent: 'center',
            }}>
            <TextInput
              label="Class Name"
              mode="flat"
              style={{backgroundColor: COLORS.white, borderRadius: 40,marginBottom:20}}
              activeOutlineColor={COLORS.primary}
              activeUnderlineColor={COLORS.primary}
              
              onChangeText={e => {
                setclassName(e);
              }}
            />
            <TextInput
              label="Add Description"
              mode="flat"
              style={{backgroundColor: COLORS.white, borderRadius: 40,textAlignVertical: 'top'}}
              activeOutlineColor={COLORS.primary}
              activeUnderlineColor={COLORS.primary}
              multiline={true}
              clearTextOnFocus={true}
              onChangeText={e => {
                setDescription(e);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginTop: 30,
              marginHorizontal: '5%',
            }}>
            <Button
              mode="contained"
              color={COLORS.primary}
              contentStyle={{
                padding: 9,
                paddingHorizontal: 100,
              }}
              style={{
                alignSelf: 'center',
                borderRadius: 40,
              }}
              onPress={() => {
                insertValue()
              }}
              loading={loading}
              disabled={disable}>
              <Text style={{color: 'white', fontSize: 15}}>Create </Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default CreateClassScreen;
