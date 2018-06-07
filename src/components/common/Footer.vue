<template>
  <footer class="footer">
    <div :class="[$route.path === '/' ? 'main-footer-area' : 'footer-area']">
      <div class="help">
        <p class="main-point-text en-font">Help</p>
        <p class="en-font txt-tel">
          <a href="tel:02-6929-3821">02-6929-3821</a>
        </p>
        <p class="main-cs-noti mt5">
          평일 오전 10 시 ~ 오후 5시<br/>
          / 점심 시간 오후 12시30분 ~ 오후 1시 30분<br/>
          고객 센터가 종료된 오후 5시 이후와 일요일,<br/>
          공휴일에는
          <router-link to="/closet/cs" class="txt-link">나의 옷장 문의 게시판</router-link>을
          이용해 주세요.
        </p>
      </div>
      <hr class="zuly-thin-line"/>
      <div class="info-policy">
        <ul class="menu-policy">
          <li><a href="#">이용 약관</a></li>
          <li><a href="#">개인 정보 취급 방침</a></li>
        </ul>
        <div class="information">
          <p class="txt-info">
            법인명(상호) : 주식 회사 어니언 그라운드(<span class="en-font">Onion Ground</span>) |
            대표자(성명) : 김경규, 이시진 |
            개인정보보호책임자 : 김용주(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>)
            사업자 등록 번호 : 729-81-00963 |
            서울 특별시 테헤란로 78길 14-6 동성빌딩 7층
            입점 문의 및 마케팅 제휴 : <a class="en-font" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> |
            기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>
          </p>
          <p class="en-font txt-copyright">&copy; Onion Ground All Right RESERVED</p>
        </div>
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

<style scoped lang="scss">
.footer {
  /*padding: 20px;*/
  padding: 6.25vw;
}
.txt-tel {
  /*font-size: 26px;*/
  font-size: 8.125vw;
  font-weight: 700;
}
.main-cs-noti {
  /*font-size: 14px;*/
  font-size: 4.375vw;
  /*line-height: 22px;*/
  line-height: 6.875vw;
  letter-spacing: -.6px;
  /*padding: 20px 0;*/
  padding: 6.25vw 0;
}
.txt-link {
  color: #566b9c;
}

.info-policy {
  padding: 6.25vw 0;
  letter-spacing: -0.4px;
  .menu-policy {
    font-weight: 700;
    /*font-size: 14px;*/
    font-size: 4.375vw;
    margin-bottom: 13px;
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      &:not(:last-child){
        position: relative;
        /*margin-right: 25px;*/
        margin-right: 7.8125vw;
        &:after {
          content: '';
          display: inline-block;
          height: 100%;
          width: 1px;
          background-color: #212121;
          position: absolute;
          //right: -15px;
          right: -4.6875vw;
        }
      }
    }
    a {
    }
  }
  .information {
    /*font-size: 12px;*/
    font-size: 3.75vw;
    /*line-height: 20px;*/
    line-height: 6.25vw;
    color: #797979;
  }
}


</style>
