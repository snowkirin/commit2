<template>
  <div class="contents">
    <div class="contents-header">
      <h3>찾으시는 답변이 없으시면 카카오톡을 이용해 주세요.</h3>
    </div>
    <div class="content">
      <div v-if="$mq !== 'sm'">
        <ul class="list-flex">
          <li
            class="item h-50"
            :class="{'selected': currentFaqType === ''}"
            @click="faqListFilter()"
          >
            전체
          </li>
          <li
            class="item h-50"
            v-for="(item, idx) in FaqTypes"
            :class="{'selected': currentFaqType === item.name}"
            :key="idx"
            @click="faqListFilter(item.name)"
          >
            {{item.name}}
          </li>
        </ul>

      </div>
      <div
        v-else
        class="zuly-select"
      >
        <label>
          <select
            v-model="currentFaqType"
            @change="faqListFilter(currentFaqType)"
          >
            <option value="" selected="selected">전체</option>
            <option v-for="(item, idx) in FaqTypes" :value="item.name" :key="idx"> {{ item.name }}</option>
          </select>
        </label>
        <i class="fas fa-sort"></i>
      </div>
      <div class="list-faq">
        <table class="table table-zuly" ref="table">
          <colgroup>
            <col width="80">
          </colgroup>
          <thead>
          <tr>
            <th>구분</th>
            <th>제목</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item, idx) in currentFaqList">
            <tr
              class="table-row"
              :key="`title-${idx}`"
              @click="clickTitle"
              data-selector="title"
            >
              <td class="type">{{item.name}}</td>
              <td class="title">{{item.title}}</td>
            </tr>
            <tr
              class="table-row"
              style="display: none;"
              :key="`content-${idx}`"
              data-selector="content"
            >
              <td colspan="2" class="align-top">
                <p class="txt-inner">{{item.content}}</p>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Faq',
  data() {
    return {
      currentFaqList: [],
      currentFaqType: ''
    };
  },
  computed: {
    ...mapGetters({
      Faq: 'faq/Faq',
      FaqTypes: 'faq/FaqTypes'
    })
  },
  methods: {
    ...mapActions({
      getFaq: 'faq/getFaq',
      getFaqTypes: 'faq/getFaqTypes'
    }),
    faqListFilter(type) {
      if (!type || type === '') {
        this.currentFaqList = this.Faq.data;
        this.currentFaqType = '';
      } else {
        this.currentFaqList = _.filter(this.Faq.data, value => {
          return value.name === type;
        });
        this.currentFaqType = type;
      }
      this.hideTableContent();
    },
    clickTitle(event) {
      const eleSelf =
        event.target.tagName === 'TR'
          ? event.target
          : event.target.closest('tr');
      this.hideTableContent();
      eleSelf.classList.add('active');
      eleSelf.nextElementSibling.style.display = 'table-row';
    },
    hideTableContent() {
      const activeTitle = this.$refs.table.querySelectorAll('.active');

      if (activeTitle.length !== 0) {
        activeTitle[0].classList.remove('active');
      }
      const lists = this.$refs.table.querySelectorAll(
        'tr[data-selector="content"]'
      );
      _.forEach(lists, value => {
        value.style.display = 'none';
      });
    }
  },
  async created() {
    await this.getFaq();
    await this.getFaqTypes();
    this.faqListFilter();
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.zuly-select {
  position: relative;
  padding-right: 25px;
  border: 1px solid #c4c4c4;
  select {
    @include fontSize(15px);
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border: 0 none;
  }
  i {
    position: absolute;
    right: 9px;
    top: 17px;
  }
}
.list-faq {
  margin-top: 21px;
  border-top: 1px solid $color-primary;
  border-bottom: 1px solid $color-primary;
}
.table-zuly {
  .type,
  .title {
    @include fontSize(15px);
    padding-top: 12px;
    padding-bottom: 15px;
  }
  .type {
    text-align: center;
  }
  .title {
    padding-right: 15px;
  }
  .txt-inner {
    color: #797979;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 24px;
    padding-right: 24px;
  }
  tr {
    &.active {
      font-weight: 700;
    }
  }
}
.list-flex {
  .item {
    flex: 0 0 calc(100% / 6 + 1px);
    max-width: calc(100% / 6 + 1px);
  }
}

@media (min-width: 768px) {
  .list-faq {
    margin-top: 25px;
    border-top-width: 2px;
  }
  .table-zuly {
    .txt-inner {
      @include fontSize(15px);
      padding-top: 23px;
      padding-bottom: 27px;
      padding-left: 32px;
      padding-right: 32px;
    }
  }
}
</style>
