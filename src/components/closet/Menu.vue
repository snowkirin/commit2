<template>
  <div class="closet-mobile-menu">
    <div class="closet-menu" style="margin-top:30px">
      <div id="tomorrow" class="menu" data-id="tomorrow" :class="{ 'closet_active' : activeMenuName === 'tomorrow' }" @click="menuClick('/closet/tomorrow')">내일의옷장</div>
      <div id="current" class="menu" data-id="current" :class="{ 'closet_active' : activeMenuName === 'current' }" @click="menuClick('/closet/current')">현재의옷장</div>
      <div id="past" class="menu" data-id="past" :class="{ 'closet_active' : activeMenuName === 'past' }" @click="menuClick('/closet/past')">과거의옷장</div>
      <div id="style" class="menu" data-id="style" :class="{ 'closet_active' : activeMenuName === 'style' }" @click="menuClick('/closet/style')">스타일정보</div>
      <div id="mypage" class="menu" data-id="mypage" :class="{ 'closet_active' : activeMenuName === 'mypage' }" @click="menuClick('/closet/security')">나의정보관리</div>
      <!-- div class="menu" data-id="payment">지불정보</div -->
      <div id="coupon" class="menu" data-id="coupon" :class="{ 'closet_active' : activeMenuName === 'coupon' }" @click="menuClick('/closet/coupon')">쿠폰</div>
      <div id="cs" class="menu" data-id="cs" :class="{ 'closet_active' : activeMenuName === 'cs' }" @click="menuClick('/closet/cs')">문의내역</div>
      <div id="notice" class="menu" data-id="notice" :class="{ 'closet_active' : activeMenuName === 'notice' }" @click="menuClick('/closet/notice')">공지사항</div>
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
    menuClick(menu) {
      this.$router.push({ path: menu });
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
      if (this.$route.path === '/closet' || this.$route.path === '/closet/tomorrow') {
        this.activeMenuName = 'tomorrow';
      } else if (this.$route.path === '/closet/security') {
        this.activeMenuName = 'mypage';
      } else {
        this.activeMenuName = this.$route.path.replace('/closet/', '');
      }
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
  height: 45px;
  border-bottom: 1px solid #b9b9b9;
}

.menu {
  display: inline-block;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  text-align: left;
  color: #797979;
  margin-right: 20px;
  height: 91%;
  cursor: pointer;
  line-height: 1;
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
    overflow-x: auto !important;
    overflow-y: hidden !important;
    transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s !important;
  }

  .closet-menu::-webkit-scrollbar {
    -webkit-appearance: none !important;
    display: none !important;
  }

  .menu {
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -1px;
    text-align: left;
    color: #797979;
    margin-right: 10px;
    height: 91%;
    cursor: pointer;
    line-height: 2;
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
