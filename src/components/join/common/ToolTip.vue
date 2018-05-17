<template>
  <div class="tooltip" v-show="selfVisible" @click="toolTipEvt">
    {{ tooltipText }}
    <span v-show="tooltipText === ''">
      키 : 최근에 측정된 키를 입력해주세요.<br/>
      가슴(브래지어) : 평상시 착용 하시는 브래지어 사이즈에서 앞에 있는 숫자를 입력해 주세요. 예를 들어 지금 착용하신 브래지어에 80A 이라고 라벨에 적혀 있다면, 80 이라고 입력 해주세요.<br/>
      허리 : 즐겨 입으시는 바지의 인치를 입력 해주세요.<br/>
      힙(팬티) : 평상시 착용 하시는 팬티의 사이즈 숫자를 입력해 주세요. 예를 들어 지금 착용하신 팬티에 90 이라고 라벨에 적혀 있다면, 90이라고 입력 해주세요.
    </span>
  </div>
</template>

<script>
export default {
  name: 'toolTip',
  props: {
    tooltipText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selfVisible: false,
    };
  },
  methods: {
    toolTipEvt() {
      this.selfVisible = !this.selfVisible;
      return this.selfVisible;
    },
    currentVisible() {
      return this.selfVisible;
    },
  },
};
</script>

<style scoped>
  .tooltip {
    display: inline-block;
    position: relative;
    background-color: #ffffff;
    border: solid 1px #797979;
    padding: 10px;
    text-align: left;
  }

  .tooltip:after,
  .tooltip:before {
    content: '';
    position: absolute;
    top: 0;
    left: 23%;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .tooltip:after {
    top: -12px;
    border-color: transparent transparent transparent #FFFFFF;
    border-width: 6px;
    transform: rotate(270deg);
  }

  .tooltip:before {
    top: -13px;
    border-color: transparent transparent transparent #333333;
    border-width: 6px;
    transform: rotate(270deg);
  }
</style>
