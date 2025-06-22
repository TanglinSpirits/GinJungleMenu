<template>
  <div class="quiz-step-container">
    <div class="quiz-image-container">
      <img v-if="image" :src="image" alt="Quiz Step Image" class="quiz-image" />
    </div>

    <div class="quiz-text-content">
      <p class="narrative-text">{{ narrative }}</p>
      <h2 class="question-text">{{ question }}</h2>
    </div>

    <div class="choices-container">
      <button
        v-for="choice in choices"
        :key="choice.value"
        @click="selectChoice(choice.value)"
        class="choice-button"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Define the props this component accepts
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  narrative: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: true,
    // Validator to ensure choices are in the correct format
    validator: (value) =>
      value.every((choice) => 'text' in choice && 'value' in choice),
  },
});

// Define the event that this component will emit
const emit = defineEmits(['choice-made']);

// Function to emit the chosen value to the parent component
const selectChoice = (value) => {
  emit('choice-made', value);
};
</script>

<style scoped>
.quiz-step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  font-family: 'Benton Sans', sans-serif;
  color: #333;
}

.quiz-image-container {
  margin-bottom: 2rem;
  max-width: 300px;
}

.quiz-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

.quiz-text-content {
  margin-bottom: 2rem;
}

.narrative-text {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1rem;
}

.question-text {
  font-family: 'FSKim Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
}

.choices-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
}

.choice-button {
  background-color: #f0e87b; /* Using yellow from your theme */
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
}

.choice-button:hover {
  background-color: #e8dc5e;
  transform: translateY(-2px);
}
</style>