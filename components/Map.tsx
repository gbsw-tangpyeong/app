import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { KakaoMap_API } from '@env';
import Icon from 'react-native-vector-icons/Ionicons';

const Map = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [isDrawingRoute, setIsDrawingRoute] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const webViewRef = useRef<WebView | null>(null);
  const locationSubscription = useRef<any>(null); // 위치 추적을 위한 subscription을 ref로 저장

  // 위치 권한 요청 및 추적 시작
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission denied.');
      return;
    }

    // 초기 위치 설정
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    // 위치 추적 시작
    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // 1초마다 위치 업데이트
        distanceInterval: 1,
      },
      (newLocation) => {
        const { latitude, longitude, accuracy } = newLocation.coords;
        if (accuracy !== null && accuracy <= 20) { // 정확도가 20m 이내일 때만 위치 업데이트
          const newCoord = { latitude, longitude };
          setLocation(newCoord);
          if (isDrawingRoute) {
            setRouteCoordinates((prevCoords) => [...prevCoords, newCoord]);
          }
        }
      }
    );
  };

  // 위치 업데이트 후 WebView에 마커 및 경로 업데이트
  useEffect(() => {
    if (location && webViewRef.current) {
      const { latitude, longitude } = location;
      const jsCode = `
        updateMarker(${latitude}, ${longitude});
        moveMapTo(${latitude}, ${longitude});
        ${isDrawingRoute ? `drawRoute(${JSON.stringify(routeCoordinates)});` : ''}
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [location, routeCoordinates, isDrawingRoute]);

  // 위치 권한 요청 및 위치 추적 시작
  useEffect(() => {
    requestLocationPermission();

    return () => {
      // 컴포넌트 언마운트 시 위치 추적 중지
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [isDrawingRoute]);

  // 경로 그리기 토글
  const toggleRouteDrawing = () => {
    if (isDrawingRoute) {
      setRouteCoordinates([]);
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript('clearRoute();');
      }
    }
    setIsDrawingRoute(!isDrawingRoute);
  };

  // Kakao Map HTML 컨텐츠
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
          center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 위치
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
        console.log("Kakao Map initialized");
      }

      function updateMarker(latitude, longitude) {
        try {
          var position = new kakao.maps.LatLng(latitude, longitude);
          if (!marker) {
            marker = new kakao.maps.Marker({
              position: position,
              map: map,
            });
          } else {
            marker.setPosition(position); // 마커 위치 업데이트
          }
          console.log("Marker updated:", latitude, longitude);
        } catch (error) {
          console.error("Error updating marker:", error);
        }
      }

      function moveMapTo(latitude, longitude) {
        try {
          var position = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(position); // 지도 중앙 이동
          console.log("Map moved to:", latitude, longitude);
        } catch (error) {
          console.error("Error moving map:", error);
        }
      }

      function drawRoute(coordinates) {
        try {
          var path = coordinates.map(coord => new kakao.maps.LatLng(coord.latitude, coord.longitude));
          if (!polyline) {
            polyline = new kakao.maps.Polyline({
              path: path,
              strokeWeight: 5,
              strokeColor: '#FF0000',
              strokeOpacity: 0.7,
              strokeStyle: 'solid',
            });
            polyline.setMap(map);
          } else {
            polyline.setPath(path); // 경로 업데이트
          }
          console.log("Route drawn with", coordinates.length, "points");
        } catch (error) {
          console.error("Error drawing route:", error);
        }
      }

      function clearRoute() {
        try {
          if (polyline) {
            polyline.setMap(null);
            polyline = null;
            console.log("Route cleared");
          }
        } catch (error) {
          console.error("Error clearing route:", error);
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
      
      <View style={styles.runningBox}>
        <View style={styles.timerBox}>
          <View style={styles.timerContent}>
            <Text style={styles.timerTitle}>런닝 타임</Text>
            <Text style={styles.timer}>{isRunning ? '00:10:30' : '00:00:00'}</Text>
          </View>
          <Icon
            name={isRunning ? 'pause' : 'play'}
            size={30}
            color="#ffffff"
            onPress={() => setIsRunning(!isRunning)}
            style={styles.startPauseButton}
          />
        </View>

        <View style={styles.totalBox}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Image
                source={require('../assets/imgs/달리기.png')}
                style={styles.statImage}
              />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>103.2</Text>
                <Text style={styles.statLabel}>km</Text>
              </View>
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.statItem}>
              <Image
                source={require('../assets/imgs/불.png')}
                style={styles.statImage}
              />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>16.9</Text>
                <Text style={styles.statLabel}>kcal</Text>
              </View>
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.statItem}>
              <Image
                source={require('../assets/imgs/번개.png')}
                style={styles.statImage}
              />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>15.6</Text>
                <Text style={styles.statLabel}>km/hr</Text>
              </View>
            </View>
          </View>
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
    marginBottom: 20,
  },
  timerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timerTitle: {
    fontSize: 13,
    color: '#333333', 
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  startPauseButton: {
    backgroundColor: '#666dee',
    padding: 10,
    borderRadius: 5,
  },
  totalBox: {
    marginTop: 10,
    backgroundColor: '#F3F7FF',
    borderRadius: 10,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statImage: {
    width: 30,  // 이미지 크기 조정
    height: 30,
    marginRight: 10, // 이미지와 텍스트 사이의 간격
  },
  statIcon: {
    marginRight: 10,
  },
  statValueContainer: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  separatorVertical: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});

export default Map;
