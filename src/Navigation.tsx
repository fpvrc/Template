import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './lib/Navigation';
import styles from './styles';

//Screens
import Landing from './screens/landing';

const MainStack = createNativeStackNavigator();
const Navigation = ({}) => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={scheme === 'light' ? styles.primary_theme : styles.primary_theme}>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen name="Landing" component={Landing} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
