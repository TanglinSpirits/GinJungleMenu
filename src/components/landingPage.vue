<!-- src/views/JungleLandingPage.vue -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="jungle-container">
    <div class="jungle-content">
      <div class="header">
        <div class="logo-container">
          <div class="logo-text">THE</div>
          <div class="logo-brand">TANGLIN GIN JUNGLE</div>
        </div>
      </div>

      <div class="welcome-text">
        <h1>WELCOME</h1>
        <h1>TO THE JUNGLE</h1>
      </div>

      <div class="tiger-container">
        <img src="@/assets/tiger2.png" alt="Tiger" class="tiger-image" />
        <div class="jungle-leaves"></div>
        <div class="cocktail-left"></div>
        <div class="cocktail-right"></div>
      </div>

      <div class="navigation-buttons">
        <button class="nav-button">
          START YOUR TASTING ADVENTURE
          <span class="arrow">→</span>
        </button>
        <button class="nav-button">
          TAKE US HOME
          <span class="arrow">→</span>
        </button>
        <button class="nav-button">
          HOST YOUR NEXT ADVENTURE
          <span class="arrow">→</span>
        </button>
        <button class="nav-button special">WATCH THIS SPACE... (AND BRING A GLASS)</button>
      </div>

      <div class="social-icons">
        <a href="#" class="social-icon instagram"></a>
        <a href="#" class="social-icon facebook"></a>
        <a href="#" class="social-icon tiktok"></a>
        <a href="#" class="social-icon email"></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jungle-container {
  background-color: #000;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.jungle-content {
  background-color: #4ead9a;
  width: 100%;
  max-width: 420px;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.logo-container {
  border: 1px solid white;
  padding: 5px 15px;
  display: inline-block;
}

.logo-text {
  font-size: 12px;
  color: white;
  letter-spacing: 2px;
  margin-bottom: 2px;
}

.logo-brand {
  font-size: 14px;
  font-weight: bold;
  color: white;
  letter-spacing: 2px;
}

.welcome-text {
  color: white;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.welcome-text h1 {
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  line-height: 1.1;
  letter-spacing: 1px;
}

.tiger-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.tiger-image {
  position: relative;
  z-index: 2;
  max-width: 180px;
  height: auto;
}

/* .jungle-leaves {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 200px;
  z-index: 1;
  background-image: url('@/assets/jungle-leaves.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.cocktail-left, .cocktail-right {
  position: absolute;
  bottom: -20px;
  width: 80px;
  height: 100px;
  background-image: url('@/assets/cocktail.svg');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 3;
} */

/* .cocktail-left {
  left: 70px;
  transform: rotate(-5deg);
}

.cocktail-right {
  right: 70px;
  transform: rotate(5deg);
} */

.navigation-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.nav-button {
  background-color: #f0e684;
  border: none;
  border-radius: 25px;
  padding: 18px 25px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #e8dc5e;
}

.arrow {
  font-size: 22px;
  font-weight: bold;
}

.special {
  background-color: #a2956b;
  color: #000;
}

.special:hover {
  background-color: #8a7e53;
}

.social-icons {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.social-icon {
  width: 35px;
  height: 35px;
  background-color: #4ead9a;
  border: 2px solid #1e3b36;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.3s ease;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}

/* .instagram {
  background-image: url('@/assets/instagram.svg');
}

.facebook {
  background-image: url('@/assets/facebook.svg');
}

.tiktok {
  background-image: url('@/assets/tiktok.svg');
}

.email {
  background-image: url('@/assets/email.svg');
} */

.social-icon:hover {
  transform: scale(1.1);
  background-color: #3c9887;
}

@media (max-width: 480px) {
  .jungle-content {
    padding: 20px 15px;
  }

  .welcome-text h1 {
    font-size: 40px;
  }

  .nav-button {
    padding: 15px 20px;
    font-size: 14px;
  }
}
</style>
