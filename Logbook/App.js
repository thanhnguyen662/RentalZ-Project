import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs from './src/navigation/Tabs';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
   return (
      <>
         <IconRegistry icons={EvaIconsPack} />
         <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaProvider>
               <NavigationContainer>
                  <Navigator
                     screenOptions={{ headerShown: false }}
                     initialRouteName='Tabs'
                  >
                     <Screen name='Tabs' component={Tabs} />
                  </Navigator>
               </NavigationContainer>
            </SafeAreaProvider>
         </ApplicationProvider>
      </>
   );
};

export default App;
