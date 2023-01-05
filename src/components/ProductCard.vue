<template>
  <div class="product">
    <Carousel
      :transition="500"
      :wrap-around="true"
      :settings="imgSettings"
      :breakpoints="imgBrkpoints"
      class="productLeft productBox"
      id="gallery"
      v-model="currentSlide"
    >
      <Slide :key="product.id" v-for="(product, index) in products">
        <img
          :src="product.imageUrl ?? product.first_variant.featured_image.src"
        />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <Carousel
      v-model="currentSlide"
      :items-to-show="1"
      :transition="500"
      :wrap-around="true"
      id="thumbnails"
      class="productRight productBox"
      :class="productStore.mobileSlider"
      ref="carousel"
    >
      <Slide v-for="(product, index) in products" :key="product.id">
        <div @click="slideTo(index)" class="carousel__item">
          <div class="productRightContent">
            <h2 class="productTitle">{{ product.title }}<span>→</span></h2>
            <h2 class="productPrice">
              {{ formatedPrice(product.price) }}
            </h2>
            <p class="productCopy">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
              suscipit nostrum tempora...
            </p>
            <div class="swatch">
              <div
                :key="swatch"
                class="productSwatch"
                v-for="swatch in product.options[0].values"
              >
                <span
                  :class="{ active: product.activeClass === swatch }, firstAvailableVariant(product, swatch, null)"

                  @click="getUpdatedSwatchSize(products, product.handle, swatch, null)"
                  class="productSwatchImg"
                >
                  <img :src="getSwatchImage(products, swatch).imgSrc" />
                </span>
								<!-- <span>{{ swatch }} </span> -->
              </div>
            </div>
            <div class="size">
              <div
                :class="{
                  active: product.sizeClass === size,
                  disable: !checkInventory(product, product.handle, size, product.activeClass),
                }, firstAvailableVariant(product, null, size)"
                :key="size"
                @click="getUpdatedSwatchSize(products, product.handle, null, size)"
                class="productSize"
                v-for="size in product.options[1].values"
              >
                <span>{{ toShortHandSize(size) }}</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore.js";
import { ref, computed} from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

// Import the product store and fetch the products
const productStore = useProductStore();
productStore.fetchProduct();

// Declare the props for the component
const props = defineProps({
  products: Object,
  productsBottom: String,
  image: String,
});

// Refs for the current slide indices for the carousels
const currentSlide = ref(0);
const currentSlideTwo = ref(0);

// Set the current slide index for a carousel
const slideTo = (index) => {
  currentSlideTwo.value = index;
};

// Set the current slide index for a carousel to the next slide
const slideToNext = (index) => {
  currentSlideTwo.value = index;
};

// fun for the carousel configuration items to show
const imgSettings = ref({
  itemsToShow: 1,
});

// fun for the responsive breakpoints configurations 
const imgBrkpoints = ref({
  641: {
    itemsToShow: 3,
  },
});


// Format the price by taking price as an argument and returned the calcs
const formatedPrice = (price) => {
  return "$" + (price / 100).toLocaleString();
};

// Object that maps long size names to shorthand size names
const sizeMappings = {
  "Extra Small": "XS",
  "Small": "S",
  "Medium": "M",
  "Large": "L",
  "Extra Large": "XL",
  "Extra Extra Large": "XXL",
  "Extra Extra Extra Large": "XXXL",
};

// This fun takes a long size name as an argument and returns the shorthand size name
const toShortHandSize = (size) => {
  return sizeMappings[size] || size;
};


// This fun checks the inventory for disable class on OOS items
const checkInventory = (product, productHandle, size, swatch) => {
  // Find the variant with the given size and swatch values
  const variant = product.variants.find(
    (variant) => variant.option2 === size && variant.option1 === swatch
  );
	// Return the inventory quantity of the matching variant 
  return variant.inventory_quantity;
};

// This fun gives us the swatch color images from the product images
const getSwatchImage =  (products, item) => {
	// Find the product with an image that has an alt text matching the item name followed by " swatch"
  	const product = products.find((product) => {
    	return product.images.some((image) => image.alt === `${item} swatch`);
  	});
	// Return the src attribute of the image with the matching alt text, or null if no such image is found
	return {
		imgSrc: product?.images.find((image) => image.alt === `${item} swatch`)?.src || null, 
	}
  
};

// This fun checks the availbilty of first variant where we will add the active class 
const firstAvailableVariant = (product, swatch, size) => {
  // Check if the activeClass property is already set
  if (product.activeClass || product.sizeClass) {
    return '';
  }
  // Set the activeClass property to the first available variant for swatch
  product.activeClass = product.first_variant.option1;
  // Set the sizeClass property to the first available variant for size
  product.sizeClass = product.first_variant.option2;
  // Return 'active'
  return 'active';
}

// This fun changes the main image on click of swatch and size selection
const getUpdatedSwatchSize = (products, productHandle, swatchName, size) => {
  // Find the product with the matching handle
  const index = products.findIndex(
    (product) => product.handle === productHandle
  );
  const product = products[index];
  // Find the variant with the matching alt text of images
  const variantSwatch = product.variants.find(
    (variant) => variant.option1 === swatchName
  );
  // Find the variant related to size as well
  const variantSize = product.variants.find(
    (variant) => variant.option2 === size
  );
  // This variable will be used to update the product properties
  let updatedProduct;
  if (swatchName) {
    updatedProduct = {
      ...product,
      imageUrl: variantSwatch?.featured_image.src,
      activeClass: variantSwatch?.option1,
    };
  } else if (size) {
    updatedProduct = {
      ...product,
      sizeClass: variantSize?.option2,
    };
  }
  // Update the active product with new properties
  products.splice(index, 1, updatedProduct);
};


</script>

<style lang="scss" scoped>
  .productOne {
	.carousel__viewport {
		padding: 40px 0 0;
	}

	.productRight {
		@media (min-width: 1024px) {
			padding-top: 140px;
		}
	}

	.productLeft {
		@media (max-width: 640px) {
			padding-top: 50px;
		}
		.carousel__slide {
			padding: 40px 0 0 !important;
		}
	}
}

.productTwo {
	padding-top: 0;
	margin-top: -5px;

	.productRight {
		margin-top: -24px;
		top: 350px;
		@media (min-width: 500px) {
			top: 400px;
		}
	}

	.productLeft {
		@media (min-width: 1024px) {
			margin-top: -110px;
		}
	}

	.carousel__slide {
		padding: 0 0 40px !important;
	}
}

.productOne,
.productTwo {
	position: relative;
	clear: both;
}

hr {
	border: 0;
	border-top: 3px solid #eee;
	display: block;
	margin: 30px 0 0;
	padding: 0;
	text-align: left;
	z-index: 9;
	top: 10px;
	visibility: hidden;
	@media (min-width: 1024px) {
		visibility: visible;
	}
}

.productLeft {
	@media (min-width: 1024px) {
		width: 65%;
		float: left;
	}
	img {
		max-width: 80%;
		height: auto;
	}
}

.productRightContent {
	width: 85%;
	text-align: left;
}

.productTitle {
	font-size: 22px;
	font-weight: 600;

	span {
		padding-left: 10px;
	}
}

.productCopy {
	font-size: 14px;
	margin-bottom: 10px;
}

.carousel__slide {
	justify-content: center;
}

.productPrice {
	font-size: 16px;
	margin: 5px 0;
}

.productRight {
	padding-bottom: 70px;
	padding-left: 20px;
	width: 100%;
	transition: all ease-out 300ms;
	position: fixed;
	top: 50px;
	right: 0;
	@media (min-width: 1024px) {
		padding-left: 40px;
		padding-bottom: 40px;
		width: calc(35% - 40px);
		position: static;
		float: right;
		top: auto;
		right: auto;
		background-color: #f8f8f8;
	}

	@media (max-width: 1023px) {
		z-index: 9;
	}

	&.close {
		@media (max-width: 1023px) {
			transform: translateX(100%);
		}
	}
	&.open {
		@media (max-width: 1023px) {
			transform: translateX(0);
		}
	}

	.carousel__slide {
		@media (max-width: 1023px) {
			justify-content: left;
		}
	}

	.carousel__viewport {
		@media (max-width: 1023px) {
			overflow: visible;
		}
	}

	.carousel__item {
		@media (max-width: 1023px) {
			border-bottom: 2px solid #eee;
		}
	}
}


.disable {
	&::before {
		background-color: #414042;
		border: none;
		content: "";
		height: 1px;
		left: -1px;
		position: absolute;
		top: 14px;
		transform: rotate(130deg);
		width: 29px;
	}

	span {
		opacity: 0.2;
	}
}

.swatch,
.size {
	display: flex;
	flex-flow: row wrap;
	margin-bottom: 15px;
}

.productSize {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}

.productSwatchImg {
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	border: 1px solid transparent;
	border-radius: 50%;

	img {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		margin: 0 0 0 3px;
	}

	&.active {
		border: 1px solid;
	}
}

.productSwatch,
.productSize {
	margin-right: 10px;
}

.productSize {
	border-radius: 50%;
	border: 1px solid;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 10px;

	&.active {
		span {
			color: white;
			background-color: black;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
			border-radius: 50%;
		}
	}
}


</style>
