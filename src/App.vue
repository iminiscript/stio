<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { ref, computed, reactive } from 'vue';

const productStore = useProductStore();
productStore.fetchProduct();

import ProductCard from '@/components/ProductCard.vue';

import ProductBorder from '@/components/ProductBorder.vue';

import ProductMobileDrawer from '@/components/ProductMobileDrawer.vue'




</script>

<template>

  <div v-if="productStore.isLoading" class="loader">
    <img src="@/assets/lazyLoader.gif" alt="Loading" />
  </div>
  <div v-else>

     <ProductBorder 
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

     <ProductMobileDrawer />  
  </div>
   
</template>

<style lang="scss">

.productWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.productPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.loader {
    display: flex;
    justify-content: center;
}



</style>
