<template>
	<div class="contents" id="mainFirst">
		<div class="content">
			<div
				class="banner-wrap"
				v-if="isMainBanner"
			>
				<div class="center-align">
					<p>지금 가입하시면 <span class="txt-free">첫달 무료 ♥</span></p>
				</div>
				<a href="#" class="btn-close" @click="clickBannerHide">
					<CloseIconSVG/>
				</a>
			</div>
			<div class="center-align">
				<div class="content-inner">
					<div class="logo-wrap">
						<ZulyLogoSVG class="logo-svg"/>
					</div>
					<div class="text-wrap">
						<div class="slogan-wrap">
							<p>Save money</p>
							<p>Save time</p>
							<p>Save the space</p>
						</div>
						<div class="phrases-wrap">
							<p>데일리룩 구독 서비스 줄라이</p>
						</div>
						<div class="link-wrap">
							<div class="center-align">
								<div class="grid-flex">
									<div class="column">
										<router-link to="/login" class="link link-login">로그인</router-link>
									</div>
									<div class="column">
										<router-link to="/join/size" class="link link-sign-up">회원가입</router-link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="arrow-wrap">
				<ArrowIconSVG/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vhCheck from 'vh-check';
import CloseIconSVG from '@/assets/img/main/btn_close.svg?inline';
import ZulyLogoSVG from '@/assets/img/logo.svg?inline';
import ArrowIconSVG from '@/assets/img/main/btn_arrow.svg?inline';

export default {
  name: 'MainFirst',
  components: {
    CloseIconSVG,
    ZulyLogoSVG,
    ArrowIconSVG
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLogin: 'login/isLogin',
      isMainBanner: 'common/isMainBanner'
    })
  },
  methods: {
    ...mapActions({
      toggleMainBanner: 'common/toggleMainBanner'
    }),
    clickBannerHide(event) {
      event.preventDefault();
      this.toggleMainBanner(false);
    }
  },
  created() {
    if (this.isLogin) {
      this.toggleMainBanner(false);
    }
  },
  mounted() {
    vhCheck();
  }
};
</script>

<style lang="scss" scoped>
:root {
  --vh-offset: 0px;
}
.content {
  height: 100vh;
  height: calc(100vh - var(--vh-offset));
  background: url('~@/assets/img/main/img_main_small.png') no-repeat 50% 50%;
  background-size: cover;
  position: relative;
}
.banner-wrap {
  @include fontSize(12px);
  height: 40px;
  background-image: linear-gradient(97deg, #f5e3c7, #d0ebcb);
  width: 100%;
  .txt-free {
    color: $color-pink-main;
    font-weight: 700;
  }
  .btn-close {
    position: absolute;
    right: 13px;
    top: 13px;
  }
}
.content-inner {
  max-width: 100%;
  flex: 0 0 100%;
  padding: 0 25px;
}
.logo-wrap {
  text-align: center;
  margin-bottom: 9%;
  .logo-svg {
    /deep/ path {
      fill: #fff;
    }
  }
}

.slogan-wrap {
  text-align: center;
  font-family: 'Cormorant', serif;
  font-size: 48px;
  line-height: 46px;
  color: #f5e3c7;
}
.phrases-wrap {
  @include fontSize(18px);
  color: #fff;
  text-align: center;
  margin-top: 5.541%;
  margin-bottom: 15%;
}
.link-wrap {
  .grid-flex {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .column {
    &:nth-child(2) {
      margin-top: 10px;
    }
  }
  .link {
    display: block;
    height: 56px;
    width: 100%;
    text-align: center;
    color: #fff;
    line-height: 56px;
  }
  .link-login {
    background-color: $color-pink-main;
  }
  .link-sign-up {
    background-color: $color-primary;
  }
}
.arrow-wrap {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-name: arrow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-play-state: running;
}

@keyframes arrow {
  0% {
    bottom: 2%;
  }
  75% {
    bottom: 3%;
  }
  100% {
    bottom: 2%;
  }
}
@-webkit-keyframes arrow {
  0% {
    bottom: 2%;
  }
  75% {
    bottom: 3%;
  }
  100% {
    bottom: 2%;
  }
}

@media (min-width: 768px) {
  .content {
    background-image: url('~@/assets/img/main/img_main_large.png');
  }
  .banner-wrap {
    @include fontSize(13px);
  }
  /* 768px 부터 Header */
  .logo-wrap {
    display: none;
  }
  .arrow-wrap {
    display: none;
  }
  .text-wrap {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .slogan-wrap {
    font-size: 70px;
    line-height: 64px;
    margin-bottom: 60px;
  }
  .phrases-wrap {
    @include fontSize(26px);
    order: -1;
    margin-top: 0;
    margin-bottom: 16px;
  }
  .link-wrap {
    .grid-flex {
      flex: 0 0 530px;
      max-width: 530px;
    }
    .column {
      &:nth-child(2) {
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>
