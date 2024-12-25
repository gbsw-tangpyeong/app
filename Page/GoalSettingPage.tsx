import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
  const [newGoal, setNewGoal] = useState(goal);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setWeeklyGoal(newGoal); // 정보를 저장
    navigation.navigate('Home'); // "저장" 버튼 클릭 시 Home으로 이동
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // 수정 상태 토글
  };

  const handleGoalChange = (text: string) => {
    setNewGoal(Number(text)); // 숫자 변경
  };

  return (
    <View style={styles.container}>
      {/* 고정 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>목표 설정</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>저장</Text> {/* 항상 "저장" 버튼 */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 제목 */}
        <Text style={styles.pageTitle}>목표 설정</Text>

        {/* 중앙 View 박스 */}
        <View style={styles.infoBox}>
          <Icon name="walk-outline" size={50} color="#5D63D1" style={styles.icon} />
          <View style={styles.infoTextBox}>
            {isEditing ? (
              <TextInput
                style={styles.goalInput}
                keyboardType="numeric"
                value={String(newGoal)}
                onChangeText={handleGoalChange}
              />
            ) : (
              <>
                <Text style={styles.goalText}>{newGoal}</Text>
                <Text style={styles.kmText}>km</Text>
              </>
            )}
          </View>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>{isEditing ? '완료' : '수정'}</Text>
          </TouchableOpacity>
        </View>

        {/* 설정 섹션 */}
        <Text style={styles.sectionTitle}>설정</Text>
        <View style={styles.settingsBox}>
          <Text style={styles.settingOption}>옵션 1</Text>
          <Text style={styles.settingOption}>옵션 2</Text>
          <Text style={styles.settingOption}>옵션 3</Text>
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
    paddingVertical: 20, // 패딩 상단 추가
    paddingHorizontal: 20,
    backgroundColor: '#F3F7FF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  scrollContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 20,
  },
  icon: {
    marginRight: 10,
  },
  infoTextBox: {
    flex: 1,
    alignItems: 'center',
  },
  goalText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  kmText: {
    fontSize: 18,
    color: 'gray',
  },
  goalInput: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: '60%',
  },
  editText: {
    fontSize: 18,
    color: '#5D63D1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // 중앙 정렬
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
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
  },
});

export default GoalSettingPage;
