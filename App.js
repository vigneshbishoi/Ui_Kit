/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//               {/* <Image style={{ flex:1, resizeMode: 'contain', width: wp('100%'), height: hp('17%'), marginBottom: ('5%') }} source={require('../../assets/image/splash.png')} /> */}
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

import React from 'react';
import { Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './scr/screens/Splash/index'
import Login from './scr/screens/Login/index'
import SignUp from './scr/screens/SignUp/index'
import Home from './carousel'
import HomeItem from './scr/screens/OnClickDataHome/index'
import Main from './scr/screens/Home/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from 'react-native-vector-icons';
import FoodtypeClick from './scr/screens/OnClickFoodType/index'
import NewRecipes from './scr/screens/New_Recipes/index'
import EditRecipes from './scr/screens/Edit_Recipes/index'
import { Permission, PERMISSIONS_TYPE } from './scr/screens/AppPermissions'
import VideoPlayPAge from './scr/screens/VideoPlayPage/index'
import Search from './scr/screens/Search/index'
import Profile from './scr/screens/Profile/index'
import Profile1 from './scr/screens/Profile/index1'
import EditProfile from './scr/screens/Edit_Profile/index'
import Setting from './scr/screens/Setting/index'
import Map from './scr/screens/Map/index'
import LocalNotification from './scr/components/Push_Notification/index';


const BottomTab = createBottomTabNavigator()
const Stack = createStackNavigator();
export default class NavigationIndex extends React.Component {

    // componentDidMount(){
    //     LocalNotification(true, this.navRef)
    // }

    componentDidUpdate() {
        Permission.checkPermissoin(PERMISSIONS_TYPE.photo)
    }


    render() {
        return (
            // <NavigationContainer ref={ref => this.navRef = ref}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false, gestureEnabled: false }}>
                    <Stack.Screen name="splash" component={Splash} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="signup" component={SignUp} />
                    <Stack.Screen name="home" component={Demo} />
                    <Stack.Screen name="homeitem" component={HomeItem} />
                    <Stack.Screen name="foodtypeclick" component={FoodtypeClick} />
                    <Stack.Screen name="NewRecipes" component={NewRecipes} />
                    <Stack.Screen name="EditRecipes" component={EditRecipes} />
                    <Stack.Screen name="VideoPlayPAge" component={VideoPlayPAge} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Profile1" component={Profile1} />
                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="Map" component={Map} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


class Demo extends React.Component {
    render() {
        return (

            <BottomTab.Navigator initialRouteName='splash'

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Main') {
                            iconName = focused
                                ? require('./scr/assets/image/gsearch.png')
                                : require('./scr/assets/image/loupe.png')
                        } else if (route.name === 'login') {
                            iconName = focused ? require('./scr/assets/image/gbrackets.png') : require('./scr/assets/image/brackets.png');
                        }
                        else if (route.name === 'signup') {
                            iconName = focused ? require('./scr/assets/image/gchef.png') : require('./scr/assets/image/chef.png');
                        }

                        // You can return any component that you like here!
                        return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode='contain' />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    style: { height: hp('10%'), paddingTop: hp('2.4%') }
                }}
            >
                <BottomTab.Screen name="Main" options={{ tabBarLabel: '', }} component={Search} />
                <BottomTab.Screen name="login" options={{ tabBarLabel: '' }} component={Main} />
                <BottomTab.Screen name="signup" options={{ tabBarLabel: '' }} component={Profile} />
            </BottomTab.Navigator>


        )
    }
}