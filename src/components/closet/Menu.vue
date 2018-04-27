<template>
  <div class="closet-mobile-menu">
    <div class="closet-menu mt30">
      <router-link to="/closet/tomorrow">
        <div class="menu" data-id="tomorrow"
          :class="[{ 'closet_active' : activeMenuName === 'tomorrow' }, { 'closet_active' : hoverMenuName === 'tomorrow' }]"
          @mouseover="mouseOver('tomorrow')" @mouseleave="mouseOut">
          내일의옷장
        </div>
      </router-link>
      <router-link to="/closet/current">
        <div class="menu" data-id="current"
          :class="[{ 'closet_active' : activeMenuName === 'current' }, { 'closet_active' : hoverMenuName === 'current' }]"
          @mouseover="mouseOver('current')" @mouseleave="mouseOut">
          현재의옷장
        </div>
      </router-link>
      <router-link to="/closet/past">
        <div class="menu" data-id="past"
          :class="[{ 'closet_active' : activeMenuName === 'past' }, { 'closet_active' : hoverMenuName === 'past' }]"
          @mouseover="mouseOver('past')" @mouseleave="mouseOut">
          과거의옷장
        </div>
      </router-link>
      <router-link to="/closet/style">
        <div class="menu" data-id="style"
          :class="[{ 'closet_active' : activeMenuName === 'style' }, { 'closet_active' : hoverMenuName === 'style' }]"
          @mouseover="mouseOver('style')" @mouseleave="mouseOut">
          스타일정보</div>
      </router-link>
      <router-link to="/closet/security">
        <div class="menu" data-id="mypage"
          :class="[{ 'closet_active' : activeMenuName === 'mypage' }, { 'closet_active' : hoverMenuName === 'mypage' }]"
          @mouseover="mouseOver('mypage')" @mouseleave="mouseOut">
          나의정보관리</div>
      </router-link>
      <!-- div class="menu" data-id="payment">지불정보</div -->
      <router-link to="/closet/coupon">
        <div class="menu" data-id="coupon"
          :class="[{ 'closet_active' : activeMenuName === 'coupon' }, { 'closet_active' : hoverMenuName === 'coupon' }]"
          @mouseover="mouseOver('coupon')" @mouseleave="mouseOut">
          쿠폰</div>
      </router-link>
      <router-link to="/closet/cs">
        <div class="menu" data-id="cs"
          :class="[{ 'closet_active' : activeMenuName === 'cs' }, { 'closet_active' : hoverMenuName === 'cs' }]"
          @mouseover="mouseOver('cs')" @mouseleave="mouseOut">
          문의내역</div>
      </router-link>
      <router-link to="/closet/notice">
        <div class="menu" data-id="notice"
          :class="[{ 'closet_active' : activeMenuName === 'notice' }, { 'closet_active' : hoverMenuName === 'notice' }]"
          @mouseover="mouseOver('notice')" @mouseleave="mouseOut">
          공지사항</div>
      </router-link>
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
      hoverMenuName: '',
    };
  },
  methods: {
    menuClick(menuName) {
      this.activeMenuName = menuName;
    },
    mouseOver(menuName) {
      this.hoverMenuName = menuName;
    },
    mouseOut() {
      this.hoverMenuName = '';
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

.closet_active {
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
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
