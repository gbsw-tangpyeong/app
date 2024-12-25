import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// 내비게이션 타입 정의
type RootStackParamList = {
  LoginMain: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  Home: undefined;
};

export default function LoginMainPage() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.logo}
      />

      <View style={styles.authButtonWrapper}>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={() => navigation.navigate('LoginPage')}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButtonWrapper}
          onPress={() => navigation.navigate('SignupPage')}
        >
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.separatorWithText}>
          <View style={styles.separatorLine} />
          <Text style={styles.orText}>또는</Text>
          <View style={styles.separatorLine} />
        </View>

        <View style={styles.snsButtonWrapper}>
          <TouchableOpacity style={[styles.snsButton, { backgroundColor: '#DB4437' }]}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_icon.png' }} style={styles.snsIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.snsButton, { backgroundColor: '#000000' }]}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_2021.svg' }} style={styles.snsIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.snsButton, { backgroundColor: '#4267B2' }]}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo_2023.png' }} style={styles.snsIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F7FF', // 배경색
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30, // 로고와 버튼 간격을 더 넓혔습니다
  },
  authButtonWrapper: {
    backgroundColor: '#fff', // 전체 컨테이너 배경을 하얀색으로
    borderRadius: 8,
    paddingTop: 50,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: 350,
  },
  //로그인 버튼
  loginButtonWrapper: {
    marginBottom: 15,
    backgroundColor: '#5D63D1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#ddd',
    flex: 1,
  },
  orText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  //회원가입 버튼
  signupButtonWrapper: {
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'white',
    borderColor: '#5D63D1',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#5D63D1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snsButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  //sns 버튼
  snsButton: {
    marginHorizontal: 10,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snsIcon: {
    width: 30,
    height: 30,
  },
});
