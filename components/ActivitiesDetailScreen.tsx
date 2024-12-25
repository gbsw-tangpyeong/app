import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ActivitiesDetailScreen({ route }) {
  const navigation = useNavigation();
  const { activity } = route.params;

  const handleStart = () => {
    console.log('다시시작 버튼');
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: activity.image }}
            style={styles.activityImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.activityTitle}>{activity.name}</Text>
            <Text style={styles.activityDetail}>거리: {activity.distance}</Text>
            <Text style={styles.activityDetail}>시간: {activity.time}</Text>
            <Text style={styles.activityDetail}>소모 칼로리: {activity.kcal}</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>다시 달리기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    justifyContent: 'center', // 컨테이너를 화면 세로 중앙에 배치
  },
  scrollView: {
    alignItems: 'center',
    padding: 16,
  },
  contentContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  activityImage: {
    width: '100%',
    height: 250, // 이미지 크기 조정
    resizeMode: 'cover',
    borderRadius: 10,
    backgroundColor: '#6d6d6d',
    marginBottom: 30, // 이미지와 텍스트 간격
  },
  infoContainer: {
    marginBottom: 30,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  activityDetail: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF4D4D', // 빨간색
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // 시작하기 버튼과 간격을 둡니다.
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
