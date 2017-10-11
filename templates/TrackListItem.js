'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
} from 'react-native';

export default class TrackListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    _formatDuration(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    render() {
        const item = this.props.item;
        const album = this.props.album;

        var albumImage = require("../images/default-album.png");
        if (album.ALBUM_ART != null) {
            albumImage = {uri: album.ALBUM_ART}
        }

        return (
            <TouchableHighlight
            onPress={this._onPress}
            underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={{width: 50, height: 50}} source={albumImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.track}>{item.TITLE}</Text>
                            <Text style={styles.subtext}>{item.ARTIST}</Text>
                        </View>
                        <View style={styles.durationContainer}>
                            <Text style={styles.duration}>{this._formatDuration(item.DURATION)}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    durationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'flex-end'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    track: {
        fontSize: 15,
        color: '#656565',
        paddingLeft: 10
    },
    subtext: {
        fontSize: 12,
        color: '#656565',
        paddingLeft: 10
    },
    duration: {
        fontSize: 14,
        color: '#656565',
        alignSelf: 'flex-end'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});
