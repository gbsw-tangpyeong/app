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
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [isRouteActive, setIsRouteActive] = useState(false);

  const webViewRef = useRef<WebView | null>(null);
  const locationSubscription = useRef<any>(null);

  const SEOUL_CITY_HALL = { latitude: 37.5665, longitude: 126.9780 };

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
        const { latitude, longitude, accuracy } = newLocation.coords;
        if (accuracy !== null && accuracy <= 20) {
          const newCoord = { latitude, longitude };
          setLocation(newCoord);

          if (isRouteActive) {
            webViewRef.current?.injectJavaScript(`
              removeReachedRoute(${latitude}, ${longitude});
            `);
          }
        }
      }
    );
  };

  const toggleRouteDrawing = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const drawRouteToCityHall = () => {
    if (!location) {
      Alert.alert('현재 위치를 가져오는 중입니다. 잠시 후 다시 시도하세요.');
      return;
    }
    setIsRouteActive(true);
    webViewRef.current?.injectJavaScript(`
      drawRouteToCityHall(${location.latitude}, ${location.longitude}, ${SEOUL_CITY_HALL.latitude}, ${SEOUL_CITY_HALL.longitude});
    `);
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
      var routePath = [];

      function initMap() {
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
      }

      function drawRouteToCityHall(startLat, startLng, endLat, endLng) {
        var start = new kakao.maps.LatLng(startLat, startLng);
        var end = new kakao.maps.LatLng(endLat, endLng);

        var directions = new kakao.maps.services.Directions();
        directions.route({
          origin: start,
          destination: end,
          waypoints: [],
          travelMode: kakao.maps.services.TravelMode.WALKING,
        }, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var path = result.routes[0].legs[0].steps.map(step => new kakao.maps.LatLng(step.startLocation.lat, step.startLocation.lng));
            path.push(end);
            routePath = path;

            if (!polyline) {
              polyline = new kakao.maps.Polyline({
                path: routePath,
                strokeWeight: 5,
                strokeColor: '#FF0000',
                strokeOpacity: 0.7,
                strokeStyle: 'solid',
              });
              polyline.setMap(map);
            } else {
              polyline.setPath(routePath);
            }
          }
        });
      }

      function removeReachedRoute(currentLat, currentLng) {
        var currentPos = new kakao.maps.LatLng(currentLat, currentLng);

        routePath = routePath.filter(point => {
          var distance = kakao.maps.geometry.spherical.computeDistanceBetween(currentPos, point);
          return distance > 20; // 20m 이상 떨어진 점만 남김
        });

        if (polyline) {
          polyline.setPath(routePath);
        }
      }

      window.onload = initMap;
    </script>
  </body>
  </html>
  `;

  useEffect(() => {
    requestLocationPermission();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      <View style={styles.runningBox}>
        <View style={styles.timerBox}>
          <Text style={styles.timerTitle}>런닝 타임</Text>
          <Text style={styles.timer}>{new Date(timer).toISOString().substr(11, 8)}</Text>
          <Icon
            name={isRunning ? 'pause' : 'play'}
            size={30}
            color="#ffffff"
            onPress={toggleRouteDrawing}
            style={styles.startPauseButton}
          />
          <Icon
            name="navigate"
            size={30}
            color="#ffffff"
            onPress={drawRouteToCityHall}
            style={styles.startPauseButton}
          />
        </View>
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
  runningBox: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1,
  },
  timerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  startPauseButton: {
    marginLeft: 10,
    backgroundColor: '#666dee',
    padding: 10,
    borderRadius: 5,
  },
});

export default Map;
