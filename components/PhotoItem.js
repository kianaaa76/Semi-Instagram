import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import RNViewer from "react-native-viewer";

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

class PhotoItem extends Component {

    render(){
        return(
            <View style={Styles.containerStyle}>
                <View style={Styles.containerStyle2}>
                    <Text style={Styles.titleStyle}>
                        {this.props.photo.title}
                    </Text>
                </View>
                <View style={Styles.imageContainerStyle}>
                    <RNViewer
                        style={{width: 300, height:400}}
                        realSize={{width: ScreenWidth, height: ScreenHeight}}
                    >
                        <Image
                            style={Styles.imageStyle}
                            source={{uri: this.props.photo.url}}
                        />
                    </RNViewer>
                </View>
            </View>
        );
    }
}

const Styles={
    imageStyle: {
        height: 400,
        width: 300,
        alignSelf: 'center'
    },
    containerStyle2: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        width:300,
        alignSelf:'center'
    },
    titleStyle: {
        marginLeft: 5,
        fontSize: 17,
        fontWeight: 'bold'
    },
    imageContainerStyle: {
        //backgroundColor:'red',
        width: 300, 
        height: 400,
        borderWidth:1,
        borderColor: 'white',
        borderRadius: 2,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent :'center'
    },
    containerStyle :{
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 1,
        width: 300,
        alignSelf:'center',
        marginTop: 10,
        overflow: "hidden"
    }
}

export default PhotoItem;