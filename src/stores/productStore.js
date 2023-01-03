import { defineStore } from "pinia";

const { VITE_API_URL, VITE_API_URL_BOTTOM, VITE_API_URL_TEST_TOP, VITE_API_URL_TEST_BOT } = import.meta.env



export const useProductStore = defineStore({
	id: "productStore",
	state: () => ({
		products: {},
		bottomProducts: {},
		mobileSlider: 'close',
		backGround: '',
		isLoading: true,
	}),

	actions: {
		async fetchProduct() {

			const topUrls = VITE_API_URL.split(",");

			const bottomUrls = VITE_API_URL_BOTTOM.split(",")

			const responseTop = await Promise.all(
				topUrls.map((url) => fetch(url).then((res) => res.json()))
			);

			const responseBottom = await Promise.all(
				bottomUrls.map((url) => fetch(url).then((res) => res.json()))
			);
			
			this.products = responseTop;
			this.bottomProducts = responseBottom;
			this.isLoading = false;
		},
		openCartDrawer() {

			if (this.mobileSlider === "open") {
				this.mobileSlider = "close";
				this.backGround = ""

			} else {
				this.mobileSlider = "open";
				this.backGround = "open"

			}
		},
	},
});
