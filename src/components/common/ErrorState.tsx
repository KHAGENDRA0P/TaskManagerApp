import { StyleSheet, Text, View } from "react-native";

export default function ErrorState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong.{"\n"}Please Try Again.</Text>
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
    textAlign: "center",
  },
});