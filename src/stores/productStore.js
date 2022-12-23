import { defineStore } from "pinia";

export const useProductStore = defineStore({
	id: "productStore",
	state: () => ({
		products: {},
		bottomProducts: {},
	}),

	actions: {
		async fetchProduct() {
			const urlsTop = [
				"https://www.stio.com/products/mens-objective-pro-jacket?view=json",
				 "https://www.stio.com/products/mens-environ-jacket?view=json",
				"https://www.stio.com/products/mens-environ-xt-jacket?view=json",
                "https://www.stio.com/products/mens-shot-7-down-jacket?view=json",
                "https://www.stio.com/products/mens-doublecharge-insulated-jacket?view=json",
                "https://www.stio.com/products/raymer-jacket?view=json",
                "https://www.stio.com/products/mens-raymer-jacket?view=json",   
			];
			const urlsBottom = [
				"https://www.stio.com/products/mens-objective-pro-bib?view=json",
				"https://www.stio.com/products/mens-environ-bib?view=json",
				"https://www.stio.com/products/mens-environ-pant?view=json",
				"https://www.stio.com/products/mens-raymer-pant?view=json",
				"https://www.stio.com/products/mens-doublecharge-insulated-pant?view=json",
				"https://www.stio.com/products/mens-upslope-touring-pant?view=json",
				"https://www.stio.com/products/mens-fernos-insulated-knicker?view=json",
			];
			const responseTop = await Promise.all(
				urlsTop.map((url) => fetch(url).then((res) => res.json()))
			);

			const responseBottom = await Promise.all(
				urlsBottom.map((url) => fetch(url).then((res) => res.json()))
			);
			
			this.products = responseTop;
			this.bottomProducts = responseBottom;
		},

		getSwatchImage(products, item) {
			const product = products.find((product) => {
			  return product.images.some((image) => image.alt === `${item} swatch`);
			});
			return product?.images.find((image) => image.alt === `${item} swatch`)?.src || null;
		  },
		  
		  // Now you can use the getSwatchImage function like this:
		  
			// topSwatchImage = getSwatchImage(this.products, item);
		  	// bottomSwatchImage = getSwatchImage(this.bottomProducts, item);

		// swaImg(item) {
		// 	const product = this.products.find((product) => {
		// 	  return product.images.some((image) => image.alt === `${item} swatch`);
		// 	});
		// 	return product?.images.find((image) => image.alt === `${item} swatch`)?.src || null;
		//   },
		// swaImgBottom(item) {
		// 	const product = this.bottomProducts.find((product) => {
		// 		return product.images.some((image) => image.alt === `${item} swatch`);
		// 	});
		// 	return product?.images.find((image) => image.alt === `${item} swatch`)?.src || null;
		// },
	},

	getters: {


	}
});
