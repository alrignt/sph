<template>
  <div class="swiper-container"
       ref="cur">
    <div class="swiper-wrapper">
      <!-- 小轮播图 -->
      <div class="swiper-slide"
           v-for="(carousel,index) in list"
           :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
      <!-- <div class="swiper-slide">
                                  <img src="./images/floor-1-b02.png">
                              </div>
                              <div class="swiper-slide">
                                  <img src="./images/floor-1-b03.png">
                              </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入Swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      //立即监听：不管数据有没有变化，一上来就监听
      immediate: true,
      handler() {
        //只能监测到有数据，但是v-for渲染的结构还是没有办法确定
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true, //点击小球可以切换图片
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      },
    },
  },
}
</script>

<style>
</style>