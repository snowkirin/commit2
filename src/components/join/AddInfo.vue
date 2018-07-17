<template>
  <div class="container">
    <div class="container-header">
      <p class="title-addinfo">
        {{ '김용주'}}님 <br/>
        가입을 환영합니다.
      </p>
      <p class="txt-addinfo">고객님에 대해 조금 더 자세히 알려주시면 더 어울리는 아이템을 보내드릴 수 있습니다.</p>
    </div>
    <div class="contents">
      <!-- Color & Pattern -->
      <div class="row content">
        <p class="txt-point">[선택] 손이 가는 옷 색상이나 패턴</p>
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
      <div class="row content">
        <p class="txt-point">[선택] 주로 구매하는 브랜드?</p>
        <div>
          <input
            type="text"
            class="form-input"
            placeholder="한 개 이상인 경우 콤마(,)로 구분하여 입력해 주세요"
            v-model="memberStyle.preferBrand">
        </div>
      </div>
      <!--Dress Code-->
      <div class="row content">
        <p class="txt-point">[선택] 내가 주로 활동 하는 곳의 드레스 코드는?</p>
        <ul class="list-dresscode">
          <li
            v-for="(data, idx) in addInfoData.dress_code"
            :class="dressCodeName(data.name)"
            @click="clickDressCode(data, $event)"
            :key="idx">
            <span class="text">{{ data.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 업로드 -->
      <div class="row content">
        <p class="txt-point">[선택] My Daily Look - 사진을 올려주세요.</p>
        <div>
          <div class="image-upload">
            <input class="form-input" readonly type="text" placeholder="사진을 올려주세요." v-model="imageFile.name">
            <button type="button" class="btn btn-secondary" @click="clickImageUpload">업로드</button>
            <input type="file" ref="imageFileInput" accept="image/*" id="imageUpload" @change="changeImage">
          </div>
          <p class="txt-image-upload">
            ※ 고객님 일상에서 자연스러운 사진을 업로드 하시면<br/>
            스타일링 추천에 많은 도움이 됩니다.<br/>
            (상, 하의를 볼 수 있는 착장샷이 좋아요)
          </p>
        </div>
        <div class="image-preview" style="display: none;" ref="imagePreview">
          <div>
            <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="50" style="margin: 0 auto;">
            <circle fill="none" stroke="#333" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
            <circle fill="none" stroke="#333" stroke-width="3" cx="8" cy="54" r="6" transform="rotate(323.517 50 51.5946)">
              <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
            </circle>
          </svg>
            <img :src="previewImage" width="163" alt="">
          </div>
        </div>
      </div>
      <!-- 추가 요청사항-->
      <div class="row content">
        <p class="txt-point">[선택] 추가 요청사항</p>
        <div class="textarea-required">
          <textarea placeholder="신체적인 특징이나 싫어하는 스타일, 장식등 별도 요청사항을 적어주세요." v-model="memberStyle.requirement"></textarea>
        </div>
      </div>
    </div>
    <div class="btn-complete">
      <button type="button" @click="clickComplete" class="btn btn-primary">내일의 옷장 선택하러 가기</button>
    </div>
  </div>
</template>

<script>
import Codes from '@/library/api/codes';

export default {
  name: 'addinfo',
  components: {
  },
  computed: {
  },
  data() {
    return {
      addInfoData: {
      },
      memberStyle: {
        preferColor: null,
        preferPattern: null,
        preferBrand: null,
        dressCode: null,
        requirement: null,
      },
      imageFile: {},
      previewImage: '',
    }
  },
  methods: {
    clickColor(data, event){
      const $parent = document.querySelector('.list-color');
      let eleTarget = null;
      if (event.target.nodeName === 'DIV') {
        eleTarget = event.path[1];
      } else if (event.target.nodeName === 'SPAN') {
        eleTarget = event.path[2];
      } else {
        return false;
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
          break;
      }
      eleTarget.classList.add('selected');
      this.memberStyle.preferColor = data.code;
    },
    clickPattern(data, event) {
      const $parent = document.querySelector('.list-pattern');
      let eleTarget = null;
      if (event.target.nodeName === 'DIV') {
        eleTarget = event.path[1];
      } else if (event.target.nodeName === 'SPAN') {
        eleTarget = event.path[2];
      } else {
        return false;
      }

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
    clickDressCode(data, event) {
      const $parent = document.querySelector('.list-dresscode');
      let eleTarget = null;
      if (event.target.nodeName === 'SPAN') {
        eleTarget = event.path[1];
      } else if (event.target.nodeName === 'LI') {
        eleTarget = event.path[0];
      }
      _.forEach($parent.querySelectorAll('li'), function(value) {
        value.classList.remove('selected');
      });
      eleTarget.classList.add('selected');
      this.memberStyle.dressCode = data.code;
    },
    clickImageUpload() {
      this.$refs.imageFileInput.click();
    },
    clickComplete() {
      const $this = this;
      const formData = new FormData();
      formData.append('userImages', $this.imageFile);
      Codes.postMemberImageStyle(formData, $this.memberStyle).then(function(res) {
      });

      this.$router.push({ path: '/closet/tomorrow' });
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
      reader.onloadstart = (e) => {
        this.$refs.imagePreview.style.display = 'block';
        this.$refs.imagePreview.querySelector('img').style.display = 'none';
        this.$refs.imagePreview.querySelector('svg').style.display = 'block';
      }
      reader.onloadend = (e) => {
        this.$refs.imagePreview.querySelector('svg').style.display = 'none';
        this.$refs.imagePreview.querySelector('img').style.display = 'block';
      }
      reader.onload = (e) => {
        $this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
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
  created() {
    const $this = this;
    Codes.getOptions().then((res) => {
      $this.addInfoData = res.data;
    }).catch((err) => {
      console.error(err);
    });
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
  .container {
    padding: {
      top: 24px;
      left: 20px;
      right: 20px;
      bottom: 100px;
    }
    .container-header {
      .title-addinfo {
        font-size: 26px;
        line-height: 34px;
        letter-spacing: -1.4px;
      }
      .txt-addinfo {
        font-size: 15px;
        line-height: 23px;
        letter-spacing: -0.6px;
        margin-top: 11px;
      }
    }
    .contents {
      .content {
        margin-top: 35px;
      }
      .list-color {
        @include clearfix;
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
          &.selected {
            color: #fff;
          }
        }
      }
      .list-pattern {
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
        text-align: center;
        font-size: 0;
        li {
          user-select: none;
          display: inline-block;
          /*width: 163px;*/
          width: calc((100% / 2) - 8px);
          height: 245px;
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
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            width: 139px;
            height: 25px;
            background-color: #fff;
            font-size: 15px;
            line-height: 25px;
            letter-spacing: -0.6px;
            color: #bbb;
            text-align: center;
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
        .casual {
          background-image: url(/static/img/signup/img_clothes_1.jpg);
        }
        .casual-suit {
          background-image: url(/static/img/signup/img_clothes_2.jpg);
        }
        .semi-suit {
          background-image: url(/static/img/signup/img_clothes_3.jpg);
        }
        .suit {
          background-image: url(/static/img/signup/img_clothes_4.jpg);
        }
      }
      .image-upload {
        font-size: 0;
        .btn {
          width: 88px;
          height: 50px;
          margin-left: 11px;
        }
        .form-input {
          width: calc(100% - 88px - 11px);
          /*width: 236px;*/
        }
        input[type="file"]{
          opacity: 0;
          position: absolute;
          width: 0;
          height: 0;
          z-index: -1;
          overflow: hidden;
        }
      }
      .txt-image-upload {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.8px;
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
          width: 100%;
          height: 100px;
          border: 1px solid #c4c4c4;
          resize: none;
          padding: 3px 12px 5px;
          line-height: 25px;
          letter-spacing: -0.6px;
          font-size: 15px;
          color: #797979;
        }
      }
      .txt-point {
        margin-bottom: 14px;
      }
    }
    .btn-complete {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      button {
        width: 100%;
        height: 60px;
        font-size: 18px;
        letter-spacing: -0.7px;
      }
    }
  }
  @media (min-width: 767px) {
    .container {
      width: 1200px;
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;
    }
  }

</style>
