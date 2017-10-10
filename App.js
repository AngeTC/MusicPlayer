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
import ArtistListItem from './templates/ArtistListItem';

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
        });
    }

    render() {
        if (this.state.artists.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loadingtext}>Loading...</Text>
                </View>
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

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <ArtistListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        const { navigate } = this.props.navigation;
        navigate('ArtistPage', {artist: this.state.artists[index]});
    };

    async _getAllArtists() {
        var result = await AudioFileDetailsModule.getAllArtists();
        var artists = [];
        for (key in result) {
            if (result.hasOwnProperty(key)) {
                artists.push(result[key]);
            }
        }

        artists.sort(function(a, b) {
            var nameA = a.ARTIST.toUpperCase().replace(/^(THE )/,"");
            var nameB = b.ARTIST.toUpperCase().replace(/^(THE )/,"");

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return artists;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    loadingtext: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
