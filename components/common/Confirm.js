import React from 'react';
import {View, Text, Modal} from 'react-native';
import {Button} from './Button';
import {CardSection} from './CardSection';

const Confirm =({children, visible, onAccept, onDecline}) => {
    const {containerStyle, textStyle} = Styles;
    return(
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={()=>{}}
            transparent
        >
            <View style={containerStyle}>
                <CardSection>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                
                <CardSection>
                    <Button onPress={onAccept}>Yes</Button>
                </CardSection>

                <CardSection>
                    <Button onPress={onDecline}>No</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const Styles= {
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        justifyContent: 'center'
    }
}

export {Confirm}; 