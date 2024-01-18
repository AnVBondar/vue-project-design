<script setup lang="ts">
import {ref} from 'vue';
import { Card } from './types/types';

const designData = ref<Card[]>([{
    id: 1,
    code: '105',
    name: 'Ostrov',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [
      {id: 1, url: '/vue-project-design/images/image-1.png'},
      {id: 2, url: '/vue-project-design/images/design-2.png'},
      {id: 3, url: '/vue-project-design/images/design-2.png'},
    ],
  },
  {
    id: 2,
    code: '104',
    name: 'Flora',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-2.png'}],
  },
  {
    id: 3,
    code: '103',
    name: 'SunWear',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-3.png'}],
  },
  {
    id: 4,
    code: '105',
    name: 'Flora',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-2.png'}],
  },
  {
    id: 5,
    code: '105',
    name: 'Ostrov',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-2.png'}],
  },
  {
    id: 6,
    code: '105',
    name: 'Ostrov',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-3.png'}],
  },
  {
    id: 7,
    code: '105',
    name: 'Ostrov',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-1.png'}],
  },
  {
    id: 8,
    code: '105',
    name: 'Ostrov',
    address: 'https://design105.horoshop.ua/',
    published: true,
    images: [{id: 1, url: '/vue-project-design/images/image-3.png'}],
  },
]);
import HomePage from './components/HomePage.vue'
</script>

<template>
  <main class="main">
    <aside class="sidepanel">
      <a href="#">
        <img src="./icons/logo.svg" alt="" class="logo">
      </a>
    </aside>
    <HomePage :designData="designData"/>
  </main>
</template>

<style lang="scss">
.main {
  display: flex;

  min-height: 100vh;
}
.sidepanel {
  width: 40px;
  background: #627B7A;

  padding-top: 9px;
  padding-inline: 8px;
}

section div {
  max-width: 1324px;
}
</style>./types/types