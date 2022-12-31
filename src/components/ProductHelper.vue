<template>
    <div :class="productStore.backGround" class="bg">
        <span @click="productStore.openCartDrawer" class="close">Close </span>
    </div>

    <div class="mobileOpnBtn" @click="productStore.openCartDrawer">Select Color &amp; Size </div>

</template>


<script setup>
    import { useProductStore } from '@/stores/productStore.js';
    const productStore = useProductStore();

    // defineProps({title: String, url: String, subTitle: String});
</script>

<style lang="scss" scoped>
.mobileOpnBtn {
  max-width: 230px;
  margin: auto;
  border-radius: 6px;
  border: 1px solid;
  text-align: center;
  padding: 10px 20px;
  text-transform: uppercase;
  font-size: .688rem;
  @media (min-width: 1024px){
    display: none;
  }

}

.bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    transition: all ease-out 800ms;

    &.open {
        visibility: visible;
        opacity: 1;
    }
}
</style>
