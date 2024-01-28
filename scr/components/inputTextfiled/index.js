import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Input = ({ valueText = '', textInputValue = '', placeholderget = '', onChangeTextValue, autoCompleteType, secureTextEntry, keyboardType = '', onBlur }) => {
    return (
        <View>
            <Text style={styles.textstyle}>{valueText}</Text>
            <TextInput style={styles.textinputstyle}
                value={textInputValue}
                // onChangeText={(text)=>onChangeText(text)}
                onChangeText={onChangeTextValue}
                placeholder={placeholderget}
                autoCompleteType={autoCompleteType}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onBlur={onBlur}>
                </TextInput>
                
        </View>
    )
}

const styles = StyleSheet.create({
    textstyle: {
        fontFamily: 'Nunito-Regular',
        fontSize: hp('1.5%'),
        color: 'grey'
    },
    textinputstyle: {
        height: hp('7%'),
        width: wp('90%'),
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
    }
}
)

export default Input;




