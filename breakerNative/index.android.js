import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Landing from './app/landing/index.android';
import Auth from './app/landing/auth.android';


class BreakerNative extends Component {


  renderScene(route, navigator) {
    if (route.name == 'Landing') {
      return <Landing navigator={navigator}/>
    }
    if (route.name == 'Auth') {
      return <Auth navigator={navigator}/>
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Landing', component: Landing }}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={ (route, navigator) => {
          if (route.name == 'Landing') {
            return <Landing navigator={navigator}/>
          }
          if (route.name == 'Auth') {
            return <Auth navigator={navigator}/>
          }
        }
        }
      />
    )
  }
}

AppRegistry.registerComponent('breakerNative', () => BreakerNative);
