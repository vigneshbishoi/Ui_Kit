import React from 'react';
import { Image,Text ,AppState} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'
import LocalNotification from '../../components/Push_Notification/index'
import Localnoti from '../../components/Push_Notification/LocalNotification'

export default class Splash extends React.Component {

    constructor() {
        super();
        this.state = {
            appState: AppState.currentState,
        }
    }

    ReadData = async () => {
        try {
            const GetEmail = await AsyncStorage.getItem('Email');
            const GetPassword = await AsyncStorage.getItem('Password');
            const showasync = GetEmail + GetPassword;
            if (GetEmail == null && GetPassword == null) {
                this.props.navigation.navigate('login')
            } else if (GetEmail != null && GetPassword != null) {
                // alert('Welcome');
                this.props.navigation.navigate('home')
            }
            else {
                // alert('problem');
                this.props.navigation.navigate('login')
            }
        } catch (err) {
            alert(err);
        }

    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {

        this.setState({ appState: nextAppState });

        if (nextAppState === 'background') {

            // Do something here on app background.
            console.log("App is in Background Mode.")
        }

        if (nextAppState === 'active') {

            LocalNotification(true, this.props.navigation);
            // Do something here on app active foreground mode.
            console.log("App is in Active Foreground Mode.")
        }

        if (nextAppState === 'inactive') {

            // Do something here on app inactive mode.
            console.log("App is in inactive Mode.")
        }
    };


    render() {
        setTimeout(() => {
            this.ReadData()
        }, 3000);
        return (
            <Image style={{ flex: 1, resizeMode: 'stretch', width: wp('100%'), height: hp('100%') }} source={require('../../assets/image/splash.png')} />
        )
    }
}

// import React, {Component} from 'react';
// import {AppState, Text} from 'react-native';

// export default class AppStateExample extends Component {
//   state = {
//     appState: AppState.currentState,
//   };

//   componentDidMount() {
//     AppState.addEventListener('change', this._handleAppStateChange);
//   }

//   componentWillUnmount() {
//     AppState.removeEventListener('change', this._handleAppStateChange);
//   }

//   _handleAppStateChange = (nextAppState) => {
//     if (
//       this.state.appState.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       alert('App has come to the foreground!');
//     }
//     this.setState({appState: nextAppState});
//   };

//   render() {
//     return <Text>Current state is: {this.state.appState}</Text>;
//   }
// }