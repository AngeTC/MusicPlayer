import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './App';

export const MusicPlayer = StackNavigator({
    App: { screen: App },
});

AppRegistry.registerComponent('MusicPlayer', () => MusicPlayer);
