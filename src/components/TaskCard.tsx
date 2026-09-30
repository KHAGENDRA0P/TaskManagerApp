import { View, Text, StyleSheet } from "react-native";

interface TaskCardProps {
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
}

export default function TaskCard({
  title,
  status,
  priority,
  assignee,
  dueDate,
}: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomRow}>
        <View style={styles.leftInfo}>
          <Text style={styles.tag}>{status}</Text>
          <Text style={styles.tag}>{priority}</Text>
          <Text style={styles.dueDate}>Due: {dueDate}</Text>
        </View>
        <Text style={styles.assignee}>{assignee}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1B1F",
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: "#444",
  },
  dueDate: {
    fontSize: 14,
    color: "#888",
  },
  assignee: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
  },
});
