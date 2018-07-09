<template>
  <div class="c-menu">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide
        v-for="(data, idx) in routerJSON"
        :key="idx" @click.native="clickMenu(idx)">
        <router-link
          :to="data.path"
          class="closet-link"
          active-class="active">
          {{ data.text }}
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'closet-menu',
  watch: {
  },
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
          320: {
          },
        },
      },
      routerJSON: [
        {
          text: '내일의옷장',
          path: '/closet/tomorrow',
        },
        {
          text: '현재의옷장',
          path: '/closet/current',
        },
        {
          text: '과거의옷장',
          path: '/closet/past',
        },
        {
          text: '스타일정보',
          path: '/closet/style',
        },
        {
          text: '나의정보관리',
          path: '/closet/security',
        },
        {
          text: '쿠폰',
          path: '/closet/coupon',
        },
        {
          text: '문의내역',
          path: '/closet/cs',
        },
        {
          text: '공지사항',
          path: '/closet/notice',
        },
      ],
    };
  },
  methods: {
    clickMenu(idx) {
      this.$refs.mySwiper.swiper.slideTo(idx, 400);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  .c-menu {
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    &::after {
      content: '';
      display: block;
      border-bottom: 3px solid #dadada;
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
    .closet-link {
      font-size: 16px;
      letter-spacing: -1.1px;
      color: #797979;
      display: block;
      padding-top: 14px;
      padding-bottom: 19px;
      position: relative;
      text-decoration: none;
      user-select: none;
      cursor: pointer;
      padding-left: 1px;
      padding-right: 1px;
      &.active {
        color: #333;
        font-weight: 700;
        letter-spacing: -0.6px;
        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          border-bottom: 3px solid #f45649;
          width: 100%;
        }
      }
    }
    .swiper-container {
      border-top: 1px solid #f3f3f3;
    }
    .swiper-slide {
      width: auto;
    }

  }
  .closet-mobile-menu {
    padding: 0 20px;
    -webkit-overflow-scrolling: touch;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: calc(100%);
      border-bottom: 3px solid #dadada;
      bottom: 0;
      left: 0;
      display: block;
    }
    .closet-menu {
      white-space: nowrap;
      font-size: 0  ;
      transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s;
      overflow: {
        x: auto;
        y: hidden;
      }
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        display: none;
      }
      .close-mobile-slide {

        border-top: 1px solid #f3f3f3;
        .menu {
          padding-top: 11px;
          padding-bottom: 15px;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          letter-spacing: -1px;
          color: #797979;
          margin-left: 20px;
          position: relative;
          &.closet_active {
            font-weight: 700;
            color: #333;
            &::after {
              position: absolute;
              content: '';
              display: block;
              border-bottom: 3px solid #f45649;
              bottom: 0;
              width: 100%;
              z-index: 10;
            }
          }
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  @media (min-width: 767px) {
    .closet-mobile-menu {
      width: 1200px;
      margin: 0 auto;
      padding: 0;
      .close-mobile-slide {
        .menu {
          font-size: 18px;
          letter-spacing: -1.2px;
          padding-top: 25px;
          padding-bottom: 16px;
          margin-left: 27px;
          &.closet_active {
            border-bottom: 3px solid #333;
          }
        }
      }
    }
  }
</style>
