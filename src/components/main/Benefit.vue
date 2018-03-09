<template>
  <div class="side-margin-50">
    <div class="main-point-text en-font">
      BENEFIT
    </div>
    <div class="benefit-title d-flex">
      <div style="width: 80%;">
        지금, <span>체험단이 되어</span><br/>
        <span>한달 간 새로운 패션을 무료</span>로<br/>
        <span>경험(1+∞)</span> 해보세요.
      </div>
      <div style="width: 20%; position: relative;">
        <button class="button-main" style="bottom: 0; right: 0; position: absolute;">
          <span style="padding-left: 30px; font-weight: 400;">정기 구독 신청</span>
          <i class="fa fa-angle-right" style="padding-left: 80px;"></i>
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
    const subscribeBtnIcon = document.querySelector('.button-main i');

    subscribeBtn.onmouseover = () => {
      subscribeBtn.style.backgroundColor = '#fb5143';
      subscribeBtnIcon.style.paddingLeft = '65px';
      subscribeBtnTitle.innerHTML = '1개월 무료 체험';
    };

    subscribeBtn.onmouseout = () => {
      subscribeBtn.style.backgroundColor = '#212121';
      subscribeBtnIcon.style.paddingLeft = '80px';
      subscribeBtnTitle.innerHTML = '정기 구독 신청';
    };
  },
};
</script>

<style scoped>
.benefit-title {
  font-size: 61px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.19;
  letter-spacing: -1.9px;
  color: #212121;
}

.benefit-title span {
  font-weight: 600;
}
</style>
