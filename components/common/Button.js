import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button= ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
            <Text style={styles.textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles= {
    containerStyle: {
        borderWidth: 2,
        borderColor:'#ABAAAA',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.2,
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    textStyle: {
        color: '#737171',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    }
}

export { Button };