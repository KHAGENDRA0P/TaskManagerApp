import AddTaskButton from "@/components/AddTaskButton";
import Header from "@/components/Header";
import ProjectSelector from "@/components/ProjectSelector";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import TaskCard from "@/components/TaskCard";
import { TASKS } from "@/data/tasks";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PROJECTS = ["All", "Work", "Personal", "Ideas", "Grocery", "Design"]; // for workspace
const STATUSES = ["All", "To Do", "In Progress", "Completed"]; // for filter

export default function TaskListScreen() {
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");

  const visibleTasks = TASKS.filter((task) => {
    const checkProject = selectedProject === "All" || task.project === selectedProject;
    const checkStatus = selectedStatus === "All" || task.status === selectedStatus;
    const checkSearch = task.title.toLowerCase().includes(search.toLowerCase());

    return checkProject && checkStatus && checkSearch;
  });

  const handleAddTask = () => {
    console.log("Add task button clicked!");
  };

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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks found</Text>
        </View>
      ) : (
        visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            assignee={task.assignee}
            dueDate={task.dueDate}
          />
        ))
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
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
});
