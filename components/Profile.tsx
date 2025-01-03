import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
  route: RouteProp<any, '프로필'>; // '프로필' 스크린에 대한 route 타입을 설정
};

export default function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { setLoggedIn } = route.params;

  const handleLogout = () => {
    setLoggedIn(false); // 로그아웃 상태로 변경
  };

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
                source={require('../assets/imgs/시계.png')}
                style={styles.statImage}
              />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>16.9</Text>
                <Text style={styles.statLabel}>hr</Text>
              </View>
            </View>
            <View style={styles.separatorVertical} />
            <View style={styles.statItem}>
              <Image
                source={require('../assets/imgs/불.png')}
                style={styles.statImage}
              />
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>15.6</Text>
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
          <Icon name="help-circle-outline" size={25} color="#666" />
          <Text style={styles.optionText}>고객센터</Text>
          <Icon name="chevron-forward-outline" size={20} color="#666" style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={handleLogout} // 이 부분을 수정하여 로그아웃 처리
          style={[styles.optionContainer]}>
          <Icon name="log-out-outline" size={24} color="#ff0000" />
          <Text style={[styles.optionText, { color: '#ff0000' }]}>로그아웃</Text>
          <Icon name="chevron-forward-outline" size={20} color="#ff0000" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 스타일 정의...
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    padding: 16,
  },
  statusBar: {
    height: 20,
    backgroundColor: '#F3F7FF',
  },
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
    fontSize: 16,
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
  outerTotalBox: {
    backgroundColor: '#F3F7FF',
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
    padding: 10,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statImage: {
    width: 24,
    height: 30,
    marginRight: 8,
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
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  separatorVertical: {
    width: 2,
    backgroundColor: 'rgba(183, 183, 183, 0.3)',
    height: '100%',
    marginLeft: 5,
    marginRight: 5
  },
  settingsOptionsBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    height: 370,
    bottom: 40,
    shadowColor: '#000',
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
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  separator: {
    margin: 'auto',
    height: 1,
    width: 250,
    backgroundColor: '#ccc',
  },
});
