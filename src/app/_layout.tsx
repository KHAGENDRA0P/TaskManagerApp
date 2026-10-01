import { TasksProvider } from "@/context/TasksContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TasksProvider>
  );
}
