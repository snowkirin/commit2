<template>
  <div class="tomorrow mt40">
    <div class="closet-card-none">
      <div class="closet-card-none-content">
        <div class="content-table mauto">
          <span><b>D-2일 후</b><br/>옷장이 채워집니다.</span>
        </div>
      </div>
    </div>
    <div class="main-point-text closet-title">내일의 옷장</div>
    <div class="closet-title-text mt20">
      2가지 데일리룩 후보 중 마음에 드는<br/>
      의상을 선택해주세요.
    </div>
    <div class="closet-card-area mt50">
      <div class="closet-card">
        <div class="closet-card-title">01. BASIC LOOK</div>
        <div class="closet-card-images">
          IMAGE AREA
        </div>
        <div class="closet-card-text">
          <div class="closet-card-text-title">상품 설명</div>
          <div class="closet-card-text-title-text mt10">
            - 투톤으로 이중 레이어드된 실크 롱 스커트입니다.<br/>
            - 실크 소재의 은은한 광택과 맥시한 길이감이 페미닌하고 드레시한<br/>
              무드를 연출합니다.<br/>
            - 슬릿된 왼쪽 부분에는 포켓이 있습니다.<br/>
            - 사이드 콘솔지퍼로 오픈/클로징 됩니다.<br/>
          </div>
          <div class="closet-card-text-title mt25">팁</div>
          <div class="closet-card-text-title-text mt10">
            대체로 여성스러운 스타일로 부드럽고 연한 파스텔 색상에 부드러운<br/>
            디자인선, 유연한 소재나 문양을 선호한다. 실크, 시폰, 저지, 울 크레이프
          </div>
          <div class="dotted-line mt30"></div>
          <div class="closet-card-hashtag mt30">
            #여성스러운 #시폰 #파스텔
          </div>
        </div>
      </div>
      <div class="closet-card-block"></div>
      <div class="closet-card">
        <div class="closet-card-title">02. OFFICE LOOK</div>
        <div class="closet-card-text">
          TEXT AREA
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tomorrow',
  methods: {
    hoverEvt(target) {
      const obj = target;

      obj.onmouseover = () => {
        obj.classList.add('closet-card-on');
      };

      obj.onmouseout = () => {
        obj.classList.remove('closet-card-on');
      };
    },
  },
  mounted() {
    const card = document.querySelectorAll('.closet-card');

    for (let i = 0; i < card.length; i += 1) {
      this.hoverEvt(card[i]);
    }
  },
};
</script>

<style scoped>
.closet-card-none {
  height: 500px;
  background: url('/static/img/closet/img_feedback.png');
  background-repeat: no-repeat;
  background-position: 50% 0;
  position: relative;

}

.closet-card-none-content {
  position: absolute;
  width: 392px;
  height: 160px;
  background-color: #fafafa;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.content-table {
  display: table;
  height: 100%;
}

.content-table span {
  display: table-cell;
  vertical-align: middle;
  font-size: 36px;
  line-height: 1.4;
  letter-spacing: normal;
  letter-spacing: -2.8px;
  color: #212121;
  text-align: center;
}

.closet-card-area {
  display: flex;
}

.closet-card {
  display: inline-block;
  width: 48.6%;
  height: auto;
  border: solid 2px #e9e9e9;
  cursor: pointer;
}

.closet-card-title {
  line-height: 0;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #797979;
  margin: 30px 20px 0 20px;
}

.closet-card-images {
  margin: 30px 20px 0 20px;
}

.closet-card-text {
  margin: 30px 20px 0 20px;
}

.closet-card-text-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  color: #212121;
}

.closet-card-text-title-text {
  font-size: 18px;
  letter-spacing: -1px;
  color: #212121;
}

.closet-card-hashtag {
  font-size: 16px;
  line-height: 0;
  letter-spacing: -1px;
  text-align: left;
  color: #566b9c;
  margin-bottom: 50px;
}

.closet-card-on {
  border: solid 2px #fb5143;
  background-color: #f5f5f5;
}
</style>
