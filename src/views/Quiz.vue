<template>
    <div class="background-container" :style='pageStyle'></div>
  <div v-if="currentStep || quizCompleted" class="quiz-page-container" >
    <div class="content-container">
      <div v-if="!quizCompleted">

        <!-- Start Page (Let's Go Button) -->
        <div v-if="currentStep.type === 'start'" class="start-container">
          <div class="text-container">
            <p class="narrative-text">{{ currentStep.narrative }}</p>
          </div>
          <div class="image-container">
            <img :src="currentStep.image" alt="Start Journey" />
            <button @click="nextStep" class="start-button">{{ currentStep.buttonText }}</button>
          </div>
        </div>

        <!-- Question Page -->
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

        <!-- End Page (See Your Drink Button) -->
        <div v-else-if="currentStep.type === 'end'" class="start-container">
          <div class="image-container">
            <img :src="currentStep.image" alt="Your Drink" />
            <button @click="nextStep" class="start-button">{{ currentStep.buttonText }}</button>
          </div>
        </div>
      </div>

      <!-- Quiz Result Page -->
      <div v-else class="quiz-results-container">
        <div v-if="finalResult">
          <img :src="finalResult.image" alt="Your Drink" class="result-image" />
          <h1 class="result-title">{{ finalResult.name }}</h1>
          <p class="result-description">{{ finalResult.description }}</p>
          <p class="result-reminder"><strong>Your reminder:</strong> {{ finalResult.reminder }}</p>
          <button @click="restartQuiz" class="restart-button">Begin Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import QuizStep from '@/components/marriott/QuizStep.vue'

const router = useRouter()

// --- STATE MANAGEMENT ---
const currentStepIndex = ref(0)
const userAnswers = ref([])
const quizCompleted = ref(false)
const finalResult = ref(null)

// --- QUIZ DATA with 'answer' instead of 'type' ---
const quizSteps = ref([
  {
    type: 'start',
    bgImage: new URL('../assets/marriott/Screen 2 & Screen 8.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 2 Door.png', import.meta.url).href,
    narrative: `Tonight, you've slipped into a world between worlds - where every choice shapes your path.\n\n To find your way back, you'll walk a path, each step revealing something deeper about who you are...\n\nAnd discover the spirit that matches you. \nYour perfect drink companion.`,
    buttonText: `Let's Go!`,
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriott/Screen 3.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 3 Arrow.png', import.meta.url).href,
    narrative: `Before you lie three paths. They twist off in different directions - mysterious, inviting and unlike anything you've seen.`,
    question: 'Which path will you walk?',
    choices: [
      { text: 'A mist-veiled path lit by floating lanterns', value: 'path_mist', answer: 'GnT' },
      { text: 'A shadowy alley glowing with ember light', value: 'path_shadow', answer: 'CN' },
      {
        text: 'A colour-shifting iridescent glowing walkway',
        value: 'path_iridescent',
        answer: 'CP',
      },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriott/Screen 4 & 7.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 4 Mirror.png', import.meta.url).href,
    narrative: `Halfway through your path, you encounter an ancient mirror that speaks, "Only by seeing yourself clearly can you move forward".`,
    question: 'What do you see?',
    choices: [
      {
        text: 'A quiet figure surrounded by soft light - thoughtful and observant.',
        value: 'figure_quiet',
        answer: 'GnT',
      },
      {
        text: 'A figure pulsing with energy - passionate and a chaser of big dreams.',
        value: 'figure_energy',
        answer: 'CN',
      },
      {
        text: 'A figure surrounded by sparkles - playful, curious and the life of the party.',
        value: 'figure_sparkles',
        answer: 'CP',
      },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriott/Screen 5.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 5 door.png', import.meta.url).href,
    narrative: 'The mirror fades. Ahead, three doors stand in front of you...\n\n Each oddly shaped.',
    question: 'Which do you choose to enter?',
    choices: [
      {
        text: 'A narrow arched door made of coloured glass, twinkling with fairy lights.',
        value: 'door_glass',
        answer: 'GnT',
      },
      {
        text: 'A tall, crooked dark wooden door with dragons carved onto it.',
        value: 'door_wood',
        answer: 'CN',
      },
      {
        text: 'A rounded neon door covered in indecipherable graffitis',
        value: 'door_neon',
        answer: 'CP',
      },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriott/Screen 6.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 6 Menu Book.png', import.meta.url).href,
    narrative: `The door creaks open... and it's a bar!\n\n Not quite the kind you're used to. The walls shimmer. Menus float in mid-air. Drinks pour themselves with a flicker of light. Your stomach suddenly growls after hours on your feet.`,
    question: 'What will you order to eat?',
    choices: [
      { text: 'Enchanted Lotus Wraps', value: 'food_lotus', answer: 'GnT' },
      { text: 'Celestial Mala Orbs', value: 'food_mala', answer: 'CN' },
      { text: 'Crystal Fruit Jelly Blossoms', value: 'food_jelly', answer: 'CP' },
    ],
  },
  {
    type: 'question',
    bgImage: new URL('../assets/marriott/Screen 4 & 7.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 7 Potion.png', import.meta.url).href,
    narrative: `A man with glowing eyes appears behind the bar. "I'm the Spirit Keeper, Guardian of liquid destinies" he says.\n\n He places three glowing potions in front of you, each swirling with magic.`,
    question: `Choose wisely. The right spirit will lead you home.`,
    choices: [
      {
        text: `A crystal-clear elixir with floating citrus peels and gentle fizz.`,
        value: 'potion_elixir',
        answer: 'GnT',
      },
      {
        text: `A deep crimson brew infused with sweet dragon's breath.`,
        value: 'potion_crimson',
        answer: 'CN',
      },
      {
        text: `A sparkling tonic, glowing with swirling bursts of light.`,
        value: 'potion_tonic',
        answer: 'CP',
      },
    ],
  },
  {
    type: 'end',
    bgImage: new URL('../assets/marriott/Screen 2 & Screen 8.png', import.meta.url).href,
    image: new URL('../assets/marriott/Screen 8 Cocktail.png', import.meta.url).href,
    narrative: ``,
    buttonText: 'See My Drink',
  },
])

// --- RESULT DATA (Completed from PDF) ---
const resultsData = {
  CN: {
    name: 'Chocolate Negroni',
    image: new URL('../assets/marriot/results/negroni.png', import.meta.url).href,
    description: `“Bold and bittersweet, just like the stories you hold.” Beneath your cool exterior lies a soul lit by fire - sharp, deep, passionate.`,
    reminder: 'Everyone needs time to breathe. Give yourself permission to rest and feel joy.',
  },
  GnT: {
    name: 'Singapore Gin & Tonic',
    image: new URL('../assets/marriott/results/gin-tonic.png', import.meta.url).href,
    description: `“Bright, grounded, and quietly complex - just like you.” You see the bigger picture when others get lost in the noise. Calm and self-aware, you thrive where thoughtfulness meets quiet confidence.`,
    reminder: 'Not every path is clear. Sometimes, instinct matters more than the plan.',
  },
  CP: {
    name: 'Crossroad Punch',
    image: new URL('../assets/marriott/results/punch.png', import.meta.url).href,
    description: `“Sweet, unexpected, and wonderfully wild - just like you.” You're vibrant, intuitive, and drawn to the new, the wild, and the wonderful.`,
    reminder:
      "Joy doesn't always come from movement. Sometimes, it finds you when you pause and listen to what you really need.",
  },
}

// --- COMPUTED PROPERTIES ---
const currentStep = computed(() => quizSteps.value[currentStepIndex.value])
const pageStyle = computed(() => {
  const imageUrl =
    quizCompleted.value && finalResult.value
      ? quizSteps.value[0].bgImage
      : currentStep.value
        ? currentStep.value.bgImage
        : ''
  return { backgroundImage: `url(${imageUrl})` }
})

// --- LOGIC / FUNCTIONS (Updated for new scoring system) ---
const calculateResult = () => {
  const scores = { CN: 0, GnT: 0, CP: 0 }

  userAnswers.value.forEach((answerObj) => {
    const step = quizSteps.value.find((s, index) => index === answerObj.step)
    if (step && step.type === 'question') {
      const choice = step.choices.find((c) => c.value === answerObj.answer)
      if (choice) {
        scores[choice.answer]++
      }
    }
  })

  const maxScore = Math.max(...Object.values(scores))
  const winners = Object.keys(scores).filter((type) => scores[type] === maxScore)

  let winningAnswer
  if (winners.length > 1) {
    // Tie-breaking: find the first answer that matches a winning type
    for (const answerObj of userAnswers.value) {
      const step = quizSteps.value.find((s, index) => index === answerObj.step)
      if (step && step.type === 'question') {
        const choice = step.choices.find((c) => c.value === answerObj.answer)
        if (choice && winners.includes(choice.answer)) {
          winningAnswer = choice.answer
          break
        }
      }
    }
  } else {
    // No tie
    winningAnswer = winners[0]
  }

  finalResult.value = { answer: winningAnswer, ...resultsData[winningAnswer] }
}

const nextStep = () => {
  if (currentStepIndex.value < quizSteps.value.length - 1) {
    currentStepIndex.value++
  } else {
    calculateResult()
    console.log(finalResult)
    quizCompleted.value = true
  }
}

const handleChoice = (choiceValue) => {
  userAnswers.value.push({ step: currentStepIndex.value, answer: choiceValue })
  nextStep()
}

const restartQuiz = () => {
  quizCompleted.value = false
  currentStepIndex.value = 0
  userAnswers.value = []
  finalResult.value = null
  router.push('/marriott')
}
</script>

<style scoped>
.background-container {
  position: fixed;
  width: 100%;
  min-height: 100dvh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
}

.quiz-page-container {
  width: 100%;
  min-height: 100dvh;
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out; */
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
  width: 100dvw;
  max-width: 100%;
  margin: auto;
  height: 100dvh;
}

.text-container {
  width: 90%;
  margin-top: 5dvh;
}

.narrative-text {
  font-family: 'arialBold';
  font-weight: bold;
  font-size: clamp(0.94rem, 2.5dvw, 1.2rem);
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
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 35px;
  width: auto;

  /* Original styles */
  background-color: #ce2c05;
  border: none; /* Removed the white border for a cleaner look */
  border-radius: 50px;
  font-family: 'Impact', sans-serif;
  font-size: clamp(1.4rem, 4dvw, 1.8rem);
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
  font-size: clamp(2rem, 5dvw, 3rem);
  margin-bottom: 1rem;
}
.quiz-results-container p {
  font-size: clamp(1.1rem, 3dvw, 1.4rem);
  margin-bottom: 2rem;
}
.restart-button {
  background-color: #f69300;
  border: 2px solid white;
  border-radius: 50px;
  padding: 15px 30px;
  font-family: 'Impact', sans-serif;
  font-size: clamp(1.2rem, 3dvw, 1.5rem);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}
.restart-button:hover {
  background-color: #e08600;
}
</style>
