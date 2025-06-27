<template>
  <div class="quiz-step-container">

    <div class="quiz-text-content">
      <p class="narrative-text">{{ narrative }}</p>
      <p class="question-text">{{ question }}</p>
    </div>

    <div class="quiz-image-container">
      <img v-if="image" :src="image" alt="Quiz Step Image" class="quiz-image" />
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
    validator: (value) => value.every((choice) => 'text' in choice && 'value' in choice),
  },
})

// Define the event that this component will emit
const emit = defineEmits(['choice-made'])

// Function to emit the chosen value to the parent component
const selectChoice = (value) => {
  emit('choice-made', value)
  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth'
  // });

}
</script>

<style scoped>
.quiz-step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  width: 100dvw;
  max-width: 100%;
  height: 100dvh;
  margin: auto;
  text-align: center;
  font-family: 'arialBold';
  color: #770d00;
}

.quiz-text-content {
  margin-top: 5dvh;
  border: solid white 2px;
  border-radius: 50px;
  width: 85%;
  padding: 1.5rem 1rem;
  background-color: white;
  font-family: 'arialBold';
  margin-bottom: 5dvh;
}

.narrative-text {
  font-size: 1rem;
  /* margin-bottom: 1.5dvh; */
  white-space: pre-wrap;
  line-height: 1.2;
}

.question-text {
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 1.2;
}

.quiz-image-container {
  /* margin-bottom: 2rem; */
  max-width: 500px;
  width: 70%;
}

.quiz-image {
  width: 65%;
  height: auto;
  border-radius: 15px;
  object-fit: contain;
}

.choices-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 85%;
  max-width: 500px;
  padding:0 0 5dvh 0;
}

.choice-button {
  background-color: white; /* Using yellow from your theme */
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #770d00;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
}

/* --- HOVER STYLES FOR DESKTOP ONLY --- */
@media (hover: hover) {
  .choice-button:hover {
    background-color: #e8dc5e;
    transform: translateY(-2px);
  }
}
</style>