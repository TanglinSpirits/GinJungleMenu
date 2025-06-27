<template>
  <div v-if="result" class="quiz-results-container">
    <div class="title-container">
        <img :src="result.titleImage" alt="Drink Title" class="title-image"/>
    </div>

    <div class="result-image-container">
        <img :src="result.image" alt="Your Drink" class="result-image" />
    </div>

    <div class="result-text-container">
        <p class="result-heading">{{ result.heading }}</p>
        <p class="result-description">{{ result.description }}</p>
        <p class="result-reminder">
            Your reminder: {{ result.reminder }}
        </p>
    </div>

    <div class="result-button-container">
        <button @click="handleRestart" class="restart-button">Explore Other Spirits</button>
    </div>
    
    
    <!-- <h1 class="result-title">{{ result.name }}</h1> -->

  </div>
</template>

<script setup>
// --- PROPS ---
// The component accepts a 'result' object which contains all the necessary
// information to display the outcome of the quiz.
const props = defineProps({
  result: {
    type: Object,
    required: true,
    // A validator ensures the result object has the expected properties.
    validator: (value) => {
      return (
        value &&
        'name' in value &&
        'titleImage' in value &&
        'image' in value &&
        'heading' in value &&
        'description' in value &&
        'reminder' in value
      )
    },
  },
})

// --- EMITS ---
// Defines the custom event that this component can send to its parent.
const emit = defineEmits(['restart-quiz'])

// --- METHODS ---
// When the restart button is clicked, this function emits the 'restart-quiz' event.
const handleRestart = () => {
  emit('restart-quiz')
}
</script>

<style scoped>
/* Styles are copied directly from your existing Quiz.vue for consistency */
.quiz-results-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100dvw;
  max-width: 100%;
  margin: auto;
  height: 100dvh;
}

.title-container {
    padding-top: 5dvh;
    width: 90%;
    max-width: 500px;
}

.title-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.result-image-container {
    width: 60dvw;
}

.result-image {
    width: 100%;
    max-width: 350px; /* Control max size */
    height: auto;
    margin-bottom: 1.5rem;
    border-radius: 15px; /* Optional: adds rounded corners */
}

.result-text-container {
    width: 90%;
    max-width: 600px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 50px;
    padding: 2dvh 5dvw;
    color: #770d00;
    font-family: 'arialBold';
    line-height: 1.4;
    margin-bottom: 3dvh;
}

.result-heading {
    font-family: 'Impact', sans-serif;
    font-size: clamp(1.5rem, 4.5vw, 2.2rem);
}

.result-description,
.result-reminder {
  font-size: clamp(1.1rem, 3dvw, 1.4rem);
}

.result-button-container {
  width: 90%;
  max-width: 600px;
  margin-bottom: 5dvh;
}

.restart-button {
  width: 100%;
  background-color: #ce2c05;
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-family: 'Impact', sans-serif;
  font-size: clamp(1.5rem, 4.5vw, 2.2rem);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 5dvh;
}

@media(hover: hover) {
    .restart-button:hover {
        background-color: #e08600;
        transform: scale(1.05);
    }    
}
</style>