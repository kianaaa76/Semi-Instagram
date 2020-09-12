import React from 'react';
import { View, Text } from 'react-native';

const Card= (props) => {
    return (
        <View style={styles.containerStyle}>{props.children}</View>
    );
};

const styles= {
    containerStyle: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        shadowColor: '#000',
        borderBottomWidth: 0,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
}

export {Card};