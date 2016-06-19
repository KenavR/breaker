import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Auth from './auth.android';

export default class Landing extends Component {

  _onPressButton() {
    const {navigator} = this.props;
    navigator.push({
      name: 'Auth'
    });
  }

  render() {
    const myIcon = (<Icon name="terminal" size={30}/>)

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{myIcon}breaker <Text style={styles.badge}>alpha</Text></Text>

        <Text style={styles.headline}>
          A chat room for every subreddit.
        </Text>
        <Text style={styles.description}>
          Breaker is like an open source IRC or Slack, made just for Reddit.
        </Text>
        <Text style={styles.description}>
          Use your <Text style={styles.highlights}>reddit username</Text> and flair, <Text style={styles.highlights}>helpful
          bots</Text> post stuff from the subreddit into the channel, <Text style={styles.highlights}>subreddit
          moderators</Text> automatically become channel operators, and a lot more.
        </Text>
        <TouchableHighlight onPress={() => {
          const { navigator } = this.props;
          navigator.push({
            name: 'Auth'
          });
        }} style={styles.button}>
          <Text style={styles.buttonText}>
            <Icon name="reddit" size={20}/> Sign in
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.link}>
            Try it Now
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  headline: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    color: '#98a6ad',
    textAlign: 'center',
    marginBottom: 5
  },
  highlights: {
    fontWeight: 'bold'
  },
  logo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3a3f51'
  },
  badge: {
    backgroundColor: '#3a3f51',
    color: '#ffffff',
    borderRadius: 10,
    padding: 3,
    fontSize: 10
  },
  button: {
    backgroundColor: '#3a3f51',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    padding: 5
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  link: {
    textAlign: 'center',
  }
});