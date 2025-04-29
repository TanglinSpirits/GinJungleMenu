<script setup>
// Tiger image component with proper orientation
</script>

<template>
  <div class="tiger-container">
    <img src="@/assets/tiger2.png" alt="Tiger" class="tiger-image" />
  </div>
</template>

<style scoped>
.tiger-container {
  position: relative;
  width: 100%;
  max-width: 90vw; /* Match the same max-width as the header text-wrapper */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: -60px auto 30px;
  overflow: visible;
  box-sizing: border-box;
}

.tiger-image {
  position: relative;
  z-index: 1;
  width: auto;
  height: auto;
  max-height: 280px; /* Limit height while allowing width to adapt */
  object-fit: contain;
  object-position: center;
  transform: none;
  aspect-ratio: auto;
  filter: none;
}

/* Responsive adjustments that match the header width */
@media (min-width: 1024px) {
  .tiger-container {
    margin-top: -80px;
  }

  .tiger-image {
    max-height: 280px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .tiger-container {
    margin-top: -60px;
  }

  .tiger-image {
    max-height: 240px;
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .tiger-container {
    margin-top: -50px;
  }

  .tiger-image {
    max-height: 200px;
  }
}

@media (max-width: 480px) {
  .tiger-container {
    margin-top: -40px;
  }

  .tiger-image {
    max-height: 250px;
  }
}

/* Landscape adjustment */
@media screen and (orientation: landscape) and (max-height: 600px) {
  .tiger-container {
    margin-top: -30px;
  }

  .tiger-image {
    max-height: 160px;
  }
}
</style>
