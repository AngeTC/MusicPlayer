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
import AlbumListItem from './AlbumListItem';

export default class ArtistPage extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.artist.ARTIST,
    });

    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };
    }

    async componentWillMount() {
        await this._getAlbumsForArtist().then((result) => {
            this.setState({albums: result});
        });
    }

    render() {
        if (this.state.albums.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loadingtext}>Loading...</Text>
                </View>
            );
        }
        return (
            <FlatList
            data={this.state.albums}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        );
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <AlbumListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log("Album selected: " + this.state.albums[index].ALBUM);
    };

    async _getAlbumsForArtist() {
        const { params } = this.props.navigation.state;
        var result = await AudioFileDetailsModule.getAlbumsForArtist(params.artist.ID);
        var albums = [];
        for (key in result) {
            if (result.hasOwnProperty(key)) {
                albums.push(result[key]);
            }
        }

        albums.sort(function(a, b) {
            var nameA = a.ALBUM.toUpperCase().replace(/^(THE )/,"");
            var nameB = b.ALBUM.toUpperCase().replace(/^(THE )/,"");

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return albums;
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
