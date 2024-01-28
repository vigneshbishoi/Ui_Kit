import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text, FlatList, RefreshControl, Switch } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatGrid } from 'react-native-super-grid';
import Data from '../../../Array';
import AsyncStorage from '@react-native-community/async-storage'

export default class Heder extends React.Component {

    constructor() {
        super();
        this.state = {
            changecolortext1: false, changecolortext2: false, changecolortext3: false, itemsCount: 10, valueswitch: false,
        };
    }

    Remove = async () => {
        try {
            await AsyncStorage.removeItem('Email')
            await AsyncStorage.getItem('Password')
            // await AsyncStorage.removeItem('NewRecipeLogo')
            // await AsyncStorage.removeItem('RecipeName')
            // await AsyncStorage.removeItem('@MySuperStore:key')
            // await AsyncStorage.removeItem('IngrediansArry')
            // await AsyncStorage.removeItem('IngrediansImgArry')
            // await AsyncStorage.removeItem('step1')
            // await AsyncStorage.removeItem('step2')
            // await AsyncStorage.removeItem('step3')
            // await AsyncStorage.removeItem('time')
            // await AsyncStorage.removeItem('nutrition')
            // await AsyncStorage.removeItem('tags')
            this.props.navigation.navigate('login')
        } catch (error) {
            alert(err);
        }
    }

    render() {
        return (
            <View style={s.Main} >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: wp('5%') }}>
                        <View style={s.hederView}>
                            <TouchableOpacity style={{ flexDirection: 'row', width: wp('30%'), }} onPress={() => this.props.navigation.navigate('home')}>
                                <Image style={{ height: hp('3.8%'), width: wp('5%') }} resizeMode='contain' source={require('../../assets/image/ArrowLeft.png')}></Image>
                                <Text style={{ alignSelf: 'center', fontFamily: 'Nunito-Regular', color: 'grey', fontSize: hp('1.6%') }}>Back</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity style={s.headerBtn} onPress={() => this.Remove()} >
                                    <Image style={s.headerimage} resizeMode='contain' source={require('../../assets/image/Logout.png')}></Image>
                                    <Text style={{ fontSize: hp('1.9%'), color: '#30BE76', fontFamily: 'Nunito-Regular', }}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>Setting</Text>
                        <Text style={{ fontSize: hp('1.6%'), marginTop: hp('2.7%'), fontFamily: 'Nunito-Bold', color: 'grey' }}>Push Notification</Text>
                        <View style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>Notify me for followers</Text>
                            <Switch
                                trackColor={{ false: "silver", true: "#30BE76" }}
                                thumbColor={this.state.valueswitch ? "white" : "white"}
                                ios_backgroundColor="silver"
                                onValueChange={text => this.setState({ valueswitch: text })}
                                value={this.state.valueswitch}
                            />
                        </View>
                        <View style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>When someone send me a message</Text>
                            <Switch
                                trackColor={{ false: "silver", true: "#30BE76" }}
                                thumbColor={this.state.valueswitch ? "white" : "white"}
                                ios_backgroundColor="silver"
                                onValueChange={text => this.setState({ valueswitch: text })}
                                value={this.state.valueswitch}
                            />
                        </View>
                        <View style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>When someone do live cooking</Text>
                            <Switch
                                trackColor={{ false: "silver", true: "#30BE76" }}
                                thumbColor={this.state.valueswitch ? "white" : "white"}
                                ios_backgroundColor="silver"
                                onValueChange={text => this.setState({ valueswitch: text })}
                                value={this.state.valueswitch}
                            />
                        </View>
                        <Image style={s.line} source={require('../../assets/image/SeparatorLine.png')}></Image>
                        <Text style={{ fontSize: hp('1.6%'), marginTop: hp('2.7%'), fontFamily: 'Nunito-Bold', color: 'grey' }}>Private Setting</Text>
                        <View style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>Followers can see my saved recipes</Text>
                            <Switch
                                trackColor={{ false: "silver", true: "#30BE76" }}
                                thumbColor={this.state.valueswitch ? "white" : "white"}
                                ios_backgroundColor="silver"
                                onValueChange={text => this.setState({ valueswitch: text })}
                                value={this.state.valueswitch}
                            />
                        </View>
                        <View style={{ width: wp('90%'), marginTop: hp('1%'), height: hp('12%'), backgroundColor: '#D7DBDD', borderRadius: 5 }}>
                            <Text style={{ fontSize: wp('3.5%'), marginTop: hp('1.5%'), padding: hp('1%'), fontFamily: 'Nunito-Bold', color: 'grey' }}>If disabled, you won’t be able to see recipes saved by other profiles. Leave this enabled to share your collected recipes to others. why this matter?</Text>
                        </View>
                        <View style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>Followers can see profiles I follow</Text>
                            <Switch
                                trackColor={{ false: "silver", true: "#30BE76" }}
                                thumbColor={this.state.valueswitch ? "white" : "white"}
                                ios_backgroundColor="silver"
                                onValueChange={text => this.setState({ valueswitch: text })}
                                value={this.state.valueswitch}
                            />
                        </View>
                        <Image style={s.line} source={require('../../assets/image/SeparatorLine.png')}></Image>
                        <TouchableOpacity onPress={() => alert(this.state.valueswitch)} style={{ width: wp('90%'), marginTop: hp('2.5%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Regular' }}>Change Password</Text>
                            <Image style={s.headerimage} resizeMode='contain' source={require('../../assets/image/ArrowRight.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

        )
    }
}

const s = StyleSheet.create({
    Main: {
        flex: 1, backgroundColor: 'white'
    },
    hederView: {
        width: wp('90%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between',
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
        height: hp('10%'), width: wp('25%'), marginRight: wp('1%')
    },
    line: {
        backgroundColor: 'white',
        height: hp('0.2%'),
        width: wp('90%'),
        marginTop: hp('3%')
    },
    TO: {
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderRadius: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
        height: hp('16%'),
        width: wp('38%'), marginTop: hp('0.5%'), marginLeft: hp('1%'), marginTop: hp('1%')

    },
})
