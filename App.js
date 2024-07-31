import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import store from './src/redux/Store/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogBox } from 'react-native';
import Details from './src/screens/Details/Details';

LogBox.ignoreAllLogs(); 

// const App = () => (
//   <Provider store={store}>
//     <Home />
//   </Provider>
// );

const Stack = createNativeStackNavigator();
const App = () =>{
  return (
    <NavigationContainer>
       <Stack.Navigator >
        <Stack.Screen initialParams={Home} name="Home" component={Home}
         options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={Details} 
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

