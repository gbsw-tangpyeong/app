import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
};

const SettingPage = ({ navigation }: ProfileScreenProps) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [accountEnabled, setAccountEnabled] = useState(false);
  const [languageEnabled, setLanguageEnabled] = useState(false);
  const [themeEnabled, setThemeEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>알림 설정</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={() => setNotificationEnabled(!notificationEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }} // ON일 때 파란색
            thumbColor={notificationEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>개인정보 보호</Text>
          <Switch
            value={privacyEnabled}
            onValueChange={() => setPrivacyEnabled(!privacyEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={privacyEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>계정 관리</Text>
          <Switch
            value={accountEnabled}
            onValueChange={() => setAccountEnabled(!accountEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={accountEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItem}>언어 설정</Text>
          <Switch
            value={languageEnabled}
            onValueChange={() => setLanguageEnabled(!languageEnabled)}
            trackColor={{ false: '#ccc', true: '#5D63D1' }}
            thumbColor={languageEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>
        <View style={styles.separator} />

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
  saveButton: {
    padding: 10,
  },
  saveText: {
    color: '#5D63D1',
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  settingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingItem: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
});

export default SettingPage;
