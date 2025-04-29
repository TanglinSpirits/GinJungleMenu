<script setup>
import navButton from './navButton.vue'

// Define props with button configurations
const props = defineProps({
  buttons: {
    type: Array,
    default: () => [
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
    ],
  },
})

// Emit the button's action when clicked
const emit = defineEmits(['button-click'])

const handleButtonClick = (action) => {
  emit('button-click', action)
}
</script>

<template>
  <div class="navigation-buttons">
    <navButton
      v-for="(button, index) in buttons"
      :key="index"
      :text="button.text"
      :disabled="button.disabled"
      :action="button.action"
      @click="handleButtonClick"
    />
  </div>
</template>

<style scoped>
.navigation-buttons {
  width: 100%;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 3vh, 20px);
  margin: 30px auto;
  box-sizing: border-box;
  padding: 0 clamp(10px, 3vw, 30px);
}

@media (max-width: 480px) {
  .navigation-buttons {
    gap: 10px;
    margin: 20px auto;
  }
}

@media (min-width: 1440px) {
  .navigation-buttons {
    gap: 25px;
    margin: 40px auto;
    max-width: 80vw; /* Slightly narrower on very large screens */
  }
}
</style>
