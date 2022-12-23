<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { ref, computed, reactive } from 'vue';

const productStore = useProductStore();
productStore.fetchProduct();

import ProductCard from '@/components/ProductCard.vue';

import ProductStatic from '@/components/ProductStatic.vue';


</script>

<template>
    <ProductStatic 
      title="Men's Ski Kit"
      url="https://www.stio.com/pages/build-your-kit"
      subTitle="SHOP ALL KITS"
    
    />

    <ProductCard 
    :products="productStore.products"
    class="productOne"
    />

    <ProductCard 
    :products="productStore.bottomProducts"
    class="productTwo"
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
