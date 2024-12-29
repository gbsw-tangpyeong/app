import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
};

export default function AllActivitiesScreen({ navigation }: ProfileScreenProps) {
 const activities = [
  { key: 1, name: '코스 A', distance: '5 km', kcal: '300 kcal', time: '30분', image: '이미지url' },
  { key: 2, name: '코스 B', distance: '7 km', kcal: '400 kcal', time: '40분', image: '이미지url' },
  { key: 3, name: '코스 C', distance: '10 km', kcal: '600 kcal', time: '60분', image: '이미지url' },
  { key: 4, name: '코스 D', distance: '6 km', kcal: '350 kcal', time: '35분', image: '이미지url' },
  { key: 5, name: '코스 E', distance: '8 km', kcal: '500 kcal', time: '50분', image: '이미지url' },
  { key: 6, name: '코스 F', distance: '9 km', kcal: '550 kcal', time: '55분', image: '이미지url' },
  { key: 7, name: '코스 G', distance: '3 km', kcal: '200 kcal', time: '20분', image: '이미지url' },
  { key: 8, name: '코스 H', distance: '4 km', kcal: '250 kcal', time: '25분', image: '이미지url' },
  { key: 9, name: '코스 I', distance: '5 km', kcal: '300 kcal', time: '30분', image: '이미지url' },
  { key: 10, name: '코스 J', distance: '6 km', kcal: '350 kcal', time: '36분', image: '이미지url' },
 ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>최근 활동</Text>
      </View>
      <ScrollView contentContainerStyle={styles.activityList}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.key}
            style={styles.activityItem}
            onPress={() => navigation.navigate('ActivitiesDetailScreen', { activity })}
          >
            <Image source={{ uri: activity.image }} style={styles.activityImage} />
            <View style={styles.activityDetails}>
              <Text style={styles.activitySubtitle}>{activity.name}</Text>
              <Text style={styles.activityTitle}>{activity.distance}</Text>
              <Text style={styles.activitySubtitle}>
                {activity.kcal} | {activity.time}
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={24} color="#000" style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    paddingTop: 20,
    left: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  activityList: {
    padding: 15,
    paddingBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#888',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
