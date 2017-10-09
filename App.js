/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
var RNFS = require('react-native-fs');

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
} from 'react-native';
import AudioFileDetailsModule from './modules/AudioFileDetailsModule';
import ToastModule from './modules/ToastModule';
import ListItem from './templates/ListItem';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    static navigationOptions = {
        title: 'Artists',
    };

    constructor(props) {
      super(props);
      this.state = {
        artists: []
      };
    }

    async componentWillMount() {
        await this._getAllArtists().then((result) => {
            this.setState({artists: result});
            console.log(this.state.artists);
        });
    }

    // UNUSED
    _createToastMessage() {
        RNFS.readDir('/sdcard/music')
        .then(async (result) => {
            var totalFiles = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i].isFile()) {
                    console.log(await AudioFileDetailsModule.retrieveAudioFileDetails(result[i].path));
                    totalFiles++;
                }
            }
            ToastModule.show('Files found: ' + totalFiles, ToastModule.SHORT);
        })
        .catch((err) => {
            console.log(err.message, err.code);
            ToastModule.show('readDir failed. ' + err.message, ToastModule.SHORT);
        });
    }

    // UNUSED
    async _getAllAlbums() {
        return await AudioFileDetailsModule.getAllAlbums();
    }

    async _getAllArtists() {
        var result = await AudioFileDetailsModule.getAllArtists();
        var artists = [];
        for (key in result) {
            if (result.hasOwnProperty(key)) {
                artists.push(result[key]);
            }
        }

        return artists;
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <ListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log("Pressed row: "+index);
    };

    render() {
        if (this.state.artists.length == 0) {
            return (
                <Text style={styles.description}>Loading...</Text>
            );
        }
        return (
            <FlatList
            data={this.state.artists}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
