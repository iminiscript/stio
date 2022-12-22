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

    <div class="product productTwo">
		<Carousel
			id="galleryTwo"
			:items-to-show="3"
			:wrap-around="true"
			v-model="currentSlideTwo"
			class="left box"
			:transition="500"
		>
			<Slide v-for="(product, index) in productsBottom" :key="product.id">
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
			id="thumbnailsTwo"
			:items-to-show="1"
			:wrap-around="true"
			v-model="currentSlideTwo"
			ref="carousel"
			class="right box"
			:transition="500"
		>
			<Slide v-for="(product, index) in productsBottom" :key="product.id">
				<div class="carousel__item" @click="slideToNext(index)">
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
										updateImageBottom(
											product.handle,
											swatch,
											null
										)
									"
								>
									<img :src="productStore.swaImgBottom(swatch)" />
								</span>
							</div>
						</div>
						<div class="size">
							<div
								class="productSize"
								v-for="size in product.options[1].values"
								:class="{ active: product.sizeClass === size }"
								@click="updateImageBottom(product.handle, null, size)"
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
productStore.fetchProductBottom();

const props = defineProps({
	products: String,
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

const updateImageBottom = (productHandle, swatchName, size) => {
	productStore.bottomProducts = productStore.bottomProducts.map((product) => {
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
