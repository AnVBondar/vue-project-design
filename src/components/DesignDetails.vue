<script setup lang="ts">
import { 
  defineProps, 
  PropType, 
  ref, 
  computed, 
} from 'vue';
import {Card, Images} from '../types/types';
import {generateId} from '../utils/helper'

const props = defineProps({
  data: Object as PropType<Card>,
});

const emit = defineEmits(['handleChanges', 'removeDesign']);

interface Fields {
  code: string,
  address: string,
  name: string,
}

const fields = ref<Fields>({
  code: '',
  address: '',
  name: '',
});

let uploadedImages = ref<Images[]>([]);

// Once component is opened, below condition checking if Object with card was passed from parent and replace input values.
if (props.data) {
  fields.value.address = props.data.address || '';
  fields.value.code = props.data.code || '';
  fields.value.name = props.data.name || '';

  uploadedImages.value = [...props.data.images];
}

//Necessary to check if user trying to submit new form with emtpy fiels and throw warning to User.
const codeError = ref<boolean>(false);
const nameError = ref<boolean>(false);

//Autocomplete address field when code is entered.
const handleURL = computed(() => {
  if (fields.value.code.trim() !== '') {
    return `https://design${fields.value.code}.horoshop.ua/`;
  } else {
    return '';
  }
});

//Allows to edit address field if same will be necessary.
const handleAddress = (event: Event) => {
  fields.value.address = (event.target as HTMLInputElement).value;
};

//Responsive for uploading files and checking files format.
const handleFileUpload = (event: Event) => {
  event.preventDefault();
  const fileInput = event.target as HTMLInputElement;
  const files = fileInput.files;

  if (files && files.length > 0) {
    const file = files[0];

    if (isImage(file)) {
      readFile(file);
    } else {
      alert('Please select a valid image file.');
    }
  } else {
    alert('Please select a file.');
  }
};

//Checking input file format
const isImage = (file: File) => {
  return file.type.startsWith('image/');
};

//Format file to readable format, generate URL and push these data to uploadedImages.
const readFile = (file: File) => {
  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const imageUrl = event.target?.result as string | undefined;
    
    if (imageUrl) {
      uploadedImages.value.push({ id: generateId(), url: imageUrl, file });
    } else {
      console.error('Failed to read the file.');
    }
  };

  reader.readAsDataURL(file);
};

//Drop file from User storage to web page.
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];

  console.log(file);
  

  if (file) {
    if (isImage(file)) {
      readFile(file);
    } else {
      alert('Please select a valid image file.');
    }
  }
};

//It's my understanding from mockup that code field should accept only numbers.
const handleCodeInput = (event: Event) => {
  if (codeError.value) {
    codeError.value = false;
  }

  const inputValue = (event.target as HTMLInputElement).value;

  const result = inputValue.replace(/[^0-9]/g, '');

  fields.value.code = result;
};

const handleNameInput = (event: Event) => {
  if (nameError.value) {
    nameError.value = false;
  }

  fields.value.name = (event.target as HTMLInputElement).value;
}

const removeImg = (imgId: number) => {
  uploadedImages.value = uploadedImages.value.filter(img => img.id !== imgId);
}

const handleSubmit = () => {
  if (!fields.value.code || !fields.value.name) {
    if (!fields.value.code) {
      codeError.value = true;
    }
    if (!fields.value.name) {
      nameError.value = true;
    }

    alert('Both code and design title should be completed to proceed.');
    return;
  }
  const newItem: Card = {
    id: generateId(),
    code: fields.value.code,
    name: fields.value.name,
    address: fields.value.address,
    published: true,
    images: checkImages(),
  };

  if (!props.data) {
    emit('handleChanges', 'add', newItem);
  } else {
    const updatedItem = {
      ...props.data,
      code: fields.value.code,
      name: fields.value.name,
      address: fields.value.address,
      images: checkImages(),
    }
    emit('handleChanges', 'edit', updatedItem);
  }
}

//If User trying to submit new form without img, this function auto add default img to render on HomePage.
const checkImages = () => {
  if (uploadedImages.value.length > 0) {
    return [...uploadedImages.value];
  }

  return [{
    id: generateId(),
    url: '/src/images/no_img.png',
  }]
}

//Remain code responsible for drag and drop actions with imgs. To simplify code also can be used Vue Draggable or VueUse.
let draggingItemId: number | null = null;

const handleDragStart = (itemId: number) => {
  draggingItemId = itemId;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDropItem = (targetItemId: number) => {
  const draggedItemIndex = uploadedImages.value.findIndex(item => item.id === draggingItemId);
  const targetItemIndex = uploadedImages.value.findIndex(item => item.id === targetItemId);

  if (draggedItemIndex !== -1 && targetItemIndex !== -1) {
    const [draggedItem] = uploadedImages.value.splice(draggedItemIndex, 1);
    uploadedImages.value.splice(targetItemIndex, 0, draggedItem);
  }

  draggingItemId = null;
};
</script>
<template>
  <section class="design">
    <div class="design__container">
      <div class="design__top">
        <div class="design__top-left">
          <div @click="$router.back()" class="design__back">
            <img src="../icons/arrow-left.svg" alt="">
          </div>
          <div class="design__status">
            <!-- Indicator renders according to morkup. I didn't implement it dynamic via check input since not clear for me its next functional. -->
            <div 
              class="design__indicator" 
              :class="{'design__indicator--active': props.data?.published}"
            ></div>
            <p 
              class="design__status-title"
              :style="{ color: props.data?.published ? '#699707' : '#222'}"
            >
              {{ props.data?.published ? 'Oпублікований' : 'Неопублікований' }}
            </p>
          </div>
        </div>
        <div class="design__btns">
          <button 
            class="design__btn-delete"
            :class="{ 'design__btn-delete--hide': !props.data}"
            @click="$emit('removeDesign', props.data?.id)"
          >
            Видалити
          </button>
          <button class="design__btn-submit" @click="handleSubmit">Зберегти і вийти</button>
        </div>
      </div>
      <div class="design__form">
        <ul 
          class="upload" 
          :style="{gridTemplateColumns: uploadedImages.length > 0 ? 'repeat(4, 120px)' : '1fr'}"
          @dragover.prevent
        >
        
          <li 
            class="upload__item" 
            v-if="uploadedImages.length > 0" 
            v-for="item in uploadedImages" 
            key="item.id"
            draggable="true"
            @dragstart="handleDragStart(item.id)" 
            @dragover.prevent="handleDragOver" 
            @drop="handleDropItem(item.id)"
          >
            <div class="upload__wrapp">
              <img :src="item.url" alt="">
              <button class="upload__delete" @click="removeImg(item.id)"></button>
            </div>
          </li>
          <li 
            class="upload__item upload-input" 
            v-if="uploadedImages.length < 4"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <label 
              for="upload-input" 
              class="upload__label"
              :style="{ backgroundImage: uploadedImages.length > 0 ? 'url(/vue-project-design/src/icons/add.svg)' : 'url(/vue-project-design/src/icons/picture.svg)' }"
            >
              <input type="file" accept="image/*" id="upload-input" @change="handleFileUpload">
            </label>
          </li>
        </ul>
        <form class="form" action="" @submit.prevent="">
          <input class="form__input" :class="{'code-error': codeError}" type="text" placeholder="###" v-model="fields.code" @input="handleCodeInput">
          <input class="form__input" :class="{'name-error': nameError}" type="text" placeholder="Назва дизайну" v-model="fields.name" @input="handleNameInput">
          <input class="form__input" type="text" placeholder="https://design###.horoshop.ua/"  @input="handleAddress" :value="handleURL">
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.design {
  height: 100%;
  width: 100%;
  background: #fff;

  &__container {
    padding-top: 24px;
    padding-inline: 32px;
  }

  &__top {
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      gap: 64px;
    }
  }

  &__back:hover {
    cursor: pointer;
  }

  &__btns {
    display: flex;
    gap: 8px;
  }

  &__btn-submit {
    width: 131px;
    height: 32px;

    background-color: #418AF2;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2.5px;

    color: inherit;
  }

  &__btn-delete {
    height: 32px;
    width: 86px;
    background: #fff;

    color: red;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2.5px;

    &--hide {
      display: none;
    }
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__indicator {
    position: relative;
    width: 64px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    &::before {
      position: absolute;
      content: '';
      background: #fff;

      height: 20px;
      width: 20px;
      border-radius: 50%;
      box-shadow: 0px 5px 10px 1px rgba(34, 60, 80, 0.2);

      top: 2px;
      left: 2px;
      bottom: 2px;
    }

    &--active {
      background-color: #7AB10E;

      &::before {
        transform: translateX(200%);
      }
    }
  }

  &__form {
    margin-left: 120px;
    margin-top: 40px;
    max-width: 600px;
  }
}

.form {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 24px 8px;

  &__upload-label {
    border: 1px dashed black;
    height: 120px;

    grid-column: span 2;
  }

  &__input {
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    padding-left: 12px;

    font-family: 'Roboto', sans-serif;
    color: #222;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    &::placeholder {
      font-family: 'Roboto', sans-serif;
      color: rgba(0, 0, 0, 0.2);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }

    &:last-child {
      grid-column: span 2;
    }

    &:focus {
      outline: none;
    }
  }
}

.upload {
  min-height: 120px;
  max-height: 223px;
  display: grid;
  gap: 8px;

  margin-bottom: 40px;

  &__label {
    border: 2px dashed rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: block;
    height: 100%;

    background-position: center;
    background-repeat: no-repeat;
  }

  &__item:hover {
    cursor: grab;
  }

  &-input {
    height: 120px;
    width: 100%;
  }

  &__wrapp {
    position: relative;
  }

  &__delete {
    display: none;

    position: absolute;
    height: 24px;
    width: 24px;

    border: none;

    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: url("../icons/delete.svg");
    background-position: center;
    background-repeat: no-repeat;

    right: 4px;
    bottom: 4px;
  }
}

.upload__label input {
  display: none;
}
.upload__wrapp img {
  width: 100%;
  height: 100%;
}

.upload__item:hover .upload__delete {
  display: block;
}

.code-error {
  border-color: red;
}

.name-error {
  border-color: red;
}
</style>