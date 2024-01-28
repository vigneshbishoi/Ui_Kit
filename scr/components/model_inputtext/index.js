import React from 'react';
import { View,Text,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

 const ModalInput = ({name= '',value= '',onChangeText='',placeholder}) => {
    return (
        <View style={{ height: hp('7%'), width: wp('79%'), flexDirection: 'row', marginTop: hp('1%'), alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontFamily: 'Nunito-Regular',width: wp('18.5%'), fontSize: hp('1.8%'), color: 'black',flex:1 ,}}>{name}</Text>
            <TextInput style={{ height: hp('5%'), width: wp('60.5%'), borderColor: 'silver', borderWidth: 1 , padding: 0, margin: 0}}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType='default'
            >
            </TextInput>
        </View>
    )
}

export default ModalInput;