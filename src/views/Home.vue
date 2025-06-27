<template>
  <div v-if="loading" class="loading-container">
    <div class="spinner"></div>
  </div>
  <div v-else class="app-container">
    <div class="container-fluid overlay">
      <div class="custom-shape-divider-top-1745957112">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
    <tanglinLogo />
    <div class="container">
      <tanglinHeader />
      <tigerLogo />
    </div>
    <buttonContainer :buttons="customButtons" @button-click="handleButtonClick" />
    <brandIcons />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useHead } from '@unhead/vue' // 1. Import useHead
import tanglinLogo from '../components/tanglinLogo.vue'
import tanglinHeader from '../components/tanglinHeader.vue'
import tigerLogo from '../components/tigerLogo.vue'
import buttonContainer from '../components/buttonContainer.vue'
import brandIcons from '../components/brandIcons.vue'

// --- Define Assets and SEO Metadata ---
const loading = ref(true)

const imageUrls = [
  new URL('../assets/tanglinLogo.png', import.meta.url).href,
  new URL('../assets/tiger2.png', import.meta.url).href,
];

const fontUrls = [
  { url: new URL('../assets/fonts/FSKim-Bold.ttf', import.meta.url).href, type: 'font/ttf' },
  { url: new URL('../assets/fonts/Benton Sans Regular.otf', import.meta.url).href, type: 'font/otf' },
];

// --- Configure useHead ---
useHead({
  title: 'Tanglin Menu',
  meta: [
    { name: 'description', content: 'Explore the menu, promotions, and private events at the Tanglin Gin Jungle.' },
  ],
  link: [
    // Preload critical images
    ...imageUrls.map(url => ({ rel: 'preload', as: 'image', href: url })),
    // Preload critical fonts
    ...fontUrls.map(font => ({ rel: 'preload', as: 'font', type: font.type, crossorigin: 'anonymous', href: font.url })),
  ],
});


// --- Preloading gatekeeper logic (remains the same) ---
onMounted(async () => {
  await nextTick()

  const loadImage = src => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  });

  const loadFont = font => document.fonts.load(`1em "${font.url.split('/').pop().split('.')[0]}"`);

  const loadingTasks = [
    ...imageUrls.map(loadImage),
    ...fontUrls.map(loadFont),
  ];

  try {
    await Promise.all(loadingTasks);
  } catch (error) {
    console.error("A critical asset failed to load for the home page:", error);
  } finally {
    loading.value = false;
  }
})

// --- Buttons ---
const customButtons = [
  {
    text: 'EXPLORE OUR MENU',
    disabled: false,
    action: 'menu',
    url: 'https://drive.google.com/file/d/1yb-R0oQ34QN4A7KirM3Tk9xR1Ju85YN4/preview',
  },
  {
    text: 'VIEW CURRENT PROMOTIONS',
    disabled: false,
    action: 'promotions',
    url: 'https://drive.google.com/file/d/14CEEu91mCXXSoS0cV3kPOvbe5EJQBAlJ/preview',
  },
  {
    text: 'TAKE HOME A BOTTLE',
    disabled: false,
    action: 'home',
    url: 'https://tanglin-gin.com/shop/',
  },
  {
    text: 'HOST A PRIVATE EVENT',
    disabled: false,
    action: 'host',
    url: 'https://tanglin-gin.com/private-events/',
  },
  {
    text: 'WATCH THIS SPACE... (AND BRING A GLASS)',
    disabled: true,
    action: 'watch',
  },
]

const handleButtonClick = (action) => {
  const clickedButton = customButtons.find((button) => button.action === action)
  if (clickedButton && clickedButton.url && !clickedButton.disabled) {
    window.open(clickedButton.url, '_blank')
  }
}
</script>

<style scoped>
.spinner {
  border-top-color: var(--green);
}
</style>