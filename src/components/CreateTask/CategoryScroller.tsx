import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryScrollerProps {
  categories: readonly string[];
  selected: string;
  onSelect: (value: string) => void;
  activeColor?: string;
}

export default function CategoryScroller({
  categories,
  selected,
  onSelect,
  activeColor = "#007AFF",
}: CategoryScrollerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {categories.map((item) => {
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
            <Text style={[styles.text, isSelected && styles.activeText]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
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
