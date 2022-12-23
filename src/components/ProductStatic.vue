<script setup>
defineProps({
	title: String,
	url: String,
	subTitle: String,
});
</script>

<template>
	<div class="productHead">
        <div class="productHeadLeft">
          <div class="productHeadBorder">
            <span class="top">Select<br/>↓</span>
            <span class="bottom">↑<br/>Select</span>
          </div>

        </div>
        <div class="productHeadRight">
          <h1 class="productTitle">{{ title }}</h1>
		  <a class="productLink" :href="url">
			{{ subTitle }}
		  </a>
          <hr />
        </div>
	</div>
</template>

<style lang="scss" scoped>
.productHead {
  display: flex;
  justify-content: space-between;
  position: relative;
}


.productTitle {
  line-height: 1.2;
    margin-bottom: 10px;
    margin-top: 30px;
    text-align: left;
    font-size: 2.1875rem;
    letter-spacing: 0;
    font-weight: 700;
}
.productLink {
  font-size: .875rem;
    font-weight: 700;
    letter-spacing: .14em;
    line-height: .8;
    padding-bottom: 2px;
    position: relative;
    text-transform: uppercase;
    color: #414042;

    &::after {
      background-color: rgb(39, 134, 58);
      border-radius: 2px;
      bottom: -8px;
      content: "";
      height: 2px;
      left: 0;
      position: absolute;
      transform-origin: left;
      transition: transform .3s ease-in;
      width: 100%;
      transform: scaleX(0);
    }
    &:hover::after {
      transform: scaleX(1);
      transition: transform .15s ease-out;
    }
}

hr {
    border: 0;
    border-top: 3px solid #eee;
    display: block;
    margin: 30px 0 0;
    padding: 0;
    text-align: left;
    z-index: 9;
}

.productHeadLeft {
  width: 65%;
  position: relative;
  span {
    text-align: center;
    width: 100%;
    display: inline-block;
    position: relative;
    
    &.top {
      top: -50px;

      &::before {
        content: "";
        position: absolute;
        width: 82%;
        height: 2px;
        background: #fff;
        left: 0;
        right: 0;
        margin: auto;
        bottom: -2px;
      }
    }
    &.bottom {
      top: 50px;

      &::before {
        content: "";
        position: absolute;
        width: 82%;
        height: 2px;
        background: #fff;
        left: 0;
        right: 0;
        margin: auto;
        top: -2px;
      }
    }
  }
}
.productHeadBorder {
    position: absolute;
    border: 2px solid #eee;
    z-index: 9;
    height: 575px;
    left: 0;
    right: 0;
    margin: auto;
    width: 33%;
    top: 43px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.productHeadRight {
  width: calc(35% - 40px);
  background-color: #f8f8f8;
  padding: 0 40px;
  position: absolute;
  right: 0;
  z-index: 1;
}
</style>
