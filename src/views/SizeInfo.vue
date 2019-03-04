<template>
  <div>
    <div class="content" id="content">
      <JoinTitle>
        <h3 slot="header">사이즈</h3>
        <p slot="content">어쩌구 저쩌구구구구구구구구</p>
      </JoinTitle>
      <div>
        <FlexList
          title="블라우스/셔츠"
          :listData="codeData.blouse"
          @func="clickList('blouseSize', ...arguments)"
        />
      </div>
      <div>
        <FlexList
          title="치마"
          :listData="codeData.skirt"
          @func="clickList('skirtSize', ...arguments)"
        />
      </div>
      <div>
        <FlexList
          title="바지(inch)"
          :listData="codeData.pants"
          @func="clickList('pantsSize', ...arguments)"
        />
      </div>
      <div>
        <p>키(cm)</p>
        <ZulyInput v-model="sizeData.tall"/>
      </div>
      <div>
        <FlexList
          title="가슴둘레(브래지어 기준)"
          :listData="codeData.bust"
          @func="clickList('bust', ...arguments)"
        />
      </div>
      <div>
        <FlexList
          title="컵"
          :listData="codeData.cup"
          @func="clickList('cup', ...arguments)"
        />
      </div>
      <div>
        <BodyType
          :listData="codeData.bodyType"
          @func="clickList('bodyType', ...arguments)"
        />
      </div>
    </div>
      <button
        type="button"
        class="btn btn-success"
        @click="onSubmit"
      >
        다음
      </button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import JoinTitle from '@/components/Join/Title.vue';
  import FlexList from '@/components/Common/FlexList.vue';
  import ZulyInput from '@/components/Common/Input.vue';
  import BodyType from '@/components/Join/BodyType.vue';

  export default {
    name: "SizeInfo",
    components: {
      JoinTitle,
      FlexList,
      ZulyInput,
      BodyType
    },
    data() {
      return {
        codeData: {
          "blouse": [
            {
              "code": 13801,
              "name": "44",
              "exception": true,
            },
            {
              "code": 13805,
              "name": "44반",
              "exception": true,
            },
            {
              "code": 13802,
              "name": "55",
              "exception": false,
            },
            {
              "code": 13806,
              "name": "55반",
              "exception": false,
            },
            {
              "code": 13803,
              "name": "66",
              "exception": false,
            },
            {
              "code": 13807,
              "name": "66반",
              "exception": true,
            },
            {
              "code": 13804,
              "name": "77",
              "exception": true,
            }
          ],
          "skirt": [
            {
              "code": 13901,
              "name": "44",
              "exception": true,
            },
            {
              "code": 13905,
              "name": "44반",
              "exception": true,
            },
            {
              "code": 13902,
              "name": "55",
              "exception": false,
            },
            {
              "code": 13906,
              "name": "55반",
              "exception": false,
            },
            {
              "code": 13903,
              "name": "66",
              "exception": false,
            },
            {
              "code": 13907,
              "name": "66반",
              "exception": true,
            },
            {
              "code": 13904,
              "name": "77",
              "exception": true,
            }
          ],
          "pants": [
            {
              "code": 14001,
              "name": "25",
              "exception": true,
            },
            {
              "code": 14002,
              "name": "26",
              "exception": false,
            },
            {
              "code": 14003,
              "name": "27",
              "exception": false,
            },
            {
              "code": 14004,
              "name": "28",
              "exception": false,
            },
            {
              "code": 14005,
              "name": "29",
              "exception": false,
            },
            {
              "code": 14006,
              "name": "30",
              "exception": true,
            },
          ],
          "bust": [
            {
              name: '60',
              code: 60,
            },
            {
              name: '65',
              code: 65,
            },
            {
              name: '70',
              code: 70,
            },
            {
              name: '75',
              code: 75,
            },
            {
              name: '80',
              code: 80,
            },
            {
              name: '85',
              code: 85,
            },
            {
              name: '90',
              code: 90,
            },
            {
              name: '95',
              code: 95,
            },
            {
              name: '100',
              code: 100,
            },
            {
              name: '105',
              code: 105,
            },
            {
              name: '110',
              code: 110,
            },
            {
              name: '115',
            }
          ],
          "cup": [
            {
              name: 'A',
              code: 'A'
            },
            {
              name: 'B',
              code: 'B'
            },
            {
              name: 'C',
              code: 'C'
            },
            {
              name: 'D',
              code: 'D'
            },
          ],
          "bodyType": [
            {
              "code": 12701,
              "name": "직사각형",
              "description": "허리둘레와 엉덩이 둘레가 거의 같으며 골격이 잘 발달되지 않은 보이쉬한 일자형 체형입니다.",
            },
            {
              "code": 12702,
              "name": "역삼각형",
              "description": "전체적으로 어깨가 잘 발달되어 상체가 넓고 아래로 내려갈수록 점점 작아지는 체형입니다.",
            },
            {
              "code": 12703,
              "name": "사과형",
              "description": "전반적으로 상체에 살이 많고 배가 조금 나온, 둥글둥글한 모습을 띠고 있는 체형입니다.",
            },
            {
              "code": 12704,
              "name": "삼각형",
              "description": "어깨에 비해서 히프 사이즈가 크고 하체로 갈수록 점점 넓어지는 한국인에게 흔히 볼 수 있는 체형입니다.",
            },
            {
              "code": 12705,
              "name": "모래시계형",
              "description": "가슴둘레와 엉덩이 둘레는 거의 비슷한데, 허리는 가는 이상적인 체형입니다",
            }
          ],
        },
        sizeData: {
          blouseSize: '',
          skirtSize: '',
          pantsSize: '',
          tall: '',
          bust: '',
          cup: '',
          bodyType: '',

        }
      }
    },
    methods: {
      ...mapActions({
        SaveJoinData: 'join/SaveJoinData'
      }),
      clickList(type, param) {
        this.sizeData[type] = param.code;
      },
      onSubmit() {
        // Validation Check
        _.forEach(this.sizeData, (value, key) => {
          if (!value) {
            // Failed
            alert(`${key}값이 없음`);
            return false;
          } else {
            // Success
            this.SaveJoinData('size-info', this.sizeData);
            this.$router.push({
              path: '/join/preferred-style'
            });
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.btn-success {
  background-color: #3d3d35;
  color: #fff;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
