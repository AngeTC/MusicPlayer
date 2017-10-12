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
import AudioFileDetailsModule from '../modules/AudioFileDetailsModule';
import TrackListItem from './TrackListItem';

export default class AlbumPage extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.album.ALBUM,
    });

    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        };
    }

    async componentWillMount() {
        await this._getTracksForAlbum().then((result) => {
            this.setState({tracks: result});
        });
    }

    render() {
        if (this.state.tracks.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loadingtext}>Loading...</Text>
                </View>
            );
        }
        return (
            <FlatList
            data={this.state.tracks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        );
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <TrackListItem
        item={item}
        album={this.props.navigation.state.params.album}
        index={index}
        onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log(this.state.tracks[index]);
        const { navigate } = this.props.navigation;
        navigate('TrackPage', {track: this.state.tracks[index]});
    };

    async _getTracksForAlbum() {
        const { params } = this.props.navigation.state;
        var result = await AudioFileDetailsModule.getTracksForAlbum(params.album.ALBUM_ID);
        var tracks = [];
        for (key in result) {
            if (result.hasOwnProperty(key)) {
                tracks.push(result[key]);
            }
        }

        tracks.sort(function(a, b) {
            var trackA = parseFloat(a.TRACK_NUMBER);
            var trackB = parseFloat(b.TRACK_NUMBER);

            if (trackA < trackB) {
                return -1;
            }
            if (trackA > trackB) {
                return 1;
            }
            return 0;
        });

        return tracks;
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
