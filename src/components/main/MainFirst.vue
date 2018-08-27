<template>
	<div class="contents">
		<div class="content">
			<div
				class="banner-wrap"
				v-if="isBannerShow"
			>
				<div class="txt-centering">
					<p>지금 가입하시면 <span class="txt-free">첫달 무료 ♥</span></p>
				</div>
				<a href="#" class="btn-close" @click="clickBannerHide">
					<CloseIcon/>
				</a>
			</div>
			<div class="logo-wrap">
				<ZulyLogo class="logo-svg"/>
			</div>
			<div class="slogan-wrap">
				<p>Save money</p>
				<p>Save time</p>
				<p>Save the space</p>
			</div>
			<div class="phrases-wrap">
				<p>데일리룩 구독 서비스 줄라이</p>
			</div>
			<div class="link-wrap">
				<router-link to="/login" class="link link-login">로그인</router-link>
				<router-link to="/join/size" class="link link-sign-up">회원가입</router-link>
			</div>
			<div class="arrow-wrap">
				<ArrowIcon/>
			</div>
		</div>
	</div>
</template>

<script>
	import CloseIcon from '@/assets/img/main/btn_close.svg';
	import ZulyLogo from '@/assets/img/logo.svg';
	import ArrowIcon from '@/assets/img/main/btn_arrow.svg';

export default {
	name: "MainFirst",
	components: {
		CloseIcon,
		ZulyLogo,
		ArrowIcon
	},
	data() {
		return {
			isBannerShow: true,
		}
	},
	methods: {
		clickBannerHide(event) {
			event.preventDefault();
			this.isBannerShow = false;
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	background-color: #aaa;
	padding: 40px 25px 118px;
	position: relative;
}
.banner-wrap {
	@include fontSize(12px);
	height: 40px;
	background-image: linear-gradient(97deg, #f5e3c7, #d0ebcb);
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	.txt-free {
		color: $color-pink-main;
	}
	.btn-close {
		position: absolute;
		right: 13px;
		top: 13px;
	}
}
.logo-wrap {
	text-align: center;
	margin-top: 63px;
	margin-bottom: 50px;
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
	margin-top: 20px;
	margin-bottom: 70px;
}
	.link-wrap {
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
			margin-top: 10px;
		}
	}
	.arrow-wrap {
		position: absolute;
		bottom: 38px;
		left: 50%;
		transform: translateX(-50%);
		animation-name:arrow;
		animation-duration:1s;
		animation-timing-function:linear;
		animation-delay:0s;
		animation-iteration-count:infinite;
		animation-direction:normal;
		animation-play-state:running;
	}

@keyframes arrow
{
	0%   {bottom:38px;}
	75% {bottom:48px;}
	100% {bottom:38px;}
}
@-webkit-keyframes arrow
{
	0%   {bottom:38px;}
	75% {bottom:48px;}
	100% {bottom:38px;}
}

</style>