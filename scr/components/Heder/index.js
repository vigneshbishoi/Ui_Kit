import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Heder = ({MsgBtn,NotBtn}) => {
    return (
        <SafeAreaView>
            <View style={{ width: wp('100%'), height: hp('6%'), flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center',marginLeft: wp('5%') }}>
                    <Image style={{ minHeight: hp('3.5%'), width: wp('30%') }} resizeMode='contain' source={require('../../assets/image/newlogo.png')}></Image>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <TouchableOpacity style={s.Button1} onPress={MsgBtn}>
                        <Image style={s.image} source={require('../../assets/image/Message.png')} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.Button2} onPress={NotBtn}>
                        <Image style={s.image} source={require('../../assets/image/Notifications.png')} resizeMode='contain' />
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
        alignItems: 'center'
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



