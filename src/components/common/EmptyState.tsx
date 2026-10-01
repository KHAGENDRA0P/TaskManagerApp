import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tasks found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
});
