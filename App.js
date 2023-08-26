import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screen/HomeScreen';
import { Provider } from 'react-redux';
import Store from './ReducerData/Store';
import StackNavigator from './StackNavigator';


export default function App() {
  return (
   // it is important to passing the store prop in Provider  
    <Provider store={Store}>
      <StackNavigator/>
 <StatusBar style='auto' />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:15
  },
});
