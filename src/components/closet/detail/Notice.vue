<template>
  <div class="notice">
    <p class="txt-main-title">
      줄라이의 소식을 확인해보세요.
    </p>
    <div class="line line__default"></div>

    <div
      v-if="noticeList.length > 0">
      <table class="table table-notice">
        <!--<colgroup>
          <col width="27">
          <col width="*">
          <col width="90">
        </colgroup>-->
        <thead>
        <tr>
          <th class="number">번호</th>
          <th class="title">제목</th>
          <th class="date">등록일</th>
        </tr>
        </thead>
        <tbody
          v-for="(data, index) in noticeList"
          :key="index"
          @click="noticeView(data.id)">
        <tr class="row row-info">
          <td class="number">
            {{ data.id }}
          </td>
          <td class="title">
            {{ data.title }}
            <!--TODO: 콘솔 warning check-->
            <span
              v-show="$moment().diff($moment(data.inserted), 'days') < 7"
              class="new-content">
              New
            </span>
          </td>
          <td class="date">{{ data.inserted }}</td>
        </tr>
        <tr
          v-bind:key="'data_'+ index"
          class="row row-content"
          :data-id="data.id">
          <td colspan="3" v-html="contentReplace(data)"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>등록된 내용이 없는걸?</p>
    </div>

    <!--<div class="closet-content mt30">-->
      <!--<div class="notice-rows notice-header">-->
        <!--<div class="notice-number">번호</div>-->
        <!--<div class="notice-subject">제목</div>-->
        <!--<div class="notice-regdate">등록일</div>-->
      <!--</div>-->
      <!--<template v-if="noticeList.length > 0" v-for="(notice, k) in noticeList">-->
        <!--<div v-bind:key="k" class="notice-content notice-rows" @click="noticeView(notice.id)">-->
          <!--<div class="notice-number">-->
            <!--{{ noticeList.length - k }}-->
          <!--</div>-->
          <!--<div class="notice-subject">-->
            <!--{{ notice.title }}-->
            <!--<span v-show="$moment().diff($moment(notice.inserted), 'days') < 7" class="new-content">new</span>-->
          <!--</div>-->
          <!--<div class="notice-regdate">-->
            <!--{{ notice.inserted }}-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-bind:key="'data_'+ k" class="notice-rows-data" :data-id="notice.id">-->
          <!--<span v-html="contentReplace(notice)"></span>-->
        <!--</div>-->
      <!--</template>-->
      <!--<template v-else>-->
        <!--<div class="notice-content">-->
          <!--등록된 내용이 존재하지 않습니다.-->
        <!--</div>-->
      <!--</template>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'notice',
  computed: {
    ...mapGetters({
      noticeList: 'mypage/notice/getNoticeList',
    }),
  },
  methods: {
    ...mapActions({
      setNoticeList: 'mypage/notice/setNoticeList',
    }),
    noticeView(id) {
      const noticeContent = document.querySelector(`[data-id="${id}"]`);

      if (noticeContent.style.display === 'none' || noticeContent.style.display === '') noticeContent.style.display = 'table-row';
      else noticeContent.style.display = 'none';
    },
    contentReplace(text) {
      const result = this.$common.enterReplace(text.content);
      return result;
    },
  },
  created() {
    this.setNoticeList();
  },
};
</script>

<style scoped lang="scss">
  .notice {
    padding: {
      top: 24px;
      left: 18px;
      right: 18px;
      bottom: 20px;
    }
    .line {
      margin-top: 16px;
    }
    .table-notice {
      width: 100%;
      table-layout: fixed;
      border-bottom: 1px solid #333;
      .number,
      .date {
        text-align: center;
      }
      .number {
        width: 29px;
      }
      .title {
        padding-left: 17px;
      }
      .date {
        width: 103px;
      }
      thead {
        th {
          font-size: 15px;
          line-height: 21px;
          letter-spacing: -0.6px;
          height: 43px;
        }

      }
      tbody {
        .row {
          td {
            border-top: 1px solid #e9e9e9;
          }
        }
        .row-info {
          td {
            height: 54px;
            font-size: 15px;
            line-height: 23px;
            letter-spacing: -0.6px;
          }
          .number {
            text-align: center;
          }
          .date {
            font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
            letter-spacing: 0;
          }
        }
        // 클릭시 보여지는 컨텐츠
        .row-content {
          display: none;
          td {
            padding: 10px;
            background-color: #f5f5f5;
            font-size: 14px;
            letter-spacing: -0.6px;
          }
        }
      }
    }
  }
/*.notice-rows {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #333333;
  border-bottom: solid 2px #e9e9e9;
  cursor: pointer;
}

.notice-header {
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}

.notice-content {
  height: 50px;
  line-height: 50px;
}

.notice-number {
  width: 6%;
  text-align: center;
}

.notice-subject {
  width: 84%;
}

.notice-regdate {
  width: 10%;
  text-align: center;
}

.no-data {
  justify-content: center;
}

.new-content {
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #f45649;
}

.notice-rows-data {
  display: none;
  background-color: #f5f5f5;
  padding: 22px 30px;
  line-height: 1.4;
  font-size: 14px;
}

@media screen and (max-width: 486px) {
  .notice-number {
    width: 15% !important;
  }

  .notice-subject {
    width: 60% !important;
  }

  .notice-regdate {
    width: 25% !important;
  }
}*/
</style>
