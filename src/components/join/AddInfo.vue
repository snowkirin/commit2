<template>
  <div>
    <p>
      {{ '김용주'}}님 <br/>
      가입을 환영합니다.
    </p>
    <p>고객님에 대해 조금 더 자세히 알려주시면 더 어울리는 아이템을 보내드릴 수 있습니다.</p>
    <!-- Color & Pattern -->
    <div>
      <p>[선택] 손이 가는 옷 색상이나 패턴</p>
      <div>
        <ul class="list-color">
          <li
            v-for="(data, idx) in addInfoData.prefer_color"
            :key="idx"
            @click="clickColor(data, $event)">
            <div class="txt-centering" >
              <span>{{data.name}}</span>
            </div>
          </li>
        </ul>
        <ul class="list-pattern">
          <li
            v-for="(data, idx) in addInfoData.prefer_pattern"
            :key="idx"
            @click="clickPattern(data, $event)"
            :class="patternName(data.name)">
            <div class="txt-centering">
              <span>{{data.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Brand -->
    <div>
      <p>[선택] 주로 구매하는 브랜드?</p>
      <div>
        <input
          type="text"
          placeholder="한 개 이상인 경우 콤마(,)로 구분하여 입력해 주세요"
          v-mdodel="memberStyle.preferBrand">
      </div>
    </div>

    <!--Dress Code-->
    <div>
      <ul class="list-dresscode">
        <li
          v-for="(data, idx) in addInfoData.dress_code"
          :class="dressCodeName(data.name)"
          :key="idx">
          <span class="text">{{ data.name }}</span>
        </li>
      </ul>
    </div>

    <!-- 업로드 -->
    <div>
      <p>[선택] My Daily Look - 사진을 올려주세요.</p>

    </div>
    <!-- 추가 요청사항-->
    <div>
      <p>[선택] 추가 요청사항</p>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'addinfo',
    components: {
    },
    computed: {
    },
    data() {
      return {
        addInfoData: {
          "prefer_color": [
            {
              "code": 14101,
              "name": "무채색",
              "description": null
            },
            {
              "code": 14102,
              "name": "녹색",
              "description": null
            },
            {
              "code": 14103,
              "name": "베이지",
              "description": null
            },
            {
              "code": 14104,
              "name": "보라",
              "description": null
            },
            {
              "code": 14105,
              "name": "빨강",
              "description": null
            },
            {
              "code": 14106,
              "name": "노랑",
              "description": null
            },
            {
              "code": 14107,
              "name": "파랑",
              "description": null
            },
            {
              "code": 14108,
              "name": "상관없음",
              "description": null
            }
          ],
          "prefer_pattern": [
            {
              "code": 14201,
              "name": "스트라이프",
              "description": null
            },
            {
              "code": 14202,
              "name": "체크",
              "description": null
            },
            {
              "code": 14203,
              "name": "플로랄",
              "description": null
            }
          ],
          "dress_code": [
            {
              "code": 14301,
              "name": "캐주얼",
              "description": null
            },
            {
              "code": 14302,
              "name": "캐주얼 정장",
              "description": null
            },
            {
              "code": 14303,
              "name": "세미 정장",
              "description": null
            },
            {
              "code": 14304,
              "name": "정장",
              "description": null
            }
          ]
        },
        memberStyle: {
          preferColor: null,
          preferPattern: null,
          preferBrand: null,
          dressCode: null,
          requirement: null,
        }
      }
    },
    methods: {
      clickColor(data, event){
        // TODO: 데이터 집어넣는거 할것.
        let $parent = document.querySelector('.list-color');
        let eleTarget = null;
        if (event.target.nodeName === 'DIV') {
          eleTarget = event.path[1];
        } else if (event.target.nodeName === 'SPAN') {
          eleTarget = event.path[2];
        }
        _.forEach($parent.querySelectorAll('li'), function(value) {
          value.style.backgroundColor = '#fff';
          value.classList.remove('selected');
        });
        switch (data.name) {
          case '무채색':
            eleTarget.style.backgroundColor = '#bbbbbb';
            break;
          case '녹색':
            eleTarget.style.backgroundColor = '#749c09';
            break;
          case '베이지':
            eleTarget.style.backgroundColor = '#e3cea9';
            break;
          case '보라':
            eleTarget.style.backgroundColor = '#960af1';
            break;
          case '빨강':
            eleTarget.style.backgroundColor = '#dc3f39';
            break;
          case '노랑':
            eleTarget.style.backgroundColor = '#eacd1b';
            break;
          case '파랑':
            eleTarget.style.backgroundColor = '#0e7fc9';
            break;
          case '상관없음':
            eleTarget.style.backgroundColor = '#333333';
            break;
          default:
            console.log('Noting');
        }
        eleTarget.classList.add('selected');
        this.memberStyle.preferColor = data.code;
      },
      clickPattern(data, event) {
        let $parent = document.querySelector('.list-pattern');
        let eleTarget = null;
        if (event.target.nodeName === 'DIV') {
          eleTarget = event.path[1];
        } else if (event.target.nodeName === 'SPAN') {
          eleTarget = event.path[2];
        }
        _.forEach($parent.querySelectorAll('li'), function(value) {
          value.style.backgroundColor = '#fff';
          value.classList.remove('selected');
        });
        eleTarget.classList.add('selected');
        this.memberStyle.preferPattern = data.code;
      },
      patternName(data) {
        if (data === '스트라이프') {
          return 'stripe';
        } else if (data === '체크') {
          return 'check';
        } else {
          return 'floral';
        }
      },
      dressCodeName(data) {
        if (data === '캐주얼') {
          return 'casual';
        } else if (data === '캐주얼 정장') {
          return 'casual-suit';
        } else if (data === '세미 정장') {
          return 'semi-suit';
        } else if (data === '정장') {
          return 'suit';
        }
      },
    },
    async created() {
    },
    mounted() {
    },
  };
</script>

<style scoped lang="scss">
  @mixin clearfix {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  @mixin txtListStyle {
    font-size: 15px;
    line-height: 25px;
    letter-spacing: -0.6px;
    &.selected {
      font-weight: 700;
    }
  }
  .list-color {
    @include clearfix;
    margin-left: -9px;
    margin-top: -10px;
    li {
      @include txtListStyle;
      float: left;
      width: 163px;
      height: 50px;
      color: #bbb;
      border: 1px solid #c4c4c4;
      margin-left: 9px;
      margin-top: 10px;
      &.selected {
        color: #fff;
        /*font-weight: 700;*/
      }
    }
  }

  .list-pattern {
    @include clearfix;
    li {
      width: 106px;
      height: 50px;
      border: 1px solid #c4c4c4;
      background-size: 110%;
      float: left;
      margin-left: 7px;
      color: #bbb;
      size: 15px;
      line-height: 25px;
      letter-spacing: -.6px;
      @include txtListStyle;
      /*font-size: 15px;
      line-height: 25px;
      letter-spacing: -0.6px;*/
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: #333;
        border: 2px solid #333;
      }
      .txt-centering {
        span {
          background-color: #fff;
          padding: 0 2px;
        }
      }
    }
    .stripe {
      background-image: url('/static/img/signup/img_patten_1.png');
    }
    .check {
      background-image: url('/static/img/signup/img_patten_2.png');
    }
    .floral {
      background-image: url('/static/img/signup/img_patten_3.png');
    }
  }

  .list-dresscode {
    @include clearfix;
    margin-left: -8px;
    margin-top: -10px;
    li {
      float: left;
      width: 163px;
      height: 245px;
      margin-left: 8px;
      margin-top: 10px;
      /* 임시 */
      background-size: cover;
      position: relative;
    }
    .casual {
      background-image: url(/static/img/signup/img_clothes_1.png);
    }
    .casual-suit {
      background-image: url(/static/img/signup/img_clothes_2.png);
    }
    .semi-suit {
      background-image: url(/static/img/signup/img_clothes_3.png);
    }
    .suit {
      background-image: url(/static/img/signup/img_clothes_4.png);
    }
  }

</style>
