<template>
	<div class="product">
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
											product.handle,
											swatch,
											null
										)
									"
								>
									<img :src="productStore.swaImg(swatch)" />
								</span>
							</div>
						</div>
						<div class="size">
							<div
								class="productSize"
								v-for="size in product.options[1].values"
								:class="{ active: product.sizeClass === size }"
								@click="updateImage(product.handle, null, size)"
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

const slides = ref(["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"]);
const currentSlide = ref(0);

const slideTo = (index) => {
	currentSlide.value = index;
};

const productStore = useProductStore();
productStore.fetchProduct();

const props = defineProps({
	products: String,
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

// const toShortHand = (size) => {
// 	switch (size) {
// 		case "Extra Small":
// 			return "XS";
// 		case "Small":
// 			return "S";
// 		case "Medium":
// 			return "M";
// 		case "Large":
// 			return "L";
// 		case "Extra Large":
// 			return "XL";
// 		case "Extra Extra Large":
// 			return "XXL";
// 		case "Extra Extra Extra Large":
// 			return "XXXL";
// 		default:
// 			return size;
// 	}
// };

const updateImage = (productHandle, swatchName, size) => {
	productStore.products = productStore.products.map((product) => {
		if (product.handle !== productHandle) {
			return product;
		}

		let imageUrl;
		let activeClass;
		let sizeClass;

		if (swatchName) {
			const variant = product.variants.find(
				(variant) => variant.option1 === swatchName
			);
			imageUrl = variant?.featured_image.src;
			activeClass = variant?.option1;
		}

		if (size) {
			const variant2 = product.variants.find(
				(variant) => variant.option2 === size
			);
			sizeClass = variant2?.option2;
		}

		return {
			...product,
			imageUrl,
			activeClass,
			sizeClass,
		};
	});
};

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
<style scoped>

.box {
    width: 50%;
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
