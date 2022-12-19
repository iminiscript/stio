import { defineStore } from "pinia";

export const useProductStore = defineStore({
	id: "productStore",
	state: () => ({
		products: {},
        variants: [],
		unique:{},
	}),

	actions: {
		async fetchProduct() {
			const urls = [
				"https://www.stio.com/products/mens-objective-pro-jacket?view=json",
				 "https://www.stio.com/products/mens-environ-jacket?view=json",
				"https://www.stio.com/products/mens-environ-xt-jacket?view=json",
                "https://www.stio.com/products/mens-shot-7-down-jacket?view=json",
                "https://www.stio.com/products/mens-doublecharge-insulated-jacket?view=json",
                "https://www.stio.com/products/raymer-jacket?view=json",
                "https://www.stio.com/products/mens-raymer-jacket?view=json",   
			];
			const response = await Promise.all(
				urls.map((url) => fetch(url).then((res) => res.json()))
			);
			console.log(response);
			this.products = response;

            // this.products.map(vars => {
            //     vars.variants.reduce((set, variant) => {
            //         const property = variant.option1;
            //         const setItem = set[property] = set[property] || { items: [] }
            //         setItem.items.push(variant)
            //         if(variant.available) setItem.items.available = true
            //         this.variants.push(set);
            //         return set
            //       }, {});
            // }) 

			
			// const uniqueVars = [...new Set(this.variants)];
			// this.unique.push(uniqueVars);
		},

		test(item) {
			console.log(item)
		},

		swaImg (item)  {
			console.log(item)
			 this.products.map((hand) => {
					// console.log(hand.variants);
					hand.images.map((img) => {
					 //console.log(img.alt + ' swatch')
					 //console.log(img.alt)
						 if (img.alt  === item + ' swatch') {
							 console.log('I M in')
							 console.log(img.src)
							 return img.src
		 
						 }
					 })
				 
			 })
		 }
	},

	getters: {


	}
});