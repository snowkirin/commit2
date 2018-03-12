<template>
  <div class="benefit-main side-padding-50">
    <div class="main-point-text en-font">
      BENEFIT
    </div>
    <div class="benefit-title d-flex">
      <div style="width: 80%;">
        지금, <span>체험단이 되어</span><br/>
        <span>한달 간 새로운 패션을 무료</span>로<br/>
        <span>경험<span class="special-title">(1+∞)</span></span> 해보세요.
      </div>
      <div style="width: 20%; position: relative;">
        <button class="button-main" style="bottom: 6px; right: 0; position: absolute;">
          <span style="padding-left: 30px; font-weight: 400;">정기 구독 신청</span>
          <div class="d-inlineblock arrowIcon"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'benefit',
  mounted() {
    const subscribeBtn = document.querySelector('.button-main');
    const subscribeBtnTitle = document.querySelector('.button-main span');
    const subscribeBtnIcon = document.querySelector('.button-main div');

    subscribeBtn.onmouseover = () => {
      subscribeBtn.style.backgroundColor = '#fb5143';
      subscribeBtnIcon.style.marginLeft = '53px';
      subscribeBtnTitle.innerHTML = '1개월 무료 체험';
    };

    subscribeBtn.onmouseout = () => {
      subscribeBtn.style.backgroundColor = '#212121';
      subscribeBtnIcon.style.marginLeft = '65px';
      subscribeBtnTitle.innerHTML = '정기 구독 신청';
    };
  },
};
</script>

<style scoped>
.benefit-main {
  width: 1300px;
  margin: auto;
}

.benefit-title {
  font-size: 64px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.21;
  letter-spacing: -4.5px;
  color: #212121;
}

.benefit-title span {
  font-weight: 600;
}

.arrowIcon {
  background: url('/static/img/icons/zuly_icon.png') no-repeat -43px -8px;
  background-size: 250px 250px;
  width: 37.5px;
  height: 23.5px;
  margin-left: 65px;
}

.special-title {
  position: relative;
  bottom: 6px;
}
</style>
