import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Heder = ({ press }) => {
    return (
        <SafeAreaView>
            <View style={{ width: wp('90%'), height: hp('6%'), flexDirection: 'row',justifyContent:'space-between',}}>
                <Text style={{ alignSelf: 'center', fontSize: hp('3%'), fontFamily: 'Nunito-Bold' }}>My Recipes</Text>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', height: hp('4%'), width: wp('40%'), justifyContent: 'flex-end', alignItems: 'center' }} onPress={press} >
                        <Image style={{ height: hp('3%'), width: wp('5%'), marginRight: wp('1%') }} resizeMode='contain' source={require('../../assets/image/Icon.png')}></Image>
                        <Text style={{ fontSize: hp('2.2%'), color: '#30BE76', fontFamily: 'Nunito-Regular', }}>Add New</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    Button1: {
        marginRight: wp('5%'),
        height: hp('4%'),
        width: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver'
    },
    Button2: {
        marginRight: wp('2%'), height: hp('4%'),
        width: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: hp('4%'), width: wp('7%'),
    }
})

export default Heder;