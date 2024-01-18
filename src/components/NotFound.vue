<script setup lang="ts">
import {RouterLink} from 'vue-router'
</script>

<template>
  <section class="notfound">
    <h1>404 Error</h1>
    <p>Something went wrong. Try to go
      <RouterLink style="color: blue" to="/">home.</RouterLink>
    </p>
  </section>
</template>

<style scoped lang="scss">
.notfound {
  width: 100%;
  background: #2C3D39;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.notfound h1 {
  font-weight: 400;
  font-size: 70px;
}

.notfound p {
  font-size: 20px;
}
</style>