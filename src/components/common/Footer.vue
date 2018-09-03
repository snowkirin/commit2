<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-inner">
        <div class="footer-layer1">
          <a
            class="txt-tel"
            href="tel:02-6929-3823"
          >
            T. 02-6929-3823
          </a>
          <div class="txt-operation">
            <p>
              평일 오전 10 시 ~ 오후 5시 <br v-show="$mq === 'sm'"/>
              점심 시간 오후 12시30분 ~ 오후 1시 30분 <br v-show="$mq === 'sm'"/>
              고객 센터가 종료된 오후 5시 이후와 일요일,공휴일에는 <router-link class="txt-link" to="/closet/cs">나의 옷장 문의 게시판</router-link>을 이용해 주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-inner">
        <div class="footer-layer2">
          <a href="#" @click.prevent="viewModal('use')">이용 약관</a>
          <a href="#" @click.prevent="viewModal('private')">개인 정보 취급 방침</a>
        </div>
        <div class="footer-layer3">
          <div class="txt-info" v-if="$mq === 'sm'">
            <p>
              법인명(상호) : 주식 회사 어니언 그라운드(<span class="lang-en">Onion Ground</span>)
              대표자(성명) : 김경규, 이시진
              개인정보보호책임자 : 황우진(<a class="lang-en" href="mailto:admin@onionground.com">admin@onionground.com</a>)
              사업자 등록 번호 : 729-81-00963 서울 특별시 테헤란로 78길 14-6 동성빌딩 7층
            </p>
            <p>
              입점 문의 및 마케팅 제휴 : <a class="lang-en" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a>
              기타 문의 : <a class="lang-en" href="mailto:admin@onionground.com">admin@onionground.com</a> &copy; Onion Ground All Right RESERVED
            </p>
          </div>
          <div v-else class="txt-info">
            법인명(상호) : 주식 회사 어니언 그라운드(Onion Ground) 대표자(성명) : 김경규, 이시진 개인정보보호책임자 : 황우진(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>)<br/>
            사업자 등록 번호 : 729-81-00963서울 특별시 테헤란로 78길 14-6 동성빌딩 7층<br/>
            입점 문의 및 마케팅 제휴 : <a class="lang-en" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> 기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a><br/>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Info from "@/info";

export default {
  name: "zuly-footer",
  components: {},
  watch: {
    $route() {}
  },
  data() {
    return {
      personalText: Info.Personal.text, // 개인정보취급방침
      termsText: Info.Terms.text // 서비스 약관
    };
  },
  methods: {
    viewModal(ref) {
      this.$refs[ref].openModal();
    },
    closeModal(ref) {
      this.$refs[ref].closeModal();
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid #e9e9e9;
}
.footer-top {
  padding: 20px 26px;
}
.footer-layer1 {
  .txt-tel {
    @include fontSize(18px, en);
    font-weight: 700;
  }
  .txt-operation {
    @include fontSize(14px);
    margin-top: 5px;
    .txt-link {
    }
  }
}
.footer-bottom {
  background-color: #e8e8e8;
  padding: 20px 26px;
  color: #797979;
}
.footer-layer2 {
  @include fontSize(12px);
  font-weight: 700;
  a {
    &:nth-child(1) {
      padding-right: 10px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        display: block;
        height: 12px;
        border-right: 1px solid #c4c4c4;
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
  @include fontSize(12px);
  margin-top: 10px;
  .txt-info,
  .txt-copyright {
  }
}
@media (min-width: 768px) {
  .footer {
  }
  .footer-top {
  }
  .footer-layer1 {
    .txt-tel {
      @include fontSize(21px, en);
    }
    .txt-operation {
      @include fontSize(15px);
      margin-top: 7px;
      .txt-link {
      }
    }
  }
  .footer-bottom {
    background-color: #fff;
    border-top: 1px solid #e9e9e9;
  }
  .footer-layer2 {
    @include fontSize(14px);
  }
  .footer-layer3 {
  }
  .footer-inner {
    width: 768px;
    margin: 0 auto;
  }
}

  @media (min-width: 1280px) {
    .footer-inner {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
