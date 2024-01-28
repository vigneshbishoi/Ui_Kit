import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, TextInput, Text, FlatList, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from '../../components/BackTo/index'
import ImagePicker from 'react-native-image-crop-picker';
import Input, { Textinputfiled } from '../../components/inputTextfiled/index'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollPager } from 'react-native-tab-view';


export default class Heder extends React.Component {
    constructor() {
        super();
        this.state = {
            image: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
            name: '', bio: '', email: '', phone: '', token: '', profileapi: '', lastname: '', address: ''
        }
    }
    componentDidMount() {
        this.ReadData();

    }
    ReadData = async () => {
        try {
            var GetEmail = await AsyncStorage.getItem('Token');
            // alert(GetEmail)
            fetch('https://dev.quickfriendsapp.com/api/v1/auth/user/', {
                method: 'GET',
                headers: {
                    // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6IkJoYXJhdF9WYXNveWEiLCJleHAiOjE2MDQ0ODcwNjUsImVtYWlsIjoiVmFzb3lhNDRAZ21haWwuY29tIn0._dD8ECtFY-2Mm6B0RjPiTG8Q4g7wWu4FrCaAwFxIkk4'
                    'Authorization': `JWT ${GetEmail}`
                },
                // body: JSON.stringify({
                //     "email": "vasoya44@gmail.com",
                //     "password": "Pink@1234"
                // })
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('9', json);
                    this.setState({
                        profileapi: json, name: json.data.first_name,
                        email: json.data.email, phone: json.data.phone, image: json.data.photo
                        , lastname: json.data.last_name
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (err) {
            alert(err);
        }

    }

    StoreData = async () => {
        alert(this.state.image)
        let formdata = new FormData();
        formdata.append("first_name", this.state.name)
        formdata.append("last_name", this.state.lastname)
        formdata.append("photo", {uri: this.state.image, name: 'image.jpg', type: 'image/jpeg'})
        try {
            const GetEmail = await AsyncStorage.getItem('Token');
            fetch('https://dev.quickfriendsapp.com/api/v1/auth/user/', {
                method: 'PUT',
                headers: {
                    'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6IkJoYXJhdF9WYXNveWEiLCJleHAiOjE2MDQ0ODcwNjUsImVtYWlsIjoiVmFzb3lhNDRAZ21haWwuY29tIn0._dD8ECtFY-2Mm6B0RjPiTG8Q4g7wWu4FrCaAwFxIkk4'
                },
                body: formdata,
            })
                .then((response) => response.json())
                .then((json) => {

                })
                .catch((error) => {
                    console.error(error);
                });

        } catch (err) {
            alert(err);
        }

    }


    OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ image: image.uri })
            // this.onSelectImage(image);
            console.log(image);
        });
    };

    OpenGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({ image: image.path })
            // this.onSelectImage(image);
            this.setState({ visibleValue: false })
        });
    };

    ApiCall = () => {

    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginHorizontal: wp('5%') }}>
                        <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('home')} />
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={s.hederView}>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>Edit Profile</Text>
                                <ImageBackground style={s.logoimage} resizeMode='contain' source={require('../../assets/image/Avatar.png')}>
                                    <Image style={s.logoimage2} resizeMode='cover' source={{ uri: this.state.image }}></Image>
                                </ImageBackground>
                                <TouchableOpacity onPress={() => this.OpenGallery()}>
                                    <Text style={{ alignSelf: "center", color: "#28B463", fontSize: hp('1.9%'), fontFamily: 'Nunito-Bold' }}>Edit Profile Picture</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: hp('3%'), height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Full Name' placeholderget='Enter your full name' textInputValue={this.state.name} onChangeTextValue={name => this.setState({ name })} />
                                </View>
                                <View style={{ height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Last Name' placeholderget='Enter your last name' textInputValue={this.state.lastname} onChangeTextValue={lastname => this.setState({ lastname })} />
                                </View>
                                <View style={{ height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Bio' placeholderget='Enter your bio' textInputValue={this.state.bio} onChangeTextValue={bio => this.setState({ bio })} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Bold' }}>Private Information</Text>
                                <View style={{ marginTop: hp('2%'), height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Email' placeholderget='Enter your email' textInputValue={this.state.email} onChangeTextValue={email => this.setState({ email })} />
                                </View>
                                <View style={{ height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Phone' placeholderget='Enter your phone number' textInputValue={this.state.phone} onChangeTextValue={phone => this.setState({ phone })} />
                                </View>
                                <View style={{ height: hp('11%') }}>
                                    <Input keyboardType={'default'} valueText='Address' placeholderget='Enter your address' textInputValue={this.state.address} onChangeTextValue={address => this.setState({ address })} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginHorizontal: wp('5%') }}>
                        <TouchableOpacity style={s.modelclick2} onPress={() => this.StoreData()} >
                            <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Bold' }}>Save Profile</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>

        )
    }
}

const s = StyleSheet.create({
    Main: {
        flex: 1, backgroundColor: 'white'
    },
    hederView: {
        width: wp('90%'),
    },
    namehederView: {
        width: wp('64.5%'), height: hp('3%'), marginTop: hp('0.2%'), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white'
    },
    headerBtn: {
        flexDirection: 'row', height: hp('4%'), width: wp('40%'), justifyContent: 'flex-end', alignItems: 'center'
    },
    headerimage: {
        height: hp('3%'), width: wp('5%'), marginRight: wp('1%')
    },
    logoimage: {
        height: hp('13%'), width: wp('30%'), alignSelf: 'center', marginTop: hp('4%'), marginBottom: hp('1%'),
    },
    logoimage2: {
        height: hp('13%'), width: hp('13%'), alignSelf: 'center', marginBottom: hp('1%'), borderRadius: hp('6.5%'),
    },
    line: {
        backgroundColor: 'white',
        height: hp('0.2%'),
        width: wp('90%'),
        marginTop: hp('3%'),
    },
    modelclick2: {
        backgroundColor: '#28B463',
        borderRadius: 10,
        height: hp('5%'),
        width: wp('90%'),
        padding: ('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: wp('3%'),
        flexDirection: 'column-reverse'
    },
    input: {
        marginTop: 800,
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: 'red'
    },
    topView: {
        height: 800,
    },
    keyborderView: {
        flex: 1
    }
})
