import { Pressable, StyleSheet, Text } from "react-native";

interface AddTaskButtonProps {
  onPress: () => void;
}

export default function AddTaskButton({ onPress }: AddTaskButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>+ Add Task</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "darkcyan",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
