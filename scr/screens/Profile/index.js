import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text, FlatList, RefreshControl } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatGrid } from 'react-native-super-grid';
import Data from '../../../Array';

const Tab = createMaterialTopTabNavigator();

function Recipes() {
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
                // refreshControl={
                //     <RefreshControl
                //         refreshing={null}
                //         onRefresh={setTimeout(() => alert("Refresing"), 2000)}
                //     />}
                // onEndReached={() => {
                //     console.log("++++");
                //     if (this.state.itemsCount < Data.length) {
                //         this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 10) }));
                //     }
                // }}
                />
            </View>
        </View>
    );
}
export default class Heder extends React.Component {

    constructor() {
        super();
        this.state = {
            changecolortext1: false, changecolortext2: false, changecolortext3: false, itemsCount: 10
        };
    }


    Saved() {
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
                                    <Image style={s.logoimage} resizeMode='contain' source={require('../../assets/image/Avatar.png')}></Image>
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
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>My Kitchen</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity style={s.headerBtn} onPress={() => this.props.navigation.navigate('Setting')} >
                                    <Image style={s.headerimage} resizeMode='contain' source={require('../../assets/image/Settings.png')}></Image>
                                    <Text style={{ fontSize: hp('1.9%'), color: '#30BE76', fontFamily: 'Nunito-Regular', }}>Settings</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: hp('2.4%'), flexDirection: 'row', backgroundColor: 'white' }}>
                            <Image style={s.logoimage} resizeMode='contain' source={require('../../assets/image/Avatar.png')}></Image>
                            <View>
                                <View style={s.namehederView}>
                                    <Text style={{ alignSelf: 'center', fontSize: hp('2%'), fontFamily: 'Nunito-Bold' }}>Nick Shah</Text>
                                    <TouchableOpacity style={s.headerBtn} onPress={() => this.props.navigation.navigate('EditProfile')} >
                                        <Image style={s.headerimage} resizeMode='contain' source={require('../../assets/image/Edit.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular', color: "grey" }}>Potato Master</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}>followers</Text>
                                    <Image style={{ height: hp('3%') }} resizeMode='stretch' source={require('../../assets/image/Dot.png')}></Image>
                                    <Text style={{ fontSize: hp('1.7%'), color: 'grey', fontFamily: 'Nunito-Regular' }}> likes</Text>
                                </View>
                            </View>
                        </View >
                        <Image style={s.line} source={require('../../assets/image/SeparatorLine.png')}></Image>
                        <View style={{ marginTop: hp('3.5%'), paddingHorizontal: wp('10%'), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>{Data.length}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>10</Text>
                            <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }} onPress={() => this.props.navigation.navigate('Profile1')}>{Data.length}</Text>
                            {/* <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>20</Text>
                            <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>30</Text>
                            <Text style={{color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>40</Text> */}
                        </View>
                        <View style={{ backgroundColor: 'white', width: wp('90%'), height: hp('55.5%'), }}>
                            <Tab.Navigator tabBarOptions={{
                                labelStyle: { fontSize: 14 },
                                tabStyle: {},
                                indicatorStyle: { backgroundColor: 'green', },
                            }}>
                                <Tab.Screen name="Recipes" component={Recipes} />
                                <Tab.Screen name="Saved" component={this.Saved} />
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
        width: wp('90%'), height: hp('6%'), flexDirection: 'row', justifyContent: 'space-between',
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
