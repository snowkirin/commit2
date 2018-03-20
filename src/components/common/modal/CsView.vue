<template>
  <div class="cs-view">
    <div class="current-date-area mt30">03.20 화</div>
    <div class="talk-area">
      asdf
    </div>
    <div class="talk-input-box">
      <div class="inputGroup">
        <input type="text" name="zipcode" class="form-login-group mt12" placeholder="질문입력" style="width: 82%;" v-validate="'required'" />
        <div style="display: inline-table; width: 2%;"></div>
        <button class="button-login" style="width: 15%;">전송</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'csView',
  props: {
    dataId: {
      type: String,
      default: '',
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.cs-view {
  height: 90%;
}

.talk-area {
  height: 94%;
}

.current-date-area {
  text-align: center;
  color: #212121;
  font-size: 18px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #212121;
}

.talk-input-box {
  bottom: 25px;
  position: absolute;
  width: 94.5%;
}
</style>
