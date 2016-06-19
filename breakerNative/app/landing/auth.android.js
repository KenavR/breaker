import React, {Component} from 'react';
import {
  StyleSheet,
  WebView
} from 'react-native';

export default class Auth extends Component {


  render() {
    const WEBVIEW_REF = 'webview';
    const DEFAULT_URL = 'https://www.breakerapp.com/auth?compact=true';
    return (
      <WebView ref={WEBVIEW_REF}
               automaticallyAdjustContentInsets={false}
               style={styles.webView}
               source={{uri: DEFAULT_URL}}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               decelerationRate="normal"
               startInLoadingState={true}
               scalesPageToFit={true}></WebView>
    );
  }
}

const styles = StyleSheet.create({
  webView: {}
});