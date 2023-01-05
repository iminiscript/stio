
# [STIO Kit Builder](https://stio-dev.netlify.app/ )

The project has been built ```Vue3 Composition API```. It uses ```PINIA``` as a tool for building robust and maintainable stores. 
The ```.env``` files for the project are also hosted on ```Netlify```, allowing for easy configuration and management of environment variables.


## Author

- [@iminiscript](https://www.github.com/iminiscript)

## Tech Stack

[Vue3 Composition API:](https://v3.vuejs.org/guide/composition-api-introduction.html) The Composition API is a flexible way to build components and reusable logic in Vue.js 3.

[PINIA:](https://pinia.vuejs.org/) PINIA is 💡 Intuitive 🔑 Type Safe ⚙️ Devtools support 🔌 Extensible 🏗 Modular by design 📦 Extremely light state management tool. 
## Getting Started 

To get started with this project, follow these steps: 


## Run Locally

Clone the project

```bash
  git clone git@github.com:iminiscript/stio.git stio-dev
```

Go to the project directory

```bash
  cd stio-dev
```

Duplicate ```.env.sample``` file and create ```.env```

Add the Product API's URL into ```.env``` file

For example 

```bash

VITE_API_URL = https://www.stio.com/products/mens-objective-pro-jacket?view=json

VITE_API_URL_BOTTOM = https://www.stio.com/products/mens-objective-pro-bib?view=json

``` 

To display products, add ```URL's``` to the ```"Top"``` and ```"Bottom"``` **keys** and they will be shown on the frontend.

Install dependencies

```bash
  yarn install
```


Start the server

```bash
  npm run start
```

## Demo

https://stio-dev.netlify.app/ 

## Deployment

To deploy this project merge your branch with ```main``` and it'll auto deploy.


