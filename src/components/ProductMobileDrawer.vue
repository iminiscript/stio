<template>
  <div :class="productStore.sliderBackGround" class="mobileBG">
    <span @click="productStore.openProductDrawer" class="close">
      <svg
        aria-hidden="true"
        focusable="false"
        role="presentation"
        class="icon icon-close"
        viewBox="0 0 20 20"
      >
        <title>Icon Close</title>
        <path
          fill="#444"
          d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z"
        ></path>
      </svg>
    </span>
  </div>
  <div class="mobileBtn" @click="productStore.openProductDrawer">
    Select Color &amp; Size
  </div>
</template>


<script setup>
// Import the product store functions for the drawer
import { useProductStore } from "@/stores/productStore.js";
const productStore = useProductStore();
</script>

<style lang="scss" scoped>
.mobileBtn {
  max-width: 230px;
  margin: auto;
  border-radius: 6px;
  border: 1px solid;
  text-align: center;
  padding: 10px 20px;
  text-transform: uppercase;
  font-size: 0.688rem;
  @media (min-width: 1024px) {
    display: none;
  }
}

.mobileBG {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all ease-out 800ms;
  z-index: 0;

  &.open {
    visibility: visible;
    opacity: 1;
    z-index: 1;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
}
</style>
