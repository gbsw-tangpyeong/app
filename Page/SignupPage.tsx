import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 내비게이션 타입 정의
type RootStackParamList = {
  LoginMain: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  Home: undefined;
};

export default function SignupPage() {
  // 상태 변수 설정
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // 회원가입 버튼 클릭 처리 함수
  const handleSignup = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      setError('모든 필드를 입력해주세요');
    } else if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
    } else {
      // 회원가입 처리 로직 (예: API 호출)
      setError('');
      // 회원가입 후 추가 동작
      alert('회원가입 완료!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authButtonWrapper}>
        {/* 이메일 입력 */}
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {/* 비밀번호 입력 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* 비밀번호 확인 입력 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* 에러 메시지 */}
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.signupButtonWrapper} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* 로그인 페이지로 이동하는 버튼 */}
        <Text style={styles.loginText}>이미 계정이 있으신가요? <Text style={styles.loginLinkText}>로그인</Text></Text>
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
  authButtonWrapper: {
    backgroundColor: '#fff', // 전체 컨테이너 배경을 하얀색으로
    borderRadius: 8,
    paddingTop: 50,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: 350,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  signupButtonWrapper: {
    backgroundColor: '#5D63D1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginLinkText: {
    color: '#5D63D1',
  },
});
