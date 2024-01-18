<script setup lang="ts">
import {ref} from 'vue';
import { Card } from './types/types';
import {useRouter} from 'vue-router';

//Stored here default data to render on page. 
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

]);

//Instead of localStorage can be sent request to server and replaced data if success if not, throw error.  
const storage = JSON.parse(localStorage.getItem('design') || '[]');

if (storage.length > 0) {
  designData.value = storage;
}

//Value for choosen design.
const data = ref<Card | null>(null);

const router = useRouter();

const chooseDesign = (item: Card) => {
  data.value = item;

  router.push('/design');
};

const handleChanges = (action: string, newItem: Card) => {
  if (action === 'add') {
    designData.value.push(newItem);
    localStorage.setItem('design', JSON.stringify(designData.value));
  } else {
    const itemIndex = designData.value.findIndex(item => item.id === newItem.id);
    console.log(newItem);
    if (itemIndex > -1) {
      designData.value.splice(itemIndex, 1, newItem);
      localStorage.setItem('design', JSON.stringify(designData.value));
    }
  }

  router.push('/');
};

const removeDesign = (id: number) => {
  designData.value = designData.value.filter(item => item.id !== id);
  localStorage.setItem('design', JSON.stringify(designData.value));

  router.push('/');
};
</script>

<template>
  <main class="main">
    <aside class="sidepanel">
      <a href="#">
        <img src="./icons/logo.svg" alt="" class="logo">
      </a>
    </aside>
    <RouterView 
      :designData="designData"
      :data="data" 
      @chooseDesign="chooseDesign"
      @removeDesign="removeDesign"
      @handleChanges="handleChanges"
    />
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