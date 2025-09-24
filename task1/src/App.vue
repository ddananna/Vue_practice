<script setup>
import { ref, computed } from 'vue';

const tasks = ref([]);
const newTaskText = ref('');
const newCategory = ref('Work');
const filterCategory = ref('All');
const showIncompleteOnly = ref(false);

const incompleteCount = computed(() => {
  return tasks.value.filter(task => !task.isCompleted).length;
});

const filteredTasks = computed(() => {
  let filtered = tasks.value;
  
  if (filterCategory.value !== 'All') {
    filtered = filtered.filter(task => task.category === filterCategory.value);
  }

  if (showIncompleteOnly.value) {
    filtered = filtered.filter(task => !task.isCompleted);
  }

  return filtered;
});

const addTask = () => {
  if (newTaskText.value.trim() !== '') {
    tasks.value.push({
      id: Date.now(),
      text: newTaskText.value,
      category: newCategory.value,
      isCompleted: false,
    });
    newTaskText.value = '';
  }
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};

const toggleComplete = (taskId) => {
  const task = tasks.value.find(task => task.id === taskId);
  if (task) {
    task.isCompleted = !task.isCompleted;
  }
};

const toggleIncompleteFilter = () => {
  showIncompleteOnly.value = !showIncompleteOnly.value;
};
</script>

<template>
  <div class="task-app">
    <h1>My Task List</h1>
    <p class="stats">
      Incomplete tasks: {{ incompleteCount }}
    </p>

    <div class="input-container">
      <input
        type="text"
        placeholder="Add a new task..."
        v-model="newTaskText"
        @keyup.enter="addTask"
      />
      <select v-model="newCategory">
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      
      <button @click="addTask">Add Task</button>
    </div>

    <div class="filters">
      <span>Filter by Category:</span>
      <select v-model="filterCategory">
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      <button @click="toggleIncompleteFilter" :class="{ 'active-filter': showIncompleteOnly }">
        {{ showIncompleteOnly ? 'Show All' : 'Show Incomplete Only' }}
      </button>
    </div>

    <p v-if="filteredTasks.length === 0" class="no-tasks">
      No tasks to display.
    </p>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id" 
          :class="{ completed: task.isCompleted }">
        <div class="task-info">
          <span class="task-text">{{ task.text }}</span>
          <span class="task-category">{{ task.category }}</span>
        </div>
        
        <div class="actions">
          <button @click="toggleComplete(task.id)">Mark as {{ task.isCompleted ? 'Incomplete' : 'Complete' }}</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
