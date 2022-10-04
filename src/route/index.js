/** @format */

import App from './appstack';
import AuthApp from './authStack';
import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();
const AppNavigation = () => {
//   useEffect(()=>{
//     console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
// console.disableYellowBox = true;
//   },[])
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false,gestureEnabled:false}}>
        <AppStack.Screen name={'Auth'} component={AuthApp} />
        <AppStack.Screen name={'App'} component={App} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
