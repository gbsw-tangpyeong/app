import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />

      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => console.log('수정 버튼 클릭')}>
          <Icon name="create-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>프로필</Text>
        <View style={styles.profilePicture} />
        <View style={styles.userNameBox}>
          <Text style={styles.userName}>Hello, userName</Text>
          <Text style={styles.SmallUserName}>small font</Text>
        </View>
      </View>

      <View style={styles.outerTotalBox}>
        <View style={styles.totalHeader}>
          <Text style={styles.totalText}>토탈</Text>
        </View>
        <View style={styles.totalBox}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="walk" size={24} color="#666" style={styles.statIcon} />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>20.22</Text>
                <Text style={styles.statLabel}>km</Text>
              </View>
              <View style={styles.separatorVertical} />
            </View>
            <View style={styles.statItem}>
              <Icon name="time-outline" size={24} color="#666" style={styles.statIcon} />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>5.00</Text>
                <Text style={styles.statLabel}>hr</Text>
              </View>
              <View style={styles.separatorVertical} />
            </View>
            <View style={styles.statItem}>
              <Icon name="flame-outline" size={24} color="#666" style={styles.statIcon} />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>600.50</Text>
                <Text style={styles.statLabel}>kcal</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.settingsOptionsBox}>
        <TouchableOpacity onPress={() => console.log('개인설정 클릭')} style={styles.optionContainer}>
          <Icon name="person-outline" size={24} color="#666" />
          <Text style={styles.optionText}>개인설정</Text>
          <Icon name="chevron-forward-outline" size={20} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => console.log('업적 클릭')} style={styles.optionContainer}>
          <Icon name="trophy-outline" size={24} color="#666" />
          <Text style={styles.optionText}>업적</Text>
          <Icon name="chevron-forward-outline" size={20} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => navigation.navigate('SettingPage')} style={styles.optionContainer}>
          <Icon name="settings-outline" size={24} color="#666" />
          <Text style={styles.optionText}>설정</Text>
          <Icon name="chevron-forward-outline" size={20} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => console.log('고객센터 클릭')} style={styles.optionContainer}>
          <Icon name="help-circle-outline" size={24} color="#666" />
          <Text style={styles.optionText}>고객센터</Text>
          <Icon name="chevron-forward-outline" size={20} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    padding: 16,
  },
  statusBar: {
    height: 20,
    backgroundColor: '#F3F7FF',
  },
  // 프로필 칸
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#5D63D1',
    borderRadius: 10,
    padding: 20,
    height: 250,
    marginBottom: 20,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  profileTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffff',
    marginBottom: 10,
  },
  userNameBox: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    color: 'white',
  },
  SmallUserName: {
    fontSize: 12,
    color: 'white',
  },
  // 토탈 박스
  outerTotalBox: {
    backgroundColor: '#F3F7FF', // 새로운 박스 색상
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    bottom: 60,
    left: 18,
    zIndex: 1,
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  totalBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 10,
  },
  // 통계 항목
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    marginRight: 5,
  },
  statValueContainer: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  separatorVertical: {
    width: 1,
    backgroundColor: '#ccc', // 연한 색으로 변경
    height: '100%',
    marginLeft: 5,
  },
  // 설정 옵션 박스
  settingsOptionsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
    shadowColor: '#000',
    bottom: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  optionText: {
    fontSize: 15,
    paddingVertical: 10,
    marginLeft: 10,
    flex: 1, // 텍스트를 왼쪽으로 정렬
  },
  arrowIcon: {
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', // 연한 색으로 변경
  },
});