import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './src/components/DrawerNavigator/DrawerNavigator';
import { initDb, resetDb } from './src/db/db';
import { COLORS } from './src/const/colors';

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await resetDb();
        await initDb();
        setDbReady(true);
      } catch (error) {
        console.error('DB init failed', error);
      }
    };
    init();
  }, []);

  if (!dbReady) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color={COLORS.textPrimary} />
        <Text style={styles.splashText}>Загрузка данных...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  splashText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
});
