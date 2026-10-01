import { TASKS } from "@/data/tasks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ASSIGNEES,
  CategoryScroller,
  DATE_OPTIONS,
  FormField,
  FormHeader,
  PillSelector,
  PRIORITIES,
  PROJECTS,
  STATUSES,
} from "@/components/CreateTask";

export default function CreateTaskScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("Work");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Me");
  const [dateOption, setDateOption] = useState("Today");
  const [customDate, setCustomDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleSelectDateOption = (option: string) => {
    setDateOption(option);
    if (option === "Custom Date") {
      setShowDatePicker(true);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSaveTask = () => {
    if (!title.trim()) {
      setTitleError("Please enter a task title");
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      try {
        const newTask = {
          id: Date.now().toString(),
          title: title.trim(),
          project,
          status,
          priority,
          assignee,
          dueDate:
            dateOption === "Custom Date"
              ? formatDate(customDate)
              : dateOption,
        };

        TASKS.unshift(newTask);
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => navigateBack(), 600);
      } catch {
        setIsSaving(false);
        setTitleError("Something went wrong. Please try again.");
      }
    }, 400);
  };

  return (
    <View style={styles.screen}>
      <FormHeader title="New Task" onCancel={navigateBack} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* task title */}
          <FormField label="Task Title">
            <TextInput
              style={[styles.input, !!titleError && styles.inputError]}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (titleError) setTitleError("");
              }}
              placeholder="Enter task title"
              placeholderTextColor="#999"
            />
            {!!titleError && <Text style={styles.errorText}>{titleError}</Text>}
          </FormField>

          {/* description */}
          <FormField label="Description">
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </FormField>

          {/* category */}
          <FormField label="Category">
            <CategoryScroller
              categories={PROJECTS}
              selected={project}
              onSelect={setProject}
            />
          </FormField>

          {/* status */}
          <FormField label="Status">
            <PillSelector
              options={STATUSES}
              selected={status}
              onSelect={setStatus}
              activeColor="#1C1B1F"
            />
          </FormField>

          {/* priority */}
          <FormField label="Priority">
            <PillSelector
              options={PRIORITIES}
              selected={priority}
              onSelect={setPriority}
            />
          </FormField>

          {/* assignee */}
          <FormField label="Assignee">
            <PillSelector
              options={ASSIGNEES}
              selected={assignee}
              onSelect={setAssignee}
              activeColor="#1C1B1F"
            />
          </FormField>

          {/* due date */}
          <FormField label="Due Date">
            <PillSelector
              options={DATE_OPTIONS}
              selected={dateOption}
              onSelect={handleSelectDateOption}
            />
            {dateOption === "Custom Date" && (
              <View style={styles.datePickerRow}>
                <TouchableOpacity
                  style={styles.dateDisplay}
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dateDisplayText}>
                    {formatDate(customDate)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {showDatePicker && dateOption === "Custom Date" && (
              <DateTimePicker
                value={customDate}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                minimumDate={new Date()}
                onValueChange={(event, selectedDate) => {
                  if (Platform.OS === "android") setShowDatePicker(false);
                  if (selectedDate) setCustomDate(selectedDate);
                }}
                onDismiss={() => setShowDatePicker(false)}
              />
            )}
          </FormField>

          {/* create task button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              saveSuccess && styles.successButton,
            ]}
            onPress={handleSaveTask}
            activeOpacity={0.8}
            disabled={isSaving || saveSuccess}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Saving..." : saveSuccess ? "Task Created" : "Create Task"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    paddingBottom: 60,
  },
  input: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: "#1C1B1F",
  },
  inputError: {
    borderWidth: 1.5,
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },
  textArea: {
    height: 110,
    paddingTop: 14,
  },
  customDateInput: {
    marginTop: 10,
  },
  datePickerRow: {
    marginTop: 10,
  },
  dateDisplay: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateDisplayText: {
    fontSize: 18,
    color: "#1C1B1F",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "darkcyan",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  successButton: {
    backgroundColor: "green",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
