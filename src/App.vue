<script setup>

// Fetch the product data from the API
import { useProductStore } from "@/stores/productStore.js";

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
		<ProductBorder
			title="Men's Ski Kit"
			url="https://www.stio.com/pages/build-your-kit"
			subTitle="SHOP ALL KITS"
		/>

		<!-- Top Product Slider Section -->
		<ProductCard 
			:products="productStore.products" 
			class="productOne" />

		<!-- Bottom Product Slider Section -->
		<ProductCard
			:products="productStore.bottomProducts"
			class="productTwo"
		/>
		
		<ProductMobileDrawer 
			title="Select Color &amp; Size" 
		/>
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
