'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
    FlatList,
} from 'react-native';
import Video from 'react-native-video';
import AudioFileDetailsModule from '../modules/AudioFileDetailsModule';

export default class TrackPage extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.track.TITLE,
    });

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.navigation.state.params.track.PATH);

        return (
            <View>
                <Video source={{uri: this.props.navigation.state.params.track.PATH}}
                ref="audio"
                volume={1.0}
                muted={false}
                playInBackground={true}
                playWhenInactive={true}
                resizeMode="cover"
                repeat={false}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    loadingtext: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
