import {
  AddTaskButton,
  Header,
  ProjectSelector,
  SearchBar,
  StatusFilter,
  TaskCard,
} from "@/components/TaskList";
import { EmptyState, LoadingState } from "@/components/common";
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROJECTS = ["All", "Work", "Personal", "Ideas", "Grocery", "Design"];
const STATUSES = ["All", "To Do", "In Progress", "Completed"];

export default function TaskListScreen() {
  const { tasks, isLoading } = useTasks();
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleAddTask = () => {
    router.push("/create-task");
  };

  const visibleTasks = (tasks || []).filter((task) => {
    if (!task) return false;
    const checkProject =
      selectedProject === "All" || task.project === selectedProject;
    const checkStatus =
      selectedStatus === "All" || task.status === selectedStatus;
    const checkSearch = task.title
      ? task.title.toLowerCase().includes(search.toLowerCase())
      : false;
    return checkProject && checkStatus && checkSearch;
  });

  const taskCountText = isLoading
    ? "Loading tasks..."
    : `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <Header title="All Tasks" subtitle={taskCountText} />

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

      {isLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              title={item.title}
              status={item.status}
              priority={item.priority}
              assignee={item.assignee}
              dueDate={item.dueDate}
            />
          )}
          ListEmptyComponent={<EmptyState />}
          contentContainerStyle={styles.taskList}
        />
      )}
    </SafeAreaView>
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
    flexGrow: 1,
  },
});
