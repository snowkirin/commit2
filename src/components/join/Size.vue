<template>
  <div class="size side-margin-50">
    <div class="size-title">사이즈</div>
    <div class="mt10">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="size-form mt40" style="width: 392px; margin: auto;">
      <div class="sizeScroll">
        <span class="sizeText divIB">키</span>
        <div class="sizeBar divIB"></div>
        <div class="sizeInput divIB">
          <input type="text" name="" value="175" />
          <span class="sizeDisplay">cm</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'size',
  components: {
  },
};
</script>

<style scoped>
.size {
  width: 820px;
  text-align: center;
  margin: auto;
}

.size-title {
  font-size: 36px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.26;
  letter-spacing: -0.4px;
  text-align: center;
  color: #212121;
  text-shadow: 0px 1px 0 rgba(0, 0, 0, 0.1);
}

.divIB {
  display: inline-block;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.sizeScroll {
  text-align: left;
}

.sizeText {
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.67;
  letter-spacing: -0.2px;
  color: #212121;
}

.sizeBar {
  width: 262px;
  height: 2px;
  background-color: #212121;
  margin-bottom: 5px;
  margin-left: 30px;
}

.sizeInput input {
  width: 50px;
  box-shadow: none;
  border: none;
  font-size: 17px;
  text-align: right;
}

.sizeDisplay {
  position: absolute;
  padding-left: 55px;
  margin-top: -18px;
}
</style>
