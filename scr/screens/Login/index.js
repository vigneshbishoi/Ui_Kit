import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input, { Textinputfiled } from '../../components/inputTextfiled/index'
import AsyncStorage from '@react-native-community/async-storage'
import ButtonSet from '../../components/CustomButton/Index'


export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { email: '', emailerror: '', passerror: '', passwordTI: '', Data: '', api: '' };

    }

    componentDidMount() {
        this.ApiCall();
    }

    StoreData = async () => {
        // alert(this.state.api.data.key)
        try {
            await AsyncStorage.setItem('Email', this.state.email);
            await AsyncStorage.setItem('Password', this.state.passwordTI);
            await AsyncStorage.setItem('Token', this.state.api.data.token);
            alert("HEllo");
        } catch (err) {
            alert(err);
        }
    }

    // ReadData = async () => {
    //     try {
    //         const GetEmail = await AsyncStorage.getItem('Email');
    //         const GetPassword = await AsyncStorage.getItem('Password');
    //         const showasync = GetEmail + GetPassword;
    //         // if (GetEmail !== null && GetPassword !== null) {
    //         //     alert(showasync);
    //         // }
    //         if (GetEmail == null && GetPassword == null) {
    //             alert('Fill the Detail')
    //         } else if (this.state.email == GetEmail && this.state.passwordTI == GetPassword) {
    //             this.props.navigation.navigate('home')
    //             alert('Welcome');
    //         }
    //         else {
    //             alert('First create account')
    //         }
    //     } catch (err) {
    //         alert(err);
    //     }

    // }


    ReadData = () => {
        // alert(this.state.email)
        console.log('--', this.state.api.data.email);
        if (this.state.email == '' && this.state.passwordTI == '') {
            this.setState({ emailerror: "Please enter your Email." })
            this.setState({ passerror: "Please enter your Password." })
        }
        else if (this.state.email == '') {
            this.setState({ emailerror: "Please enter your Email." })
        }
        // else if (this.state.email != '') {
        //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     if (reg.test(this.state.email) === false) {
        //         this.setState({ emailerror: "Please enter valid Email." })
        //     }
        //     else {
                
        //     }
        // }
        else if (this.state.passwordTI == '') {
            this.setState({ passerror: "Please enter your Password." })
        }
        else if (this.state.email == "vasoya44@gmail.com" && this.state.passwordTI == "Pink@1234") {
            this.props.navigation.navigate('home')
            this.StoreData();
        } else {
            this.setState({ emailerror: "" })
            this.setState({ passerror: "" })
        }
    }

    Go = () => {
        if (this.setState.email == GetEmail) {
            this.props.navigation.navigate('home')
            alert('Hello');
        } else {
            alert('First create account')
        }
    }

    Remove = async () => {
        try {
            await AsyncStorage.removeItem('Email')
            await AsyncStorage.getItem('Password')
        } catch (error) {
            alert(err);
        }
    };

    showData = () => {
        var showData = this.state.passwordTI + this.state.email;
        // alert(showData)
        this.setState({ Data: showData })
    }

    ValidEmail = () => {
        console.log('TEST');
        if (this.state.email == null) {
            this.setState({ emailerror: "Please enter your Email." })
        }
        else {
            this.setState({ emailerror: "" });
        }
    }
    ValidPass = () => {
        if (this.state.passwordTI == null) {
            this.setState({ passerror: "Please enter your Password." })
        } else {
            this.setState({ passerror: "" });
        }
    }

    ApiCall = () => {
        fetch('https://dev.quickfriendsapp.com/api/v1/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": "vasoya44@gmail.com",
                "password": "Pink@1234"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log('+++', json.data.email);
                this.setState({ api: json })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.flex1} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <ScrollView style={styles.flex1} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.flex1}>
                        {/* <StatusBar
                            barStyle="light-content"
                            backgroundColor="white"
                        /> */}
                        <View >
                            <ImageBackground style={styles.ImageBackgroundstyle} resizeMode='stretch' source={require('../../assets/image/login_img.png')}>
                                <Image style={styles.logo} resizeMode='contain' source={require('../../assets/image/newlogo.png')}></Image>
                                <Text style={styles.textTitle}>Welcome Back!</Text>
                            </ImageBackground>
                        </View>
                        <View >
                            <Text style={styles.staticText}>Please login to continue.</Text>
                            <View style={{ marginStart: ('5%'), marginTop: ('10%'), }}>
                                <Input keyboardType={'default'} onBlur={() => this.ValidEmail()} valueText='Email Address' placeholderget='Enter your email' textInputValue={this.state.email} onChangeTextValue={email => this.setState({ email })} />
                                <Text style={{ color: 'red', marginTop: hp('1%') }}>{this.state.emailerror}</Text>
                            </View>
                            <View style={{ marginStart: ('5%'), marginTop: ('5%'), }}>
                                <View style={styles.splitView}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('1.5%'), color: 'grey' }}>Password</Text>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('1.7%'), color: 'black' }}>Forgot password?</Text>
                                </View>
                                <TextInput onBlur={() => this.ValidPass()} keyboardType='default' keyboardType={'default'} style={{ height: hp('7%'), width: wp('90%'), borderBottomColor: 'silver', borderBottomWidth: 1 }} value={this.state.passwordTI} onChangeText={passwordTI => this.setState({ passwordTI })} placeholder={'Enter your Password'} secureTextEntry={true}></TextInput>
                                <Text style={{ color: 'red', marginTop: hp('1%') }}>{this.state.passerror}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ButtonSet ClickText={'Login Here'} Press={this.ReadData} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}>
                                {/* <TouchableOpacity onPress={this.ReadData}> */}
                                <Text style={{ alignSelf: 'center', fontSize: hp('1.8%'), marginTop: hp('3%') }}>New Scratch?</Text>
                                <Text style={{ color: 'green', marginTop: ('5%'), fontSize: hp('2%') }}>Create Account Here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    flex1: {
        flexGrow: 1
    },
    ImageBackgroundstyle: {
        width: wp('100%'),
        height: hp('35%'),
        justifyContent: 'center'
    },
    logo: {
        // minWidth: wp('25%'),
        minHeight: hp('3%'),
        marginStart: ('5%')
    },
    textTitle: {
        marginStart: ('5%'),
        marginTop: ('12%'),
        fontFamily: 'Nunito-Bold',
        fontSize: hp('2.5%')
    },
    staticText: {
        marginStart: ('5%'),
        fontFamily: 'Nunito-Regular',
        fontSize: hp('1.5%'),
        color: 'grey',
        marginTop: hp('2%')
    },
    splitView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('90%')
    }
})

