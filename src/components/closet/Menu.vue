<template>
  <div class="closet-mobile-menu">
    <div
      class="closet-menu"
      @touchstart="helloStart"
      @touchmove="helloMove"
      @touchend="helloEnd">
      <div
        class="close-mobile-slide">
        <router-link
          v-for="(data, idx) in routerJSON"
          :key="idx"
          active-class="closet_active"
          class="menu"
          :to="data.path">
          {{data.text}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'closet-menu',
  watch: {
  },
  data() {
    return {
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
    helloStart() {
      console.log('Start');
    },
    helloMove() {
      console.log('MOVE');
    },
    helloEnd() {
      console.log('END');
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
  .closet-mobile-menu {
    padding: 0 20px;
    -webkit-overflow-scrolling: touch;
    .closet-menu {
      border-bottom: 1px solid #b9b9b9;
      white-space: nowrap;
      font-size: 0;
      transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s;
      overflow: {
        x: auto;
        y: hidden;
      }
    }
    .closet-menu::-webkit-scrollbar {
      -webkit-appearance: none;
      display: none;
    }
  }
  .close-mobile-slide {
    .menu {
      text-decoration: none;
      padding-top: 19px;
      padding-bottom: 15px;
      display: inline-block;
      font-size: 16px;
      letter-spacing: -1px;
      color: #797979;
      margin-left: 20px;
      &.closet_active {
        font-weight: 700;
        color: #333;
        border-bottom: 3px solid #333;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  @media (min-width: 1279px) {
    .closet-mobile-menu {
      width: 1200px;
      margin: 0 auto;
      padding: 0;
    }
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
</style>
