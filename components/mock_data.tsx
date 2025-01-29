import { eHabitTask } from "./tracker-calender";

const sampleTasks: eHabitTask[] = [
  {
    _id: "task1",
    aspect: "Health",
    owner: { _id: "user123", email: "user123@example.com", username: "user123" },
    title: "Morning Jog",
    description: "A daily 30-minute jog to improve cardiovascular health.",
    accessibility: "public",
    start_date: new Date("2025-01-01"),
    end_date: new Date("2025-03-31"),
    entries: [
      { _id: "entry1", habit: "Jogging", date: new Date("2025-01-01"), completed: true },
      { _id: "entry2", habit: "Jogging", date: new Date("2025-01-02"), completed: false },
    ],
  },
  {
    _id: "task2",
    aspect: "Learning",
    owner: { _id: "user456", email: "user456@example.com", username: "user456" },
    title: "Daily Coding Practice",
    description: "Spend 1 hour daily practicing algorithms and data structures.",
    accessibility: "private",
    start_date: new Date("2025-02-01"),
    end_date: new Date("2025-05-01"),
    entries: [
      { _id: "entry3", habit: "Coding", date: new Date("2025-02-01"), completed: true },
      { _id: "entry4", habit: "Coding", date: new Date("2025-02-02"), completed: true },
    ],
  },
  {
    _id: "task3",
    aspect: "Wellness",
    owner: { _id: "user789", email: "user789@example.com", username: "user789" },
    title: "Daily Meditation",
    description: "Practice mindfulness meditation for 15 minutes every day.",
    accessibility: "partnership",
    start_date: new Date("2025-01-15"),
    end_date: new Date("2025-04-15"),
    entries: [
      { _id: "entry5", habit: "Meditation", date: new Date("2025-01-15"), completed: false },
      { _id: "entry6", habit: "Meditation", date: new Date("2025-01-16"), completed: true },
    ],
  },
];

export default sampleTasks;
