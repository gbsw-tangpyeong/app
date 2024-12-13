import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Search() {
  const [query, setQuery] = useState('');  // 검색어를 저장할 상태

  const handleSearch = () => {
    // 검색 로직을 여기에서 처리할 수 있음
    console.log(`Searching for: ${query}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Type something to search..."
        value={query}
        onChangeText={setQuery}  // 입력값이 변경되면 query 상태를 업데이트
      />
      <Button title="Search" onPress={handleSearch} />
      {/* 검색 결과는 여기에 렌더링할 수 있음 */}
      <View style={styles.resultsContainer}>
        <Text>Search results will appear here...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultsContainer: {
    marginTop: 20,
  },
});
