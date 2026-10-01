import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PillSelectorProps {
  options: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
  activeColor?: string;
}

export default function PillSelector({
  options,
  selected,
  onSelect,
  activeColor = "#007AFF",
}: PillSelectorProps) {
  return (
    <View style={styles.row}>
      {options.map((item) => {
        const isSelected = item === selected;
        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.pill,
              isSelected && { backgroundColor: activeColor },
            ]}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.text, isSelected && styles.activeText]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
