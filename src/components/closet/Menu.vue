<template>
  <div class="closet-menu mt30">
    <router-link to="/closet/tomorrow">
      <div class="menu" data-id="tomorrow">
        내일의옷장
      </div>
    </router-link>
    <router-link to="/closet/current">
      <div class="menu" data-id="current">
        현재의옷장
      </div>
    </router-link>
    <router-link to="/closet/past">
      <div class="menu" data-id="past">
        과거의옷장
      </div>
    </router-link>
    <div class="menu" data-id="style-info">스타일정보</div>
    <router-link to="/closet/security">
      <div class="menu" data-id="mypage">나의정보관리</div>
    </router-link>
    <div class="menu" data-id="payment">지불정보</div>
    <div class="menu" data-id="coupon">쿠폰</div>
    <router-link to="/closet/cs">
      <div class="menu" data-id="cs">문의내역</div>
    </router-link>
    <router-link to="/closet/notice">
      <div class="menu" data-id="notice">공지사항</div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'closet-menu',
  watch: {
    $route: 'activeMenuEvt',
  },
  methods: {
    hoverEvt(target) {
      const obj = target;

      obj.onmouseover = () => {
        obj.classList.add('closet_active');
      };

      obj.onmouseout = () => {
        obj.classList.remove('closet_active');
      };
    },
    menuEvt() {
      const menu = document.querySelectorAll('.menu');

      for (let i = 0; i < menu.length; i += 1) {
        this.hoverEvt(menu[i]);
      }
    },
    activeMenuEvt() {
      if (document.querySelector('div.current_active')) document.querySelector('div.current_active').classList.remove('current_active');
      if (this.$route.path === '/closet' || this.$route.path === '/closet/tomorrow') {
        document.querySelector('div.menu[data-id="tomorrow"]').classList.add('current_active');
      } else if (this.$route.path === '/closet/security') {
        document.querySelector('div.menu[data-id="mypage"]').classList.add('current_active');
      } else {
        document.querySelector(`div.menu[data-id="${this.$route.path.replace('/closet/', '')}"]`).classList.add('current_active');
      }

      document.querySelector('div.current_active').parentNode.style.color = '#212121';
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
  height: 50px;
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
}

.menu a {
  color: #797979;
  text-decoration: none;
}

.current_active, .closet_active {
  font-weight: 600;
  color: #212121;
  border-bottom: 4px solid #212121;
}
</style>
