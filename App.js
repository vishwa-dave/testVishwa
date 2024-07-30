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



const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;

