import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const runningCourses = [
    { key: 1, name: '한강 코스', distance: '5 km', kcal: '300 kcal', time: '11.11 km/hr' },
    { key: 2, name: '올림픽 공원 코스', distance: '7 km', kcal: '400 kcal', time: '11.12 km/hr' },
    { key: 3, name: '북한산 둘레길', distance: '10 km', kcal: '600 kcal', time: '11.13 km/hr' },
    { key: 4, name: '남산 순환로', distance: '8 km', kcal: '500 kcal', time: '11.10 km/hr' },
    { key: 5, name: '경복궁 코스', distance: '4 km', kcal: '250 kcal', time: '11.05 km/hr' },
    { key: 6, name: '한남대교 코스', distance: '6 km', kcal: '350 kcal', time: '11.08 km/hr' },
    { key: 7, name: '서울숲 코스', distance: '5.5 km', kcal: '320 kcal', time: '11.06 km/hr' },
    { key: 8, name: '종로 코스', distance: '7.5 km', kcal: '430 kcal', time: '11.12 km/hr' },
    { key: 9, name: '청계천 코스', distance: '6.5 km', kcal: '380 kcal', time: '11.07 km/hr' },
    { key: 10, name: '서울시청 코스', distance: '8.5 km', kcal: '490 kcal', time: '11.09 km/hr' },
  ];

  const filteredCourses = runningCourses.filter(course =>
    course.name.includes(searchQuery)
  );

  const handleCourseClick = (key: number) => {
    console.log(`코스 클릭: ${key}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <View style={styles.searchBarContainer}>
        <Icon name="search-outline" size={18} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      <ScrollView style={styles.courseWrapper}>
        {filteredCourses.map((item, index) => (   
          <TouchableOpacity
            key={item.key}
            style={styles.courseItem}
            onPress={() => handleCourseClick(item.key)}
          >
            <Image
              source={{ uri: '이미지url' }}
              style={styles.courseImage}
            />
            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseSubtitle}>{item.distance}</Text>
              <Text style={styles.courseSubtitle}>{item.kcal} | {item.time}</Text>
            </View>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color="#000"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
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
  statusBar: {
    height: 24,
    backgroundColor: '#F3F7FF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  courseWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  courseImage: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'cover',
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
