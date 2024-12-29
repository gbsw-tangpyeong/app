import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

type ProfileScreenProps = {
  navigation: NavigationProp<any>;
  route: {
    params: {
      goal: number;
      setWeeklyGoal: (goal: number) => void;
    };
  };
};

const GoalSettingPage = ({ route, navigation }: ProfileScreenProps) => {
  const { goal, setWeeklyGoal } = route.params;
  const [newGoal, setNewGoal] = useState(goal.toString());
  const [isEditing, setIsEditing] = useState(false);

  const [generalNotification, setGeneralNotification] = useState(false);
  const [sound, setSound] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [lockScreen, setLockScreen] = useState(false);
  const [reminders, setReminders] = useState(false);

  const handleEditToggle = () => {
    if (isEditing && newGoal === '') {
      setNewGoal('0');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setWeeklyGoal(Number(newGoal));
    navigation.navigate('Home');
  };

  const handleGoalChange = (text: string) => {
    setNewGoal(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>목표 설정</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>현재 목표</Text>

        <View style={styles.infoBox}>
          <View style={styles.infoTextBox}>
            {!isEditing && (
              <Image
                source={require('../assets/imgs/달리기.png')}
                style={styles.statImage}
              />
            )}
            <View style={styles.goalContainer}>
              {isEditing ? (
                <TextInput
                  style={styles.goalInput}
                  keyboardType="numeric"
                  value={newGoal}
                  onChangeText={handleGoalChange}
                  autoFocus={true}
                  maxLength={4}
                />
              ) : (
                <>
                  <Text style={styles.goalText}>{newGoal}</Text>
                  <Text style={styles.kmText}>km</Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
            <Text style={styles.editText}>{isEditing ? '완료' : '수정'}</Text>
          </TouchableOpacity>
        </View>

        {/* 설정 섹션 */}
        <Text style={styles.sectionTitle}>설정</Text>
        <View style={styles.settingsBox}>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>General Notification</Text>
            <Switch
              value={generalNotification}
              onValueChange={() => setGeneralNotification(!generalNotification)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={generalNotification ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Sound</Text>
            <Switch
              value={sound}
              onValueChange={() => setSound(!sound)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={sound ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Do Not Disturb</Text>
            <Switch
              value={doNotDisturb}
              onValueChange={() => setDoNotDisturb(!doNotDisturb)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={doNotDisturb ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Vibrate</Text>
            <Switch
              value={vibrate}
              onValueChange={() => setVibrate(!vibrate)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={vibrate ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Lock Screen</Text>
            <Switch
              value={lockScreen}
              onValueChange={() => setLockScreen(!lockScreen)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={lockScreen ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <View style={[styles.settingOption, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingText}>Reminders</Text>
            <Switch
              value={reminders}
              onValueChange={() => setReminders(!reminders)}
              trackColor={{ false: '#ccc', true: '#5D63D1' }}
              thumbColor={reminders ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 23,
  },
  saveButton: {
    padding: 10,
  },
  saveText: {
    color: '#5D63D1',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: 'black',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 20,
  },
  statImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  infoTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  goalText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  kmText: {
    fontSize: 18,
    color: 'gray',
  },
  goalInput: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 0,
    marginTop: 10,
    height: 40,
    maxWidth: 300,
    minWidth: 100,
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    fontSize: 18,
    color: '#5D63D1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 13,
    marginBottom: 10,
    color: 'black',
  },
  settingsBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 16,
    color: 'black',
  },
});

export default GoalSettingPage;
