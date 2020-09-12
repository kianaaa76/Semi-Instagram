import React, { Component } from 'react';
import {View} from 'react-native';

export default class First extends Component {
    constructor(props){
        super(props);
        this.F = this.F.bind(this);
    }

    F = (a,b)=>{
        if (a>0 && b>0){
        return(a>=b)?(
            <View style={{
                width:a, 
                height:b, 
                marginTop: 0,
                marginLeft:b,
                borderLeftWidth: 1,
            }}>
                {this.F(a-b,b)}
            </View>
        ):(
            <View style={{
                width: a, 
                height: b, 
                marginTop: a, 
                marginLeft: 0,
                borderTopWidth:1
            }}>
                {this.F(a, b-a)}
            </View>
        )
    } else {
        return(null);
    }
}

    render() {
        return (
            <View style={{
                width: 300, 
                height: 260, 
                alignSelf:'center',
                // borderWidth: 1,
                // borderColor: 'red'
                }}>
                {this.F(300,260)}
            </View>
        );
    }
}