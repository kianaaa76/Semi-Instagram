import React,{Component} from 'react';
import {Text, View, Image} from 'react-native';
import { CardSection, Card } from './common';


class CommentItem extends Component {

    renderAvatar(){
            return((this.props.comment.user && this.props.comment.user.avatar)?(
                <Image
                    source={{uri: this.props.comment.user.avatar}}
                    style={{
                        width:40, 
                        height:40,
                        borderWidth:1,
                        borderRadius:20,
                        borderColor:'white'
                    }}
                />
            ):(
                <Image
                    source={require('../Images/download.png')}
                    style={{
                        width:40, 
                        height:40,
                        borderWidth:1,
                        borderRadius:20,
                        borderColor:'white'
                    }}
                />
            )
        )
    }


    render(){
        return (
            <View style={Styles.containerStyle2}>
                <View style={Styles.containerStyle}>
                    {this.renderAvatar()}
                    <Text style={{fontWeight:'bold', fontSize:15, margin:8}}>{this.props.comment.email}</Text>
                </View>
                <CardSection>
                    <Text>{this.props.comment.body}</Text>
                </CardSection>
            </View>
        );
    }
}

const Styles={
    containerStyle:{
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd'
    },
    containerStyle2: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: '#000',
        borderBottomWidth: 0,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 1,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 6,
        marginBottom: 6,
        overflow: 'hidden'
    }
}

export default CommentItem;