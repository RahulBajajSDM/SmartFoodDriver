import * as Images from 'assets';
import React, {useState, useEffect} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageComponent = (props) => {
  const {resizeMode, uri, styles, errorUri} = props;
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    if (!uri) {
      setImageError(true);
    }
  }, [uri]);

  const renderBody = () => {
    if (imageError) {
      return (
        <Image resizeMode={resizeMode} source={Images.Warning} style={styles} />
      );
    } else if (!uri) {
      return (
        <FastImage
          onLoadStart={(e) => setImageLoading(true)}
          onLoadEnd={(e) => setImageLoading(false)}
          style={styles}
          source={{
            priority: FastImage.priority.high,
            uri: 'https://img.icons8.com/bubbles/50/000000/error.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
          onError={({nativeEvent: {error}}) => {
            setImageError(true);
          }}
        />
      );
    } else {
      return (
        <FastImage
          onLoadStart={(e) => setImageLoading(true)}
          onLoadEnd={(e) => setImageLoading(false)}
          style={styles}
          source={{
            priority: FastImage.priority.high,
            uri: uri,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onError={({nativeEvent: {error}}) => {
            setImageError(true);
          }}
        />
      );
    }
  };
  return (
    <View>
      {renderBody()}
      {imageLoading && !imageError ? (
        <View
          style={[
            styles,
            {
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
};

export default ImageComponent;
