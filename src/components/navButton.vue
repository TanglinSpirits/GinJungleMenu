<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** The text to display on the button */
  text: {
    type: String,
    required: true,
  },
  /** Whether the button is enabled or disabled */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** Custom event to emit when the button is clicked */
  action: {
    type: String,
    default: 'click',
  },
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  return {
    'nav-button': true,
    disabled: props.disabled,
  }
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.action)
  }
}
</script>

<template>
  <button :class="buttonClass" @click="handleClick" :disabled="disabled">
    {{ text }}
    <span class="arrow" v-if="!disabled"><i class="fa-solid fa-angle-right"></i></span>
  </button>
</template>

<style scoped>
.nav-button {
  background-color: var(--yellow); /* Gold/yellow for enabled buttons */
  border: none;
  border-radius: clamp(15px, 5vw, 25px);
  padding: clamp(12px, 3vw, 18px) clamp(15px, 4vw, 25px);
  font-size: clamp(0.9rem, 3.2vw, 1.1rem) !important;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-sizing: border-box;
  min-height: clamp(3.2rem, 8vh, 4.2rem);
}

.nav-button:not(.disabled):active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.arrow {
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: bold;
  transition: transform 0.2s ease;
}

.disabled {
  opacity: 40%;
  cursor: default;
}

/* --- HOVER STYLES FOR DESKTOP ONLY --- */
@media (hover: hover) {
  .nav-button:not(.disabled):hover {
    background-color: #e8dc5e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-button:not(.disabled):hover .arrow {
    transform: translateX(4px);
  }
}

@media (max-width: 480px) {
  .nav-button {
    padding: 10px 15px;
    font-size: 0.7rem;
    min-height: clamp(2.5rem, 7vh, 3rem);
  }

  .arrow {
    font-size: 1rem;
  }
}

@media (min-width: 1440px) {
  .nav-button {
    padding: 20px 30px;
    font-size: 1.1rem;
    min-height: clamp(3.5rem, 9vh, 4.5rem);
  }

  .arrow {
    font-size: 1.6rem;
  }
}
</style>