/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App'
// import AppWrapper from './src/screens/Home/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
