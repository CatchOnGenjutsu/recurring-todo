import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './src/components/DrawerNavigator/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <DrawerNavigator />
    </NavigationContainer>
  );
}
