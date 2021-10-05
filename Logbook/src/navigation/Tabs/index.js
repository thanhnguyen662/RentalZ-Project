import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Form, Home } from '../../screens';
import {
   BottomNavigation,
   BottomNavigationTab,
   Layout,
   Text,
} from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const Tabs = () => {
   const HeartIcon = (props) => (
      <Icon style={styles.icon} {...props} name='heart' />
   );

   const UserIcon = (props) => (
      <Icon style={styles.icon} {...props} name='person-outline' />
   );

   const BottomTabBar = ({ navigation, state }) => (
      <BottomNavigation
         selectedIndex={state.index}
         onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
         <BottomNavigationTab icon={UserIcon} />
         <BottomNavigationTab icon={HeartIcon} />
      </BottomNavigation>
   );

   return (
      <>
         <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Screen
               name='Form'
               component={Form}
               options={{ headerShown: false }}
            />
            <Screen
               name='Home'
               component={Home}
               options={{ headerShown: false }}
            />
         </Navigator>
      </>
   );
};

export default Tabs;

const styles = StyleSheet.create({
   icon: {
      width: 32,
      height: 32,
   },
});
