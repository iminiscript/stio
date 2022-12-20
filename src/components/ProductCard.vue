<template>
    <div  class="productPage" v-for="product in products" :key="product.id">
        <img :src="product.imageUrl ?? product.variants[0].featured_image.src" />
            <div class="productRight">
                <h2 class="productTitle">{{  product.title }}</h2>
                <h2 class="productPrice">{{ formatedPrice(product.price) }}</h2>
                <div class="swatch">
                    <div  class="productSwatch" v-for="swatch in product.options[0].values">
                        <!-- <span @click="$emit('getImage', product.handle, swatch)">
                            <img  :src="productStore.swaImg(swatch)" />
                        </span> -->

                        <span :class="{ active: product.activeClass === swatch}" class="productSwatchImg" @click="updateImage( product.handle, swatch, null)">
                            <img  :src="productStore.swaImg(swatch)" />
                        </span>
                      
                    </div>
                </div>
                <div class="size">
                    <div class="productSize" 
                        v-for="size in product.options[1].values"
                        :class="{ active: product.sizeClass === size}"
                        @click="updateImage(product.handle,null , size) "
                    >
                        <span>{{ toShortHand(size) }}</span>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore.js';
import { ref, computed, reactive } from 'vue';
import ImageCard from './ProductCard.vue';

const productStore = useProductStore();
productStore.fetchProduct();

const props = defineProps({
    products: String,
   image: String,
});

const formatedPrice = (price) => {
    return '$' + (price / 100).toLocaleString();
}

const toShortHand = (size) => {
      switch (size) {
        case 'Extra Small':
          return 'XS'
        case 'Small':
          return 'S'
        case 'Medium':
          return 'M'
        case 'Large':
          return 'L'
        case 'Extra Large':
          return 'XL'
        case 'Extra Extra Large':
          return 'XXL'
        case 'Extra Extra Extra Large':
            return 'XXXL'
        default:
          return size
      }
    }

// const selectedSize = (productHandle, size) => {
//     const product = productStore.products.find((product) => product.handle === productHandle);
//     // Find the variant with the matching alt text
//     const variant = product.variants.find((variant) => variant.option2 === size);

//     //console.log(variant);
//     // Update the imageUrl property for the product
//     productStore.products = productStore.products.map((product) => {
//     if (product.handle === productHandle) {
//         return {
//         ...product,
//         activeClass: variant.option2,
//         };
//     }
//     return product;
//     });
// }




const updateImage = (productHandle, swatchName, size) => {
      // Find the product with the matching handle
    //   console.log(productHandle)
    //   console.log(swatchName)
    //   console.log(productStore.products);
      console.log(size)
      const product = productStore.products.find((product) => product.handle === productHandle);
      //  console.log(product);
      // Find the variant with the matching alt text
      const variant = product.variants.find((variant) => variant.option1 === swatchName );

      const variant2 = product.variants.find((variant) => variant.option2 === size);
      console.log(variant);
      // Update the imageUrl property for the product
      productStore.products = productStore.products.map((product) => {
        if (product.handle === productHandle && swatchName) {
          return {
            ...product,
            imageUrl: variant?.featured_image.src,
            activeClass: variant?.option1,
          };
        } else if(product.handle === productHandle && size) {
            return {
            ...product,
            sizeClass: variant2?.option2,
          };
        }
        return product;
      });



    };

// const imagesUrl = ref('');

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
//}

</script>

<style  scoped>
.swatch, .size {
    display: flex;
    flex-flow: row wrap;
}

.productSwatchImg img, .productSize {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.productSwatchImg {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
}
.productSwatchImg.active  img {
    border: 2px solid;
    padding: 2px;
}
 
.productSwatch, .productSize {
    margin-left: 10px;
}

.productSize {
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
}

.productSize.active span {
    color: white;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>