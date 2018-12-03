<template>
  <div class="contents">
    <div class="contents-header">
      <h3>선호 스타일</h3>
      <p>어떤 스타일을 받고 싶으신가요?</p>
    </div>
    <form name="preferredStyleForm">
      <div class="content">
        <div class="grid-flex list-preferred-style">
          <div
            class="column"
            :class="{'w-50': $mq === 'sm', 'w-33': $mq === 'md', 'w-25': $mq === 'lg'}"
            v-for="(data, idx) in MemberStyleType"
            :key="idx"
          >
            <div
              class="item"
              @click="clickPreferredStyle(data, $event)"
            >
              <span class="icon-heart">
                <svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                <g transform="translate(-153.000000, -246.000000)" fill="#ffffff" class="svg">
                    <path
                      d="M163,264.333333 L162.653278,264.036854 C155.057295,257.540361 153,255.253502 153,251.538828 C153,248.484719 155.366214,246 158.27466,246 C160.705257,246 162.079149,247.449523 163,248.539922 C163.920851,247.449523 165.294743,246 167.72534,246 C170.633786,246 173,248.484719 173,251.538828 C173,255.253502 170.942705,257.540361 163.346722,264.036854 L163,264.333333 Z"
                      id="Fill-1"></path>
                </g>
              </svg>
              </span>
              <div>
                <img :src="$common.IMAGEURL() + data.image_path"/>
                <!--<img :src="$common.ZulyImage(data.image_width) + data.image_path" alt="">-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          class="btn btn-primary h-56"
          type="button"
          :disabled="totalSelected === 0"
          @click="clickComplete"
        >
          다음(2/4)
        </button>
      </div>
    </form>
    <simplert ref="alert" :useRadius="false" :useIcon="false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Simplert from 'vue2-simplert';

const alertObject = {
  type: 'alert', // 타입
  customClass: 'popup-custom-class', // 커스텀 클래스 네임
  disableOverlayClick: false, // 오버레이 클릭시 닫기 방지
  customCloseBtnText: '확인' // 닫기 버튼 텍스트
};

export default {
  name: 'PreferredStyle',
  components: {
    Simplert
  },
  data: function() {
    return {
      startTime: 0,
      totalSelected: 0,
      clickHistory: [],
      preferredStyleData: {
        selectCntT: 0,
        selectCntM: 0,
        selectCntC: 0,
        selectCntF: 0,
        selectSeq: '',
        selectDuration: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      MemberStyleType: 'member/MemberStyleType',
      Join: 'signup/Join',
      EnterJoin: 'signup/EnterJoin'
    })
  },
  methods: {
    ...mapActions({
      getMemberStyleType: 'member/getMemberStyleType',
      setJoin: 'signup/setJoin'
    }),
    clickPreferredStyle(data, event) {
      const item = event.target.closest('.item');

      if (!item.classList.contains('selected')) {
        if (this.totalSelected === 6) {
          _.assign(alertObject, {
            message: '최대 6개까지 선택 가능합니다.'
          });
          this.$refs.alert.openSimplert(alertObject);
          return;
        }
        if (data.style_type === 'T') {
          // T 일 경우
          this.preferredStyleData.selectCntT++;
        } else if (data.style_type === 'M') {
          // M 일 경우
          this.preferredStyleData.selectCntM++;
        } else if (data.style_type === 'C') {
          // C 일 경우
          this.preferredStyleData.selectCntC++;
        } else {
          // F 일 경우
          this.preferredStyleData.selectCntF++;
        }

        this.totalSelected++;
        item.classList.add('selected');
      } else {
        if (data.style_type === 'T') {
          // T 일 경우
          this.preferredStyleData.selectCntT--;
        } else if (data.style_type === 'M') {
          // M 일 경우
          this.preferredStyleData.selectCntM--;
        } else if (data.style_type === 'C') {
          // C 일 경우
          this.preferredStyleData.selectCntC--;
        } else {
          // F 일 경우
          this.preferredStyleData.selectCntF--;
        }
        this.totalSelected--;
        item.classList.remove('selected');
      }
      this.clickHistory.push(data.image_id);
    },
    clickComplete() {
      this.preferredStyleData.selectDuration = new Date() - this.startTime;
      this.preferredStyleData.selectSeq = _.toString(this.clickHistory);
      this.setJoin(this.preferredStyleData);
      this.$router.push({
        path: '/join/user-info'
      });
    }
  },
  async created() {
    // 페이지 시작 시작
    this.startTime = new Date();
    if (_.isEmpty(this.MemberStyleType)) {
      await this.getMemberStyleType();
    }
  },
  mounted() {
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/join-style.scss">
</style>
<style scoped lang="scss">
.list-preferred-style {
  margin-left: -15px;
  margin-top: -15px;
  .column {
    padding-left: 15px;
    margin-top: 15px;
  }
  .item {
    position: relative;
    cursor: pointer;
    .icon-heart {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
    }
    &::before {
      content: '';
      display: block;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      position: absolute;
      left: 2px;
      top: 2px;
      background-color: rgba(0, 0, 0, 0.07);
      z-index: 10;
    }
    &.selected {
      outline: 2px solid $color-primary;
      outline-offset: -2px;

      &:after {
        content: '';
        display: block;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        position: absolute;
        left: 2px;
        top: 2px;
        background-color: rgba(0, 0, 0, 0.14);
        z-index: 20;
      }
      .icon-heart {
        .svg {
          fill: $color-primary;
        }
      }
    }
  }

  img {
    width: 100%;
  }
}
</style>
