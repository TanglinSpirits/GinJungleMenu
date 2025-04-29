<template>
  <div class="app-container">
    <tanglinLogo />

    <tanglinHeader />

    <tigerLogo />

    <buttonContainer :buttons="customButtons" @button-click="handleButtonClick" />
  </div>
  <!-- <landingPage /> -->
</template>

<script setup>
// Imports
import { RouterLink, RouterView } from 'vue-router'
import landingPage from './components/landingPage.vue'
import tanglinLogo from './components/tanglinLogo.vue'
import tanglinHeader from './components/tanglinHeader.vue'
import tigerLogo from './components/tigerLogo.vue'
import buttonContainer from './components/buttonContainer.vue'

// Buttons Info
const customButtons = [
  {
    text: 'START YOUR TASTING ADVENTURE',
    disabled: false,
    action: 'tasting',
  },
  {
    text: 'TAKE US HOME',
    disabled: false,
    action: 'home',
  },
  {
    text: 'HOST YOUR NEXT ADVENTURE',
    disabled: false,
    action: 'host',
  },
  {
    text: 'WATCH THIS SPACE... (AND BRING A GLASS)',
    disabled: true,
    action: 'watch',
  },
]

// Buttons logic
const handleButtonClick = (action) => {
  console.log(`Button clicked with action: ${action}`)
  // You can add navigation or other logic here based on the action
}
</script>

<style scoped></style>
