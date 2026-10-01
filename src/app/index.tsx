import {
  AddTaskButton,
  Header,
  ProjectSelector,
  SearchBar,
  StatusFilter,
  TaskCard,
} from "@/components/TaskList";
import { EmptyState } from "@/components/common";
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PROJECTS = ["All", "Work", "Personal", "Ideas", "Grocery", "Design"];
const STATUSES = ["All", "To Do", "In Progress", "Completed"];

export default function TaskListScreen() {
  const { tasks } = useTasks();
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

  const taskCountText = `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;

  return (
    <View style={styles.screen}>
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
