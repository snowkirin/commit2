<template>
	<div class="contents">
		<div class="content">
			<div class="row">
				<div class="item">
					<div class="box">
						<p class="txt-question">받고 싶은 옷을 선택할 수 있나요?</p>
						<p class="txt-answer">저희가 제안하는 2Type 중에서만 선택 가능합니다.<br/>
							가입 시 입력한 정보와 구독 기간 동안 주신 피드백을 바탕으로 가장 어울리는 스타일을 제안합니다.</p>
					</div>
					<div class="box">
						<p class="txt-question">한 세트는 어떻게 구성되나요?</p>
						<p class="txt-answer">아우터/원피스의 경우 1pcs, 상의/하의의 경우 2 pcs으로 구성됩니다.<br v-if="$mq!== 'sm'"/> 배송 3일 전에(영업일 기준) 카카오톡을 통해 어떤 옷인지 사진으로 보고 선택할 수 있는 링크를 보내드립니다.</p>
					</div>
				</div>
				<div class="image">
					<img v-if="$mq==='sm'" src="@/assets/img/main/main_about1_m.jpg" alt="">
					<img v-else src="@/assets/img/main/main_about1_w.jpg" alt="">
				</div>
			</div>
			<hr>
			<div class="row">
				<div class="item">
					<div class="box">
						<p class="txt-question">배송/반납은 어떻게 이루어지나요?</p>
						<p class="txt-answer">바로 입을 수 있도록, 슈트케이스에 넣어 현관문 앞에 걸어드립니다.<br v-if="$mq!== 'sm'"/> 반납과 다음 상품 배송이 함께 이루어지므로 이용하신 옷은 돌아오는 배송일자에 맞춰 현관문 앞에 걸어두시기만 하면 됩니다.</p>
					</div>
					<div class="box">
						<p class="txt-question">배송/반납 날짜는 어떻게 알 수 있나요?</p>
						<p class="txt-answer">배송/반납은 새벽에 이루어지며 날짜는 카카오톡을 통해 알려드립니다.<br v-if="$mq!== 'sm'"/> (지정된 반납일에 수거되지 않을 경우 추가 배송비를 부담하실 수 있습니다.)</p>
					</div>
				</div>
				<div class="image">
					<img v-if="$mq==='sm'" src="@/assets/img/main/main_about2_m.jpg" alt="">
					<img v-else src="@/assets/img/main/main_about2_w.jpg" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'MainHowToUse',
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.contents {
  padding: {
    top: 40px;
    bottom: 40px;
    left: 25px;
    right: 25px;
  }
  @include tablet {
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 45px;
    padding-right: 45px;
  }
  @include desktop {
    padding-top: 50px;
    padding-left: 0;
    padding-bottom: 60px;
    padding-right: 0;
  }
}
.content {
  @include desktop {
    width: 1080px;
    margin: 0 auto;
  }
}

.row {
  @include tablet {
    display: flex;
  }
  .item {
    @include tablet {
      flex: 1 1 auto;
      margin-right: 30px;
    }
  }
  .box {
    margin-bottom: 20px;
    @include desktop {
      margin-bottom: 30px;
    }
    &:nth-child(2) {
      margin-bottom: 0;
    }
  }
  .image {
    width: 100%;
    margin-top: 30px;
    @include tablet {
      flex: 0 0 238px;
      height: 240px;
      margin-top: 0;
    }
    @include desktop {
      flex-basis: 252px;
      height: 200px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.txt-question {
  font-size: 15px;
  letter-spacing: -0.8px;
  line-height: 21px;
  font-weight: 700;
  color: #d16e7b;
}
.txt-answer {
  font-size: 15px;
  line-height: 25px;
  letter-spacing: -0.8px;
  margin-top: 12px;
}

hr {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #d8d8d8;
}
</style>
