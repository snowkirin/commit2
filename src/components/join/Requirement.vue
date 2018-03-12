<template>
  <div class="requirement subContent side-margin-50">
    <div class="content-title mt20">요구사항</div>
    <div class="explain mt20">
      개인적인 체형/옷에 대해 별도로 요청 사항 작성해주세요.
    </div>
    <div class="requirementLine mt25"></div>
    <div class="requirement-form mt40" style="width: 392px; margin: auto;">
      <div class="mt40">
        <textarea class="requirement-textarea">요구사항을 적어주세요.</textarea>
      </div>
      <div class="mt30">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'requirement',
  components: {
  },
  methods: {
    moveNext() {
      this.$router.push({ path: 'signup' });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.requirement {
  width: 820px;
  text-align: center;
  margin: auto;
}

.requirementLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.requirement-textarea {
  width: 350px;
  height: 312px;
  background-color: #ffffff;
  border: solid 1px #999999;
  padding: 20px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.2px;
  text-align: left;
  color: #797979;
}
</style>
