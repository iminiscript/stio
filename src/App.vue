<script setup>

import { useProductStore } from "@/stores/productStore.js";
//import { onMounted } from "vue";

const productStore = useProductStore();
productStore.fetchProduct();

import ProductCard from "@/components/ProductCard.vue";

import ProductBorder from "@/components/ProductBorder.vue";

import ProductMobileDrawer from "@/components/ProductMobileDrawer.vue";


// onMounted(() => {
// 	const currentProgress = window.performance.timing.domContentLoadedEventEnd;
// 	const totalProgress = window.performance.timing.domComplete;
// 	if (currentProgress / totalProgress >= 0.99) {
// 	window.stop();
// 	}
// });

</script>

<template>
	<div v-if="productStore.isLoading" class="loader">
		<img src="@/assets/lazyLoader.gif" alt="Loading" />
	</div>
	<div v-else>
		<ProductBorder
			title="Men's Ski Kit"
			url="https://www.stio.com/pages/build-your-kit"
			subTitle="SHOP ALL KITS"
		/>

		<ProductCard :products="productStore.products" class="productOne" />

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
