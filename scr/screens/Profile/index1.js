import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatGrid } from 'react-native-super-grid';
import Data from '../../../Array';
import Back from '../../components/BackTo/index'

const Tab = createMaterialTopTabNavigator();

export default class Heder extends React.Component {

    constructor() {
        super();
        this.state = {
            changecolortext1: false, changecolortext2: false, changecolortext3: false, itemsCount: 10
        };
    }

    Recipes() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <View style={{ flex: 1, width: ('100%'), marginTop: hp('1%') }}>
                    <FlatGrid
                        showsVerticalScrollIndicator={false}
                        data={Data.slice(0, 10)}
                        spacing={5}
                        itemDimension={135}
                        renderItem={({ item, index }) => (
                            <View style={s.TO}>
                                <Image
                                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, width: wp('38%'), height: hp('13%'), resizeMode: 'cover' }}
                                    source={item.img} />
                                <Text style={{ backgroundColor: "white", alignSelf: 'center', fontSize: hp('1.9%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                            </View>
                        )}
                    // onEndReached={() => {
                    //     if (this.state.itemsCount < Data.length) {
                    //         this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 10) }));
                    //     }
                    // }}
                    />
                </View>
            </View>
        );
    }

    Following() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, width: ('100%'), }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Data}
                        renderItem={({ item, index }) => (
                            // <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile1')}>
                            <TouchableOpacity>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row', backgroundColor: 'white', borderWidth: 0.5, paddingVertical: hp('1%') }}>
                                    <Image style={s.logoimage} resizeMode='contain' source={require('../../assets/image/Avatar1.png')}></Image>
                                    <View>
                                        <View >
                                            <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Bold' }}>{item.name}</Text>
                                        </View>
                                        <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular', color: "grey" }}>{item.foodtype}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
                                            <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}>{item.like} followers</Text>
                                            <Image style={{ height: hp('3%') }} resizeMode='stretch' source={require('../../assets/image/Dot.png')}></Image>
                                            <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}>{item.comment} likes</Text>
                                        </View>
                                    </View>
                                </View >
                            </TouchableOpacity>)}
                        keyExtractor={(item, index) => index.toString()} />

                </View>
            </View>
        );
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
                            <TouchableOpacity style={s.headerBtn}  >
                                <Image style={s.headerimage} resizeMode='contain' source={require('../../assets/image/Menu.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: hp('2.4%'), flexDirection: 'row', backgroundColor: 'white' }}>
                            <Image style={s.logoimage} resizeMode='contain' source={require('../../assets/image/Avatar1.png')}></Image>
                            <View>
                                <View style={s.namehederView}>
                                    <Text style={{ alignSelf: 'center', fontSize: hp('2%'), fontFamily: 'Nunito-Bold' }}>Nick Shah</Text>
                                </View>
                                <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular', color: "grey" }}>Potato Master</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}>followers</Text>
                                    <Image style={{ height: hp('3%') }} resizeMode='stretch' source={require('../../assets/image/Dot.png')}></Image>
                                    <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}> likes</Text>
                                </View>
                            </View>
                        </View >
                        <TouchableOpacity style={s.modelclick2} >
                            <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Bold' }}>Follow</Text>
                        </TouchableOpacity>
                        <Image style={s.line} source={require('../../assets/image/SeparatorLine.png')}></Image>
                        <View style={{ marginTop: hp('3.5%'), paddingHorizontal: wp('10%'), flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' }}>
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold', marginRight: wp('20%') }}>{Data.length}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>40</Text>
                            {/* <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>20</Text>
                            <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>30</Text>
                            <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>40</Text> */}
                        </View>
                        <View style={{ backgroundColor: 'red', width: wp('90%'), height: hp('54%'), }}>
                            <Tab.Navigator tabBarOptions={{
                                labelStyle: { fontSize: 14 },
                                tabStyle: {},
                                indicatorStyle: { backgroundColor: 'green', },
                            }}>
                                <Tab.Screen name="Recipes" component={this.Recipes} />
                                <Tab.Screen name="Following" component={this.Following} />
                            </Tab.Navigator>
                        </View>
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
        flexDirection: 'row', height: hp('4%'), width: wp('20%'), justifyContent: 'flex-end', alignItems: 'center'
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
        marginTop: hp('0.5%')
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
    modelclick2: {
        backgroundColor: '#28B463',
        borderRadius: 10,
        height: hp('5%'),
        width: wp('90%'),
        padding: ('2%'),marginTop: hp('2%'),
        marginVertical: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
})
