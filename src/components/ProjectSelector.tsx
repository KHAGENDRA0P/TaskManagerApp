import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProjectSelectorProps {
  projects: string[];
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

export default function ProjectSelector({
  projects,
  selectedProject,
  onSelectProject,
}: ProjectSelectorProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {projects.map((project) => {
          const isSelected = project === selectedProject;
          return (
            <TouchableOpacity
              key={project}
              style={[styles.pill, isSelected && styles.activePill]}
              onPress={() => onSelectProject(project)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.pillText, isSelected && styles.activePillText]}
              >
                {project}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 18,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
  },
  activePill: {
    backgroundColor: "#007AFF",
  },
  pillText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
  },
  activePillText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
