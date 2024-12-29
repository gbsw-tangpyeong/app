import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { KakaoMap_API } from '@env';
import Icon from 'react-native-vector-icons/Ionicons';

const Map = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null); // 위치
  const [routeCoordinates, setRouteCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]); // 루트를 그리기위한 배열
  const [isRunning, setIsRunning] = useState(false); // 시작 일시정지 상태 확인
  const [timer, setTimer] = useState(0); // 타이머 상태 (초 단위)
  const [distance, setDistance] = useState(0); // 이동거리 상태 초기값 0
  const [speed, setSpeed] = useState(0); // 속도 상태 초기값 0
  const [kcal, setKcal] = useState(0); // kcal 상태 초기값 0
  const webViewRef = useRef<WebView | null>(null);
  const locationSubscription = useRef<any>(null); // 위치 추적을 위한 subscription을 ref로 저장


  // 위치 권한 요청 및 위치 추적 시작
  useEffect(() => {
    requestLocationPermission();
    return () => {
      // 컴포넌트 언마운트 시 위치 추적 중지
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, [isRunning]);

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
          if (isRunning) {
            setRouteCoordinates((prevCoords) => [...prevCoords, newCoord]);
          }
          // 거리 계산 (단위: km)
          if (location) {
            const prevLocation = location;
            const distanceTraveled = getDistance(prevLocation, newCoord);
            setDistance((prevDistance) => prevDistance + distanceTraveled);
          }
        }
      }
    );
  };

  // 두 위치 간 거리 계산 함수 (단위: km)
  const getDistance = (coord1: { latitude: number; longitude: number }, coord2: { latitude: number; longitude: number }) => {
    const toRad = (degree: number) => degree * (Math.PI / 180);
    const R = 6371; // 지구의 반지름 (단위: km)

    const lat1 = toRad(coord1.latitude);
    const lon1 = toRad(coord1.longitude);
    const lat2 = toRad(coord2.latitude);
    const lon2 = toRad(coord2.longitude);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // km 단위로 반환
  };

  // 경로 그리기 토글
  const toggleRouteDrawing = () => {
    setIsRunning((prev) => !prev);
  };

  // 위치 업데이트 후 WebView에 마커 및 경로 업데이트
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

  // 속도 및 칼로리 계산
  useEffect(() => {
    if (distance > 0 && timer > 0) {
      const speed = (distance / (timer / 1000 / 3600)); // km/hr로 계산
      setSpeed(speed);

      // kcal 계산 (이동 거리와 시간을 기준으로)
      const timeInHours = (timer / 1000) / 3600; // 시간을 시간 단위로 변환
      const calculatedKcal = Math.floor(distance * 50 * timeInHours); // 1km당 50kcal로 가정하고 계산
      setKcal(calculatedKcal);
    }
  }, [distance, timer]);

  // 타이머 업데이트 (1초마다)
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval!);
    }

    return () => clearInterval(timerInterval!);
  }, [isRunning]);

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
            <Text style={styles.timer}>{new Date(timer * 1000).toISOString().substr(11, 8)}</Text>
          </View>
          <Icon
            name={isRunning ? 'pause' : 'play'}
            size={30}
            color="#ffffff"
            onPress={toggleRouteDrawing}
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
                <Text style={styles.statValue}>{distance.toFixed(1)}</Text>
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
                <Text style={styles.statValue}>{kcal}</Text>
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
                <Text style={styles.statValue}>{speed.toFixed(1)}</Text>
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
    width: 30,
    height: 30,
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
  