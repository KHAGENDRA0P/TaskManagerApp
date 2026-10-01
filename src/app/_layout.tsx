import { TasksProvider } from "@/context/TasksContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </TasksProvider>
  );
}
