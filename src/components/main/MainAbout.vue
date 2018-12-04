<template>
  <div class="contents">
    <div class="contents-header">
      <h3>ZULY ABOUT</h3>
    </div>
    <div class="content">
      <p class="txt-about-zuly">줄라이는 2주에 한 세트씩<br v-if="$mq === 'sm'"/> 옷을 보내드리고,<br v-if="$mq === 'sm'"/> 회수하는<br/>패션 구독 서비스</p>
      <hr>
      <p class="txt-bill-desc">결제는 구독 기간 동안 2회(4주)에 한 번씩<br v-if="$mq === 'sm'"/> 자동으로 이루어집니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainAbout'
};
</script>

<style scoped lang="scss">

.contents {
  background-color: #e38392;
  text-align: center;
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
    padding-bottom: 50px;
    padding-right: 0;
  }
}
.contents-header {
  h3 {
    color: #fff;
    font-size: 15px;
    font-family: 'Cormorant', serif;
    line-height: 18px;
    text-transform: uppercase;
    font-weight: 700;
  }
}
.content {
  margin-top: 15px;
  @include desktop {
    width: 1080px;
    margin: 15px auto 0;
  }
  .txt-about-zuly,
  .txt-bill-desc {
    color: #fff;
  }
  .txt-about-zuly {
    @include fontSize(22px);
    font-weight: 300;
    @include tablet {
      @include fontSize(24px);
    }
    @include desktop {
      font-size: 26px;
      letter-spacing: -2px;
      line-height: 40px;
    }
  }
  .txt-bill-desc {
    @include fontSize(15px);
  }
}
hr {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #fff;
  opacity: 0.3;
}
</style>
