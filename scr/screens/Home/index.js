import React from 'react';
import { Image, SafeAreaView, ScrollView, View, Text, Dimensions, Alert, Modal, TouchableOpacity, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heder, ListData } from '../../components/index';
import Data from '../../../Array';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage'


const BottomTab = createBottomTabNavigator();

const image = [require('../../assets/image/img.png'),
require('../../assets/image/img1.png'),
require('../../assets/image/img2.png'),
require('../../assets/image/img.png'),
require('../../assets/image/img1.png'),
require('../../assets/image/img2.png')]

export default class Main extends React.Component {


    constructor(props) {
        super(props);
        this.state = { visibleValue: false, backgroundColor1: 'white', backgroundColor2: 'white', backgroundColor3: 'white', pressed: false };

    }
    componentDidMount() {
    }
    changeColor() {
        if (!this.state.pressed) {
            this.setState({ pressed: true, backgroundColor1: '#30BE76', backgroundColor2: 'white' });
        } else {
            this.setState({ pressed: false, backgroundColor1: 'white', backgroundColor2: '#30BE76' });
        }

    }
    changeColor3() {
        if (this.state.pressed) {
            this.setState({ pressed: false, backgroundColor3: 'white' });
        } else {
            this.setState({ pressed: true, backgroundColor3: '#30BE76' });
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

    Show = () => {
        alert(this.state.visibleValue)
        return (Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {
                    text: 'Ask me later',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                },
            ],
            { cancelable: false },
        ))
    }

    _renderItem({ item, index, }) {
        return (
            <View style={{
                backgroundColor: 'white',
                height: hp('74%'), marginHorizontal: ('1%')
            }}>
                <TouchableOpacity style={{ height: hp('74%'), }} onPress={() => this.props.navigation.navigate('homeitem')}>
                    <ListData profilename={item.name} time={item.time} Mainimage={item.img} titleName={item.hotelname}
                        discription={item.description} btnlike={()=>this.setState({visibleValue:true})} like={item.comment} comments={index} btnsave={()=>this.setState({visibleValue:true})} />
                </TouchableOpacity>

            </View>
        )

    }


    render() {
        // const numRows = Data.length
        // alert(numRows)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Heder MsgBtn={this.Show} NotBtn={this.Remove} />
                {/* <Button
        title="Press me"
        onPress={() => this.setState({visibleValue:true})}
      /> */}
                <View >
                    {/* <ScrollView horizontal={true} pagingEnabled={true} style={{ height: hp('72%'), width: wp('84%'), margin: ('8%') }}>
                        {Data.map((source) => (
                            <ListData profilename={source.name} time={source.time} Mainimage={source.img} titleName={source.hotelname}
                                discription={source.description} like={source.comment} comments={source.like} />
                        ))}
                    </ScrollView> */}
                    <View style={{ flexDirection: 'row', marginTop: hp('1.5%'), justifyContent: 'center', height: hp('78%'), width: wp('100%') }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={Data}
                            sliderWidth={wp('100%')}
                            itemWidth={wp('83.5%')}
                            renderItem={(item, index) => this._renderItem(item, index)}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                    {/* #282928 */}
                    <Modal transparent={true} visible={this.state.visibleValue}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('35%'), width: wp('80%'), backgroundColor: 'white', borderRadius: 10, padding: ('8%') }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%') }}>Save To</Text>
                                    <TouchableOpacity onPress={() => this.setState({ visibleValue: false })}>
                                        <Image style={{ height: hp('3%'), width: wp('7%'), backgroundColor: 'white' }} resizeMode='contain' source={require('../../assets/image/Close.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.backgroundColor1, height: hp('4.5%'), justifyContent: 'center', borderRadius: 5 }} onPress={() => this.changeColor()}>
                                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2%'), marginLeft: wp('2%') }}>Western</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: this.state.backgroundColor2, marginTop: hp('1%'), height: hp('4.5%'), justifyContent: 'center', borderRadius: 5 }} onPress={() => this.changeColor()}>
                                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2%'), marginLeft: wp('2%') }}>Quick Lunch</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: this.state.backgroundColor3, marginTop: hp('1%'), height: hp('4.5%'), justifyContent: 'center', borderRadius: 5 }} onPress={() => this.changeColor3()}>
                                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2%'), marginLeft: wp('2%') }}>Vegies</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'column-reverse', marginTop: hp('1.8%') }}>
                                    <TouchableOpacity style={{ height: hp('4.5%'), justifyContent: 'flex-end', borderRadius: 5 }}>
                                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2%'), marginLeft: wp('2%'), color: '#30BE76' }}>+ Add New Cookbook</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

