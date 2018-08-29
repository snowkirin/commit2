<template>
	<div class="contents">
		<div class="contents-header">
			<h3>Reviewer</h3>
			<p>그녀들의 일상 속 줄라이</p>
		</div>
		<div class="content">
			<div class="list-reviewer">
				<div class="item item-first">
					<div class="image-wrap">
						<img src="~@/assets/img/main/img_reviewer1.png" alt="">
					</div>
					<div class="text-wrap center-align">
						<div>
							<p class="txt-comment">지인 추천으로 베타 오픈때 이용해보았는데, 디자이너샵에서 갖고싶었던 옷을 추천해주셔서 기분이 너무 좋았어요~</p>
							<p class="txt-user">20대 후반 직장인</p>
						</div>
					</div>
				</div>
				<div class="item item-second">
					<div class="image-wrap">
						<img src="~@/assets/img/main/img_reviewer2.png" alt="">
					</div>
					<div class="text-wrap center-align">
						<div>
							<p class="txt-comment">가을이 짧아져서, 옷 사기 애매한데 렌탈해서 입으니 너무 좋네요~</p>
							<p class="txt-user">30대 초반 직장인</p>
						</div>
					</div>
				</div>
				<br v-if="$mq === 'md'"/>
				<div class="item item-third">
					<div class="image-wrap">
						<img src="~@/assets/img/main/img_reviewer3.png" alt="">
					</div>
					<div class="text-wrap center-align">
						<div>
							<p class="txt-comment">평소와 다른 스타일 선택 해봤는데 좀 어색하긴 한데, 다들 잘 어울린다고 해서 기분이 좋은 하루가 되었어요^^</p>
							<p class="txt-user">30대 후반 직장인</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'MainReviewer'
	}
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss"></style>
<style scoped lang="scss">
	.contents {
		background-color: #f7f7f7;
	}
	.content {
		text-align: center;
	}
	.item {
		width: 270px;
		margin: 20px auto 0;
		padding-bottom: 20px;
		&.item-first {
			background-color: #e6d3ca;
			margin-top: 0;
		}
		&.item-second {
			background-color: #ccdcdf;
		}
		&.item-third {
			background-color: #eedecc;
		}
		.image-wrap {
			width: 200px;
			margin: 0 auto;
			img {
				width: 100%;
			}
		}

		.text-wrap {
			height: 114px;
			padding-left: 20px;
			padding-right: 20px;
			background-color: #fff;
			.txt-comment {
				@include fontSize(15px);
			}
			.txt-user {
				margin-top: 5px;
				@include fontSize(14px);
				color: #797979;
			}
		}
	}
	@media(min-width:768px) {
		.item {
			display: inline-block;
			vertical-align: top;
			&.item-second {
				margin-top: 0;
				margin-left: 30px;
			}
		}
	}
	@media (min-width: 1280px) {
		.item {
			&.item-third {
				margin-top: 0;
				margin-left: 30px;
			}
		}
	}
</style>