<template>
  <div class="page-container">
    <!-- Top 20% - Title Section -->
    <div class="title-section">
      <img src="@/assets/marriot/Screen 1 Title.png" alt="At the Crossroads" class="title-image">
    </div>
    
    <!-- Bottom 80% - Sign Section -->
    <div class="sign-section">
      <div class="sign-container">
        <img src="@/assets/marriot/Full Stand.png" alt="Sign with Text" class="sign-image">
        
        <!-- Additional clickable image - positioned over the sign -->
        <div class="clickable-element" @click="handleClick">
            <button class="btn btn-outline-light rounded-pill">
              <span class="begin-journey">BEGIN YOUR JOURNEY</span>
            </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Get the router instance
const router = useRouter()

const handleClick = () => {
  // Handle click event for the additional image
  router.push('/marriot/start')
}
</script>

<style scoped>
.page-container {
  /* --- Corrected styles for scrolling --- */
  width: 100%;
  min-height: 100dvh; /* Use min-height to allow the container to grow */

  /* --- Original styles --- */
  background-image: url('@/assets/marriot/Screen 1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  /* Removed position: fixed and overflow: hidden */
}


/* Top 20% section for title */
.title-section {
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
  /* max-height: 90%; */
  object-fit: contain;
}

/* Bottom 80% section for sign */
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

/* Clickable element positioned over the sign */
.clickable-element {
  position: absolute;
  /* Adjust these values to position your clickable element exactly where you want it */
  top: 68%; /* Adjust vertical position */
  left: 50%; /* Adjust horizontal position */
  transform: translate(-50%, -50%); /* Center the element on the coordinates */
  
  /* Make it clickable */
  cursor: pointer;
  z-index: 10;
  
  /* Add visual feedback */
  transition: transform 0.2s ease;

  background-color: #f69300;
  border-radius: 50px;
  padding: 4px;
  filter: drop-shadow(8px 8px 10px #d33d33);
}

.clickable-element:hover {
  transform: translate(-50%, -50%) scale(1.05);
  background-color: white;
}

.begin-journey {
  font-family: 'Impact';
  text-wrap: nowrap;
  font-size: clamp(1.9rem, 4vw, 2rem); /* Responsive font size */
}

/* Media queries for fine-tuning */
@media (max-width: 480px) {
  .title-section {
    padding: 8px 10px;
  }
  
  .sign-section {
    padding: 8px 10px;
  }
  
  .title-image {
    width: 85vw;
  }
  
  .sign-image {
    width: 80vw;
  }
}

@media (min-width: 1200px) {
  .title-image {
    max-width: 400px;
  }
  
  .sign-image {
    max-width: 400px;
  }
}

/* For landscape orientation on mobile devices */
@media (orientation: landscape) and (max-height: 500px) {
  .title-section {
    padding: 5px 20px;
  }
  
  .sign-section {
    padding: 5px 20px;
  }
}

/* For very short screens */
@media (max-height: 600px) {
  .title-section {
    padding: 5px 15px;
  }
  
  .sign-section {
    padding: 5px 15px;
  }
}
</style>