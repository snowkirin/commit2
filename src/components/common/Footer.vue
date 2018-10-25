<!-- TODO: 스타일 정리할 것! Update: 2018-09-20-->
<template>
  <footer
    class="footer"
    :class="CurrentRoute"
  >
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
            <p class="only-mobile">
              평일 오전 10시 ~ 오후 5시<br/>
              점심 시간 오후 12시 30분 ~ 오후 1시 30분
            </p>
            <p class="not-mobile">
              평일 오전 10시 ~ 오후 5시 ( 점심 시간 오후 12시 30분 ~ 오후 1시 30분 )
            </p>
          </div>
          <div class="tok-wrap">
            <a href="http://pf.kakao.com/_mlJiC/chat" target="_blank" class="link-tok">
              <img src="~@/assets/img/main/btn_question.png" alt="톡문의">
            </a>
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
          <div class="txt-info only-mobile">
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
          <div class="txt-info not-mobile">
            법인명(상호) : 주식 회사 어니언 그라운드(Onion Ground) 대표자(성명) : 김경규, 이시진 개인정보보호책임자 : 황우진(<a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a>)<br/>
            사업자 등록 번호 : 729-81-00963서울 특별시 테헤란로 78길 14-6 동성빌딩 7층<br/>
            입점 문의 및 마케팅 제휴 : <a class="lang-en" href="mailto:sjsj00@onionground.com">sjsj00@onionground.com</a> 기타 문의 : <a class="en-font" href="mailto:admin@onionground.com">admin@onionground.com</a> &copy; Onion Ground All Right RESERVED
          </div>
        </div>
      </div>
    </div>
    <sweet-modal
      ref="private"
      :enable-mobile-fullscreen="false"
      :hide-close-button="true"
    >
      <CommonModal
        modalTitle="개인 정보 관리 지침"
        :modalContent="personalText"
        modalContentType="html"
        :modalCustomCloseFunc="closeModal"
      />
    </sweet-modal>
    <sweet-modal
      ref="use"
      :enable-mobile-fullscreen="false"
      :hide-close-button="true"
    >
      <CommonModal
        modalTitle="서비스 약관"
        :modalContent="termsText"
        modalContentType="html"
        :modalCustomCloseFunc="closeModal"
      />
    </sweet-modal>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import Info from '@/info';
import CommonModal from '@/components/common/modal/CommonModal';

export default {
  name: 'zuly-footer',
  components: {
    CommonModal
  },
  watch: {
    CurrentRoute() {}
  },
  data() {
    return {
      currentPath: '',
      personalText: Info.Personal.text, // 개인정보취급방침
      termsText: Info.Terms.text // 서비스 약관
    };
  },
  computed: {
    ...mapGetters({
      CurrentRoute: 'common/CurrentRoute'
    })
  },
  methods: {
    viewModal(param) {
      if (param === 'private') {
        this.$refs.private.open();
      } else if (param === 'use') {
        this.$refs.use.open();
      }
    },
    closeModal() {
      this.$refs.private.close();
      this.$refs.use.close();
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.not-mobile {
  display: none;
}
.footer {
  border-top: 1px solid #e9e9e9;
  &.main {
    padding-bottom: 56px;
  }
  &.join {
  }
}
.footer-top {
  padding: 20px 26px;
}
.footer-layer1 {
  position: relative;
  .txt-tel {
    @include fontSize(18px, en);
    font-weight: 700;
  }
  .txt-operation {
    @include fontSize(14px);
    margin-top: 5px;
  }
  .tok-wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    .link-tok {
      display: block;
      height: 38px;
      img {
        height: 100%;
      }
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
        content: '';
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
  margin-top: 5px;
  .txt-info,
  .txt-copyright {
  }
}


@media (min-width: 768px) {
  .only-mobile {
    display: none;
  }
  .not-mobile {
    display: block;
  }
  .footer {
    border-top: 0;
    &.main {
      padding-bottom: 0;
      .footer-inner {
        width: 100%;
      }
    }
    .footer-inner {
      width: 708px;
      margin: 0 auto;
    }
  }
  .footer-top {
    padding-top: 20px;
    padding-right: 45px;
    padding-bottom: 20px;
    padding-left: 45px;
  }
  .footer-layer1 {
    .txt-tel {
      @include fontSize(18px, en);
    }
    .txt-operation {
      @include fontSize(15px);
      margin-top: 7px;
    }
    .tok-wrap {
      .link-tok {
        height: 44px;
      }
    }
  }
  .footer-bottom {
    background-color: #fff;
    border-top: 1px solid #e9e9e9;
    padding-top: 20px;
    padding-right: 45px;
    padding-bottom: 37px;
    padding-left: 45px;
  }
  .footer-layer2 {
    @include fontSize(14px);
  }
  .footer-layer3 {
  }

}

@media (min-width: 1080px) {
  .footer {
    .footer-inner {
      width: 1080px;
    }
    &.main {
      .footer-inner {
        width: 1080px;
      }
    }
  }
  .footer-layer1 {
    .txt-tel {
      @include fontSize(21px, en);
    }
  }
  .footer-top {
    padding-right: 0;
    padding-left: 0;
  }
  .footer-bottom {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 31px;
  }
}
</style>
