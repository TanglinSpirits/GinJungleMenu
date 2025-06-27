<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner"></div>
  </div>

  <div v-else>
    <div class="background-container"></div>
    <div class="page-container">
      <div class="title-section">
        <img src="@/assets/marriott/Screen 1 Title.png" alt="At the Crossroads" class="title-image" />
      </div>

      <div class="sign-section">
        <div class="sign-container">
          <img src="@/assets/marriott/Full Stand.png" alt="Sign with Text" class="sign-image" />

          <div class="clickable-element" @click="handleClick">
            <button class="btn btn-outline-light rounded-pill" style="--bs-btn-hover-bg: none; --bs-btn-hover-color: white;">
              <span class="begin-journey">BEGIN YOUR JOURNEY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()
const loading = ref(true)

// --- Define all assets for BOTH Marriott.vue and the ENTIRE Quiz.vue flow ---

// Marriott Assets
const marriottImageUrls = [
  new URL('../assets/marriott/Screen 1 Title.png', import.meta.url).href,
  new URL('../assets/marriott/Full Stand.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 1.png', import.meta.url).href,
];

// Quiz Assets (copied from Quiz.vue)
const quizImageUrls = [
  // Step images
  new URL('../assets/marriott/Screen 2 & Screen 8.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 2 Door.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 3.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 3 Arrow.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 4 & 7.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 4 Mirror.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 5.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 5 door.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 6.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 6 Menu Book.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 7 Potion.png', import.meta.url).href,
  new URL('../assets/marriott/Screen 8 Cocktail.png', import.meta.url).href,

  // Result images
  new URL('../assets/marriott/Chocolate Negroni Text.png', import.meta.url).href,
  new URL('../assets/marriott/Chocolate negroni image.png', import.meta.url).href,
  new URL('../assets/marriott/Gin & Tonic Text.png', import.meta.url).href,
  new URL('../assets/marriott/Gin & Tonic Image.png', import.meta.url).href,
  new URL('../assets/marriott/Crossroad Punch Text.png', import.meta.url).href,
  new URL('../assets/marriott/Crossroad Punch Image.png', import.meta.url).href,
  new URL('../assets/marriott/Result Screen.png', import.meta.url).href,
];

// Font Assets
const fontUrls = [
  { url: new URL('@/assets/marriott/Fonts/impact.ttf', import.meta.url).href, name: 'Impact' },
  { url: new URL('@/assets/marriott/Fonts/arial.ttf', import.meta.url).href, name: 'arial' },
  { url: new URL('@/assets/marriott/Fonts/arialbd.ttf', import.meta.url).href, name: 'arialBold' },
];

const allAssetsToLoad = [...marriottImageUrls, ...quizImageUrls];

// --- Use `unhead` to instruct the browser to preload everything ---
useHead({
  title: 'Marriot At The Crossroads',
  link: [
    ...allAssetsToLoad.map(url => ({ rel: 'preload', as: 'image', href: url })),
    ...fontUrls.map(font => ({ rel: 'preload', as: 'font', type: 'font/ttf', crossorigin: 'anonymous', href: font.url })),
  ],
});

// --- Use Promise.all to wait for all assets before rendering ---
onMounted(async () => {
  await nextTick();

  const loadImage = src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });

  const loadFont = font => document.fonts.load(`1em "${font.name}"`);

  const loadingTasks = [
    ...allAssetsToLoad.map(loadImage),
    ...fontUrls.map(loadFont),
  ];

  try {
    await Promise.all(loadingTasks);
  } catch (error) {
    console.error("A critical asset for the journey failed to load:", error);
  } finally {
    loading.value = false; // All assets are ready, render the page.
  }
});

const handleClick = () => {
  router.push('/marriott/quiz/0');
}
</script>

<style scoped>
.background-container {
  position: fixed;
  width: 100%;
  min-height: 100dvh;
  background-image: url('@/assets/marriott/Screen 1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  scroll-behavior: smooth;
}

.page-container {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.title-section {
  position: relative;
  margin-top: 10dvh;
  height: 20dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(10px, 2vh, 30px) clamp(15px, 5vw, 50px);
  box-sizing: border-box;
}

.title-image {
  width: clamp(200px, 80vw, 500px);
  height: auto;
  object-fit: contain;
}

.sign-section {
  height: 70dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(10px, 2vh, 30px) clamp(15px, 5vw, 50px);
  box-sizing: border-box;
  overflow-y: hidden;
}

.sign-container {
  position: relative;
  top: 5dvh;
  width: 100%;
  height: 130%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(250px, 70vw, 450px);
}

.sign-image {
  height: auto;
  max-height: 100%;
  object-fit: contain;
}

.clickable-element {
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
  background-color: #f69300;
  border-radius: 50px;
  padding: 4px;
  filter: drop-shadow(8px 8px 10px #d33d33);
}

@media (hover: hover) {
  .clickable-element:hover {
    transform: translate(-50%, -50%) scale(1.05);
    background-color: white;
  }
  .begin-journey:hover {
    color: black;
  }
}

.begin-journey {
  font-family: 'Impact';
  text-wrap: nowrap;
  font-size: clamp(1.9rem, 4vw, 2rem);
}

.spinner {
  border-top-color: #f69300;
}
</style>