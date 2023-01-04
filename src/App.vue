<script setup>
import { useProductStore } from "@/stores/productStore.js";
import { ref, computed, reactive } from "vue";

// Fetch the product data from the API
const productStore = useProductStore();
productStore.fetchProduct();

// Import the ProductCard component
import ProductCard from "@/components/ProductCard.vue";
// Import the ProductBorder component
import ProductBorder from "@/components/ProductBorder.vue";
// Import the ProductMobileDrawer component
import ProductMobileDrawer from "@/components/ProductMobileDrawer.vue";
</script>

<template>
   <!-- Display a loading spinner while the product data is being fetched -->
  <div v-if="productStore.isLoading" class="loader">
    <img src="@/assets/lazyLoader.gif" alt="Loading" />
  </div>
  <!-- When the product data has finished loading, render the page content -->
  <div v-else>
    <!-- Render the ProductBorder component with the specified props -->
    <ProductBorder
      title="Men's Ski Kit"
      url="https://www.stio.com/pages/build-your-kit"
      subTitle="SHOP ALL KITS"
    />
    <!-- Render the ProductCard component with the top products and a class of "productOne" -->
    <ProductCard :products="productStore.products" class="productOne" />
    <!-- Render the ProductCard component with the bottom products and a class of "productTwo" -->
    <ProductCard :products="productStore.bottomProducts" class="productTwo" />
    <!-- Render the ProductMobileDrawer component -->
    <ProductMobileDrawer />
  </div>
</template>

<style lang="scss">
.productWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.productPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.loader {
  display: flex;
  justify-content: center;
}
</style>
