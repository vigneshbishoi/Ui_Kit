import React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/inputTextfiled/index'
import ButtonSet from '../../components/CustomButton/Index'
import AsyncStorage from '@react-native-community/async-storage'


export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { email: '' };
        this.state = { name: '' };
        this.state = { passwordTI: '' };
        this.state = { Data: '' };
        this.state = { Sendemail: '' };
        this.state = { Sendpassword: '' };
        this.state = { emailerror: '' };
        this.state = { passerror: '' };
        this.state = { nameerror: '' };
    }

    StoreData = async () => {
        try {
            await AsyncStorage.setItem('Name', this.state.name);
            await AsyncStorage.setItem('Email', this.state.email);
            await AsyncStorage.setItem('Password', this.state.passwordTI);
            alert("Registration Complete");
        } catch (err) {
            alert(err);
        }
    }

    ReadData = async () => {
        try {
            const GetEmail = await AsyncStorage.getItem('Email');
            const GetPassword = await AsyncStorage.getItem('Password');
            const GetName = await AsyncStorage.getItem('Name');
            this.state.Sendpassword = this.setState(GetPassword);
            this.state.Sendpassword= this.setState(GetPassword);
            if (GetEmail !== null && GetPassword !== null && GetName !== null) {
                alert(GetName+GetEmail+GetPassword);
            }
        } catch (err) {
            alert(err);
        }
    }

    Remove = async () => {
        try {
            await AsyncStorage.removeItem('Email')
            await AsyncStorage.removeItem('Password')
        } catch (error) {
            alert(err);
        }
    };

    show = () => {
        var data = this.state.name + this.state.email + this.state.password;
        this.setState({ Data: data })
        alert('Thank you for Createing new Account \n' + data);
    }

    ValidEmail = () => {
        console.log('TEST');
        if (this.state.email == null) {
            this.setState({ emailerror: "Please enter your Email." })
        }
        else {
            this.setState({emailerror:""});
        }
    }
    ValidNAme = () => {
        if (this.state.name == null) {
            this.setState({ nameerror: "Please enter your Name." })
        }
        else {
            this.setState({nameerror:""});
        }
    }
    ValidPass = () => {
        if (this.state.passwordTI == null ) {
            this.setState({ passerror: "Please enter your Password." })
        }
        // }else if(this.state.passwordTI.length > 6 && this.state.passwordTI.length < 12){
        //     alert(this.state.passwordTI.length)
        //     this.setState({ passerror: "Password Must be in to greterthan 6." })
        // }
        else {
            this.setState({passerror:""});
        }
    }

    render() {
        const { emailsend } = this.props.route.params

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ImageBackground style={s.ImageBackgroundset} resizeMode="stretch" source={require('../../assets/image/signup.png')}>
                                <Image style={s.Imagelogo} resizeMode="stretch" source={require('../../assets/image/newlogo.png')}></Image>
                                <Text style={s.staticText}>Start{'\n'}from Scratch{emailsend}</Text>
                            </ImageBackground>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginStart: hp('2.5%'), fontFamily: 'Nunito-Regular', fontSize: hp('1.5%'), color: 'grey' }}>Create account to continue.</Text>
                            <View style={{marginStart: hp('2.5%'),marginTop: hp('3%')}}>
                                <Input keyboardType={'default'} onBlur={()=>this.ValidNAme()} placeholderget='Enter your Full Name' valueText='Full Name' textInputValue={this.state.name} onChangeTextValue={name => this.setState({ name })} />
                                <Text style={{color:'red'}}>{this.state.nameerror}</Text>
                            </View>
                            <View style={s.ViewInput}>
                                <Input keyboardType={'default'} onBlur={()=>this.ValidEmail()} placeholderget='Enter your Email' valueText='Email' textInputValue={this.state.email} onChangeTextValue={email => this.setState({ email })} />
                                <Text style={{color:'red'}}>{this.state.emailerror}</Text>
                            </View>
                            <View style={s.ViewInput}>
                                <Input keyboardType={'default'} onBlur={() => this.ValidPass()} keyboardType={'numeric'} secureTextEntry={true} placeholderget='Enter your Password' valueText='Password' textInputValue={this.state.passwordTI} onChangeTextValue={passwordTI => this.setState({ passwordTI })} />
                                <Text style={{color:'red'}}>{this.state.passerror}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <ButtonSet ClickText={'Create Account Here'} Press={this.show} /> */}
                            <ButtonSet ClickText={'Create Account Here'} Press={this.StoreData} />
                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('signup')}> */}
                            <TouchableOpacity onPress={this.ReadData,{emailget:this.state.Sendemail,passwordget:this.state.Sendpassword},()=>this.props.navigation.navigate('login')}>
                                <Text style={{ color: 'green', fontSize: hp('2%'), marginTop: ('8%') }}>Create Account Here</Text>
                                <Text style={{ alignSelf: 'center', fontSize: hp('1.8%'), marginTop: ('2%') }}>New Scratch?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const s = StyleSheet.create({

    ImageBackgroundset: {
        width: wp('100%'),
        height: hp('36%'),
        justifyContent: 'center'
    },
    Imagelogo: {
        width: wp('25%'),
        height: hp('3%'),
        marginStart: hp('2.5%')
    },
    staticText: {
        marginStart: hp('2.5%'),
        marginTop: hp('6%'),
        fontFamily: 'Nunito-Bold',
        fontSize: hp('2.5%')
    },
    ViewInput: {
        marginStart: hp('2.5%'),
        marginTop: hp('1.5%')
    }
})
