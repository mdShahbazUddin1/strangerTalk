import React from 'react';
import {WebView} from 'react-native-webview';

function GameWebView({route}) {
  const {url} = route.params;

  return <WebView source={{uri: url}} />;
}

export default GameWebView;
