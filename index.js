import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './App';
import ArtistPage from './templates/ArtistPage';

export const MusicPlayer = StackNavigator({
    App: { screen: App },
    ArtistPage: { screen: ArtistPage },
});

AppRegistry.registerComponent('MusicPlayer', () => MusicPlayer);
