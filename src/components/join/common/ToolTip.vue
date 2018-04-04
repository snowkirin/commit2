<template>
  <div class="tooltip" v-show="selfVisible">
    {{ tooltipText }}
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
    border-color: transparent transparent transparent #212121;
    border-width: 6px;
    transform: rotate(270deg);
  }
</style>
