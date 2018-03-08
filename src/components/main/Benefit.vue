<template>
  <div class="side-margin-50">
    <div class="main-point-text">
      BENEFIT
    </div>
    <div class="benefit-title">
      지금, <span>체험단이 되어</span><br/>
      <span>한달 간 새로운 패션을 무료</span>로<br/>
      <span>경험(1+∞)</span> 해보세요.
      <div class="button-main">
        &nbsp;&nbsp;&nbsp;
        <span>정기 구독 신청</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="fa fa-angle-right"></i>
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

    subscribeBtn.onmouseover = () => {
      subscribeBtn.style.backgroundColor = '#fb5143';
      subscribeBtnTitle.innerHTML = '1개월 무료 체험';
    };

    subscribeBtn.onmouseout = () => {
      subscribeBtn.style.backgroundColor = '#212121';
      subscribeBtnTitle.innerHTML = '정기 구독 신청';
    };
  },
};
</script>

<style scoped>
.benefit-title {
  font-size: 62px;
  font-weight: 360;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.19;
  letter-spacing: -1.6px;
  color: #212121;
}

.benefit-title span {
  font-weight: 600;
}
</style>
