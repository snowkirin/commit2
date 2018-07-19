<template>
  <footer class="footer">
    <div>
      <div :class="[$route.path === '/' ? 'main-footer-area' : 'footer-area']">
        <div class="footer-layer1">
          <div>
            <p
              class="txt-main-point"
              :style="pathCheck">
              Help
            </p>
            <a
              class="txt-tel"
              href="tel:02-6929-3823">
              02-6929-3823
            </a>
            <p class="txt-operation">
              평일 오전 10 시 ~ 오후 5시
              <br v-show="$mq === 'sm'">
              / 점심 시간 오후 12시30분 ~ 오후 1시 30분
              <br/>
              고객 센터가 종료된 오후 5시 이후와 일요일,
              <br v-show="$mq === 'sm'">
              공휴일에는
              <router-link
                class="txt-link"
                to="/closet/cs">나의 옷장 문의 게시판</router-link>을 이용해 주세요.
            </p>
          </div>

        </div>
        <div class="footer-line"></div>
        <div class="footer-layer2">
          <a href="#" @click.prevent="viewModal('use')">이용 약관</a>
          <a href="#" @click.prevent="viewModal('private')">개인 정보 취급 방침</a>
        </div>
        <div class="footer-layer3">
          <p class="txt-info" v-if="$mq === 'sm'">
            법인명(상호) : 주식 회사 어니언 그라운드(<span class="en-font">Onion Ground</span>) |
            대표자(성명) : 김경규, 이시진 |
            개인정보보호책임자 : 황우진(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>) <br v-show="$mq === 'lg'">
            사업자 등록 번호 : 729-81-00963 |
            서울 특별시 테헤란로 78길 14-6 동성빌딩 7층 <br v-show="$mq === 'lg'">
            입점 문의 및 마케팅 제휴 : <a class="en-font" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> |
            기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>
          </p>
          <p v-else class="txt-info">
            법인명(상호) : 주식 회사 어니언 그라운드(Onion Ground) 대표자(성명) : 김경규, 이시진 개인정보보호책임자 : 황우진(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>)<br/>
            사업자 등록 번호 : 729-81-00963서울 특별시 테헤란로 78길 14-6 동성빌딩 7층<br/>
            입점 문의 및 마케팅 제휴 : <a class="en-font" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> 기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a><br/>
          </p>
          <p class="txt-copyright">&copy; Onion Ground All Right RESERVED</p>
        </div>
      </div>
    </div>
    <signup-modal ref="private" dataId="private" title="개인 정보 관리 지침" :content="personalText"></signup-modal>
    <signup-modal ref="use" dataId="use" title="서비스 약관" :content="termsText"></signup-modal>
  </footer>
</template>

<script>
import SignupModal from '@/components/common/SignupModal';
import Info from '@/info';

export default {
  name: 'zuly-footer',
  components: {
    SignupModal,
  },
  watch: {
    $route() {
      this.pointTextEvt();
    },
  },
  data() {
    return {
      personalText: Info.Personal.text, // 개인정보취급방침
      termsText: Info.Terms.text, // 서비스 약관
    };
  },
  computed: {
    pathCheck() {
      if (this.$route.path === '/') {
        return {
          color: '#f16458',
        };
      }
      return {
        color: '#333',
      };
    },
  },
  methods: {
    pointTextEvt() {
      const target = document.querySelector('footer .txt-main-point');
      if (this.$route.path !== '/') {
        target.classList.add('tc-black');
      } else {
        target.classList.remove('tc-black');
      }
    },
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
    },
  },
  mounted() {
    this.pointTextEvt();
  },
};
</script>

<style scoped lang="scss">
  .footer {
    padding: {
      top: 30px;
      right: 20px;
      bottom: 78px;
      left: 20px;
    }
  .footer-layer1 {
    padding-bottom: 16px;
    .txt-tel {
      font: {
        size: 26px;
        weight: 700;
        family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif
      }
      letter-spacing: 0.4px;
    }
    .txt-operation {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.8px;
      margin-top: 12px;
      white-space: nowrap;
      .txt-link {
        color: #566b9c;
        font-size: 14px;
      }
    }
  }
  .footer-layer2 {
    font-size: 0;
    margin-top: 16px;
    a {
      font: {
        size: 14px;
        weight: 700;
      }
      position: relative;
      letter-spacing: -1px;
      &:nth-child(1) {
        padding-right: 10px;
        &::after {
          content: '';
          position: absolute;
          display: block;
          height: 12px;
          border-right: 1px solid #212121;
          right: 0;
          top: 5px;
        }
      }
      &:nth-child(2) {
        padding-left: 11px;
      }
    }
  }
  .footer-layer3 {
    margin-top: 10px;
    .txt-info,
    .txt-copyright {
      font-size: 12px;
      line-height: 20px;
      letter-spacing: -0.8px;
      color: #797979;
    }
  }
  .footer-line {
    width: calc(100% - 20px);
    height: 1px;
    background-color: #e9e9e9;
    position: absolute;
  }
}
  @media (min-width: 768px) {
    .footer {
      width: 1200px;
      margin: 0 auto;
      padding: {
        top: 60px;
        right: 0px;
        bottom: 125px;
        left: 0px;
      }
      .footer-layer1 {
        position: relative;
        padding-bottom: 26px;
        &::after {
          width: 100%;
        }

        .txt-tel {
          font-size: 28px;
          display: block;
          margin-top: 12px;
        }
        .txt-operation {
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.5px;
          .txt-link {
            font-size: 16px;
            letter-spacing: -0.6px;
          }
        }
      }
      .footer-layer2 {
        font-size: 0;
        margin-top: 32px;
        a {
          font: {
            size: 15px;
          }
          position: relative;
          letter-spacing: -0.8px;
          &:nth-child(1) {
            padding-right: 14px;
            &::after {
              height: 15px;
              right: 0;
              top: 4px;
            }
          }
          &:nth-child(2) {
            padding-left: 12px;
          }
        }
      }
      .footer-layer3 {
        margin-top: 15px;
        .txt-info,
        .txt-copyright {
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.6px;
        }
        .txt-copyright {
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        }
      }

      .footer-line {
        width: 100%;
        left: 0;
      }
    }
  }
</style>
