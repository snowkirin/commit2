<template>
  <div class="notice">
    <p class="txt-main-title">
      줄라이의 소식을 확인해보세요.
    </p>
    <div class="line line__default"></div>

    <div
      v-if="noticeList.length > 0">
      <table class="table table-notice">
        <colgroup>
          <col :width="$mq !== 'sm'? 82 : 30">
          <col width="*">
          <col :width="$mq !== 'sm'? 166 : 86">
        </colgroup>
        <thead>
        <tr>
          <th class="txt-index">번호</th>
          <th class="txt-title">제목</th>
          <th class="txt-date">등록일</th>
        </tr>
        </thead>
        <tbody
          v-for="(data, index) in noticeList"
          :key="index"
          @click="noticeView(data.id)">
        <tr class="row row-info">
          <td class="txt-index">
            {{ data.id }}
          </td>
          <td class="txt-title">
            {{ data.title }}
            <!--TODO: 콘솔 warning check-->
            <span
              v-show="$moment().diff($moment(data.inserted), 'days') < 7"
              class="new-content">
              New
            </span>
          </td>
          <td class="txt-date">{{ data.inserted }}</td>
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
      .txt-index,
      .txt-date {
        text-align: center;
      }
      .txt-index {
        width: 29px;
      }
      .txt-title {
        padding-left: 17px;
      }
      .txt-date {
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
          .txt-index {
            text-align: center;
          }
          .txt-date {
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

  @media (min-width: 768px) {
    .notice {
      padding-top: 32px;
      padding-right: 0;
      padding-bottom: 0;
      padding-left: 0;
      width: 1200px;
      margin: 0 auto;
      .table-notice {
        thead {
          th {
            height: 43px;
            font-size: 15px;
            line-height: 21px;
            letter-spacing: -1px;
            color: #333;
          }
        }
        tbody {
          .txt-index,
          .txt-title,
          .txt-date {
            font-size: 16px;
            letter-spacing: -1px;
          }
          .row-content {
            td {
              padding: 25px 30px;
              background-color: #f5f5f5;
              font-size: 15px;
              letter-spacing: -0.6px;
            }
          }
        }
      }
    }
    .line {
      border-width: 2px;
    }

  }
</style>
