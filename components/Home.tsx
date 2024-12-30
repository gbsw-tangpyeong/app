import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
};

export default function HomeScreen({ navigation }: ProfileScreenProps) {
  const [isRunning, setIsRunning] = useState(false); // 러닝 상태
  const [weeklyGoal, setWeeklyGoal] = useState(50); // 이번 주 목표
  const [currentDistance] = useState(35); // 현재 달린 거리

  // 최근 활동 데이터 (시간을 분 단위로 변경)
  const activities = [
    { key: 1, name: '코스 A', distance: '5 km', kcal: '300 kcal', time: '30분', image: require('../assets/imgs/루트4.png') },
    { key: 2, name: '코스 B', distance: '7 km', kcal: '400 kcal', time: '40분', image: require('../assets/imgs/루트2.png') },
    { key: 3, name: '코스 C', distance: '10 km', kcal: '600 kcal', time: '60분', image:require('../assets/imgs/루트3.png') },
    { key: 4, name: '코스 D', distance: '6 km', kcal: '350 kcal', time: '35분', image: '이미지url' },
    { key: 5, name: '코스 E', distance: '8 km', kcal: '500 kcal', time: '50분', image: '이미지url' },
    { key: 6, name: '코스 F', distance: '9 km', kcal: '550 kcal', time: '55분', image: '이미지url' },
    { key: 7, name: '코스 G', distance: '3 km', kcal: '200 kcal', time: '20분', image: '이미지url' },
    { key: 8, name: '코스 H', distance: '4 km', kcal: '250 kcal', time: '25분', image: '이미지url' }, 
    { key: 9, name: '코스 I', distance: '5 km', kcal: '300 kcal', time: '30분', image: '이미지url' },
    { key: 10, name: '코스 J', distance: '6 km', kcal: '350 kcal', time: '36분', image: '이미지url' },
  ];

  // 활동 클릭 시 동작
  const handleActivityClick = (activity) => {
    navigation.navigate('ActivitiesDetailScreen', { activity });
  };

  // 지도 페이지로 이동하는 함수
  const navigateToMap = () => {
    navigation.navigate('지도');
  };

  const navigateToStrat = () => {
    navigation.navigate('코스 검색');
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <View style={styles.profileContainer}>
        <View style={styles.profilePicture} />
        <View style={styles.userNameBox}>
          <Text style={styles.userName}>Hello, userName</Text>
          <Text style={styles.SmallUserName}>small font</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('프로필')}>
          <Icon name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dailyQuestBox} onPress={() => navigation.navigate('GoalSettingPage', { goal: weeklyGoal, setWeeklyGoal })}>
        <View style={styles.weekGoalContainer}>
          <Text style={styles.weekGoalText}>이번주 목표
            <Text style={styles.weekGoalTextKm}> {weeklyGoal} km</Text>
          </Text>
          <Icon name="chevron-forward-outline" size={24} color="#000" style={styles.arrowIcon} />
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{currentDistance} km </Text>
          <Text style={styles.progressText}>{weeklyGoal - currentDistance} km 남음 </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${(currentDistance / weeklyGoal) * 100}%` }]} />
          </View>
        </View>
      </TouchableOpacity>

      {isRunning ? (
        <TouchableOpacity style={styles.runningBox} onPress={navigateToMap}>
          <View style={styles.runningInfoContainer}>
            <View style={styles.runningCircle} />
            <View style={styles.runningDetails}>
              <Text style={styles.runningText}>달리기 중</Text>
              <Text style={styles.runningTimeText}>01:01:01</Text>
            </View>
            <View style={styles.kmKcalContainer}>
              <Text style={styles.kmText}>5 km</Text>
              <Text style={styles.kcalText}>300 kcal</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={navigateToStrat} style={styles.runningBox}>
          <View style={styles.startRunningBox}>
            <Text style={styles.startRunningText}>런닝 시작하기</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.activityHeader}>
        <Text style={styles.recentActivityTitle}>최근 활동</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllActivities')}>
          <Text style={styles.allActivitiesButton}>모두</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityBox}>
        {activities.slice(0, 3).map((activity) => (
          <View key={activity.key}>
            <TouchableOpacity style={styles.activityItem} onPress={() => handleActivityClick(activity)}>
            <Image source={activity.image} style={styles.activityImage} />
              <View style={styles.activityDetails}>
                <Text style={styles.activitySubtitle}>{activity.name}</Text>
                <Text style={styles.activityTitle}>{activity.distance}</Text>
                <Text style={styles.activitySubtitle}>
                  {activity.kcal} | {activity.time}
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={24} color="#000" style={styles.arrowIcon} />
            </TouchableOpacity>
            {activity.key < 3 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  //컨테이너
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    padding: 16,
  },
  statusBar: {
    height: 20,
    backgroundColor: '#F3F7FF',
  },
  //프로필 칸
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D63D1',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 100,
    width: '100%',
    height: 175,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffff',
    marginRight: 10,
  },
  userNameBox: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: 'white',
  },
  SmallUserName: {
    fontSize: 10,
    color: 'white',
  },
  settingsButton: {
    padding: 5,
  },
  //이번주 목표
  dailyQuestBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    position: 'absolute',
    top: 125,
    left: 35,
    width: '90%',
    height: 110,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: '#000',
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dailyQuestText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weekGoalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  weekGoalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekGoalTextKm:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5D63D1'
  },
  arrowIcon: {
    marginLeft: 10,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 0,
  },
  progressBarContainer: {
    marginTop: 10,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressBar: {
    width: '70%',
    height: '100%',
    backgroundColor: '#5D63D1',
    borderRadius: 4,
  },
  //런닝 시작 또는 진행사항
  //true 일때
  runningBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    height: 80,
    padding: 16,
    marginTop: 55,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D63D1',
  },
  runningInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  runningCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6D73DF',
    marginRight: 16,
  },
  runningDetails: {
    flex: 1,
  },
  runningText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  runningTimeText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 4,
  },
  kmKcalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  kmText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  kcalText: {
    fontSize: 14,
    color: 'white',
  },
  //false 일때
  startRunningBox: {
    justifyContent: 'center',  
    alignItems: 'center',     
    paddingLeft: 90,
  },
  startRunningText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',     
  },
  //최근활동, 모두 글씨
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentActivityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  allActivitiesButton: {
    fontSize: 16,
    color: 'blue',
  },
  //런닝 코스 목록
  activityBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 9,
    paddingBottom: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    height: 100,
  },
  activityImage: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'cover',
  },  
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    paddingLeft: 2
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 2
  },
  separator: {
    height: 1,
    width: 250,
    margin: 'auto',
    backgroundColor: '#f1f1f1',
    marginVertical: 8,
  },
});
