import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const List = ({ Logoimage, Mainimage, profilename, time, titleName, btnlike, discription, like, comments, btnsave, MainimagePress }) => {
    return (
        <View style={s.buttonContainer}>
            <View style={s.TopView}>
                <TouchableOpacity onPress={Logoimage}>
                    <Image resizeMode='contain' source={require('../../assets/image/boy.png')}></Image>
                </TouchableOpacity>
                <View style={{ marginStart: wp('2.5%') }}>
                    <Text style={{ fontFamily: 'Nunito-Regular',fontSize:hp('1.7%') }}>{profilename}</Text>
                    <Text style={{ fontFamily: 'Nunito-Regular', color: 'grey',fontSize:hp('1.5%') }}>{time}</Text>
                </View>
            </View>
            <View style={{  height: hp('45%') }}>
                    <Image style={{ width: ('100%'), height: ('100%') }} resizeMode='cover' source={Mainimage}></Image>
            </View>
            <View style={{ height: hp('11%'), marginHorizontal: ('3.5%'), backgroundColor: 'white' }}>
                <View style={{ width: wp('78%'), height: hp('5%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: hp('2.5%') }}>{titleName}</Text>
                    <TouchableOpacity onPress={btnlike}>
                        <Image style={{ marginRight: wp('2%'), height: hp('4%'), width: wp('6%') }} resizeMode='contain' source={require('../../assets/image/Like.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: wp('78%'), height: hp('9%'), backgroundColor: 'white' }}>
                    <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-Regular', color: 'grey' }} numberOfLines={4}>{discription}</Text>
                </View>
                <View style={{ width: wp('78%'), marginTop: hp('1%'), height: hp('4.5%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('1.7%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>{like} Likes</Text>
                        <Image style={{ height: hp('3%') }} resizeMode='stretch' source={require('../../assets/image/Dot.png')}></Image>
                        <Text style={{ fontSize: hp('1.7%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>{comments} Comments</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, borderColor: '#30BE76', height: hp('3.3%'), width: wp('20%'), justifyContent: 'center', alignItems: 'center' }} onPress={btnsave}>
                            <Image style={{ height:hp('2%'),width:wp('5%'), }} resizeMode='contain' source={require('../../assets/image/Icon.png')}></Image>
                            <Text style={{ fontSize: hp('1.7%'), color: '#30BE76', fontFamily: 'Nunito-Bold' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>

    )
}

const s = StyleSheet.create({
    TopView: {height: hp('7%'), padding: ('3.5%'), flexDirection: 'row', backgroundColor: 'white' },
    buttonContainer: {
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        flex:1,
        width: wp('83%'),
        elevation: 5
        
      }
    
})

export default List;



