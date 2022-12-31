<template>
    <div class="product">
        <Carousel
            :items-to-show="3"
            :transition="500"
            :wrap-around="true"
            class="left box"
            id="gallery"
            v-model="currentSlide"
        >
            <Slide 
				:key="product.id" v-for="(product, index) in products">
					<img :src="product.imageUrl ?? product.variants[0].featured_image.src"
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
          class="right box"
          :class="productStore.mobileSlider"
          ref="carousel"
        >
            <Slide
              v-for="(product, index) in products"
              :key="product.id"
            >
                <div @click="slideTo(index)" class="carousel__item">
                    <div class="productRight">
                        <h2 class="productTitle">
                            {{ product.title }}<span>→</span>
                        </h2>
                        <h2 class="productPrice">
                            {{ formatedPrice(product.price) }}
                        </h2>
                        <p class="productCopy">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Sunt suscipit nostrum tempora...
                        </p>
                        <div class="swatch">
                            <div
                                :key="swatch"
                                class="productSwatch"
                                v-for="swatch in product.options[0].values"
                            >
                                <span
                                    :class="{
                                        active: product.activeClass === swatch,
                                    }"
                                    @click="
                                        updateImage(
                                            products,
                                            product.handle,
                                            swatch,
                                            null
                                        )
                                    "
                                    class="productSwatchImg"
                                >
                                    <img
                                        :src="getSwatchImage(products, swatch)"
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="size">
                            <div
                                :class="{
                                    active: product.sizeClass === size,
                                    disable: !checkInventory(
                                        products,
                                        product.handle,
                                        size
                                    ),
                                }"
                                :key="size"
                                @click="
                                    updateImage(
                                        products,
                                        product.handle,
                                        null,
                                        size
                                    )
                                "
                                class="productSize"
                                v-for="size in product.options[1].values"
                            >
                                <span>{{ toShortHand(size) }}</span>
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
import { ref, computed, reactive, onMounted, nextTick } from "vue";
import ImageCard from "./ProductCard.vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";

import ProductStatic from "./ProductStatic.vue";

import "vue3-carousel/dist/carousel.css";

const productStore = useProductStore();

productStore.fetchProduct();

const currentSlide = ref(0);
const currentSlideTwo = ref(0);
const isLoaded = ref(true);

const props = defineProps({
    products: Object,
    productsBottom: String,
    image: String,
});

const slideTo = (index) => {
    currentSlideTwo.value = index;
};

const slideToNext = (index) => {
    currentSlideTwo.value = index;
};

const formatedPrice = (price) => {
    return "$" + (price / 100).toLocaleString();
};

const sizeMappings = {
    "Extra Small": "XS",
    Small: "S",
    Medium: "M",
    Large: "L",
    "Extra Large": "XL",
    "Extra Extra Large": "XXL",
    "Extra Extra Extra Large": "XXXL",
};

const toShortHand = (size) => {
    return sizeMappings[size] || size;
};

const checkInventory = (products, productHandle, size) => {
    const product = products.find(
        (product) => product.handle === productHandle
    );
    const variant2 = product.variants.find(
        (variant) => variant.option2 === size
    );
    return variant2.inventory_quantity;
};

const getSwatchImage = (products, item) => {
    const product = products.find((product) => {
        return product.images.some((image) => image.alt === `${item} swatch`);
    });
    return (
        product?.images.find((image) => image.alt === `${item} swatch`)?.src ||
        null
    );
};

const updateImage = (productsList, productHandle, swatchName, size) => {
    // Find the product with the matching handle
    const product = productsList.find(
        (product) => product.handle === productHandle
    );
    // Find the variant with the matching alt text
    const variant = product.variants.find(
        (variant) => variant.option1 === swatchName
    );
    const variant2 = product.variants.find(
        (variant) => variant.option2 === size
    );

    console.log(variant2);
    // Check the product type
    const dataType = product.tags.find(
        (tag) => tag === "mixmatch_top" || tag === "mixmatch_bottom"
    );
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
    if (dataType === "mixmatch_top") {
        productStore.products = productsList.map((product) =>
            product.handle === productHandle ? updatedProduct : product
        );
    } else if (dataType === "mixmatch_bottom") {
        productStore.bottomProducts = productsList.map((product) =>
            product.handle === productHandle ? updatedProduct : product
        );
    }
};
</script>

<style lang="scss" scoped>
.productOne {
    .carousel__viewport {
        padding: 40px 0 0;
    }
    .right {
        @media(min-width: 1024px) {
            padding-top: 140px;
        }
    }
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
}

.left {
    img {
        max-width: 80%;
        height: auto;
    }
}

.productTwo {
    .right {
        margin-top: -24px;
    }
}

.productRight {
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

.productTwo {
    padding-top: 0;
    margin-top: -5px;
}

.productPrice {
    font-size: 16px;
    margin: 5px 0;
}

.left {
    @media(min-width: 1024px) {
        width: 65%;
    }
}

.right {
    padding-bottom: 40px;
    padding-left: 40px;
    width: 100%;
    transition: all ease-out 500ms;
    position: absolute;
    top: 0;
    right: 0;
    @media(min-width: 1024px) {
        width: calc(35% - 40px);
        position: static;
        float: right;
        top: auto;
        right: auto;
        background-color: #f8f8f8;
    }

    @media(max-width: 1023px) {
          z-index: 9;
    }

    &.close {
        @media(max-width: 1023px) {
            transform: translateX(100%);
        }
    }
    &.open {
        @media(max-width: 1023px) {
            transform: translateX(0);
        }
    }
}
.productOne .left .carousel__slide {
    padding: 40px 0 0 !important;
}

.productTwo .carousel__slide {
    padding: 0 0 40px !important;
}

.left {
    @media(min-width: 1024px) {
        float: left;
    }
    
}

.productOne, 
.productTwo {
    position: relative;
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

.productSwatchImg img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin: 0 0 0 3px;
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
}

.productSwatchImg.active {
    border: 1px solid;
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
