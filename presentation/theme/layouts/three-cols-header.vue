<template>
  <div class="slidev-layout three-cols-header">
    <div class="header">
      <slot />
    </div>
    <div class="columns">
      <div class="left">
        <slot name="left" />
      </div>
      <div class="center">
        <slot name="center" />
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.three-cols-header {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 4rem;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-bottom: 2.5rem;
}

.header {
  width: 100%;
  margin-bottom: 1rem;
}

.columns {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
  overflow: hidden;
}

.left,
.center,
.right {
  flex: 1;
  overflow: auto;
  min-width: 0; /* verhindert overflow bei langen Inhalten */
  font-size:smaller
}

.columns h2 {
  font-size:100px
}
</style>