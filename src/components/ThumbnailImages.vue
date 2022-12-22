<template>
    <div class="thumbnail-images">
      <img v-for="(slide, index) in slides" :key="index" :src="slide.image" @click="navigateToSlide(index)" :class="{ active: index === currentSlide }" alt="Thumbnail Image">
    </div>
  </template>
  
  <script>
  import { reactive, ref, onMounted, computed } from 'vue'
  
  export default {
    name: 'ThumbnailImages',
    props: {
      slides: {
        type: Array,
        required: true
      },
      currentSlide: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const activeThumbnail = computed(() => props.slides[props.currentSlide])
  
      function navigateToSlide(index) {
        this.$emit('navigate', index)
      }
  
      return {
        activeThumbnail,
        navigateToSlide
      }
    }
  }
  </script>
  