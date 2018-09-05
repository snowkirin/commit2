<template>
  <div class="contents">
    <div class="contents-header">
      <h3>{{ Authentication.userName }}님<br/>가입을 환영합니다.</h3>
      <p>고객님에 대해 조금 더 자세히 알려주시면 더 어울리는 아이템을 보내드릴 수 있습니다.</p>
    </div>
    <form>
    <div class="content">
        <div class="grid-flex">
          <div class="column column-left">
            <!-- Color & Pattern -->
            <div class="row">
              <p class="txt-form-title">[선택] 손이 가는 옷 색상이나 패턴</p>
              <div>
                <ul class="list-prefer-color">
                  <li
                    :class="[{selected: data.code === memberStyle.preferColor}, setColorName(data)]"
                    v-for="(data, idx) in Options.prefer_color"
                    :key="idx"
                    @click="clickColor(data, $event)"
                  >
                    <div class="center-align" >
                      <span>{{data.name}}</span>
                    </div>
                  </li>
                </ul>
                <ul class="list-prefer-pattern">
                  <li
                    v-for="(data, idx) in Options.prefer_pattern"
                    :key="idx"
                    @click="clickPattern(data, $event)"
                    :class="patternName(data.name)">
                    <div class="center-align">
                      <span>{{data.name}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Brand -->
            <div class="row">
              <p class="txt-form-title">[선택] 주로 구매하는 브랜드?</p>
              <div class="text-field">
                <input
                  type="text"
                  placeholder="한 개 이상인 경우 콤마(,)로 구분하여 입력해 주세요"
                  v-model="memberStyle.preferBrand">
              </div>
            </div>
            <!-- 업로드 -->
            <div class="row">
              <p class="txt-form-title">[선택] My Daily Look - 사진을 올려주세요.</p>
              <div>
                <div class="grid-flex grid-fixed image-upload">
                  <div class="column">
                    <div class="text-field">
                      <input readonly type="text" placeholder="사진을 올려주세요." v-model="imageFile.name">
                    </div>
                  </div>
                  <div class="column w-31 o-2">
                    <button type="button" class="btn btn-secondary h-50" @click="clickImageUpload">업로드</button>
                  </div>
                  <input
                    type="file"
                    ref="imageFileInput"
                    accept="image/*"
                    id="imageUpload"
                    @change="changeImage"
                  />
                </div>
                <p class="txt-image-upload">
                  ※ 고객님 일상에서 자연스러운 사진을 업로드 하시면<br/>
                  스타일링 추천에 많은 도움이 됩니다.<br/>
                  (상, 하의를 볼 수 있는 착장샷이 좋아요)
                </p>
              </div>
              <div
                class="image-preview"
                style="display: none;"
                ref="imagePreview"
              >
                <div>
                  <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="50" style="margin: 0 auto;">
                    <circle fill="none" stroke="#333" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
                    <circle fill="none" stroke="#333" stroke-width="3" cx="8" cy="54" r="6" transform="rotate(323.517 50 51.5946)">
                      <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
                    </circle>
                  </svg>
                  <img
                    :src="previewImage"
                    width="163"
                    alt=""/>
                </div>
              </div>
            </div>
          </div>
          <div class="column column-right">
            <!--Dress Code-->
            <div class="row">
              <p class="txt-form-title">[선택] 내가 주로 활동 하는 곳의 드레스 코드는?</p>
              <ul class="list-dresscode">
                <li
                  v-for="(data, idx) in Options.dress_code"
                  :class="dressCodeName(data.name)"
                  @click="clickDressCode(data, $event)"
                  :key="idx">
                  <img :src="dressCodeImage(data.name)"/>
                  <span class="text">{{ data.name }}</span>
                </li>
              </ul>
            </div>
            <!-- 추가 요청사항-->
            <div class="row">
              <p class="txt-form-title">[선택] 추가 요청사항</p>
              <div class="textarea-required">
                <textarea placeholder="신체적인 특징이나 싫어하는 스타일, 장식등 별도 요청사항을 적어주세요." v-model="memberStyle.requirement"></textarea>
              </div>
            </div>
            <div class="row">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button class="btn btn-primary h-56" type="button" @click="clickComplete">내일의 옷장 선택하러 가기</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Members from '@/library/api/member';

export default {
  name: 'addinfo',
  components: {},
  computed: mapGetters({
    Authentication: 'login/Authentication',
    Options: 'codes/Options'
  }),
  data() {
    return {
      memberStyle: {
        preferColor: null,
        preferPattern: null,
        preferBrand: null,
        dressCode: null,
        requirement: null
      },
      imageFile: {},
      previewImage: ''
    };
  },
  methods: {
    ...mapActions({
      getOptions: 'codes/getOptions'
    }),
    clickColor(data, event) {
      const eleParent = document.querySelector('.list-prefer-color');
      const eleTarget =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');

      _.forEach(eleParent.querySelectorAll('li'), value => {
        value.classList.remove('selected');
      });
      eleTarget.classList.add('selected');
      this.memberStyle.preferColor = data.code;
    },
    setColorName(data) {
      let colorClassName = '';
      switch (data.name) {
        case '무채색':
          colorClassName = 'achromatic-color';
          break;
        case '녹색':
          colorClassName = 'green-color';
          break;
        case '베이지':
          colorClassName = 'beige-color';
          break;
        case '보라':
          colorClassName = 'purple-color';
          break;
        case '빨강':
          colorClassName = 'red-color';
          break;
        case '노랑':
          colorClassName = 'yellow-color';
          break;
        case '파랑':
          colorClassName = 'blue-color';
          break;
        case '상관없음':
          colorClassName = 'dont-care';
          break;
        default:
          break;
      }
      return colorClassName;
    },
    clickPattern(data, event) {
      const $parent = document.querySelector('.list-prefer-pattern');
      let eleTarget = event.target.closest('li');

      if (eleTarget.classList.contains('selected')) {
        eleTarget.classList.remove('selected');
        this.memberStyle.preferPattern = null;
      } else {
        _.forEach($parent.querySelectorAll('li'), function(value) {
          value.style.backgroundColor = '#fff';
          value.classList.remove('selected');
        });
        eleTarget.classList.add('selected');
        this.memberStyle.preferPattern = data.code;
      }
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
    clickDressCode(data, event) {
      const $parent = document.querySelector('.list-dresscode');
      let eleTarget = event.target.closest('li');
      _.forEach($parent.querySelectorAll('li'), function(value) {
        value.classList.remove('selected');
      });
      eleTarget.classList.add('selected');
      this.memberStyle.dressCode = data.code;
    },
    dressCodeName(data) {
      let codeName = '';
      if (data === '캐주얼') {
        codeName = 'casual';
      } else if (data === '캐주얼 정장') {
        codeName = 'casual-suit';
      } else if (data === '세미 정장') {
        codeName = 'semi-suit';
      } else if (data === '정장') {
        codeName = 'suit';
      }
      return codeName;
    },
    dressCodeImage(data) {
      let imageUrl = '';
      if (data === '캐주얼') {
        imageUrl = `${require('@/assets/img/signup/img_clothes_1.jpg')}`;
      } else if (data === '캐주얼 정장') {
        imageUrl = `${require('@/assets/img/signup/img_clothes_2.jpg')}`;
      } else if (data === '세미 정장') {
        imageUrl = `${require('@/assets/img/signup/img_clothes_3.jpg')}`;
      } else if (data === '정장') {
        imageUrl = `${require('@/assets/img/signup/img_clothes_4.jpg')}`;
      }
      return imageUrl;
    },
    clickImageUpload() {
      this.$refs.imageFileInput.click();
    },
    changeImage(event) {
      if (event.target.files.length !== 0) {
        this.imageFile = event.target.files[0];
        this.renderPreviewImage(this.imageFile);
      }
    },
    renderPreviewImage(file) {
      const reader = new FileReader();
      const $this = this;
      reader.onloadstart = e => {
        this.$refs.imagePreview.style.display = 'block';
        this.$refs.imagePreview.querySelector('img').style.display = 'none';
        this.$refs.imagePreview.querySelector('svg').style.display = 'block';
      };
      reader.onloadend = e => {
        this.$refs.imagePreview.querySelector('svg').style.display = 'none';
        this.$refs.imagePreview.querySelector('img').style.display = 'block';
      };
      reader.onload = e => {
        $this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    clickComplete() {
      const $this = this;
      const formData = new FormData();
      formData.append('userImages', $this.imageFile);
      Members.postMemberImageStyle(formData, $this.memberStyle).then(function(
        res
      ) {});

      this.$router.push({ path: '/closet/tomorrow' });
    }
  },
  async created() {
    if (_.isEmpty(this.Options) || !_.isObject(this.Options)) {
      await this.getOptions();
    }
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/join-style.scss">
</style>
<style scoped lang="scss">
@mixin txtListStyle {
  @include fontSize(15px);
  &.selected {
    font-weight: 700;
  }
}
.contents-header {
  p {
    color: #3d3d35;
    margin-top: 5px;
  }
}

.list-prefer-color {
  margin-left: -9px;
  margin-top: -10px;
  margin-bottom: 9px;
  font-size: 0;
  text-align: center;
  li {
    @include txtListStyle;
    user-select: none;
    cursor: pointer;
    display: inline-block;
    width: calc((100% / 2) - 9px);
    /*width: 163px;*/
    height: 50px;
    color: #bbb;
    border: 1px solid #c4c4c4;
    margin-left: 9px;
    margin-top: 10px;
    background-color: #fff;
    &.selected {
      color: #fff;
      &.achromatic-color {
        background-color: #bbb;
      }
      &.green-color {
        background-color: #749c09;
      }
      &.beige-color {
        background-color: #e3cea9;
      }
      &.purple-color {
        background-color: #960af1;
      }
      &.red-color {
        background-color: #dc3f39;
      }
      &.yellow-color {
        background-color: #eacd1b;
      }
      &.blue-color {
        background-color: #0e7fc9;
      }
      &.dont-care {
        background-color: #333333;
      }
    }
  }
}
.list-prefer-pattern {
  @include clearfix;
  padding-top: 11px;
  border-top: 1px solid #e9e9e9;
  font-size: 0;
  text-align: center;
  li {
    @include txtListStyle;
    user-select: none;
    cursor: pointer;
    width: calc((100% / 3) - 7px);
    height: 50px;
    border: 1px solid #c4c4c4;
    background-size: contain;
    display: inline-block;
    margin-left: 7px;
    color: #bbb;
    &:first-child {
      margin-left: 0;
    }
    &.selected {
      color: #333;
      border: 2px solid #333;
    }
    .center-align {
      span {
        background-color: #fff;
        padding: 0 2px;
      }
    }
  }
  .stripe {
    background-image: url("~@/assets/img/signup/img_patten_1.png");
  }
  .check {
    background-image: url("~@/assets/img/signup/img_patten_2.png");
  }
  .floral {
    background-image: url("~@/assets/img/signup/img_patten_3.png");
  }
}
.list-dresscode {
  @include clearfix;
  margin-left: -8px;
  margin-top: -10px;
  text-align: center;
  font-size: 0;
  li {
    user-select: none;
    display: inline-block;
    /*width: 163px;*/
    width: calc((100% / 2) - 8px);
    /*height: 245px;*/
    margin-left: 8px;
    margin-top: 10px;
    cursor: pointer;
    /* 임시 */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    position: relative;
    border: 1px solid #e9e9e9;
    .text {
      @include fontSize(15px);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      width: 139px;
      height: 25px;
      background-color: #fff;
      color: #bbb;
      text-align: center;
    }
    img {
      width: 100%;
    }
    &.selected {
      outline: 2px solid #333;
      outline-offset: -2px;
      .text {
        color: #fff;
        font-weight: 700;
        background-color: #333;
      }
    }
  }
}
.image-upload {
  input[type="file"] {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
    z-index: -1;
    overflow: hidden;
  }
}
.txt-image-upload {
  @include fontSize(14px);
  color: #797979;
  margin-top: 11px;
}
.image-preview {
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #e9e9e9;
  text-align: center;
  padding: 30px;
  margin: 17px auto 0;
  img {
    width: 100%;
  }
}
.textarea-required {
  textarea {
    @include fontSize(15px);
    color: $color-secondary;
    width: 100%;
    height: 100px;
    border: 1px solid #c4c4c4;
    resize: none;
    padding: 3px 12px 5px;
  }
}
.txt-form-title {
  margin-bottom: 14px;
}

.row {
  margin-top: 35px;
  &:nth-child(1) {
    margin-top: 0;
  }
}
@media (min-width: 768px) {
  .contents-header {
    margin-top: 10px;
  }
}
</style>
