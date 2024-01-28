import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AddImg = ({ addimg, edit, name = '', btnname = '' }) => {
    return (
        <View style={s.buttonContainer}>
            <View style={{ marginLeft: ('5%'), width: wp('82%'), marginTop: hp('1%'), height: hp('4.5%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{name}</Text>
                <TouchableOpacity style={{ height: hp('3.3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center' }} onPress={edit}>
                    <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Edit.png')}></Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', borderStyle: 'dotted', borderRadius: 5, borderWidth: 1, height: hp('5%'), marginHorizontal: ('5%'), width: wp('80.5%'), alignItems: 'center' }} onPress={addimg}>
                <Image style={{ marginLeft: wp('4%'), height: hp('1.5%'), width: wp('3%'), }} resizeMode='cover' source={require('../../assets/image/plus.png')}></Image>
                <Text style={{ fontSize: hp('1.6%'), marginLeft: wp('2.5%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>{btnname}</Text>
            </TouchableOpacity>
        </View>

    )
}

const s = StyleSheet.create({

    buttonContainer: {
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
            width: 0,
            height: 4,
        },

        borderRadius: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        width: wp('90%'),
        elevation: 5,
        height: hp('12.1%'), marginHorizontal: ('5%'), marginVertical: ('2.2%')
    }

})

export default AddImg;



