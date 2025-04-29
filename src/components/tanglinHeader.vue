<script setup>
// No props or special logic needed for this header component
</script>

<template>
  <div class="header-container">
    <div class="text-wrapper">
      <span class="welcome-text">WELCOME</span>
      <span class="jungle-text">TO THE JUNGLE</span>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  font-family: 'FSKim Bold', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 4vh auto 0; /* Removed bottom margin to allow overlap */
  position: relative;
  z-index: 2; /* Lower z-index so tiger can overlap */
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 90vw;
}

.welcome-text,
.jungle-text {
  font-size: clamp(2rem, 10vw, 3rem); /* Responsive font size that scales with viewport width */
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: 1px;
  display: block;
  width: 100%;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Extra styles for emphasis if needed */
/* .welcome-text {
  margin-bottom: 0.1em;
}

.jungle-text {
  margin-top: 0.1em;
  padding-bottom: 2rem; 
} */

/* Small screens (mobile) */
@media screen and (max-width: 480px) {
  .welcome-text,
  .jungle-text {
    line-height: 1.2;
  }

  .header-container {
    margin: 2vh auto 0;
  }

  .jungle-text {
    padding-bottom: 1.5rem; /* Slightly less padding on small screens */
  }
}

/* Medium screens (tablets) */
@media screen and (min-width: 481px) and (max-width: 1023px) {
  .header-container {
    margin: 3vh auto 0;
  }
}

/* Large screens (desktops) */
@media screen and (min-width: 1024px) and (max-width: 1599px) {
  .header-container {
    margin: 4vh auto 0;
  }

  .jungle-text {
    padding-bottom: 3rem; /* More padding on larger screens */
  }
}

/* Extra large screens */
@media screen and (min-width: 1600px) {
  .welcome-text,
  .jungle-text {
    font-size: 7rem;
  }

  .header-container {
    margin: 5vh auto 0;
  }

  .jungle-text {
    padding-bottom: 4rem; /* Even more padding on extra large screens */
  }
}

/* Landscape orientation adjustments */
@media screen and (orientation: landscape) and (max-height: 600px) {
  .header-container {
    margin: 1vh auto 0;
  }

  .welcome-text,
  .jungle-text {
    font-size: clamp(1.5rem, 8vw, 4rem);
  }

  .jungle-text {
    padding-bottom: 1rem; /* Less padding in landscape mode */
  }
}
</style>
