import React from 'react';
import { Image, ImageBackground, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'
import Back from '../../components/BackTo/index'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Carousel from 'react-native-snap-carousel';
import Data from '../../../Array';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
    return (
        <View style={{ backgroundColor: 'white' }} >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Data.slice(0, 10)}
                renderItem={({ item, index }) => (
                    <View style={{ width: wp('90%'), marginLeft: wp('5%'), flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 60, margin: wp('3%'), height: 60, borderRadius: 30, borderWidth: 0.1 }} resizeMode='cover' source={item.img}></Image>
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: wp('5%'), width: ('75%') }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%'), marginBottom: wp('3%') }} resizeMode='contain' source={require('../../assets/image/Numbering1.png')}></Image>
                    <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>Heat a Belgian waffle iron.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering.png')}></Image>
                    <Text style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>Mix the flour, sugar, and baking powder together in a mixing bowl. Stir in 1 cup eggnog, butter, and the egg until well blended. Add more eggnog if needed to make a pourable batter.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering2.png')}></Image>
                    <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>Lightly grease or spray the waffle iron with non-stick cooking spray. Pour some batter onto the preheated waffle iron,…</Text>
                </View>
            </View>
        </View>
    );
}

function SettingsScreen1() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: wp('5%'), width: ('75%'), }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Serice Time</Text>
                    <Text style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>12 Mins</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Nutrition Facts</Text>
                    <Text style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>222 calories{"\n"}'6.2 g fat
    {"\n"}7.2 g carbohydrates
    {"\n"}28.6 g protein
    {"\n"}68 mg cholesterol
    {"\n"}268 mg sodium</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: hp('1.7%'), width: wp('40%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), color: 'silver' }}>Tags</Text>
                    <Text style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>Sweet, Coconut, Quick, Easy, Homemade</Text>
                </View>

            </View>
        </View>
    );
}



export default class Splash extends React.Component {

    constructor() {
        super()
        this.state = { showme: true, showme1: true, showme2: false, itemsCount: 2, }
    }

    renderItem({ item, index, }) {
        return (
            <Image style={{ width: wp('25%'), marginHorizontal: wp('3%') }} source={item.img} resizeMode='cover' />
        )

    }
    render() {


        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: hp('45%'), width: wp('100%') }}>
                    <ImageBackground style={s.backimg} resizeMode='cover' source={require('../../assets/image/foodimage.png')}>
                        <ImageBackground style={s.backimg} resizeMode='cover' source={require('../../assets/image/bgfoodtype.png')}>
                            <SafeAreaView>
                                <View style={{ height: hp('39.5%'), width: wp('100%'), justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                        <Back tintColor={'white'} color={'white'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('home')} />
                                        <TouchableOpacity style={s.touchBtn} onPress={() => this.props.navigation.navigate('VideoPlayPAge')} >
                                            <Image style={{ height: hp('2%'), width: wp('5%'), tintColor: 'white' }} resizeMode='contain' source={require('../../assets/image/Play.png')}></Image>
                                            <Text style={{ fontSize: hp('1.7%'), color: 'white', fontFamily: 'Nunito-Bold', marginLeft: wp('1%') }}>Cook</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontSize: hp('3.5%'), marginBottom: hp('2%'), marginLeft: wp('5%'), color: 'white', fontFamily: 'Nunito-Bold' }}>Engine-Cooked honey orange pancake</Text>
                                </View>
                            </SafeAreaView>
                        </ImageBackground>
                    </ImageBackground>
                </View>
                <View style={{ height: hp('13%'), width: wp('100%') }}>
                    <View style={{ flexDirection: 'row', marginTop: hp('2%'), width: wp('100%') }}>
                        {this.state.showme ? (
                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsVerticalScrollIndicator={false}
                                    data={Data.slice(0, this.state.itemsCount)}
                                    renderItem={(item, index) => this.renderItem(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                            </View>

                        ) : null}
                        {this.state.showme1 ? (
                            <TouchableOpacity onPress={() => this.setState({ showme: false, showMe2: true, showme1: false })}>
                                <ImageBackground style={{ justifyContent: 'center', alignItems: 'center', height: hp('11%'), width: wp('30%'), marginLeft: wp('2%') }} source={require('../../assets/image/addimg.png')} resizeMode='cover'>
                                    <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Bold', }}>{Data.length - 2}+</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ) : null}
                        {this.state.showMe2 ? (

                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={Data}
                                    renderItem={(item, index) => this.renderItem(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
                <Tab.Navigator tabBarOptions={{
                    scrollEnabled: true,
                    labelStyle: { fontSize: 12 },
                    tabStyle: { width: wp('40%'), marginTop: hp('1.5%') },
                    style: {},
                    indicatorStyle: { backgroundColor: 'green', },
                }}>
                    <Tab.Screen name="Ingredients" component={HomeScreen} />
                    <Tab.Screen name="How to Cook" component={SettingsScreen} />
                    <Tab.Screen name="Additional Info" component={SettingsScreen1} />
                </Tab.Navigator>
            </View>

        )
    }
}

const s = StyleSheet.create({
    backimg: {
        height: hp('45%'), width: wp('100%')
    },
    touchBtn: {
        justifyContent: 'center', flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: 'white', height: hp('3.3%'),
        width: wp('20%'), justifyContent: 'center', alignItems: 'center', marginRight: wp('5%')
    }
})
