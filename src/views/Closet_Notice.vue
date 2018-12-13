<template>
  <div class="contents">
    <div class="contents-header"><h3>줄라이의 소식을 확인해보세요.</h3></div>
    <div class="content-form" v-if="_.isEmpty(Notices)">
      <div class="none">공지사항이 존재하지 않습니다.</div>
    </div>
    <div class="content content-border" v-else>
      <table class="table table-zuly">
        <colgroup>
          <col width="50" />
          <col width="*" />
          <col width="95" />
        </colgroup>
        <thead>
          <tr>
            <th class="index">번호</th>
            <th class="title">제목</th>
            <th class="date">등록일</th>
          </tr>
        </thead>
        <tbody v-if="_.isEmpty(Notices.data)">
          <tr>
            <td colspan="3" class="txt-none">작성된 내역이 없습니다.</td>
          </tr>
        </tbody>
        <tbody v-else>
          <template v-for="(data, idx) in Notices.data">
            <tr class="table-row" :key="'title' + idx">
              <td class="index">{{ data.id }}</td>
              <td class="title" @click="clickTitle(idx)">{{ data.title }}</td>
              <td class="date">{{ data.inserted }}</td>
            </tr>
            <tr
              class="table-row"
              style="display: none;"
              :key="'content' + idx"
              :ref="'content' + idx"
            >
              <td colspan="3" class="align-top">
                <p class="txt-inner">{{ data.content }}</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Closet_Notice',
  computed: {
    ...mapGetters({
      Notices: 'notices/Notices'
    })
  },
  methods: {
    ...mapActions({
      getNotices: 'notices/getNotices'
    }),
    clickTitle(idx) {
      const ref = `content${idx}`;
      // 열려있는 다른거 화면에서 안보이게
      _.forEach(this.$refs, value => {
        value[0].style.display = 'none';
      });
      // 선택한것과 똑같은거만 보이게
      this.$refs[ref][0].style.display = 'table-row';
    }
  },
  created() {
    if (_.isEmpty(this.Notices)) {
      this.getNotices();
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
.none {
  @include fontSize(15px);
}

@media (min-width: 768px) {
  .none {
    @include fontSize(16px);
  }
}
</style>
