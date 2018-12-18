<template>
  <div>
    <div class="form-title-wrap">
      <p class="txt-form-title">
        {{ title }}
      </p>
    </div>
    <div>
      <ul class="list-flex">
        <li
          v-for="(item, idx) in data"
          :key="idx"
          :class="[listCustomClassName, disabledSelect(item[textExpress]), {selected: watchData === item[extractData]}]"
          @click="activeSelect(item[extractData], $event)"
        >
          {{item[textExpress]}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlexList',
  data() {
    return {
      listCustomClassName: ''
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    listCustomClass: {
      type: String
    },
    textExpress: {
      type: String
    },
    excludeData: {
      type: [String, Array]
    },
    column: {
      type: [String, Number],
      default: 4
    },
    height: {
      type: [String, Number],
      default: 50
    },
    extractData: {
      type: String
    },
    watchData: {}
  },
  methods: {
    activeSelect(param, event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');

      const list = target.closest('ul');
      if (!target.classList.contains('disabled')) {
        // 만약 extractFunc이 존재한다면
        if (this.$listeners && this.$listeners.extractFunc) {
          if (this.extractData) {
            this.$emit('extractFunc', param);
          } else {
            console.error('추출할 데이터를 입력해주세요.');
            return;
          }
        }
        _.forEach(list.querySelectorAll('li'), value => {
          value.classList.remove('selected');
        });
        target.classList.add('selected');
      }
    },
    disabledSelect(param) {
      if (_.isArray(this.excludeData)) {
        let matchResult;
        _.forEach(this.excludeData, value => {
          if (param === value) {
            matchResult = 'disabled';
          }
        });
        return matchResult;
      }
    },
    checkListCustomClass() {
      this.listCustomClass
        ? (this.listCustomClassName = `item w-${_.toInteger(100 / this.column)} h-${
            this.height
          } lang-en ${this.listCustomClass}`)
        : (this.listCustomClassName = `item w-${_.toInteger(100 / this.column)} h-${
            this.height
          } lang-en`);
    }
  },
  created() {
    this.checkListCustomClass();
  }
};
</script>

<style scoped lang="scss">
</style>
