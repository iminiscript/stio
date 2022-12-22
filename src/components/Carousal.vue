<template>
    <div class="productWrapper">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="(slide, index) in slides" :key="index">
        <div class="carousel__item">{{  slide }}</div>
      </Slide>
    </Carousel>
  
    <Carousel
      id="thumbnails"
      :items-to-show="1"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(slide, index) in slides" :key="index">
        <div class="carousel__item" @click="slideTo(index)">{{  slide }}</div>
      </Slide>
    </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  
  import 'vue3-carousel/dist/carousel.css';
  
  const slides = ref(['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5']);
  const currentSlide = ref(0);
  
  const slideTo = (index) => {
    currentSlide.value = index;
  };

  </script>
  