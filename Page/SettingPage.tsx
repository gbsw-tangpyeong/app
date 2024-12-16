import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingPage = ({ navigation }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [accountEnabled, setAccountEnabled] = useState(false);
  const [languageEnabled, setLanguageEnabled] = useState(false);
  const [themeEnabled, setThemeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" /> {/* 검정색 화살표 */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text> {/* 검정색 글씨 */}
        <TouchableOpacity onPress={() => console.log('저장 클릭')} style={styles.saveButton}>
          <Text style={styles.saveText}>저장</Text> {/* 파란색 글씨 */}
        </TouchableOpacity>
      </View>

      {/* 설정 요소들 */}
      <View style={styles.settingsList}>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>알림 설정</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={() => setNotificationEnabled(!notificationEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }} // ON일 때 파란색
            thumbColor={notificationEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>개인정보 보호</Text>
          <Switch
            value={privacyEnabled}
            onValueChange={() => setPrivacyEnabled(!privacyEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={privacyEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>계정 관리</Text>
          <Switch
            value={accountEnabled}
            onValueChange={() => setAccountEnabled(!accountEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={accountEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>언어 설정</Text>
          <Switch
            value={languageEnabled}
            onValueChange={() => setLanguageEnabled(!languageEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={languageEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>테마 설정</Text>
          <Switch
            value={themeEnabled}
            onValueChange={() => setThemeEnabled(!themeEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={themeEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // 검정색
  },
  saveButton: {
    padding: 10,
  },
  saveText: {
    color: '#5D63D1', // 파란색
    fontWeight: 'bold',
  },
  settingsList: {
    marginTop: 20,
  },
  settingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingItem: {
    fontSize: 18,
    flex: 1, // 텍스트가 왼쪽에 정렬되도록 flex 설정
  },
});

export default SettingPage;
