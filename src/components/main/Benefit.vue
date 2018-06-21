<template>
  <div class="benefit">
    <p class="txt-main-point">BENEFIT</p>
    <p class="txt-benefit">
      쇼핑, 세탁, 보관 걱정 없는<br/>
      나만의 옷장<br/>
      지금 무료로 경험하세요.
    </p>
  </div>

</template>

<script>
export default {
  name: 'benefit',
  methods: {
  },
};
</script>

<style scoped lang="scss">
  .benefit {
    padding: 19px 19px 35px;
  }
  .txt-benefit {
    letter-spacing: -1.4px;
    font-size: 26px;
    line-height: 34px;
    margin-left: -2px;
  }
  @media (min-width: 1279px){
    .benefit {
      padding: 32px 40px 65px 40px;
      width: 1280px;
      margin: 0 auto;
    }
    .txt-benefit {
      font-size: 58px;
      line-height: 68px;
      letter-spacing: -3.2px;
      margin-left: -3px;
      margin-top: 3px;
    }
  }
</style>
