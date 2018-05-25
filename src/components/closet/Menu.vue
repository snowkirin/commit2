<template>
  <div class="closet-mobile-menu">
    <div class="closet-menu" @touchend="touchEnd">
      <div class="close-mobile-slide">
        <div id="tomorrow" class="menu" data-id="tomorrow" :class="{ 'closet_active' : activeMenuName === 'tomorrow' }" @click="menuClick('/closet/tomorrow', 0)">내일의옷장</div>
        <div id="current" class="menu" data-id="current" :class="{ 'closet_active' : activeMenuName === 'current' }" @click="menuClick('/closet/current', 1)">현재의옷장</div>
        <div id="past" class="menu" data-id="past" :class="{ 'closet_active' : activeMenuName === 'past' }" @click="menuClick('/closet/past', 2)">과거의옷장</div>
        <div id="style" class="menu" data-id="style" :class="{ 'closet_active' : activeMenuName === 'style' }" @click="menuClick('/closet/style', 3)">스타일정보</div>
        <div id="mypage" class="menu" data-id="mypage" :class="{ 'closet_active' : activeMenuName === 'mypage' }" @click="menuClick('/closet/security', 4)">나의정보관리</div>
        <!-- div class="menu" data-id="payment">지불정보</div -->
        <div id="coupon" class="menu" data-id="coupon" :class="{ 'closet_active' : activeMenuName === 'coupon' }" @click="menuClick('/closet/coupon', 5)">쿠폰</div>
        <div id="cs" class="menu" data-id="cs" :class="{ 'closet_active' : activeMenuName === 'cs' }" @click="menuClick('/closet/cs', 6)">문의내역</div>
        <div id="notice" class="menu" data-id="notice" :class="{ 'closet_active' : activeMenuName === 'notice' }" @click="menuClick('/closet/notice', 7)">공지사항</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'closet-menu',
  watch: {
    $route: 'activeMenuEvt',
  },
  data() {
    return {
      activeMenuName: '',
    };
  },
  methods: {
    menuClick(menu, idx) {
      this.$router.push({ path: menu });
      this.activeMenuPosition(idx);
    },
    activeMenuPosition(idx) {
      if (!this.$common.deviceCheck()) return;
      let XPosition = 0;
      if (idx < 3) {
        XPosition = 0;
      } else if (idx === 3) {
        XPosition = -140;
      } else if (idx === 4) {
        XPosition = -230;
      } else {
        XPosition = -284;
      }
      document.querySelector('.close-mobile-slide').style.transform = `translate3d(${XPosition}px, 0px, 0px)`;
    },
    touchMove() {
      // document.querySelector('.close-mobile-slide').style.transform = `translate3d(${e.touches[0].pageX}px, 0px, 0px)`;
      document.querySelector('.close-mobile-slide').style.transform = 'translate3d(0px, 0px, 0px)';
    },
    touchEnd(e) {
      let XPosition = e.changedTouches[0].pageX;
      if (XPosition < -284) {
        XPosition = -284;
      } else if (XPosition > 284) {
        XPosition = 0;
      }
      document.querySelector('.close-mobile-slide').style.transform = `translate3d(${XPosition}px, 0px, 0px)`;
    },
    hoverEvt(target) {
      const obj = target;
      if (!this.$common.deviceCheck()) {
        obj.onmouseover = () => {
          obj.classList.add('closet_active');
        };
        obj.onmouseout = () => {
          if (obj.id !== this.activeMenuName) {
            obj.classList.remove('closet_active');
          }
        };
      } else {
        obj.onclick = () => {
          this.activeMenuEvt();
        };
      }
    },
    menuEvt() {
      const menu = document.querySelectorAll('.menu');

      for (let i = 0; i < menu.length; i += 1) {
        this.hoverEvt(menu[i]);
      }
    },
    activeMenuEvt() {
      let idx = 0;
      if (this.$route.path === '/closet' || this.$route.path === '/closet/tomorrow') {
        this.activeMenuName = 'tomorrow';
        idx = 0;
      } else if (this.$route.path === '/closet/current') {
        this.activeMenuName = 'current';
        idx = 1;
      } else if (this.$route.path === '/closet/past') {
        this.activeMenuName = 'past';
        idx = 2;
      } else if (this.$route.path === '/closet/style') {
        this.activeMenuName = 'style';
        idx = 3;
      } else if (this.$route.path === '/closet/security') {
        this.activeMenuName = 'mypage';
        idx = 4;
      } else {
        idx = 5;
        this.activeMenuName = this.$route.path.replace('/closet/', '');
      }
      this.activeMenuPosition(idx);
    },
  },
  mounted() {
    this.menuEvt();
    this.activeMenuEvt();
  },
};
</script>

<style scoped>
.closet-menu {
  margin-top:30px;
  height: 45px;
  border-bottom: 1px solid #b9b9b9;
}

.menu {
  display: inline-block;
  font-size: 19px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  text-align: left;
  color: #797979;
  margin-right: 20px;
  height: 42px;
  cursor: pointer;
}

.menu a {
  color: #797979;
  text-decoration: none;
}

.menu.closet_active {
  font-weight: 600;
  color: #333333;
  border-bottom: 4px solid #333333;
}

@media screen and (max-width: 1024px) {
  .closet-mobile-menu {
    position: relative;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
  }

  .closet-menu {
    white-space: nowrap !important;
    margin-top: 20px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s !important;
  }

  .closet-menu::-webkit-scrollbar {
    -webkit-appearance: none !important;
    display: none !important;
  }

  .close-mobile-slide {
    width: 100%;
    visibility: visible;
    transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s !important;
  }

  .menu {
    display: inline-block;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -1px;
    text-align: left;
    color: #797979;
    margin-right: 10px;
    height: 38px;
    cursor: pointer;
    line-height: 1;
  }

  .menu a {
    color: #797979;
    text-decoration: none;
  }

  .closet_active {
    font-weight: 600 !important;
    color: #333333 !important;
    border-bottom: 4px solid #333333 !important;
  }
}
</style>
