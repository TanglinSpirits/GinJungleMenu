<script setup>
// Brand Icons component to display social media links

import { ref } from 'vue'

// Define props for the component
const props = defineProps({
  socialLinks: {
    type: Array,
    default: () => [
      {
        name: 'instagram',
        url: 'https://www.instagram.com/ginjunglebytanglingin/',
        icon: 'fa-brands fa-instagram',
      },
      {
        name: 'facebook',
        url: 'https://www.facebook.com/thetanglinginjungle/',
        icon: 'fa-brands fa-facebook-f',
      },
      {
        name: 'tiktok',
        url: 'https://www.tiktok.com/@tanglinginsg',
        icon: 'fa-brands fa-tiktok',
      },
      {
        name: 'email',
        url: 'https://www.weeloy.com/integrations/automated_marketing/index.php?restaurant=SG_SG_R_TheGinJungle',
        icon: 'fa-solid fa-envelope',
      },
    ],
  },
})
</script>

<template>
  <div class="social-icons-container">
    <a
      v-for="(link, index) in socialLinks"
      :key="index"
      :href="link.url"
      class="social-icon"
      :title="link.name"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i :class="link.icon"></i>
    </a>
  </div>
</template>

<style scoped>
.social-icons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(15px, 4vw, 25px);
  margin: clamp(20px, 5vh, 40px) 0;
}

.social-icon {
  width: clamp(35px, 8vw, 45px);
  height: clamp(35px, 8vw, 45px);
  /* border-radius: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid #1e3b36; */
  color: var(--green);
  /* background-color: var(--green, #00b398); */
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  transition: all 0.3s ease;
}

.social-icons-container a {
  text-decoration: none;
}

/* .social-icon:hover {
  transform: scale(1.1);
  background-color: rgba(0, 179, 152, 0.8);
} */

@media (max-width: 480px) {
  .social-icons-container {
    gap: 15px;
    margin: 20px 0;
  }

  .social-icon {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .social-icons-container {
    gap: 25px;
  }

  .social-icon {
    width: 45px;
    height: 45px;
    font-size: 1.5rem;
  }
}
</style>
