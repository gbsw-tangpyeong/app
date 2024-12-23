import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const Map: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [previousLocation, setPreviousLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const locationWatcher = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
        (userLocation) => {
          const { latitude, longitude } = userLocation.coords;
          setLocation({ latitude, longitude });

          if (previousLocation) {
            const distanceMoved = calculateDistance(
              previousLocation.latitude,
              previousLocation.longitude,
              latitude,
              longitude
            );
            setDistance((prevDistance) => prevDistance + distanceMoved);
          }
          setPreviousLocation({ latitude, longitude });
        }
      );

      return () => locationWatcher.remove();
    })();
  }, [previousLocation]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kakao Map</title>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8e75bfee64dd441633bbc374edecf952&libraries=services"></script>
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

          let userMarker = null;
          let userCircle = null;

          window.updateUserLocation = function(latitude, longitude) {
            const position = new kakao.maps.LatLng(latitude, longitude);

            if (!userMarker) {
              userMarker = new kakao.maps.Marker({
                position,
                map,
              });
            } else {
              userMarker.setPosition(position);
            }

            if (!userCircle) {
              userCircle = new kakao.maps.Circle({
                center: position,
                radius: 10,
                strokeWeight: 2,
                strokeColor: '#004c80',
                strokeOpacity: 0.8,
                strokeStyle: 'solid',
                fillColor: '#a0c8f0',
                fillOpacity: 0.7,
                map,
              });
            } else {
              userCircle.setCenter(position);
            }

            map.setCenter(position);
          };
        };
      </script>
    </body>
    </html>
  `;

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const jsCode = `updateUserLocation(${latitude}, ${longitude});`;
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
      />
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>이동 거리: {distance.toFixed(2)} m</Text>
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
  distanceContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  distanceText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Map;
