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
							<p class="txt-comment">비싼 코트를 사지 않고, 추천받아 입어<br/>볼 수 있어서 너무 좋고 새로운 스타일을 입으니 주변에서 다들 이쁘데요.</p>
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
							<p class="txt-comment">2주마다 새로운 아이템을 받아서 가지고 있던 옷이랑 코디해서 입으니까 <br/>다양하게 연출이 가능해서 좋아요.</p>
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
							<p class="txt-comment">육아에 일에 쇼핑할 시간이 없는데 <br/>제 취향에 맞는 옷을 추천해줘서 항상 <br/>기대되고 주변 반응이 좋아서 뿌듯해요.</p>
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
};
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss">
</style>
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
    position: relative;
    z-index: 10;
    margin-top: -50px;
    .txt-comment {
      @include fontSize(15px);
			word-break: keep-all;
    }
    .txt-user {
      margin-top: 5px;
      @include fontSize(14px);
      color: #797979;
    }
  }
}
@media (min-width: 768px) {
  .item {
    display: inline-block;
    vertical-align: top;
    &.item-second {
      margin-top: 0;
      margin-left: 30px;
    }
  }
}
@media (min-width: 1080px) {
  .item {
    height: 400px;
    .image-wrap {
      position: relative;
      top: -9px;
      left: 9px;
    }
    .text-wrap {
      left: -38px;
    }
    &.item-first {
      margin-left: 38px;
    }
    &.item-second {
      margin-left: 117px;
    }
    &.item-third {
      margin-top: 0;
      margin-left: 115px;
    }
  }
}
</style>
