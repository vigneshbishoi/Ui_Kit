import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ButtonSet = ({ClickText= '', Press}) => {
    return (
        <TouchableOpacity style={s.TouchableOpacitySet} onPress={Press}>
            <Text style={s.Text}>{ClickText}</Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    TouchableOpacitySet: {
        alignItems: "center", 
        width: wp('90%'), 
        backgroundColor: '#30BE76', 
        padding: ('4%'), 
        borderRadius: 15 
    },
    Text: {
        color: 'white',
        fontSize: hp('2%')
    }
    
})
export default ButtonSet;