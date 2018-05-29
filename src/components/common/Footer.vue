<template>
  <footer class="mt70">
    <div :class="[$route.path === '/' ? 'main-footer-area' : 'footer-area']">
      <div class="main-point-text en-font">
        HELP
      </div>
      <div class="main-cs-tel en-font">
        02-6929-3821
      </div>
      <div class="main-cs-noti mt5">
        평일 오전 10 시 ~ 오후 5시 / 점심 시간 오후 12시30분 ~ 오후 1시 30분<br/>
        고객 센터가 종료된 오후 5시 이후와 일요일, 공휴일에는 <router-link to="/closet/cs">나의 옷장 문의 게시판</router-link>을 이용해 주세요.
      </div>
      <div class="Line mt30"></div>
      <div class="footer-info mt30">
        <span class="title">이용 약관<div class="footer-line"></div>개인 정보 취급 방침</span>
      </div>
      <div class="footer-info mt10">
        <span class="text">
          법인명(상호) : 주식 회사 어니언 그라운드(<span class="en-font">Onion Ground</span>)<div class="footer-line footer-line-grey"></div>
          대표자(성명) : 김경규, 이시진<div class="footer-line footer-line-grey"></div>개인정보보호책임자 : 김용주(<span class="en-font">admin@onionground.com</span>)<br/>
          사업자 등록 번호 : 729-81-00963<div class="footer-line footer-line-grey"></div>서울 특별시 테헤란로 78길 14-6 동성빌딩 7층<br/>
          입점 문의 및 마케팅 제휴 : <span class="en-font">sjsj00@onionground.com</span><div class="footer-line footer-line-grey"></div>기타 문의 : <span class="en-font">admin@onionground.com</span><br/>
          <span class="en-font">© Onion Ground All Right RESERVED</span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'zuly-footer',
  methods: {
    pointTextEvt() {
      const target = document.querySelector('footer .main-point-text');
      if (this.$route.path !== '/') target.classList.add('tc-black');
      else target.classList.remove('tc-black');
    },
  },
  watch: {
    $route() {
      this.pointTextEvt();
    },
  },
  mounted() {
    this.pointTextEvt();
  },
};
</script>

<style scoped>

.tc-black {
  color: #333333;
}

footer {
  width: 100%;
  background-color: #FFFFFF;
}

.footer-area {
  padding: 80px 50px 50px 50px;
}

.main-footer-area {
  padding: 0px 50px 50px 50px;
}

.footer-line {
  display: inline-block;
  margin: 0 10px;
}

.footer-line-grey {
  color: #797979;
}

.footer-line::after {
  content: "\007C";
  font-size: 12px;
}

@media screen and (max-width: 486px) {
  .footer-area {
    padding: 30px 30px 0px 30px;
  }

  .main-footer-area {
    padding: 30px 30px 0px 30px;
  }
}

.main-cs-tel {
  font-weight: 600;
  line-height: 1.33;
  text-align: left;
}

.main-cs-noti {
  line-height: 1.56;
}
</style>
