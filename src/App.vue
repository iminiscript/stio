<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { ref, computed, reactive } from 'vue';

const productStore = useProductStore();
productStore.fetchProduct();

import ProductCard from '@/components/ProductCard.vue';

import CarousalCard from '@/components/Carousal.vue';


</script>

<template>
    <ProductCard 
    :products="productStore.products"
    />

    <ProductCard 
    :products="productStore.bottomProducts"
    />
  
   
</template>

<style>
.productWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.productPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
