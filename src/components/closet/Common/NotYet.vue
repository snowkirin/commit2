<template>
  <!-- 옷장이 아직 열리지 않았을때의 컴포넌트 -->
  <div class="none">
    <div class="inner center-align">
      <p>
        조금만 기다리세요<br />
        곧 옷장이 채워집니다.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotYet'
};
</script>

<style scoped lang="scss">
.none {
  height: 500px;
  background: url('~@/assets/img/closet/img_none.png') no-repeat 50% 0;
  position: relative;
  .inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 160px;
    background-color: #fafafa;
    width: 90%;
  }
  p {
    text-align: center;
    font-size: 17px;
    line-height: 25px;
    letter-spacing: -1px;
  }
}
</style>
