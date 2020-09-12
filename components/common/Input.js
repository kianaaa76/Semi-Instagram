import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ( {label, value, onChangeText, placeholder, secureTextEntry} ) => {
    const {containerStyle, inputStyle, labelStyle} = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                placeholder={placeholder}
                style={inputStyle}
                value = {value}
                onChangeText = {onChangeText}
            />
        </View>
    );
};

const styles= {
    inputStyle: {
        fontSize: 18,
        color: '#000',
        lineHeight: 23,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 2,
        height: 20, 
        width: 100,
        marginRight: 10
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,

    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
}

export {Input};