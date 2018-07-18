<template>
  <div class="container">
    <p class="txt-main-point">New Arrivals</p>
    <div class="line line__default"></div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="/static/img/main/item_1.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_2.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_3.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_4.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_5.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_6.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_7.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_8.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_9.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="/static/img/main/item_10.png" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'new-arrivals',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 2500,
        },
        breakpoints: {
          767: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
  .container {
    padding: 0 20px 40px 20px
  }
  .line {
    width: 100%;
    margin-top: 6px;
    margin-bottom: 30px;
    border-width: 2px;
  }
  .swiper-slide {
    width: calc(33% -10px);
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  @media (min-width:768px) {
    .container {
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 70px;
    }
    .txt-main-point {
      line-height: 1;
    }
    .line {
      margin-top: 20px;
      margin-bottom: 50px;
    }
    .swiper-slide {
      img {
        width: 100%;
      }
    }
  }
</style>
