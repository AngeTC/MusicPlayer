'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    Text,
} from 'react-native';

export default class AlbumListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    render() {
        const item = this.props.item;
        // var imageURI;
        // if (item.ALBUM_ART != null) {
        //     imageURI = item.ALBUM_ART;
        // } else {
        //     imageURI = defaultImage;
        // }

        var albumImage = require("../images/default-album.png");
        if (item.ALBUM_ART != null) {
            albumImage = {uri: item.ALBUM_ART}
        }

        return (
            <TouchableHighlight
            onPress={this._onPress}
            underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={{width: 50, height: 50}} source={albumImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.album}>{item.ALBUM}</Text>
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
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    album: {
        fontSize: 18,
        color: '#656565'
    },
    subtext: {
        fontSize: 14,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});
