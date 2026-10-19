<template>
  <div class="global-background" :class="{ cover: $slidev.nav.currentLayout === 'cover' }">
    <div v-if="$slidev.nav.currentPage > 1" class="page-number">
      <SlideCurrentNo />
    </div>
    <div class="copyright">
      © 2026 andrena objects ag
    </div>
  </div>
</template>

<style scoped>
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: url('./assets/Hintergrund.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.global-background.cover {
  background-image: url('./assets/Hintergrund_Titelfolie.png');
}

.page-number {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 0.75rem;
  color: #555;
  font-family: 'Nunito Sans', sans-serif;
}

.copyright {
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  font-size: 0.65rem;
  color: #555;
  font-family: 'Nunito Sans', sans-serif;
}
</style>
