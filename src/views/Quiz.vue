<template>
  <div
    v-if="currentStep || quizCompleted"
    class="quiz-page-container"
    :style="pageStyle"
  >
    <div class="content-container">
      <div v-if="!quizCompleted">
        <div v-if="currentStep.type === 'start'" class="start-container">
          <div class="text-container">
            <p class="narrative-text">{{ currentStep.narrative }}</p>
          </div>
          <div class="image-container">
            <img :src="currentStep.image" alt="Start Journey" />
            <button @click="nextStep" class="start-button">{{ currentStep.buttonText }}</button>
          </div>
        </div>

        <div v-else-if="currentStep.type === 'question'">
          <QuizStep
            :key="currentStepIndex"
            :image="currentStep.image"
            :narrative="currentStep.narrative"
            :question="currentStep.question"
            :choices="currentStep.choices"
            @choice-made="handleChoice"
          />
        </div>

        <div v-else-if="currentStep.type === 'end'" class="start-container">
            <div class="image-container">
                <img :src="currentStep.image" alt="Your Drink">
                <button @click="nextStep" class="start-button">{{ currentStep.buttonText }}</button>
            </div>
        </div>
      </div>

      <div v-else class="quiz-results-container">
        <h1>Your journey has concluded.</h1>
        <p>You have found your spirit.</p>
        <button @click="restartQuiz" class="restart-button">Begin Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import QuizStep from '@/components/marriot/QuizStep.vue';

const router = useRouter();

// --- STATE MANAGEMENT ---
const currentStepIndex = ref(0);
const userAnswers = ref([]);
const quizCompleted = ref(false);

// --- QUIZ DATA (No changes needed here) ---
const quizSteps = ref([
  {
    type: 'start',
    bgImage: new URL('../assets/marriot/Screen 2 & Screen 8.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 2 Door.png', import.meta.url).href,
    narrative: `Tonight, you've slipped into a world between worlds - where every choice shapes your path.\n\n To find your way back, you'll walk a path, each step revealing something deeper about who you are...\n\nAnd discover the spirit that matches you. \nYour perfect drink companion.`,
    buttonText: `Let's Go!`
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriot/Screen 3.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 3 Arrow.png', import.meta.url).href,
    narrative: `Before you lie three paths. They twist off in different directions - mysterious, inviting and unlike anything you've seen.`,
    question: 'Which path will you walk?',
    choices: [
      { text: 'A mist-veiled path lit by floating lanterns', value: 'path_mist' },
      { text: 'A shadowy alley glowing with ember light', value: 'path_shadow' },
      { text: 'A colour-shifting iridescent glowing walkway', value: 'path_iridescent' },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriot/Screen 4 & 7.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 4 Mirror.png', import.meta.url).href,
    narrative: `Halfway through your path, you encounter an ancient mirror that speaks, "Only by seeing yourself clearly can you move forward".`,
    question: 'What do you see?',
    choices: [
      { text: 'A quiet figure surrounded by soft light - thoughtful and observant.', value: 'figure_quiet' },
      { text: 'A figure pulsing with energy - passionate and a chaser of big dreams.', value: 'figure_energy' },
      { text: 'A figure surrounded by sparkles - playful, curious and the life of the party.', value: 'figure_sparkles' },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriot/Screen 5.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 5 door.png', import.meta.url).href,
    narrative: "The mirror fades. Ahead, three doors stand in front of you... Each oddly shaped.",
    question: 'Which do you choose to enter?',
    choices: [
        { text: 'A narrow arched door made of coloured glass, twinkling with fairy lights.', value: 'door_glass' },
        { text: 'A tall, crooked dark wooden door with dragons carved onto it.', value: 'door_wood' },
        { text: 'A rounded neon door covered in indecipherable graffitis', value: 'door_neon' },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriot/Screen 6.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 6 Menu Book.png', import.meta.url).href,
    narrative: `The door creaks open... and it's a bar! Not quite the kind you're used to. The walls shimmer. Menus float in mid-air. Drinks pour themselves with a flicker of light. Your stomach suddenly growls after hours on your feet.`,
    question: 'What will you order to eat?',
    choices: [
        { text: 'Enchanted Lotus Wraps', value: 'food_lotus' },
        { text: 'Celestial Mala Orbs', value: 'food_mala' },
        { text: 'Crystal Fruit Jelly Blossoms', value: 'food_jelly' },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriot/Screen 4 & 7.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 7 Potion.png', import.meta.url).href,
    narrative: `A man with glowing eyes appears behind the bar. "I'm the Spirit Keeper, Guardian of liquid destinies" he says. He places three glowing potions in front of you, each swirling with magic.`,
    question: `Choose wisely. The right spirit will lead you home.`,
    choices: [
        { text: `A crystal-clear elixir with floating citrus peels and gentle fizz.`, value: 'potion_elixir' },
        { text: `A deep crimson brew infused with sweet dragon's breath.`, value: 'potion_crimson' },
        { text: `A sparkling tonic, glowing with swirling bursts of light.`, value: 'potion_tonic' },
    ],
  },
  {
    type: 'end',
    bgImage: new URL('../assets/marriot/Screen 2 & Screen 8.png', import.meta.url).href,
    image: new URL('../assets/marriot/Screen 8 Cocktail.png', import.meta.url).href,
    narrative: ``,
    buttonText: "See My Drink"
  }
]);

// --- COMPUTED PROPERTIES ---
const currentStep = computed(() => quizSteps.value[currentStepIndex.value]);

const pageStyle = computed(() => {
  const imageUrl = (quizCompleted.value && quizSteps.value.length > 0)
    ? quizSteps.value[0].bgImage
    : (currentStep.value ? currentStep.value.bgImage : '');
  return { backgroundImage: `url(${imageUrl})` };
});


// --- LOGIC / FUNCTIONS ---
const nextStep = () => {
  if (currentStepIndex.value < quizSteps.value.length - 1) {
    currentStepIndex.value++;
  } else {
    quizCompleted.value = true;
  }
};

const handleChoice = (choiceValue) => {
  userAnswers.value.push({
    step: currentStepIndex.value,
    answer: choiceValue,
  });
  nextStep();
};

const restartQuiz = () => {
  quizCompleted.value = false;
  currentStepIndex.value = 0;
  userAnswers.value = [];
  router.push('/marriot');
};
</script>

<style scoped>
.quiz-page-container {
  width: 100%;
  min-height: 100dvh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content-container {
  position: relative;
  z-index: 2;
  color: white;
  height: 100dvh;
  display: flex; /* Added for centering the inner container */
  justify-content: center;
  align-items: center;
}

.start-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  margin: auto;
  height: 100dvh;
}

.text-container {
  width: 90%;
  margin-top: 5dvh;
}

.narrative-text {
  font-family: 'arial';
  font-weight: bolder;
  font-size: clamp(0.94rem, 2.5vw, 1.2rem);
  color: #770d00;
  line-height: 1.5;
  white-space: pre-wrap;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  overflow-y: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* ---  UPDATED BUTTON STYLES --- */
.start-button {
  position: absolute;
  bottom:10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 35px;
  width: auto;

  /* Original styles */
  background-color: #ce2c05;
  border: none; /* Removed the white border for a cleaner look */
  border-radius: 50px;
  font-family: 'Impact', sans-serif;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  /* text-transform: uppercase; */
}

.start-button:hover {
  background-color: #e08600;
  /* Adjust transform on hover to avoid overriding the centering */
  transform: translateX(-50%) scale(1.05);
}

/* Results container styles */
.quiz-results-container {
  font-family: 'FSKim Bold', sans-serif;
}
.quiz-results-container h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
}
.quiz-results-container p {
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  margin-bottom: 2rem;
}
.restart-button {
  background-color: #f69300;
  border: 2px solid white;
  border-radius: 50px;
  padding: 15px 30px;
  font-family: 'Impact', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}
.restart-button:hover {
  background-color: #e08600;
}
</style>