import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../../screens/TasksScreen/TasksScreen';
import RegistrationScreen from '../../screens/AuthScreens/RegistrationScreen/RegistrationScreen';
// import CustomDrawer from './CustomDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        swipeEdgeWidth: Dimensions.get('window').width / 2,
      }}
      // drawerContent={(props: any) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Registration" component={RegistrationScreen} />
    </Drawer.Navigator>
  );
}
