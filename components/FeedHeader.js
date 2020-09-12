import React,{Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class FeedHeader extends Component {
    render(){
    return (
        <View style={Styles.containerStyle}>
            <View style={{margin: 10, width: 50}}/>
            <Text style={{fontSize:20}}>Feed</Text>
            <View style={Styles.containerStyle2}>
                <TouchableOpacity onPress={this.props.onLogoutPress} style={{flex:1, alignSelf:'center', justifyContent:'center'}}>
                    <Text style={Styles.logoutTextStyle}>
                        LogOut
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )}
};

const Styles = {
    containerStyle: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    logoutTextStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    containerStyle2: {
        width: 50,
        alignSelf: 'center',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default FeedHeader ;