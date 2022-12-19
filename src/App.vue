<script setup>
import { useProductStore } from '@/stores/productStore.js';
import { ref, computed, reactive } from 'vue';

const productStore = useProductStore();
productStore.fetchProduct();

import ProductCard from '@/components/ProductCard.vue';

let swactImgURL = ref('');

function getSwatchImg(item, swatch){
    console.log(item);
    console.log(swatch);
    productStore.products.map((hand) => {
        if (hand.handle === item) {
            //console.log(hand.variants);
            hand.variants.map((img) => {
                if (img.option1 === swatch) {
                    swactImgURL.value = img.featured_image.src;
                    //console.log(swactImgURL)
                }
            })
        }
    })
}
</script>

<template>
  <div class="productWrapper">
    <ProductCard 
    :products="productStore.products"
    :image="swactImgURL"
    @getImage="getSwatchImg"
    />
  </div>
   
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
