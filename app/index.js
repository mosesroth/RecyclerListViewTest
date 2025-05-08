import { View, Text, StyleSheet } from 'react-native';
import RecyclerListDemo from './recyclerlistview-demo';

export default function App() {
  return (
    <View style={styles.container}>
      <RecyclerListDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
