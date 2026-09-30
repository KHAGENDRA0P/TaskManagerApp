import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StatusFilterProps {
  statuses: string[];
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export default function StatusFilter({
  statuses,
  selectedStatus,
  onSelectStatus,
}: StatusFilterProps) {
  return (
    <View style={styles.container}>
      {statuses.map((status) => {
        const isSelected = status === selectedStatus;

        return (
          <TouchableOpacity
            key={status}
            style={[styles.tab, isSelected && styles.activeTab]}
            onPress={() => onSelectStatus(status)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isSelected && styles.activeTabText]}>
              {status}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
  },
  activeTab: {
    backgroundColor: "#1C1B1F",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
});
