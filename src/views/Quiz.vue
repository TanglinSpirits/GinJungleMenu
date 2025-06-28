<template>
    <div class="background-container" :style='pageStyle'></div>
  <div v-if="currentStep || quizCompleted" class="quiz-page-container" ref="scrollContainer">
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
        <div v-else-if="currentStep.type === 'end'" class="end-container">
            <div class="text-container">
                <p class="narrative-text">{{ currentStep.narrative }}</p>
            </div>

          <div class="image-container">
            <img :src="currentStep.image" alt="Your Drink"/>
          </div>

          <div class="button-container">
            <button @click="nextStep" class="end-button"><span style="white-space: nowrap;">{{ currentStep.buttonText }}</span></button>
          </div>
        </div>
      </div>

      <!-- Quiz Result Page -->
      <div v-else>
        <QuizResult 
            v-if="finalResult"
            :result="finalResult"
            @restart-quiz="restartQuiz"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import QuizStep from '@/components/marriott/QuizStep.vue';
import QuizResult from '@/components/marriott/QuizResult.vue';

const router = useRouter();
const route = useRoute();

// 2. Create a ref to hold the DOM element
const scrollContainer = ref(null);

// --- STATE MANAGEMENT ---
const userAnswers = ref([]);
const quizCompleted = ref(false);
const finalResult = ref(null);
// The current step index is now a computed property based on the URL.
// This makes the URL the single source of truth for the current view.
const currentStepIndex = computed(() => parseInt(route.params.step || '0', 10));

// --- DATA (Unchanged) ---
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
    narrative: `A man with glowing eyes appears behind the bar. "I'm the Spirit Keeper, Guardian of liquid destinies" he says.\n\n He places three glowing potions in front of you, each swirling with magic. "Choose wisely. The right spirit will lead you home."`,
    question: `Which one will you drink?`,
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
    narrative: `As you sip, you hear the bartender whisper:\n"You chose well."\n\nYou wake up back in your room.\nEverything looks the same... but something feels different. You glance down - there's a drink in your hand.\n\nIt's not just any cocktail. It's yours. Your spirit.`,
    buttonText: 'See My Drink',
  },
]);


const resultsData = {
  CN: {
    name: 'Chocolate Negroni',
    titleImage: new URL('../assets/marriott/Chocolate Negroni Text.png', import.meta.url).href,
    image: new URL('../assets/marriott/Chocolate negroni image.png', import.meta.url).href,
    heading: `“Bold and bittersweet, just like the stories you hold.”`,
    description: `You may seem calm on the outside, but inside, you feel things deeply — you're sharp, passionate, and fully committed to what you care about, whether it's love, work, or your purpose. You don’t do anything halfway. But that kind of intensity can be heavy. You take on a lot, and sometimes, it’s hard to let go.`,
    reminder: ' It’s okay to pause.\nYou deserve to rest and rest, to not always be chasing the next thing.',
  },
  GnT: {
    name: 'Singapore Gin & Tonic',
    titleImage: new URL('../assets/marriott/Gin & Tonic Text.png', import.meta.url).href,
    image: new URL('../assets/marriott/Gin & Tonic Image.png', import.meta.url).href,
    heading: `“Bright, grounded, and quietly complex - just like you.”`,
    description: `You stay calm and clear-headed, even when things get noisy or confusing. You like to keep things balanced and peaceful — but because you’re often the one holding everything together, taking big risks can feel scary.`,
    reminder: ' Not every path will be clear. Sometimes, following your instincts matters more than having everything figured out. You don’t need to know it all, just be brave enough to start.',
  },
  CP: {
    name: 'Crossroad Punch',
    titleImage: new URL('../assets/marriott/Crossroad Punch Text.png', import.meta.url).href,
    image: new URL('../assets/marriott/Crossroad Punch Image.png', import.meta.url).href,
    heading: `“Sweet, unexpected, and wonderfully wild - just like you.”`,
    description: `You’re quick, curious, and full of life. You go with your gut, love new adventures, and aren’t afraid to be a little different. But moving fast and saying yes all the time l can make it easy to lose your way.`,
    reminder:
      "Joy doesn’t always come from doing more. Sometimes, the best thing you can do is slow down and listen to what you really need.",
  },
};

// --- COMPUTED PROPERTIES (Unchanged) ---
const currentStep = computed(() => quizSteps.value[currentStepIndex.value]);
const pageStyle = computed(() => {
  let imageUrl = '';

  // 1. If the quiz is completed and the final result has its own background image...
  if (quizCompleted.value && finalResult.value) {
    // ...use the result's specific background image.
    imageUrl = new URL('../assets/marriott/Result Screen.png', import.meta.url).href
  } 
  // 2. If the quiz is in progress...
  else if (currentStep.value) {
    // ...use the background image for the current step.
    imageUrl = currentStep.value.bgImage;
  }

  // 3. Return the final style object.
  return { backgroundImage: `url(${imageUrl})` };
});
// --- NAVIGATION GUARD & STATE LOGIC ---

// Helper function to count how many questions precede a given step index
const countQuestionsBefore = (stepIndex) => {
  if (stepIndex <= 0) return 0;
  return quizSteps.value.slice(0, stepIndex).filter(s => s.type === 'question').length;
};

// This navigation guard runs BEFORE any route change within this component.
onBeforeRouteUpdate((to, from) => {
  // Requirement 4: If the quiz is done, pressing "back" should go to /marriott
  if (quizCompleted.value) {
    // Reset state before navigating away
    quizCompleted.value = false;
    userAnswers.value = [];
    finalResult.value = null;
    router.push('/marriott');
    return false; // Cancel the default "back" navigation
  }

  const toStep = parseInt(to.params.step, 10);
  const fromStep = parseInt(from.params.step, 10);

  // Requirement 3: Block invalid "forward" navigation
  if (toStep > fromStep) {
    const requiredAnswers = countQuestionsBefore(toStep);
    if (userAnswers.value.length < requiredAnswers) {
      return false; // Abort the navigation
    }
  }

  // Requirement 2: If going back, remove the last answer
  if (toStep < fromStep) {
    if (userAnswers.value.length > 0) {
      userAnswers.value.pop();
    }
  }

  // If all checks pass, allow the navigation to proceed
  return true;
});


// --- CORE QUIZ LOGIC ---

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
    winningAnswer = winners[0]
  }
  finalResult.value = { answer: winningAnswer, ...resultsData[winningAnswer] }
  console.log(finalResult)
};

const nextStep = () => {
  const nextIndex = currentStepIndex.value + 1;
  if (nextIndex < quizSteps.value.length) {
    router.push(`/marriott/quiz/${nextIndex}`);
  } else {
    calculateResult();
    quizCompleted.value = true;
  }
};

const handleChoice = (choiceValue) => {
  userAnswers.value.push({ step: currentStepIndex.value, answer: choiceValue });
  nextStep();

  // Scroll the specific container ref instead of the window
//   console.log(scrollContainer.value + "AHHH")
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }
};

const restartQuiz = () => {
  quizCompleted.value = false;
  userAnswers.value = [];
  finalResult.value = null;
  router.push('/marriott');
};
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
  scroll-behavior: smooth;
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
  overflow-y: auto;
  overflow-x: hidden;
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

.end-container {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  width: 100dvw;
  max-width: 100%;
  margin: auto;
  height: 100dvh;
}

.end-container .text-container {
    width: 90%;
    margin-top: 5dvh;
    height: 30dvh;
}

.end-container .image-container {
  flex-grow: 1; /* Allows the image container to fill available space */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35dvh;
  overflow: hidden; /* Prevents image from overflowing */
}

.end-container .image-container img {
  width: 70dvw;
  max-height: 100%; /* Ensures the image scales down with the container */
  object-fit: contain;
  transform: translateX(-4%) translateY(-5%);
}

.button-container {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 10dvh;
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

.end-button {
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

@media (hover: hover) {
  .start-button:hover {
    background-color: #e08600;
    transform: translateX(-50%) scale(1.05);
  }

  .end-button:hover {
    background-color: #e08600;
    transform: scale(1.05);
  }
}
</style>
