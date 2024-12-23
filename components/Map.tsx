import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { KakaoMap_API } from '@env';

const Map = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const webViewRef = useRef<WebView | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 거부되었습니다.');
        return;
      }

      // 위치 업데이트 구독 시작
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // 높은 정확도 설정
          timeInterval: 1000, // 1초마다 위치 업데이트
          distanceInterval: 1, // 1미터 이상 이동 시 업데이트
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });
        }
      );

      // 컴포넌트 언마운트 시 위치 업데이트 구독 해제
      return () => {
        locationSubscription.remove();
      };
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location && webViewRef.current) {
      const { latitude, longitude } = location;
      const jsCode = `updateMarker(${latitude}, ${longitude});`;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [location]);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kakao Map</title>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KakaoMap_API}"></script>
    <style>
      html, body { margin: 0; padding: 0; height: 100%; }
      #map { width: 100%; height: 100%; position: relative; }
      #marker { position: absolute; width: 20px; height: 20px; background-color: red; border-radius: 50%; transform: translate(-50%, -50%); }
    </style>
  </head>
  <body>
    <div id="map">
      <div id="marker"></div>
    </div>
    <script>
      console.log("카카오맵 로딩 시작...");
      var map;
      var markerElement = document.getElementById('marker');

      function initMap() {
        try {
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
          };
          map = new kakao.maps.Map(container, options);
          console.log("카카오맵 초기화 성공");
        } catch (error) {
          console.error("카카오맵 초기화 오류:", error);
        }
      }

      function updateMarker(latitude, longitude) {
        try {
          var position = new kakao.maps.LatLng(latitude, longitude);
          var projection = map.getProjection();
          var point = projection.pointFromCoords(position);
          markerElement.style.left = point.x + 'px';
          markerElement.style.top = point.y + 'px';
          console.log("마커 위치 업데이트:", latitude, longitude);
        } catch (error) {
          console.error("마커 업데이트 오류:", error);
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
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            현재 위치: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
        </View>
      )}
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
  locationContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Map;
