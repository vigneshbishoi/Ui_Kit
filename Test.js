// import React from 'react';
// import { TouchableOpacity, View, Text, SafeAreaView, Image } from 'react-native';
// import Splash from './scr/screens/Splash/index'
// import Login from './scr/screens/Login/index'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Video from 'react-native-video';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// class MyTabs extends React.Component {

//     constructor() {
//         super()
//         this.state = { pause: false, pause1: false,showpause:false }
//     }
//     doubleclick = () => {
//         if (this.state.showpause == true) {
//             this.setState({ showpause: false })
//         } else if (this.state.showpause == false) {
//             this.setState({ showpause: true })
//         } else {
//             this.setState({ showpause: false })
//         }
//     }
//     doubleclick1 = () => {
//         if (this.state.pause == true) {
//             this.setState({ pause: false })
//         } else if (this.state.pause == false) {
//             this.setState({ pause: true })
//         } else {
//             this.setState({ pause: false })
//         }
//     }

//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <View style={{ flex: 1 }}>
//                     <View >
//                         <TouchableOpacity style={{ backgroundColor: 'red', width: wp('100%'), height: hp('25.5%') }} onPress={() => this.doubleclick()}>
//                             <Video source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
//                                 style={{ width: wp('100%'), height: hp('25.5%') }}
//                                 paused={this.state.pause}
//                                 resizeMode='cover' />

//                             {this.state.showpause ? (
//                                 <View style={{ width: wp('100%'), height: hp('25.5%'), position: 'absolute', justifyContent: "center", alignItems: "center" }}>
//                                     <TouchableOpacity onPress={() => this.doubleclick1()} >
//                                         <Image style={{ height: hp('15%'), width: wp('32%') }} resizeMode='contain' source={require('./scr/assets/image/VideoPlayButton.png')}></Image>
//                                     </TouchableOpacity>
//                                 </View>
//                             ) : null} 
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                             <Video source={false ? { uri: require('./scr/assets/videos/video1.mp4') } : require('./scr/assets/videos/video1.mp4')}
//                                 style={{ width: wp('100%'), height: hp('25.5%'), marginTop: hp('3%') }}
//                                 controls
//                                 muted
//                                 resizeMode='cover' />
//                     </View>
//                 </View>
//             </SafeAreaView>

//         )
//     }
// }

// export default MyTabs;


// import React, {Component} from 'react';
// import {StyleSheet,Text,View, Dimensions} from 'react-native';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import { CustomMarker } from './CustomMarker';
// import { Item } from './Item';

// export class CustomSlider extends Component{

//     constructor(props) {
//         super(props);
//         this.state = { 
//           multiSliderValue: [this.props.min, this.props.max],
//           first: this.props.min,
//           second: this.props.max,
//         }
//     }

//     render() {
//         return (
//             <View>
//                 <View style={[styles.column,{marginLeft:this.props.LRpadding,marginRight:this.props.LRpadding}]}>
//                     {this.renderScale()}
//                 </View>
//                 <View style={styles.container}>

//                     <MultiSlider
//                         trackStyle={{backgroundColor:'#bdc3c7'}}
//                         selectedStyle={{backgroundColor:"#5e5e5e"}}
//                         values={ this.props.single ?
//                             [this.state.multiSliderValue[1]] : 
//                          [      this.state.multiSliderValue[0],this.state.multiSliderValue[1]]}
//                         sliderLength={Dimensions.get('window').width-this.props.LRpadding*2}
//                         onValuesChange={this.multiSliderValuesChange}
//                         min={this.props.min}
//                         max={this.props.max}
//                         step={1}
//                         allowOverlap={false}
//                         customMarker={CustomMarker}
//                         snapped={true}
//                     />
//                 </View>
//             </View>
//         );
//     }

//     multiSliderValuesChange = values => {
//        if(this.props.single ){
//         this.setState({
//             second : values[0],
//         })  
//        }else{
//         this.setState({
//             multiSliderValue: values,
//             first : values[0],
//             second : values[1],
//         }) 
//        }
//         this.props.callback(values)
//     }

//     renderScale=()=> {
//         const items = [];
//         for (let i=this.props.min; i <= this.props.max; i++) {
//             items.push(
//                 <Item 
//                     value = {i}
//                     first = {this.state.first}
//                     second = {this.state.second}
//                 />
//             );
//         }
//         return items;
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     column:{
//         flexDirection:'row',
//         alignItems:'center',
//         justifyContent: 'space-between',
//         bottom:-20,
//     },
//     active:{
//         textAlign: 'center',
//         fontSize:20,
//         color:'#5e5e5e',
//     },
//     inactive:{
//         textAlign: 'center',
//         fontWeight:'normal',
//         color:'#bdc3c7',
//     },
//     line:{
//         textAlign: 'center',
//     }
// }); 

import React from 'react';
import { View,TextInput, TouchableOpacity,Text, AsyncStorage } from 'react-native';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import Firebase from '@react-native-firebase/app';
// import message from '@react-native-firebase/messaging';
var PushNotification = require("react-native-push-notification");


export default class CustomSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',filelist :[]
        }
    }
    // async requestUserPermission() {
    //     const authStatus = await message().requestPermission();
    //     const enabled =
    //       authStatus === message.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === message.AuthorizationStatus.PROVISIONAL;
      
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    //   }
    //   getFcmToken = async () => {
    //     const fcmToken = await message().getToken();
    //     if (fcmToken) {
    //      console.log(fcmToken);
    //      console.log("Your Firebase Token is:", fcmToken);
    //     } else {
    //         this.getFcmToken()
    //      console.log("Failed", "No token received");
    //     }
    //   }
    componentDidMount(){
        // Firebase.initializeApp(this);
        // this.requestUserPermission()
        PushNotification.configure({
            
            onRegister: function (token) {
              console.log("TOKEN:", token);
              alert(JSON.stringify(token))
            },

            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
              alert(JSON.stringify(notification))
           
            },
           
            onAction: function (notification) {
              console.log("ACTION:", notification.action);
              console.log("NOTIFICATION:", notification);
           
    
            },
           
           
            onRegistrationError: function(err) {
              console.error(err.message, err);
            },
           
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
           
            
            popInitialNotification: true,
           
            requestPermissions: true,
        });
    }

    // componentDidMount(){
    //     this.checkPermission()
    // }

    // async checkPermission(){ 
    //     console.log("check permition function call")
    //     const enabled = await messaging().hasPermission();
    //     console.log("check permision function call enablw",enabled)
    //     if(enabled){
    //         this.getToken();
    //     }else {
    //         this.requestPermission();
    //     }
    // }

    // async getToken(){
    //     console.log("get token")
    //     // let fcmToken = await AsyncStorage.read.hasPermission();
    //     // console.log("check permision function call enablw",fcmToken)
    //     // if(!fcmToken){
    //         fcmToken = await messaging().getToken();
    //         // if(fcmToken){
    //             console.log("check fcm token", fcmToken)
    //         // }
    //     // }
    // }

    vonSelectImage = () => {
        let newDataimg = this.state.filelist;
        let item = {
            item1: this.state.email,
        };
        newDataimg.push(item);
        this.setState({ filelist: newDataimg,email:'' })
        alert(JSON.stringify(this.state.filelist))
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    placeholder="Email ID"
                    onChangeText={(text) => this.setState({email:text})}
                    value={this.state.email}
                />
                <TouchableOpacity onPress={() => this.vonSelectImage()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
