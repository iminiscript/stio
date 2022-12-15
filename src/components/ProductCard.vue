<template>
    <div class="productPage" v-for="product in productStore.products">
        
        <!-- <div class="productVariant" v-for="variant in product.variants">
            

        </div> -->
            <!-- <div class="productLeft">
                <img :src="variant.featured_image.src" />
            </div> -->
            <img :src="product.variants[0].featured_image.src" />
            <div class="productRight">
                <div class="swatch">
                    <div class="productSwatch" v-for="swatch in product.options[0].values">
                        <span>{{ swatch }}</span>
                    </div>
                </div>
                <div class="size">
                    <div class="productSize" v-for="size in product.options[1].values">
                    <span>{{ size }}</span>
                </div>
                </div>
            </div>
        
    </div>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';

const productStore = useProductStore();
productStore.fetchProduct();

// const props = defineProps({
//    image: Array,
//    name: String,
//    price: Number,
//    swatch: Object,
//    size: Object
// });


</script>

<style  scoped>
.swatch, .size {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>