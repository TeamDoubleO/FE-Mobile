import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.sample}>
      <Text>Jira Ticket</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sample: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
