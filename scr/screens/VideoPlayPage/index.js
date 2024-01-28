import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Modal, Image, StyleSheet, RefreshControl, TextInput, SafeAreaView, Alert, ImageBackground } from 'react-native';
import Back from '../../components/BackTo/index'
// import {Back} from '../../components/index'
import Data from '../../../Array';
import { MyRecipes, ListClickData, AddImg, Input, ModalInput } from '../../components/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import { request } from 'react-native-permissions';
import { color } from 'react-native-reanimated';
import Ingrediends from '../../ArreyIngrediends';


export default class HomeItem extends React.Component {

    constructor() {
        super();
        this.state = {
            step1: '', step2: '', step3: '', ingredientsshow: false, IArry: [], IngrediansImgArry: []
        }
    }



    componentDidMount() {
        this.ReadData();
    }

    ReadData = async () => {
        try {
            const Getstep1 = await AsyncStorage.getItem('step1');
            const Getstep2 = await AsyncStorage.getItem('step2');
            const Getstep3 = await AsyncStorage.getItem('step3');
            const GetIArry = await AsyncStorage.getItem('IngrediansArry');
            const GetImgArry = await AsyncStorage.getItem('IngrediansImgArry');
            this.setState({
                step1: Getstep1, step2: Getstep2, step3: Getstep3, IArry: JSON.parse(GetIArry), IngrediansImgArry: JSON.parse(GetImgArry),
            })
        } catch (err) {
            alert(err);
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, backgroundColor: 'white', }}  >
                    <View style={{ marginLeft: wp('3%') }}>
                        <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('homeitem')} />
                    </View>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ marginLeft: wp('3%') }}>
                            <Text style={{ fontSize: hp('3%'), marginLeft: wp('2%'), fontFamily: 'Nunito-Bold' }}>Cooking Mood</Text>
                            <Text style={{ fontSize: hp('2.3%'), marginLeft: wp('2%'), marginTop: hp('2%'), fontFamily: 'Nunito-Bold' }}>Almond and Saffron Bonbons</Text>
                        </View>
                        <View>
                            <Video source={false ? { uri: require('../../assets/videos/video1.mp4') } : require('../../assets/videos/video1.mp4')}
                                style={{ width: wp('100%'), height: hp('25.5%'), marginTop: hp('2.5%') }}
                                controls
                                muted
                                resizeMode='cover' />
                        </View>
                        <View style={{ marginLeft: ('5%'), width: wp('85%'), marginTop: hp('2.7%'), height: hp('3%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>Steps</Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ ingredientsshow: true, })} >
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular', color: 'green' }}>View Ingrediends</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <View style={{ margin: wp('5%'), width: ('75%') }}>
                                <TouchableOpacity onPress={() => Alert.alert("Step 1 Full Detail", this.state.step1)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering1.png')}></Image>
                                        <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step1}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Alert.alert("Step 2 Full Detail", this.state.step2)}>
                                    <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                        <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering.png')}></Image>
                                        <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step2}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Alert.alert("Step 3 Full Detail", this.state.step3)}>
                                    <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                        <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering2.png')}></Image>
                                        <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step3}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    <Modal transparent={true} visible={this.state.ingredientsshow}>
                        <View style={{ flex: 1, flexDirection: 'column-reverse', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('43%'), width: wp('100%'), backgroundColor: 'white', borderRadius: 10, padding: ('7%'), }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Ingredients</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>all ingredients are here</Text>
                                    <View style={{ height: hp('8%'), marginTop: hp('3%'), width: wp('85%') }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.IngrediansImgArry}
                                            horizontal
                                            renderItem={({ item, index }) => (
                                                <View style={{ backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                                                    <TouchableOpacity >
                                                        <Image style={{ height: 40, width: 40, borderRadius: 20, marginHorizontal: hp('1%') }} source={item.ingredientimg} />
                                                        <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>{item.ingredientname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                    <Text style={{ fontSize: hp('1.6%'), marginTop: hp('2.7%'),marginBottom: hp('2%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>External ingredients</Text>
                                    <View style={{width: wp('85%') }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.IArry}
                                            horizontal
                                            renderItem={({ item, index }) => (
                                                <View style={{ backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                                                    <TouchableOpacity >
                                                        <Text style={{ fontSize: hp('1.6%'), margin: 1, color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center', marginLeft: hp('1%') }}>{item.ingredientname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick3} onPress={() => this.setState({ ingredientsshow: false })} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </SafeAreaView>
        )
    }
}

const s = StyleSheet.create(
    {
        modelclick3: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1, borderColor: 'green',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('85%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
)