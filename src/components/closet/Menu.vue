<template>
  <div class="closet-menu mt30">
    <div class="menu" data-id="tomorrow">내일의옷장</div>
    <div class="menu" data-id="current">현재의옷장</div>
    <div class="menu" data-id="past">과거의옷장</div>
    <div class="menu" data-id="style-info">스타일정보</div>
    <div class="menu" data-id="mypage">나의정보관리</div>
    <div class="menu" data-id="payment">지불정보</div>
    <div class="menu" data-id="coupon">쿠폰</div>
    <div class="menu" data-id="cs">문의내역</div>
    <div class="menu" data-id="noti">공지사항</div>
  </div>
</template>

<script>

export default {
  name: 'closet-menu',
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
  },
  mounted() {
    this.menuEvt();

    if (this.$route.path === '/closet' || this.$route.path === '/closet/tomorrow') {
      document.querySelector('div.menu[data-id="tomorrow"]').classList.add('current_active');
    }
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

.current_active, .closet_active {
  font-weight: 600;
  color: #212121;
  border-bottom: 4px solid #212121;
}
</style>
