import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CourseDetailScreen({ route }) {
  const navigation = useNavigation(); 
  const { course } = route.params;

  const handleStart = () => {
    console.log('시작하기 버튼이 눌렸습니다!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: course.image }}
            style={styles.courseImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.courseTitle}>{course.name}</Text>
            <Text style={styles.courseDetail}>거리: {course.distance}</Text>
            <Text style={styles.courseDetail}>시간: {course.time}</Text>
            <Text style={styles.courseDetail}>소모 칼로리: {course.kcal}</Text>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>시작하기</Text>
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
    justifyContent: 'center',
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
  courseImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    backgroundColor: '#6d6d6d',
    marginBottom: 50,
  },
  infoContainer: {
    marginBottom: 30,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  courseDetail: {
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
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
