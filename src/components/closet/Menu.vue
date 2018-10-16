<template>
  <div class="c-menu">
    <div v-show="$mq !== 'sm'" class="menu-container">
      <template v-for="(data, idx) in routerJSON">
        <router-link
          :key="idx"
          :to="data.path"
          class="closet-link"
          :class="{'en-menu': data.lang === 'en'}"
          active-class="active">
          {{ data.text }}
        </router-link>
      </template>
    </div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-show="$mq === 'sm'">
      <swiper-slide
        v-for="(data, idx) in routerJSON"
        :key="idx" @click.native="clickMenu(idx)">
        <router-link
          :to="data.path"
          class="closet-link"
          active-class="active"
        >
          {{ data.text }}
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
/*
  *  vue-awesome-swiper 클릭 이벤트 제대로 작동 안할시 참고 할것
  *  https://github.com/surmon-china/vue-awesome-swiper/issues/226
  * */
import { mapGetters } from 'vuex';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'closet-menu',
  watch: {
    loginFaq() {
      this.menuFilter();
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin'
    })
  },
  data() {
    return {
      loginFaq: false,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20
      },
      routerJSON: [
        {
          text: '내일의옷장',
          path: '/closet/tomorrow'
        },
        {
          text: '현재의옷장',
          path: '/closet/current'
        },
        {
          text: '과거의옷장',
          path: '/closet/past'
        },
        {
          text: '스타일정보',
          path: '/closet/style'
        },
        {
          text: '나의정보관리',
          path: '/closet/security'
        },
        {
          text: '구독정보',
          path: '/closet/subscription'
        },

        // {
        //   text: '쿠폰',
        //   path: '/closet/coupon',
        // },
        // {
        //   text: '문의내역',
        //   path: '/closet/cs'
        // },
        {
          text: 'FAQ',
          path: '/closet/faq',
          lang: 'en'
        },
        {
          text: '공지사항',
          path: '/closet/notice'
        }
      ]
    };
  },
  methods: {
    clickMenu(idx) {
      this.$refs.mySwiper.swiper.slideTo(idx - 1, 400);
    },
    menuFilter() {
      if (this.loginFaq) {
        this.routerJSON = _.filter(this.routerJSON, value => {
          return value.text === 'FAQ';
        })
      }
    }
  },
  mounted() {
    this.loginFaq = this.$route.path === '/closet/faq' && !this.isLogin;
  }
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
    @include fontSize(16px);
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
      color: $color-primary;
      font-weight: 700;
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        border-bottom: 3px solid #dc828e;
        width: 100%;
        z-index: 10;
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
@media (min-width: 768px) {
  .c-menu {
    margin: 0 auto;
    width: 708px;
    border-top: 1px solid #f3f3f3;
    padding-left: 0;
    padding-right: 0;
    &::after {
      border-bottom: 1px solid #dadada;
    }
    .closet-link {
      @include fontSize(16px);
      padding-top: 20px;
      padding-bottom: 19px;
      padding-left: 1px;
      padding-right: 1px;
      display: inline-block;
      margin-right: 27px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 1px;
          border-bottom: 4px solid #dc828e;
          width: 100%;
        }
      }
    }
    .menu-container {
    }
    .swiper-slide {
      width: auto;
    }
  }
}

@media (min-width: 1080px) {
  .c-menu {
    width: 1080px;
    .closet-link {
      @include fontSize(18px);
      &.en-menu {
        @include fontSize(19px);
        letter-spacing: -0.4px;
      }
    }
  }
}
</style>
