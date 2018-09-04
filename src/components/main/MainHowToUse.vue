<template>
	<div class="contents">
		<div class="contents-header">
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
								<p class="txt-desc">고객님의 취향을 알 수 있도록 아이템 이미지를 보고 받고 싶으신 스타일을 골라주세요.</p>
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
								<p class="txt-desc">첫 배송일을 선택하고 자택 주소와 결제 정보를 알려주시면 구독 준비 끝.</p>
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
								<p class="txt-desc">2가지 스타일 중 더 마음이 가는 쪽을 선택해주세요. 선택한 스타일을 배송해드립니다.</p>
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
								<p class="txt-desc">지정한 날짜에 맞춰 문 앞까지 배송된 옷들을 2주간 마음껏 입으세요. 세탁은 2주 후 줄라이가 하겠습니다.</p>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">5</span>
							</div>
							<div><p class="txt-title">맞교환하기</p>
								<p class="txt-desc">이용하신 옷은 새로운 옷이 배송되는 날 회수합니다. 배송 전 날 문 앞에 걸어만 주세요.</p></div>
						</div>

					</div>
					<div class="column">
						<div class="item">
							<div>
								<span class="txt-number">6</span>
							</div>
							<div>
								<p class="txt-title">계속 이용하기</p>
								<p class="txt-desc">새로운 옷을 경험하는 즐거움을 꾸준히 누리세요. 구독을 해지하시 전까지 요금은 월 단위로 자동 결제됩니다</p>
							</div>
						</div>

					</div>
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
<style scoped lang="scss" src="@/assets/css/main-style.scss">
</style>
<style scoped lang="scss">
.content {
  padding: 0 25px;
}
.list-how-to-use {
  @include fontSize(15px);
  .column {
    margin-top: 40px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
  .txt-number {
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    line-height: 40px;
    color: #c4c4c4;
  }
  .txt-title {
    font-weight: 700;
    margin-bottom: 5px;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    div {
      flex: 0;
      &:nth-child(1) {
        flex-basis: 26px;
        text-align: center;
      }
      &:nth-child(2) {
        flex-grow: 1;
        margin-left: 10px;
      }
    }
  }
}
@media (min-width: 768px) {
  .list-how-to-use {
    .column {
      flex-basis: calc(50% - (31px / 2));
      margin-top: 60px;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-child(2) {
        margin-top: 0;
        margin-left: 31px;
      }
      &:nth-child(3) {
        margin-left: 0;
      }
      &:nth-child(4) {
        margin-left: 31px;
      }
      &:nth-child(5) {
        margin-left: 0;
      }
      &:nth-child(6) {
        margin-left: 31px;
      }
    }
  }
}

@media (min-width: 1280px) {
  .list-how-to-use {
    width: 1030px;
		margin: 0 auto;
    .column {
      flex-basis: calc(33.333% - (84px / 3));
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-child(2) {
        margin-left: 28px;
      }
      &:nth-child(3) {
        margin-top: 0;
        margin-left: 28px;
      }
      &:nth-child(4) {
        margin-left: 0;
      }
      &:nth-child(5) {
        margin-left: 28px;
      }
      &:nth-child(6) {
        margin-left: 28px;
      }
    }
  }
}
</style>
