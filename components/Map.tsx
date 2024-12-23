import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const Map: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 거부되었습니다.');
        return;
      }

      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Update every 10 meters
        },
        (userLocation) => {
          setLocation({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          });
        }
      );

      return () => locationWatcher.remove();
    };

    getLocation();
  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kakao Map</title>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=&libraries=services"></script>
      <style>
        html, body { margin: 0; padding: 0; height: 100%; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        let map;
        let marker = null;

        window.onload = function() {
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심
            level: 3
          };
          map = new kakao.maps.Map(container, options);

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
});

export default Map;
