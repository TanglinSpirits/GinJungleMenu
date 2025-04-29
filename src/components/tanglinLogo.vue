<template>
  <div class="logo-container">
    <img src="@/assets/tanglinLogo.png" alt="Tanglin Gin Logo" class="tanglin-logo" />
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(10px, 2vw, 30px);
  z-index: 1;
}

.tanglin-logo {
  margin-top: clamp(20px, 10%, 60px);
  max-width: clamp(100px, 30%, 300px);
  height: auto;
  object-fit: contain;
}
</style>
