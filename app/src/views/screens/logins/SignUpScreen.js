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
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function SignUpScreen({navigation}) {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [displayEmail, setdisplayEmail] = useState('none');
  const [password, setPassword] = useState('');
  const [checkEmail, setCheckEmail] = useState(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  );
  const [showPass, setShowPass] = useState(false);
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
  // store objcet values in async storage
  const storeData = value => {
    AsyncStorage.setItem('resturantDetail', JSON.stringify(value));
  };
  // store objcet values in async storage end
  const checkValue = async () => {
    if (email.length == 0 || password.length == 0) {
      console.log('fields are empty');
      setsnackbarValue({value: 'Some fields are Empty', color: 'red'});
      setVisible('true');
    } else if (checkEmail.test(email) === false) {
      setsnackbarValue({value: 'Email is Not Correct', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      insertValue();
    }
  };
  const insertValue = async () => {
    // setloading(true);
    var InsertAPIURL = base_url + '/user/register.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      email: email,
      password: password,
      fullname: fullname,
      address: address,
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        setloading(0);
        setdisable(0);

        if (response[0].message === 'emailAlreadyExsist') {
          setsnackbarValue({
            value: 'Email Already Exisist',
            color: 'red',
          });
        } else {
          storeData(response[0]);
          setsnackbarValue({value: 'Registered', color: 'green'});
          // navigation.navigate('MyTabs');
        }
        // console.log(response[0].message)
        setVisible('true');
      })
      .catch(error => {
        setloading(0);
        setdisable(0);
        alert('error' + error);
      });
  };
  useEffect(() => {
    // getUser_detail();
  }, []);
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
          <View
            style={{
              flexDirection: 'column',
              marginVertical: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Headline>Welcome</Headline>
            <Paragraph>Create your New account.</Paragraph>
          </View>
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
              marginBottom: height / 4.5,
              zIndex: 999,
            }}>
            {snackbarValue.value}
          </Snackbar>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: '5%',
              justifyContent: 'center',
            }}>
            <TextInput
              label="Full Name"
              mode="flat"
              style={{backgroundColor: COLORS.white, borderRadius: 40}}
              activeOutlineColor={COLORS.primary}
              activeUnderlineColor={COLORS.primary}
              right={<TextInput.Icon name="email" color={'grey'} />}
              onChangeText={e => {
                setFullname(e);
              }}
            />
            <TextInput
              label="Email"
              mode="flat"
              style={{backgroundColor: COLORS.white, borderRadius: 40}}
              activeOutlineColor={COLORS.primary}
              activeUnderlineColor={COLORS.primary}
              right={<TextInput.Icon name="email" color={'grey'} />}
              onChangeText={e => {
                setEmail(e);
              }}
            />
            <TextInput
              label="Password"
              mode="flat"
              activeOutlineColor={COLORS.primary}
              style={{backgroundColor: COLORS.white}}
              activeUnderlineColor={COLORS.primary}
              right={
                <TextInput.Icon
                  name={showPass == false ? 'eye' : 'eye-off'}
                  color={'grey'}
                  onPress={() => {
                    if (showPass == false) {
                      setShowPass(true);
                    } else {
                      setShowPass(false);
                    }
                  }}
                />
              }
              secureTextEntry={showPass == true ? false : true}
              onChangeText={e => {
                setPassword(e);
              }}
            />
            <TextInput
              label="Address"
              mode="flat"
              style={{backgroundColor: COLORS.white, borderRadius: 40}}
              activeOutlineColor={COLORS.primary}
              activeUnderlineColor={COLORS.primary}
              right={<TextInput.Icon name="email" color={'grey'} />}
              onChangeText={e => {
                setAddress(e);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginBottom: 20,
              marginHorizontal: '5%',
              height: height / 3.5,
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
                checkValue();
              }}
              loading={loading}
              disabled={disable}>
              <Text style={{color: 'white', fontSize: 15}}>SIGNUP </Text>
            </Button>
            <View
              style={{
                marginVertical: '5%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Paragraph>Have an account? </Paragraph>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignInScreen');
              }}
              style={{marginTop: '1%'}}>
                <Text>Login now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;
