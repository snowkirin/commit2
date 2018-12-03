<template>
	<div class="contents">
		<!--<div class="contents-header">
			<h3>How To Use</h3>
			<p>줄라이 이용 설명서</p>
		</div>
		<div class="content">
			<div>
				<div class="grid-flex list-how-to-use">
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">1</span>
							</div>
							<div>
								<p class="txt-title">스타일 알려주기</p>
								<p class="txt-desc">고객님의 취향을 알 수 있도록 아이템 이미지를 보고
									받고 싶으신 스타일을 골라주세요.</p>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">2</span>
							</div>
							<div>
								<p class="txt-title">서비스 가입하기</p>
								<p class="txt-desc">첫 배송일을 선택하고 자택 주소와 결제 정보를
									알려주시면 구독 준비 끝.</p>
							</div>
						</div>


					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">3</span>
							</div>
							<div>
								<p class="txt-title">스타일 제안받기</p>
								<p class="txt-desc">2가지 스타일 중 더 마음이 가는 쪽을 선택해주세요.
									선택한 스타일을 배송해드립니다.</p>
							</div>
						</div>


					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">4</span>
							</div>
							<div>
								<p class="txt-title">줄라이 받아보기</p>
								<p class="txt-desc">지정한 날짜에 맞춰 문 앞까지 배송된 옷들을 2주간
									마음껏 입으세요. 세탁은 2주 후 줄라이가 하겠습니다.</p>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">5</span>
							</div>
							<div><p class="txt-title">맞교환하기</p>
								<p class="txt-desc">이용하신 옷은 새로운 옷이 배송되는 날 회수합니다.
									배송 전 날 문 앞에 걸어만 주세요.</p></div>
						</div>

					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">6</span>
							</div>
							<div>
								<p class="txt-title">계속 이용하기</p>
								<p class="txt-desc">새로운 옷을 경험하는 즐거움을 꾸준히 누리세요.
									구독을 해지하시기 전까지 요금은 월 단위로
									자동 결제됩니다.</p>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>-->

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
						<p class="txt-answer">아우터/원피스의 경우 1pcs, 상의/하의의 경우 2 pcs으로 구성됩니다. 배송 3일 전에(영업일 기준) 카카오톡을 통해 어떤 옷인지 사진으로 보고 선택할 수 있는 링크를 보내드립니다.</p>
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
						<p class="txt-answer">바로 입을 수 있도록, 슈트케이스에 넣어 현관문 앞에 걸어드립니다. 반납과 다음 상품 배송이 함께 이루어지므로 이용하신 옷은 돌아오는 배송일자에 맞춰 현관문 앞에 걸어두시기만 하면 됩니다.</p>
					</div>
					<div class="box">
						<p class="txt-question">배송/반납 날짜는 어떻게 알 수 있나요?</p>
						<p class="txt-answer">배송/반납은 새벽에 이루어지며 날짜는 카카오톡을 통해 알려드립니다. (지정된 반납일에 수거되지 않을 경우 추가 배송비를 부담하실 수 있습니다.)</p>
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
    padding-top: 60px;
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
  @include fontSize(15px);
  font-weight: 700;
  color: #d16e7b;
}
.txt-answer {
  @include fontSize(15px);
  margin-top: 12px;
}

hr {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #d8d8d8;
}
</style>
