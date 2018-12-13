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
          :class="[listCustomClassName, disabledSelect(item[textExpress])]"
          @click="activeSelect"
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
    }
  },
  methods: {
    activeSelect(event) {
      const target =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');

      const list = target.closest('ul');

      if (!target.classList.contains('disabled')) {
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
    //
    checkListCustomClass() {
      this.listCustomClass
        ? (this.listCustomClassName = `item w-25 h-50 lang-en ${
            this.listCustomClass
          }`)
        : (this.listCustomClassName = `item w-25 h-50 lang-en`);
    }
  },
  created() {
    this.checkListCustomClass();
  }
};
</script>

<style scoped lang="scss">
</style>
