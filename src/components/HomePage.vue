<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { Card } from '../types/types';

const props = defineProps({
  designData: Array as PropType<Card[]>,
});

const emit = defineEmits(['chooseDesign',]);
</script>

<template>
  <!-- This section max-width is shorter then on mockup. Can be changed subject to full design / instructions -->
  <section class="homepage">
    <div class="homepage__container">
      <div class="homepage__top">
        <h2 class="homepage__title">Всі дизайни</h2>
        <button class="homepage__top-link" @click="$emit('chooseDesign', null)">Додати дизайн</button>
      </div>
      <ul class="homepage__list">
        <li class="homepage__item" v-for="card in props.designData" :key="card.id">
          <!-- Currently new downloaded image stratches to fit container 
            but this property can be changed if necessary.
            Also hover affect added by my own for better UX.
            Can be changed subject to User / designer request -->
          <div class="homepage__img-wrapp" @click="$emit('chooseDesign', card)">
            <img
              :src="card.images[0].url"
              alt=""
              class="homepage__img"
            >
          </div>
          <div class="homepage__item-content">
            <p class="homepage__item-code">{{ card.code }}</p>
            <p class="homepage_-item-name">{{ card.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.homepage {
  width: 100%;
  background: #2C3D39;

  &__title {
    font-size: 24px;
    line-height: 40px;
    font-weight: 400;
  }

  &__container {
    padding-top: 20px;
    padding-inline: 32px;
    padding-bottom: 40px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-link {
      height: 32px;
      width: 122px;
      background: #418AF2;
      border: 1px solid #00000033;
      border-radius: 2.5px;

      text-align: center;
      line-height: 30px;

      color: inherit;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 20px;
    justify-content: center;

    padding-top: 20px;
  }

  &__item {
    flex-basis: 300px;


    &-content {
      display: flex;
      align-items: center;
      gap: 8px;

      margin-top: 16px;
    }

    &-code {
      width: 33px;
      height: 16px;
      background: #fff;
      border-radius: 8px;

      text-align: center;

      font-size: 11px;
      line-height: 18px;
      color: #000;
    }
  }

  &__img {
    width: 100%;
    height: 100%;

    &-wrapp {
      height: 400px;
      border-radius: 3px;
      overflow: hidden;
      transition: transform .3s ease;

      &:hover {
        cursor: pointer;
        transform: scale(1.01);
      }
    }
  }
}
</style>
