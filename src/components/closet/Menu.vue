<template>
  <div class="closet-mobile-menu">
    <div class="closet-menu mt30">
      <div id="tomorrow" class="menu" data-id="tomorrow" :class="{ 'closet_active' : activeMenuName === 'tomorrow' }" @click="menuClick()">
        <router-link to="/closet/tomorrow" :class="{ 'router-active' : activeMenuName === 'tomorrow' }">
          내일의옷장
        </router-link>
      </div>
      <div id="current" class="menu" data-id="current" :class="{ 'closet_active' : activeMenuName === 'current' }" @click="menuClick()">
        <router-link to="/closet/current">
          현재의옷장
        </router-link>
      </div>
      <div id="past" class="menu" data-id="past" :class="{ 'closet_active' : activeMenuName === 'past' }">
        <router-link to="/closet/past">
          과거의옷장
        </router-link>
      </div>
      <div id="style" class="menu" data-id="style" :class="{ 'closet_active' : activeMenuName === 'style' }">
        <router-link to="/closet/style">
          스타일정보
        </router-link>
      </div>
      <div id="mypage" class="menu" data-id="mypage" :class="{ 'closet_active' : activeMenuName === 'mypage' }">
        <router-link to="/closet/security">
          나의정보관리
        </router-link>
      </div>
      <!-- div class="menu" data-id="payment">지불정보</div -->
      <div id="coupon" class="menu" data-id="coupon" :class="{ 'closet_active' : activeMenuName === 'coupon' }">
        <router-link to="/closet/coupon">
          쿠폰
        </router-link>
      </div>
      <div id="cs" class="menu" data-id="cs" :class="{ 'closet_active' : activeMenuName === 'cs' }">
        <router-link to="/closet/cs">
          문의내역
        </router-link>
      </div>
      <div id="notice" class="menu" data-id="notice" :class="{ 'closet_active' : activeMenuName === 'notice' }">
        <router-link to="/closet/notice">
          공지사항
        </router-link>
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
  font-size: 20px;
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
  color: #212121;
  border-bottom: 4px solid #212121;
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
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -1px;
    text-align: left;
    color: #797979;
    margin-right: 10px;
    height: 91%;
    cursor: pointer;
    line-height: 1;
  }

  .menu a {
    color: #797979;
    text-decoration: none;
  }

  .closet_active {
    font-weight: 600 !important;
    color: #212121 !important;
    border-bottom: 4px solid #212121 !important;
  }
}
</style>
