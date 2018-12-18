<template>
  <div class="contents">
    <div class="contents-header">
      <h3>사이즈</h3>
      <p>즐겨입는 옷의 사이즈와 체형 관련 정보를 입력해주세요.</p>
    </div>
    <form>
      <div class="content">
        <div class="grid-flex">
          <div class="column column-left">
            <div class="row">
              <FlexList
                title="블라우스/셔츠"
                :data="Sizes.blouse"
                textExpress="name"
                :excludeData="['44','44반','66반','77']"
                :column="4"
                :height="50"
                @extractFunc="setSizes('blouse', ...arguments)"
                extractData="code"
                :watchData="sizesData.blouseSize"
              />
            </div>
            <div class="row">
              <FlexList
                title="치마"
                :data="Sizes.skirt"
                textExpress="name"
                :excludeData="['44','44반','66반','77']"
                :column="4"
                :height="50"
                @extractFunc="setSizes('skirt', ...arguments)"
                extractData="code"
                :watchData="sizesData.skirtSize"
              />
            </div>
            <div class="row">
              <FlexList
                title="바지 (inch)"
                :data="Sizes.pants"
                textExpress="name"
                :excludeData="['25','30','31']"
                :column="4"
                :height="50"
                @extractFunc="setSizes('pants',...arguments)"
                extractData="code"
                :watchData="sizesData.pantsSize"
              />
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">키 (cm)</p>
              </div>
              <div>
                <div
                  class="text-field"
                  :class="{ 'text-field-error': errors.has('tallSize') }"
                >
                  <input
                    type="text"
                    name="tallSize"
                    minlength="3"
                    maxlength="3"
                    ref="tallSize"
                    v-model.number="sizesData.tallSize"
                    v-validate="{ required: true, regex: /^\d+$/ }"
                    data-vv-as="키"
                    placeholder="최근 측정한 키를 입력해주세요."
                  />
                </div>
                <p class="txt-error" v-show="errors.has('tallSize')">
                  {{ errors.first('tallSize') }}
                </p>
              </div>
            </div>
          </div>
          <div class="column column-right">
            <div class="row">
              <FlexList
                title="가슴둘레 (브래지어 기준)"
                :data="bustData"
                textExpress="code"
                :column="4"
                :height="50"
                @extractFunc="setSizes('bust',...arguments)"
                extractData="code"
                :watchData="bustResult"
              />
              <!-- 여기에 Validation이 있음-->
            </div>
            <div class="row">
              <FlexList
                title="컵"
                :data="cupData"
                textExpress="code"
                :column="4"
                :height="50"
                @extractFunc="setSizes('cup',...arguments)"
                extractData="code"
                :watchData="cupResult"
              />
            </div>
            <div class="row">
              <div class="form-title-wrap">
                <p class="txt-form-title">체형</p>
              </div>
              <div class="body-type">
                <p
                  v-if="!_.isEmpty(bodyTypeText)"
                  class="txt-body-type"
                >
                  {{ bodyTypeText }}
                </p>
                <ul class="list-body-type">
                  <li
                    :class="{ selected: sizesData.bodyType === data.code }"
                    v-for="(data, idx) in Sizes.body_type"
                    :key="idx"
                    @click="setSizes('bodyType', data.code, $event)"
                  >
                    <img
                      :src="
                        `${require('@/assets/img/signup/img_body' +
                          (idx + 1) +
                          '.png')}`
                      "
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          type="button"
          class="btn btn-primary h-56"
          @click="clickComplete"
        >
          <span>다음(1/4)</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FlexList from '@/components/common/FlexList';

export default {
  name: 'size',
  components: {
    FlexList
  },
  data() {
    return {
      dialogOptions: {
        okText: '확인',
        customClass: 'zuly-alert',
        backdropClose: true
      },
      // 회원가입이 필요한 데이터 집어 넣기.
      sizesData: {
        blouseSize: null,
        skirtSize: null,
        pantsSize: null,
        tallSize: null,
        bustSize: null,
        bodyType: null
      },
      //
      bustData: [
        {
          code: 60
        },
        {
          code: 65
        },
        {
          code: 70
        },
        {
          code: 75
        },
        {
          code: 80
        },
        {
          code: 85
        },
        {
          code: 90
        },
        {
          code: 95
        },
        {
          code: 100
        },
        {
          code: 105
        },
        {
          code: 110
        },
        {
          code: 115
        }
      ],
      cupData: [
        {
          code: 'A'
        },
        {
          code: 'B'
        },
        {
          code: 'C'
        },
        {
          code: 'D'
        }
      ],
      //
      bustResult: null,
      cupResult: null,
      //
      bodyTypeText: ''
    };
  },
  watch: {
    bustCombination() {
      this.sizesData.bustSize = `${this.bustResult}${this.cupResult}`;
    }
  },
  computed: {
    ...mapGetters({
      // 사이즈 리스트 정보가져오기
      Sizes: 'common/Sizes',
      // 회원가입을 위해 입력한 사이즈 데이터 가져오기
      SizesForMembership: 'join/SizesForMembership'
    }),
    bustCombination() {
      //복수의 데이터값이 변경되었을때 watch에서 감지할 수 있게 묶어주는 함수.
      /*
      * UPDATE To skip the performance penalty of allocating and discarding an array, you can comma-separate all the dependent values, and finally return something that will always be different (Date.now() taking from comments below this):
      * */
      return this.bustResult, this.cupResult, Date.now();
    }
  },
  methods: {
    ...mapActions({
      FETCH_SIZES: 'common/FETCH_SIZES',
      // 사이즈 데이터를 스토어에 저장하는 액션
      ADD_SIZES_DATA: 'join/ADD_SIZES_DATA'
    }),
    setSizes(type, param) {
      switch (type) {
        case 'blouse':
          this.sizesData.blouseSize = param;
          break;
        case 'skirt':
          this.sizesData.skirtSize = param;
          break;
        case 'pants':
          this.sizesData.pantsSize = param;
          break;
        case 'bust':
          this.bustResult = param;
          break;
        case 'cup':
          this.cupResult = param;
          break;
        case 'bodyType':
          this.sizesData.bodyType = param;
          this.changeBodyTypeText();
          break;
        default:
          console.error('조건에 맞는 타입이 없습니다.');
      }
    },
    clickComplete() {
      // Validation 체크
      if (!this.sizesData.blouseSize) {
        this.$dialog.alert(
          '블라우스/셔츠 항목을 확인해 주세요.',
          this.dialogOptions
        );
        return;
      }
      if (!this.sizesData.skirtSize) {
        this.$dialog.alert('치마 항목을 확인해 주세요.', this.dialogOptions);
        return;
      }
      if (!this.sizesData.pantsSize) {
        this.$dialog.alert('바지 항목을 확인해 주세요.', this.dialogOptions);
        return;
      }
      if (!this.sizesData.tallSize) {
        this.$dialog.alert('키 항목을 확인해 주세요.', this.dialogOptions);
        return;
      }
      if (!this.bustResult) {
        this.$dialog.alert(
          '가슴둘레 항목을 확인해 주세요.',
          this.dialogOptions
        );
        return;
      }
      if (!this.cupResult) {
        this.$dialog.alert('컵 항목을 확인해 주세요.', this.dialogOptions);
        return;
      }
      if (!this.sizesData.bodyType) {
        this.$dialog.alert('체형 항목을 확인해 주세요.', this.dialogOptions);
        return;
      }
      // Validation 체크후 vuex로 데이터 저장
      this.ADD_SIZES_DATA({ ...this.sizesData });

      // 다음페이지로 이동
      this.$router.push({
        path: '/join/preferred-style'
      });
    },
    changeBodyTypeText() {
      if (this.sizesData.bodyType === 12701) {
        this.bodyTypeText =
          '허리둘레와 엉덩이 둘레가 거의 같으며 골격이 잘 발달되지 않은 보이쉬한 일자형 체형입니다.';
      } else if (this.sizesData.bodyType === 12702) {
        this.bodyTypeText =
          '전체적으로 어깨가 잘 발달되어 상체가 넓고 아래로 내려갈수록 점점 작아지는 체형입니다.';
      } else if (this.sizesData.bodyType === 12703) {
        this.bodyTypeText =
          '전반적으로 상체에 살이 많고 배가 조금 나온, 둥글둥글한 모습을 띠고 있는 체형입니다.';
      } else if (this.sizesData.bodyType === 12704) {
        this.bodyTypeText =
          '어깨에 비해서 히프 사이즈가 크고 하체로 갈수록 점점 넓어지는 한국인에게 흔히 볼 수 있는 체형입니다.';
      } else if (this.sizesData.bodyType === 12705) {
        this.bodyTypeText =
          '가슴둘레와 엉덩이 둘레는 거의 비슷한데, 허리는 가는 이상적인 체형입니다.';
      }
    }
  },
  async created() {
    // Sizes 관련 데이터가 없으면 호출
    if (_.isEmpty(this.Sizes)) {
      await this.FETCH_SIZES();
    }

    // 기존에 입력된 값들이 있으면 그 값을 넣어준다.
    if (!_.isEmpty(this.SizesForMembership)) {
      if (this.SizesForMembership.bustSize) {
        this.bustResult = _.parseInt(
          this.SizesForMembership.bustSize.replace(/[^0-9]/g, '')
        );
        this.cupResult = this.SizesForMembership.bustSize.replace(
          /[^A-Z]/g,
          ''
        );
      }
      this.sizesData = { ...this.SizesForMembership };
    }
  },
  mounted() {
    this.changeBodyTypeText();
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/join-style.scss">
</style>
<style scoped lang="scss">
.list-flex {
  background-color: #f5f5f5;
}
.column-left {
  .row {
    &:first-child {
      margin-top: 0;
    }
  }
}
.row {
  margin-top: 30px;
}
.txt-body-type {
  @include fontSize(14px);
  text-align: center;
  color: #797979;
  padding: 9px 27px 11.3px;
  background-color: #f5f5f5;
  margin-bottom: 10px;
}
.list-body-type {
  list-style: none;
  font-size: 0;
  text-align: center;
  margin-left: -8px;
  margin-top: -10px;
  li {
    display: inline-block;
    margin-left: 8px;
    margin-top: 10px;
    width: 106px;
    height: 178px;
    border: 1px solid #c4c4c4;
    cursor: pointer;
    img {
      max-width: 100%;
      max-height: 100%;
      opacity: 0.3;
    }
    &.selected {
      outline: 2px solid #333;
      outline-offset: -2px;
      opacity: 1;
      img {
        opacity: 1;
      }
    }
  }
}
/* Desktop Style */
@media screen and (min-width: 768px) {
  .body-type {
    .txt-body-type {
      @include fontSize(15px);
      padding: 12px 27px;
    }
    .list-body-type {
      text-align: center;
    }
  }
  .column > .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
