import { defineStore } from "pinia";

// Import the API URL environment variables
const { VITE_API_URL, VITE_API_URL_BOTTOM  } = import.meta.env

// Define the product store
export const useProductStore = defineStore({
	// ID for the store
	id: "productStore",
	// Initial state for the store
	state: () => ({
		// Top Products data
		products: {},
		// Bottom products data
		bottomProducts: {},
		// Mobile product slider state
		mobileSlider: 'close',
		// Slider background state
		backGround: 'close',
		// Loading state
		isLoading: true,


	}),

	actions: {


		async fetchProduct() {
			/**
			 * By making separate requests for top and bottom products, we can easily add new products
			 * to either category. Alternatively, we can retrieve all product data in a single request 
			 * and filter by top/bottom status in our code for efficiency. 
			 * This allows us to easily add new products as needed
			 * 
			 * this.products = response.slice(0, 6); // Get the first 6 products for top products
			 * this.bottomProducts = response.slice(6);
			 * 
			 */
			// Try to fetch the product data

			try {
				// Split the top and bottom product URLs into arrays
				const topUrls = VITE_API_URL.split(",");
				console.log('API REQUEST');

				const bottomUrls = VITE_API_URL_BOTTOM.split(",")

				// Use Promise.all to fetch both sets of products in parallel
				const responseTop = await Promise.all(
					topUrls.map((url) => fetch(url).then((res) => res.json()))
				);

				const responseBottom = await Promise.all(
					bottomUrls.map((url) => fetch(url).then((res) => res.json()))
				);
				// Set the Top products and bottomProducts state with the response data
				this.products = responseTop;
				this.bottomProducts = responseBottom;
			} catch (error) {
				// If there is an error, log it to the console
				console.error(error);
			} finally {
				// Set isLoading to false after the request finishes (whether it succeeds or fails)
				this.isLoading = false;
			}
		},
		
		// openProductDrawer opens or closes the mobile product drawer depending on its current state
		openProductDrawer() {

			if (this.mobileSlider === "open") {
				this.mobileSlider = "close";
				this.backGround = ""
				console.log('l-73');

			} else {
				this.mobileSlider = "open";
				this.backGround = "open";
				console.log('l-78')

			}
		},
	},
});
