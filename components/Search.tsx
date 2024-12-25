import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
};

export default function SearchScreen({ navigation }: ProfileScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const runningCourses = [
    { key: 1, name: '한강 코스', distance: '5 km', kcal: '300 kcal', time: '27분', image: 'image1.jpg' },
    { key: 2, name: '올림픽 공원 코스', distance: '7 km', kcal: '400 kcal', time: '38분', image: 'image2.jpg' },
    { key: 3, name: '북한산 둘레길', distance: '10 km', kcal: '600 kcal', time: '53분', image: 'image3.jpg' },
    { key: 4, name: '남산 순환로', distance: '8 km', kcal: '500 kcal', time: '43분', image: 'image4.jpg' },
    { key: 5, name: '경복궁 코스', distance: '4 km', kcal: '250 kcal', time: '22분', image: 'image5.jpg' },
    { key: 6, name: '한남대교 코스', distance: '6 km', kcal: '350 kcal', time: '33분', image: 'image6.jpg' },
    { key: 7, name: '서울숲 코스', distance: '5.5 km', kcal: '320 kcal', time: '30분', image: 'image7.jpg' },
    { key: 8, name: '종로 코스', distance: '7.5 km', kcal: '430 kcal', time: '40분', image: 'image8.jpg' },
    { key: 9, name: '청계천 코스', distance: '6.5 km', kcal: '380 kcal', time: '35분', image: 'image9.jpg' },
    { key: 10, name: '서울시청 코스', distance: '8.5 km', kcal: '490 kcal', time: '46분', image: 'image10.jpg' },
  ];

  const filteredCourses = runningCourses.filter(course =>
    course.name.includes(searchQuery)
  );

  const handleCourseClick = (course: { key: number; name: string; distance: string; kcal: string; time: string; image: string; }) => {
    navigation.navigate('CourseDetail', { course });
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
        {filteredCourses.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.courseItem}
            onPress={() => handleCourseClick(item)}
          >
            <Image
              source={{ uri: item.image }}
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
