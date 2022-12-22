<template>
	<div class="product productOne">
		<Carousel
			id="gallery"
			:items-to-show="3"
			:wrap-around="true"
			v-model="currentSlide"
			class="left box"
			:transition="500"
		>
			<Slide v-for="(product, index) in products" :key="product.id">
				<img
					:src="
						product.imageUrl ??
						product.variants[0].featured_image.src
					"
				/>
			</Slide>
			<template #addons>
				<Navigation />
			</template>
		</Carousel>

		<Carousel
			id="thumbnails"
			:items-to-show="1"
			:wrap-around="true"
			v-model="currentSlide"
			ref="carousel"
			class="right box"
			:transition="500"
		>
			<Slide v-for="(product, index) in products" :key="product.id">
				<div class="carousel__item" @click="slideTo(index)">
					<div class="productRight">
						<h2 class="productTitle">{{ product.title }}</h2>
						<h2 class="productPrice">
							{{ formatedPrice(product.price) }}
						</h2>
						<div class="swatch">
							<div
								class="productSwatch"
								v-for="swatch in product.options[0].values"
							>
								<span
									:class="{
										active: product.activeClass === swatch,
									}"
									class="productSwatchImg"
									@click="
										updateImage(
                                            products,
											product.handle,
											swatch,
											null
										)
									"
								>
									<img :src="getSwatchImage(products, swatch)" />
								</span>
							</div>
						</div>
						<div class="size">
							<div
								class="productSize"
								v-for="size in product.options[1].values"
								:class="{ active: product.sizeClass === size }"
								@click="updateImage(products, product.handle, null, size)"
							>
								<span>{{ toShortHand(size) }}</span>
							</div>
						</div>
					</div>
				</div>
			</Slide>
		</Carousel>
	</div> 
</template>

<script setup>
import { useProductStore } from "@/stores/productStore.js";
import { ref, computed, reactive } from "vue";
import ImageCard from "./ProductCard.vue";

import { Carousel, Slide, Navigation } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const currentSlide = ref(0);
const currentSlideTwo = ref(0);

const slideTo = (index) => {
    currentSlideTwo.value = index;
};

const slideToNext = (index) => {
    currentSlideTwo.value = index;
};

const productStore = useProductStore();
productStore.fetchProduct();

const props = defineProps({
	products: Object,
    productsBottom: String,
	image: String,
});

const formatedPrice = (price) => {
	return "$" + (price / 100).toLocaleString();
};

const sizeMappings = {
	"Extra Small": "XS",
	"Small": "S",
	"Medium": "M",
	"Large": "L",
	"Extra Large": "XL",
	"Extra Extra Large": "XXL",
	"Extra Extra Extra Large": "XXXL",
};

const toShortHand = (size) => {
	return sizeMappings[size] || size;
};

const getSwatchImage = (products, item) => {
    const product = products.find((product) => {
        return product.images.some((image) => image.alt === `${item} swatch`);
    });
    return product?.images.find((image) => image.alt === `${item} swatch`)?.src || null;
};

const updateImage = (productsList, productHandle, swatchName, size) => {
  // Find the product with the matching handle
  const product = productsList.find((product) => product.handle === productHandle);
  // Find the variant with the matching alt text
  const variant = product.variants.find((variant) => variant.option1 === swatchName);
  const variant2 = product.variants.find((variant) => variant.option2 === size);
  // Check the product type
  const dataType = product.tags.find((tag) => tag === 'mixmatch_top' || tag === 'mixmatch_bottom');
  // Update the product properties based on the product type
  let updatedProduct;
  if (swatchName) {
    updatedProduct = {
      ...product,
      imageUrl: variant?.featured_image.src,
      activeClass: variant?.option1,
    };
  } else if (size) {
    updatedProduct = {
      ...product,
      sizeClass: variant2?.option2,
    };
  }
  // Update the products array based on the product type
  if (dataType === 'mixmatch_top') {
    productStore.products = productsList.map((product) =>
      product.handle === productHandle ? updatedProduct : product
    );
  } else if (dataType === 'mixmatch_bottom') {
    productStore.bottomProducts = productsList.map((product) =>
      product.handle === productHandle ? updatedProduct : product
    );
  }
};


// const updateImage = (productsList, productHandle, swatchName, size) => {
   
//       const product = productsList.find((product) => product.handle === productHandle);
//         console.log(product);
//       // Find the variant with the matching alt text
//       const variant = product.variants.find((variant) => variant.option1 === swatchName );
//       const variant2 = product.variants.find((variant) => variant.option2 === size);

//       const dataType = product.tags.find((tag) => tag === 'mixmatch_top' || tag === 'mixmatch_bottom')
//       if (dataType === 'mixmatch_top') {
//         productStore.products = productsList.map((product) => {
//             if (product.handle === productHandle && swatchName) {
//                 console.log(variant?.featured_image.src)
//                 return {
//                 ...product,
//                 imageUrl: variant?.featured_image.src,
//                 activeClass: variant?.option1,
//             };
//             } else if(product.handle === productHandle && size) {
//                 console.log(variant2?.option2)
//                 return {
//                 ...product,
//                 sizeClass: variant2?.option2,
//             };
//             }
//             return product;
//         });
//     } else if (dataType === 'mixmatch_bottom') {
//         productStore.bottomProducts = productsList.map((product) => {
//             if (product.handle === productHandle && swatchName) {
//                 console.log(variant?.featured_image.src)
//                 return {
//                 ...product,
//                 imageUrl: variant?.featured_image.src,
//                 activeClass: variant?.option1,
//             };
//             } else if(product.handle === productHandle && size) {
//                 console.log(variant2?.option2)
//                 return {
//                 ...product,
//                 sizeClass: variant2?.option2,
//             };
//             }
//             return product;
//         });
//     }
// };

</script>
<style scoped lang="scss">

.carousel__viewport {
    padding: 0 30px;
}

.product {
    overflow: hidden;
    padding-top: 100px;
}
.productOne .left {
	.carousel__slide--visible {
        &.carousel__slide--active {
            
            &::before {
                z-index: 1;
                content: "Select";
                position: absolute;
                top: -4px;
                border-bottom: 3px solid white;
                height: 48px;
                width: 81%;

            }

            &::after {
                content: "↓";
                position: absolute;
                top: 18px;
                border-bottom: 2px solid;
                width: 100%;;
            }

            img {
                border-left: 2px solid;
		        border-right: 2px solid;
            }
	    }
    }
}

.productTwo{
    padding-top: 0;
    margin-top: -5px;
     .left {
        .carousel__slide--visible {
            &.carousel__slide--active {
                
                &::before {
                    z-index: 1;
                    content: "Select";
                    position: absolute;
                    bottom: -4px;
                    border-top: 3px solid white;
                    height: 48px;
                    width: 81%;
                    line-height: 60px;

                }

                &::after {
                    content: "↑";
                    position: absolute;
                    bottom: 18px;
                    border-top: 2px solid;
                    width: 100%;;
                }

                img {
                    border-left: 2px solid;
                    border-right: 2px solid;
                }
            }
        }
    }
}

.box {
	width: 50%;
}
.productOne .carousel__slide {
    padding: 40px 0 0 0 !important;
}

.productTwo .carousel__slide {
    padding: 0 0 40px 0 !important;
}

.left {
	float: left;
}

.right {
	float: right;
}

.swatch,
.size {
	display: flex;
	flex-flow: row wrap;
}

.productSwatchImg img,
.productSize {
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

.productSwatchImg.active img {
	border: 2px solid;
	padding: 2px;
}

.productSwatch,
.productSize {
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
