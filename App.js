import 'react-native-gesture-handler';
import React,{useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigationState,
  useRoute,
  useNavigationContainerRef,
  StackActions,
  NavigationActions,
} from '@react-navigation/native';
import COLORS from './app/src/consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from './app/src/views/screens/logins/SigninScreen';
import SignUpScreen from './app/src/views/screens/logins/SignUpScreen';
import ClassDetailScreen from './app/src/views/screens/logins/ClassDetailScreen';
import VideoScreen from './app/src/views/screens/logins/VideoScreen';
import HomeScreen from './app/src/views/screens/home/HomeScreen';
import CreateClassScreen from './app/src/views/screens/home/CreateClassScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    // independent={true}
      screenOptions={{
        tabBarStyle: {
      
        },
        tabBarActiveTintColor: COLORS.primary,
        headerShown: false,
        tabBarShowLabel:true,
       
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <Icon
              name="home"
              size={25}
              color={focused ? COLORS.primary : COLORS.light}
            />
          ),
          
        }}
      />
      
      
      
      
    
    </Tab.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer
    independent={true}
    >
      <Stack.Navigator
        screenOptions={{header: () => null}}
        // initialRouteName={  "SignInScreen"}
      >
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="ClassDetailScreen" component={ClassDetailScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
