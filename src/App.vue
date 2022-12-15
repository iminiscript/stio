<script setup>
import ProductCard from '@/components/ProductCard.vue';


</script>

<template>
  <div class="productWrapper">
    <ProductCard />
  </div>
   
</template>

<!-- <template>
  <div class="productWrapper">
    <ProductCard v-for="product in productStore.products"
    :key="product.id"
    :name="product.title"
    :image="v-for"
    :price="'$' + product.price"
    />
  </div>
</template> -->

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
