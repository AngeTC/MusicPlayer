import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './App';
import ArtistPage from './templates/ArtistPage';
import AlbumPage from './templates/AlbumPage';
import TrackPage from './templates/TrackPage';

export const MusicPlayer = StackNavigator({
    App: { screen: App },
    ArtistPage: { screen: ArtistPage },
    AlbumPage: { screen: AlbumPage },
    TrackPage: {screen: TrackPage},
});

AppRegistry.registerComponent('MusicPlayer', () => MusicPlayer);
