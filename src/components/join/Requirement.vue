<template>
  <div class="requirement subContent mauto">
    <div class="content-title mt30">추가 요구사항</div>
    <div class="explain mt15">
      개인적인 체형/옷에 대해 별도로 요청 사항 작성해주세요.
    </div>
    <div class="requirementLine mt25"></div>
    <div class="content-form mt40 mauto">
      <div class="mt40">
        <textarea name="requirement" class="requirement-textarea" v-on:focus="requirementEvt" v-model="req"></textarea>
      </div>
      <div class="mt40">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'requirement',
  data() {
    return {
      req: '요구사항을 적어주세요.',
    };
  },
  components: {
  },
  methods: {
    ...mapActions({
      setRequirement: 'signup/setRequirement',
    }),
    requirementEvt(evt) {
      const obj = evt;
      if (obj.target.value === '요구사항을 적어주세요.') obj.target.value = '';
    },
    moveNext() {
      const reqValue = document.querySelector('textarea[name=requirement]').value;

      this.setRequirement();
      this.$localStorage.set('S13', reqValue);
      this.$router.push({ path: 'signup' });
    },
  },
  created() {
    const localStorage = this.$localStorage.get('S13');

    if (localStorage) this.req = localStorage;
  },
};
</script>

<style scoped>
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
