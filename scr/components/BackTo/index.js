import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text, } from 'react-native';
import { color } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const BackHeder = ({ btnback, btnbacktext,color , tintColor}) => {
    
    return (
        <SafeAreaView>
            <View style={{ width: wp('60%'), height: hp('3.8%') }}>
                <TouchableOpacity style={{ flexDirection: 'row', width: wp('60%'), }} onPress={btnback}>
                    <Image style={{ height: hp('3.8%'), width: wp('5%'), tintColor:tintColor }} resizeMode='contain' source={require('../../assets/image/ArrowLeft.png')}></Image>
                    <Text style={{ alignSelf: 'center', fontFamily: 'Nunito-Regular', fontSize: hp('1.6%'), color: color }}>{btnbacktext}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}



export default BackHeder;



