import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const Map: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationWatcher = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (userLocation) => {
          setLocation({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          });
        }
      );

      return () => locationWatcher.remove();
    })();
  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kakao Map</title>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services"></script>
      <style>
        html, body { margin: 0; padding: 0; height: 100%; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        window.onload = function() {
          if (!window.kakao || !window.kakao.maps) {
            console.error("Kakao Maps SDK failed to load.");
            return;
          }

          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          const map = new kakao.maps.Map(container, options);

          let marker = null;

          window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'mapLoaded' }));

          window.updateMarker = function(latitude, longitude) {
            const position = new kakao.maps.LatLng(latitude, longitude);
            if (!marker) {
              marker = new kakao.maps.Marker({
                position,
                map,
              });
            } else {
              marker.setPosition(position);
            }
            map.setCenter(position);
          };
        };
      </script>
    </body>
    </html>
  `;

  const handleButtonPress = () => {
    if (location) {
      const { latitude, longitude } = location;
      Alert.alert('사용자 위치', `위도: ${latitude}, 경도: ${longitude}`);
    } else {
      Alert.alert('위치 정보 없음', '현재 위치를 가져올 수 없습니다.');
    }
  };

  const handleWebViewMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.event === 'mapLoaded' && location) {
      const { latitude, longitude } = location;
      const jsCode = `updateMarker(${latitude}, ${longitude});`;
      webViewRef.current?.injectJavaScript(jsCode);
    }
  };

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const jsCode = `updateMarker(${latitude}, ${longitude});`;
      webViewRef.current?.injectJavaScript(jsCode);
    }
  }, [location]);

  const webViewRef = React.useRef<WebView>(null);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled
        onMessage={handleWebViewMessage}
      />
      <View style={styles.buttonContainer}>
        <Button title="현재 위치 확인" onPress={handleButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default Map;
