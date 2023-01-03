<template>
    <div class="">
        <div :key="product.id" v-for="(product, index) in products">
        <img
          :src="product.imageUrl ?? product.first_variant.featured_image.src"
        />
        <div v-for="(product, index) in products" :key="product.id">
        <div class="carousel__item">
          <div class="productRight">
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
                  :class="{ active: product.activeClass === swatch }, firstVariant(product, swatch, null)"

                  @click="updateImage(products, product.handle, swatch, null)"
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
                }, firstVariant(product, null, size)"
                :key="size"
                @click="updateImage(products, product.handle, null, size)"
                class="productSize"
                v-for="size in product.options[1].values"
              >
                <span>{{ toShortHand(size) }}</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      </div>

    </div>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore.js";
import { ref, computed, reactive, onMounted, nextTick, watch } from "vue";


const productStore = useProductStore();

productStore.fetchProduct();

const props = defineProps({
  products: Object,
  productsBottom: String,
  image: String,
});



const imgSettings = ref({
  itemsToShow: 1,
});



const state = reactive({ count: 0 });
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

// const checkInventory = (product, productHandle, size, classs ) => {
//   console.log(classs)
//   // const product = products.find((product) => product.handle === productHandle);
//   const variant2 = product.variants.find((variant) => variant.option2 === size);

//   console.log(variant2)
//   return variant2.inventory_quantity;
// };

const checkInventory = (product, productHandle, size, swatch) => {
  // Find the variant with the given size and swatch values
  const variant = product.variants.find(
    (variant) => variant.option2 === size && variant.option1 === swatch
  );
    console.log(variant)
  // Return the inventory quantity for the variant
  return variant.inventory_quantity;
};

// const checkInventory = (products, productHandle, size) => {
//   const product = products.find((product) => product.handle === productHandle);
//   console.log(product)
//   const variant2 = product.variants.find((variant) => variant.option2 === size);
//   console.log(variant2)
//   return variant2.inventory_quantity;
// };


const getSwatchImage =  (products, item) => {
  const product = products.find((product) => {
    	return product.images.some((image) => image.alt === `${item} swatch`);
  });
	return {
		imgSrc: product?.images.find((image) => image.alt === `${item} swatch`)?.src || null, 
	}
  
};

const firstVariant = (product, swatch, size) => {
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



const updateImage = (productsList, productHandle, swatchName, size) => {
  // Find the product with the matching handle
	
	const product = productsList.find(
    (product) => product.handle === productHandle
  );

  // Find the variant with the matching alt text
  const variant = product.variants.find(
    (variant) => variant.option1 === swatchName
  );
  const variant2 = product.variants.find((variant) => variant.option2 === size);

  const filteredSizes = product.variants.filter((variant) => variant.option1 === swatchName);
	console.log(filteredSizes);

  const inventory = filteredSizes.map( (item) => item.inventory_quantity)


  // const filteredSizes = product.variants.filter((variant) => variant.option1 === swatchName).map((variant) => variant.option2);
  
  // console.log(filteredSizes)

  //console.log(product.options[1].values)

  //product.options[1].values = filteredSizes.map((variant) => variant.option2);

  //console.log(product.options[1].values)

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

  console.log(product)
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
.active {
    border: 2px solid;
}

.disable {
    opacity: 0.3;
}
</style>