<template>
    <div  class="productPage" v-for="product in products" :key="product.id">
        <img :src="image" />
            <div class="productRight">
                <div class="swatch">
                    <div class="productSwatch" v-for="swatch in product.options[0].values">
                        <span @click="$emit('getImage', product.handle, swatch)">{{ swatch }}</span>
                        <img :src="productStore.swaImg(swatch)" />
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
import { ref, computed, reactive } from 'vue';

const productStore = useProductStore();
productStore.fetchProduct();

const props = defineProps({
    products: String,
   image: String,
});

const imagesUrl = ref('');

// const swaImg = (item) => {
//    // console.log(item)
//     productStore.products.map((hand) => {
//            // console.log(hand.variants);
//            hand.images.map((img) => {
//             //console.log(img.alt + ' swatch')
//             //console.log(img.alt)
//                 if (img.alt === item  + ' swatch') {
//                     console.log('I M in')
//                     console.log(img.src)
//                     return img.src
//                     //testImg.value = img.src;
//                 }
//             })
        
//     })

//     console.log('Fired')
// }


// const props = defineProps({
//    image: Array,
//    name: String,
//    price: Number,
//    swatch: Object,
//    size: Object
// });
// const swactImgURL = ref('');

// const getImage = (item, swatch)  => {
//     console.log(item);
//     console.log(swatch);
    
//     productStore.products.map((hand) => {
//         if (hand.handle === item) {
//            // console.log(hand.variants);
//             hand.variants.map((img) => {
//                 if (img.option1 === swatch) {
//                     swactImgURL.value = img.featured_image.src;
//                     console.log(swactImgURL.value)
//                 }
//             })
//         }
//     })
// }

</script>

<style  scoped>
.swatch, .size {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>