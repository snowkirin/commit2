<template>
  <div class="contents">
    <div class="contents-header"><h3>나의 드레스 코드</h3></div>
    <div class="content">
      <div class="grid-flex">
        <div class="column column-left">
          <div class="row blouseFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 블라우스/셔츠는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('blouseFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row skirtFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 스커트는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('skirtFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row pantsFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 팬츠는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('pantsFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row denimFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 데님 팬츠는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('denimFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row dressFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 원피스는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('dressFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row outerFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 아우터(코트, 자켓 등)는 얼마나 자주 받고 싶으신가요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in basicFrequency"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickRequired('outerFrequency', data.code, $event)"
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row challengeFrequency">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                * 평소 입는 스타일과 다른 스타일은 자주 시도하시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in challengeFrequency"
                  :key="idx"
                  class="item w-100 h-50 lang-en"
                  @click="
                    clickRequired('challengeFrequency', data.code, $event)
                  "
                >
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="column column-right">
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                블라우스/셔츠는 평소 어떤 핏을 즐겨입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '슬림',
                    '스탠다드',
                    '루즈핏',
                    '오버사이즈'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('blouseFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                스커트는 평소 어떤 핏을 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in ['A라인', 'H라인', '다양하게']"
                  :key="idx"
                  class="item w-33 h-50 lang-en"
                  @click="clickOptional('skirtFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                스커트는 평소 어떤 길이를 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '무릎 위',
                    '무릎 선',
                    '종아리',
                    '발목'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('skirtLength', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                팬츠는 평소 어떤 핏을 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '스트레이트',
                    '스키니',
                    '와이드',
                    '부츠컷'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('pantsFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                데님 팬츠는 평소 어떤 핏을 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '스트레이트',
                    '스키니',
                    '와이드',
                    '부츠컷'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('denimFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                원피스는 평소 어떤 핏을 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '슬림',
                    '스탠다드',
                    '루즈핏',
                    '오버사이즈'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('dressFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                원피스는 평소 어떤 길이를 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '무릎 위',
                    '무릎 선',
                    '종아리',
                    '발목'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('dressLength', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="form-title-wrap">
              <p class="txt-form-title">
                아우터(코트, 자켓 등)은 평소 어떤 핏을 즐겨 입으시나요?
              </p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  v-for="(data, idx) in [
                    '슬림',
                    '스탠다드',
                    '루즈핏',
                    '오버사이즈'
                  ]"
                  :key="idx"
                  class="item w-25 h-50 lang-en"
                  @click="clickOptional('outerFit', data, $event)"
                >
                  {{ data }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row age">
            <div class="form-title-wrap">
              <p class="txt-form-title">* 연령대</p>
            </div>
            <div>
              <ul class="list-flex">
                <li
                  class="item w-33 h-50"
                  :class="{ selected: joinData.age === data.code }"
                  v-for="(data, idx) in ageRange"
                  :key="idx"
                  @click="clickAgeRange(data.code, $event)"
                >
                  {{ data.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-complete">
      <button type="button" class="btn btn-primary h-56" @click="clickComplete">
        다음(3/4)
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'DressCode',
  data() {
    return {
      basicFrequency: [
        {
          name: '자주',
          code: 15601
        },
        {
          name: '가끔씩',
          code: 15602
        },
        {
          name: '받지 않음',
          code: 15603
        }
      ],
      challengeFrequency: [
        {
          name: '최대한 자주, 새로운 스타일 변화를 즐겨요.',
          code: 15601
        },
        {
          name: '기분전환이 필요할때 가끔 다르게 입고 싶어요.',
          code: 15602
        },
        {
          name: '스타일의 큰 변화는 거의 시도하지 않아요.',
          code: 15603
        }
      ],
      ageRange: [
        {
          text: '20대 초반',
          code: 16001
        },
        {
          text: '20대 중반',
          code: 16002
        },
        {
          text: '20대 후반',
          code: 16003
        },
        {
          text: '30대 초반',
          code: 16004
        },
        {
          text: '30대 중반',
          code: 16005
        },
        {
          text: '30대 후반',
          code: 16006
        },
        {
          text: '40대 초반',
          code: 16007
        },
        {
          text: '40대 중반',
          code: 16008
        },
        {
          text: '40대 후반',
          code: 16009
        }
      ],
      joinData: {
        age: null,
        blouseFrequency: null,
        skirtFrequency: null,
        pantsFrequency: null,
        denimFrequency: null,
        dressFrequency: null,
        outerFrequency: null,
        challengeFrequency: null,
        blouseFit: [],
        skirtFit: [],
        skirtLength: [],
        pantsFit: [],
        denimFit: [],
        dressFit: [],
        dressLength: [],
        outerFit: []
      }
    };
  },
  computed: {
    ...mapGetters({
      Join: 'signup/Join'
    })
  },
  methods: {
    ...mapActions({
      setJoin: 'signup/setJoin'
    }),
    initSetting() {
      console.log(this.Join);
      let objOptional = _.pick(this.Join, [
        'blouseFit',
        'skirtFit',
        'skirtLength',
        'pantsFit',
        'denimFit',
        'dressFit',
        'dressLength',
        'outerFit'
      ]);
      _.forEach(objOptional, (value, key) => {
        objOptional[key] = _.split(value, ',');
      });
      console.log(objOptional);
    },
    clickRequired(target, value, event) {
      const eleTarget =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      if (!eleTarget.classList.contains('selected')) {
        _.forEach(eleTarget.closest('ul').querySelectorAll('li'), value => {
          value.classList.remove('selected');
        });
        eleTarget.classList.add('selected');
        this.joinData[target] = value;
      }
    },
    clickOptional(target, value, event) {
      //includes
      const _target = this.joinData[target];
      const eleTarget =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      if (_.includes(_target, value)) {
        // 이미 선택된 값이라면
        _.pull(_target, value);
        eleTarget.classList.remove('selected');
      } else {
        // 선택되지 않은 값이라면
        _target.push(value);
        eleTarget.classList.add('selected');
      }
    },
    clickAgeRange(data, event) {
      if (!event.target.classList.contains('selected')) {
        this.joinData.age = data;
      }
    },
    clickComplete() {
      let flag = false;
      // 필수값
      let objRequired = _.pick(this.joinData, [
        'blouseFrequency',
        'skirtFrequency',
        'pantsFrequency',
        'denimFrequency',
        'dressFrequency',
        'outerFrequency',
        'challengeFrequency',
        'age'
      ]);

      console.log(navigator.userAgent);

      _.forEach(objRequired, (value, key) => {
        if (!value) {
          this.$dialog.alert(`응답하지 않은 항목이 있습니다.`, {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });

          let target = document.querySelector(`.${key}`);
          window.scrollTo(0, target.offsetTop);
          flag = true;
          return false;
        } else {
          flag = false;
        }
      });

      if (!flag) {
        let objOptional = _.pick(this.joinData, [
          'blouseFit',
          'skirtFit',
          'skirtLength',
          'pantsFit',
          'denimFit',
          'dressFit',
          'dressLength',
          'outerFit'
        ]);
        _.forEach(objOptional, (value, key) => {
          objOptional[key] = _.toString(objOptional[key]);
        });
        let objOriginal = _.clone(this.joinData);
        _.assign(objOriginal, objOptional);
        this.setJoin(objOriginal);
        this.$router.push({
          path: '/join/user-info'
        });
      }
    }
  },
  mounted() {
    // this.initSetting();
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/join-style.scss"></style>
<style scoped lang="scss">
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

@media screen and (min-width: 768px) {
  .column > .row {
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
