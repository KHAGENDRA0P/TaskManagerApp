import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FormHeaderProps {
  title: string;
  onCancel: () => void;
}

export default function FormHeader({ title, onCancel }: FormHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onCancel} activeOpacity={0.7} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  cancelButton: {
    minWidth: 60,
  },
  placeholder: {
    minWidth: 60,
  },
  cancelText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1C1B1F",
  },
});

