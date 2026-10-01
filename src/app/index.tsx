import {
  AddTaskButton,
  Header,
  ProjectSelector,
  SearchBar,
  StatusFilter,
  TaskCard,
} from "@/components/TaskList";
import { EmptyState } from "@/components/common";
import { TASKS } from "@/data/tasks";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PROJECTS = ["All", "Work", "Personal", "Ideas", "Grocery", "Design"];
const STATUSES = ["All", "To Do", "In Progress", "Completed"];

export default function TaskListScreen() {
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleAddTask = () => {
    router.push("/create-task");
  };

  const visibleTasks = TASKS.filter((task) => {
    const checkProject =
      selectedProject === "All" || task.project === selectedProject;
    const checkStatus =
      selectedStatus === "All" || task.status === selectedStatus;
    const checkSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return checkProject && checkStatus && checkSearch;
  });

  return (
    <View style={styles.screen}>
      <Header title="All Tasks" subtitle="12 tasks" />

      <View style={styles.actionContainer}>
        <AddTaskButton onPress={handleAddTask} />
      </View>

      <ProjectSelector
        projects={PROJECTS}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
      />

      <SearchBar value={search} onChangeText={setSearch} />

      <StatusFilter
        statuses={STATUSES}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {visibleTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView contentContainerStyle={styles.taskList}>
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              status={task.status}
              priority={task.priority}
              assignee={task.assignee}
              dueDate={task.dueDate}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  actionContainer: {
    marginBottom: 18,
  },
  taskList: {
    paddingBottom: 40,
  },
});
