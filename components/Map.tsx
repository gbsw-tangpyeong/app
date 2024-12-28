import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { KakaoMap_API } from '@env';
import Icon from 'react-native-vector-icons/Ionicons';

const Map = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const webViewRef = useRef<WebView | null>(null);
  const locationSubscription = useRef<any>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission denied.');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        const newCoord = { latitude, longitude };
        setLocation(newCoord);
        if (isRunning) {
          setRouteCoordinates((prevCoords) => [...prevCoords, newCoord]);
        }
      }
    );
  };

  useEffect(() => {
    requestLocationPermission();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (location && webViewRef.current) {
      const { latitude, longitude } = location;
      const jsCode = `
        updateMarker(${latitude}, ${longitude});
        moveMapTo(${latitude}, ${longitude});
        ${isRunning ? `drawRoute(${JSON.stringify(routeCoordinates)});` : ''}`;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [location, routeCoordinates, isRunning]);

  const toggleRouteDrawing = () => {
    setIsRunning((prev) => !prev);
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kakao Map</title>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KakaoMap_API}&libraries=services"></script>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; }
      #map { width: 100%; height: 100%; position: relative; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map;
      var marker;
      var polyline;

      function initMap() {
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
      }

      function updateMarker(latitude, longitude) {
        var position = new kakao.maps.LatLng(latitude, longitude);
        if (!marker) {
          marker = new kakao.maps.Marker({ position, map });
        } else {
          marker.setPosition(position);
        }
      }

      function moveMapTo(latitude, longitude) {
        var position = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(position);
      }

      function drawRoute(coordinates) {
        var path = coordinates.map(coord => new kakao.maps.LatLng(coord.latitude, coord.longitude));
        if (!polyline) {
          polyline = new kakao.maps.Polyline({
            path,
            strokeWeight: 5,
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
          });
          polyline.setMap(map);
        } else {
          polyline.setPath(path);
        }
      }

      window.onload = initMap;
    </script>
  </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
      <View style={styles.controlBox}>
        <Icon
          name={isRunning ? 'pause' : 'play'}
          size={40}
          color="#fff"
          onPress={toggleRouteDrawing}
          style={styles.controlButton}
        />
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
  controlBox: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#666dee',
    borderRadius: 30,
    padding: 10,
  },
  controlButton: {
    padding: 10,
  },
});

export default Map;
