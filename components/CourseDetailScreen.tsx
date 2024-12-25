import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function CourseDetailScreen({ route }) {
  const { course } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={{ uri: course.image }}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>{course.name}</Text>
        <Text style={styles.courseSubtitle}>Distance: {course.distance}</Text>
        <Text style={styles.courseSubtitle}>Calories: {course.kcal}</Text>
        <Text style={styles.courseSubtitle}>Speed: {course.time}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    padding: 16,
  },
  scrollView: {
    alignItems: 'center',
    paddingTop: 20,
  },
  courseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
});
