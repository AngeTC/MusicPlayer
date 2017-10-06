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
} from 'react-native';
import AudioFileDetailsModule from './modules/AudioFileDetailsModule';
import ToastModule from './modules/ToastModule';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    _createToastMessage() {
        RNFS.readDir('/sdcard')
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

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>
            Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
            To get started, edit App.js
            </Text>
            <Text style={styles.instructions}>
            {instructions}
            </Text>
            <Button onPress={this._createToastMessage} title="Create Toast Message"/>
            </View>
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
