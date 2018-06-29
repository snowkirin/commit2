<template>
  <footer class="footer">
    <div :class="[$route.path === '/' ? 'main-footer-area' : 'footer-area']">
      <div class="help">
        <p
          class="txt-main-point"
          :style="pathCheck">
          Help
        </p>
        <p class="txt-tel">
          <a href="tel:02-6929-3821">02-6929-3821</a>
        </p>
        <p class="txt-operation">
          평일 오전 10 시 ~ 오후 5시<br v-show="$mq === 'sm'">
          &nbsp;/ 점심 시간 오후 12시30분 ~ 오후 1시 30분<br/>
          고객 센터가 종료된 오후 5시 이후와 일요일,<br v-show="$mq === 'sm'">
          공휴일에는
          <router-link to="/closet/cs" class="txt-link">나의 옷장 문의 게시판</router-link>을
          이용해 주세요.
        </p>
      </div>
      <div class="line line__thin"></div>
      <div class="info-policy">
        <ul class="menu-policy">
          <li><a href="#">이용 약관</a></li>
          <li><a href="#">개인 정보 취급 방침</a></li>
        </ul>
        <div class="information">
          <p class="txt-info" v-if="$mq === 'sm'">
            법인명(상호) : 주식 회사 어니언 그라운드(<span class="en-font">Onion Ground</span>) |
            대표자(성명) : 김경규, 이시진 |
            개인정보보호책임자 : 김용주(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>) <br v-show="$mq === 'lg'">
            사업자 등록 번호 : 729-81-00963 |
            서울 특별시 테헤란로 78길 14-6 동성빌딩 7층 <br v-show="$mq === 'lg'">
            입점 문의 및 마케팅 제휴 : <a class="en-font" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> |
            기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>
          </p>
          <p v-else class="txt-info">
            법인명(상호) : 주식 회사 어니언 그라운드(Onion Ground) 대표자(성명) : 김경규, 이시진개인정보보호책임자 : 김용주(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>)<br/>
            사업자 등록 번호 : 729-81-00963서울 특별시 테헤란로 78길 14-6 동성빌딩 7층<br/>
            입점 문의 및 마케팅 제휴 : <a class="en-font" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> 기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a><br/>
          </p>
          <p class="txt-copyright">&copy; Onion Ground All Right RESERVED</p>
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
      const target = document.querySelector('footer .txt-main-point');
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
  computed: {
    pathCheck() {
      if (this.$route.path === '/') {
        return {
          color: '#f45649',
        };
      }
      return {
        color: '#333',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  padding: 30px 20px 78px;
}

.help {
  padding-bottom: 16px;
  .txt-tel {
    font-size: 26px;
    font-weight: 700;
    font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
  }
  .txt-operation {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.4px;
    margin-top: 15px;
    white-space: nowrap;
  }
  .txt-link {
    color: #566b9c;
  }
}
.line {
  position: absolute;
  width: calc(100% - 20px);
}
.info-policy {
  padding-top: 21px;
  letter-spacing: -0.4px;
  .menu-policy {
    font-size: 0;
    li {
      font-size: 14px;
      font-weight: 700;
      display: inline-block;
      position: relative;
      &:nth-child(1){
        padding-right: 10px;
        &:after {
          position: absolute;
          content: '';
          display: block;
          height: 12px;
          border-right: 1px solid #212121;
          right: 0;
          top: 2px;
        }
      }
      &:nth-child(2){
        padding-left: 11px;
      }
    }
  }
  .information {
    font-size: 12px;
    line-height: 20px;
    color: #797979;
    margin-top: 13px;
  }
}
  @media (min-width: 1279px) {
    .footer {
      width: 1200px;
      margin: 0 auto;
      padding: 60px 0px;
    }
    .help {
      .txt-main-point {
        font-size: 16px;
        margin-bottom: 6px;
      }
      .txt-tel {
        font-size: 28px;
        line-height: 25px;
        letter-spacing: 0.4px;
      }
      .txt-operation {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -1px;
        margin-top: 12px;
      }
    }
    .line {
      position: relative;
      width: 100%;
      margin-top: 11px;
      margin-bottom: 6px;
    }
    .info-policy {
      padding-left: 4px;
      .menu-policy {
        li {
          font-size: 15px;
          line-height: 21px;
          letter-spacing: -0.6px;
          &:nth-child(1){
            padding-right: 11px;
            &::after {
              border-right: 2px solid #212121;
              height: 18px;
              top: 3px;
            }
          }
          &:nth-child(2){
            padding-left: 9px;
          }
        }
      }
      .information {
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.8px;
        margin-top: 15px;
        .en-font {
          letter-spacing: -0.8px !important;
        }
      }
    }
  }
</style>
