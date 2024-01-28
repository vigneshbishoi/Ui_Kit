import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const List = ({ Logoimage, Mainimage, profilename, time, titleName, btnlike, discription, like, comments, btnsave, MainimagePress }) => {
    return (
        <SafeAreaView>
            <View style={s.buttonContainer}>

                <View style={{ flex: 1.4 }}>
                        <Image style={{ width: ('100%'), height: ('100%'), borderTopRightRadius: 10, borderTopLeftRadius: 10 }} resizeMode='cover' source={Mainimage}></Image>
                </View>
                <View style={{ flex: 1, padding: ('2%') }}>
                    <View style={{ flex: 1, marginHorizontal: wp('3%'), justifyContent: 'center' }}>
                        <Text style={{ fontSize: hp('2.5%') }}>{titleName}</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: wp('3%'), justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('1.7%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>{like} mins</Text>
                            <Image style={{ height: hp('3%') }} resizeMode='stretch' source={require('../../assets/image/Dot.png')}></Image>
                            <Text style={{ fontSize: hp('1.7%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>{comments} ingredients</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: '#30BE76', height: hp('3.3%'), width: wp('20%'), justifyContent: 'center', alignItems: 'center' }} onPress={btnsave}>
                                <Image style={{ height: hp('2%'), width: wp('5%'), }} resizeMode='contain' source={require('../../assets/image/Play.png')}></Image>
                                <Text style={{ fontSize: hp('1.7%'), color: '#30BE76', fontFamily: 'Nunito-Bold', marginLeft: wp('1%') }}>Cook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    TopView: { height: hp('7%'), padding: ('3.5%'), flexDirection: 'row', backgroundColor: 'white' },
    buttonContainer: {
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderRadius: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        height: hp('25%'),
        width: wp('90%'),
        elevation:5
    }

})

export default List;



