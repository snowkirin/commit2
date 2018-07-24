<template>
  <div class="container style-info">
    <div class="container-header">
      <p class="txt-main-title">줄라이는 베이직 스타일을 기본으로 합니다.</p>
      <div class="line line__default"></div>
    </div>
    <div class="contents">
      <div class="content">
        <div class="blouse">
          <p class="txt-point">블라우스/셔츠</p>
          <div class="flex-list">
            <ul>
              <li
                v-for="(data, idx) in sizeCode.blouse"
                v-if="!(data.name === '44'|| data.name === '77')"
                :key="idx"
                :class="{selected: styleData.blouse_size  === data.code}"
                @click="clickSetSize('blouse_size', data)">
                {{ data.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="skirt">
          <p class="txt-point">치마</p>
          <div class="flex-list">
            <ul>
              <li
                v-for="(data, idx) in sizeCode.skirt"
                v-if="!(data.name === '44'|| data.name === '77')"
                :key="idx"
                :class="{selected: styleData.skirt_size  === data.code}"
                @click="clickSetSize('skirt_size', data)">
                {{ data.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="pants">
          <p class="txt-point">바지 (inch)</p>
          <div class="flex-list">
            <ul>
              <li
                v-for="(data, idx) in sizeCode.pants"
                v-if="!(data.name === '25'|| data.name === '31')"
                :key="idx"
                :class="{selected: styleData.pants_size  === data.code}"
                @click="clickSetSize('pants_size', data)">
                {{ data.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="height">
          <p class="txt-point">키 (cm)</p>
          <div
            :class="{error: errors.has('height')}">
            <div>
              <input
                type="number"
                class="form-input"
                name="height"
                maxlength="3"
                v-model.number="styleData.tall_size"
                v-validate="'required'"
                placeholder="최근 측정한 키를 입력해주세요.">
            </div>
            <p
              class="txt-error"
              v-show="errors.has('height')">
              키를 입력해주세요.
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="chest">
          <p class="txt-point">가슴 (브래지어)</p>
          <div
            :class="{error: errors.has('chest')}">
            <div>
              <input
                type="text"
                class="form-input"
                v-model="styleData.bust_size"
                name="chest"
                v-validate="{ required: true, regex: /([0-9]{2,3})([a-fA-F]{1})$/ }"
                placeholder="예) 80A">
            </div>
            <p
              class="txt-error"
              v-if="errors.has('chest')">
              가슴을 입력해주세요.
            </p>
          </div>

        </div>
        <div class="body-type">
          <p class="txt-point">체형</p>
          <div>
            <p class="text" v-if="bodyTypeText">
              {{ bodyTypeText }}
            </p>
            <ul class="body-type-list">
              <template v-for="(data, idx) in sizeCode.body_type">
                <li
                  :class="{selected: styleData.body_type  === data.code}"
                  @click="clickSetSize('body_type', data)"
                  :key="idx">
                  <img :src="data.url"/>
                  {{data }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <!-- Color & Pattern -->
      <div class="row content">
        <p class="txt-point">손이 가는 옷 색상이나 패턴</p>
        <div>
          <ul class="list-color">
            <li
              :key="idx"
              v-for="(data, idx) in addInfoCode.prefer_color"
              :class="[{selected: data.code === styleData.prefer_color}, colorName(data)]"
              @click="clickColor(data, $event)">
              <div class="txt-centering" >
                <span>{{data.name}}</span>
              </div>
            </li>
          </ul>
          <ul class="list-pattern">
            <li
              v-for="(data, idx) in addInfoCode.prefer_pattern"
              :key="idx"
              @click="clickPattern(data, $event)"
              :class="[patternName(data.name), {selected: data.code === styleData.prefer_pattern}]">
              <div class="txt-centering">
                <span>{{data.name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Brand -->
      <div class="row content">
        <p class="txt-point">주로 구매하는 브랜드?</p>
        <div>
          <input
            type="text"
            class="form-input"
            placeholder="한 개 이상인 경우 콤마(,)로 구분하여 입력해 주세요"
            v-model="styleData.prefer_brand">
        </div>
      </div>
      <!--Dress Code-->
      <div class="row content">
        <p class="txt-point">내가 주로 활동 하는 곳의 드레스 코드는?</p>
        <ul class="list-dresscode">
          <li
            v-for="(data, idx) in addInfoCode.dress_code"
            @click="clickDressCode(data, $event)"
            :class="{selected: data.code === styleData.dress_code}"
            :key="idx">
            <img :src="dressCodeImage(data.name)"/>
            <span class="text">{{ data.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 업로드 -->
      <div class="row content">
        <div class="image-upload-header clearfix">
          <p class="txt-point">My Daily Look</p>
          <button type="button" class="btn btn-secondary" @click="clickImageUpload">업로드</button>
        </div>
        <div>
          <div class="image-upload">
            <input class="form-input" readonly type="text" placeholder="사진을 올려주세요." v-model="styleData.image_name" style="display: none;">
            <input type="file" ref="imageFileInput" accept="image/*" id="imageUpload" @change="changeImage">
          </div>
          <p class="txt-image-upload">
            ※ 고객님 일상에서 자연스러운 사진을 업로드 하시면<br/>
            스타일링 추천에 많은 도움이 됩니다.<br/>
            (상, 하의를 볼 수 있는 착장샷이 좋아요)
          </p>
        </div>
        <div class="image-preview" style="display: block;" ref="imagePreview" v-if="previewImage || styleData.image_path">
          <div>
            <svg
              version="1.1"
              id="L3"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"
              width="50"
              style="margin: 0 auto; display: none;">
              <circle fill="none" stroke="#333" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
              <circle fill="none" stroke="#333" stroke-width="3" cx="8" cy="54" r="6" transform="rotate(323.517 50 51.5946)">
                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
              </circle>
            </svg>
            <img :src="previewImage ? previewImage : (styleData.image_path === null) ? null : IMAGE_URL + styleData.image_path " width="163" alt="">
          </div>
        </div>
      </div>
      <!-- 추가 요청사항-->
      <div class="row content">
        <p class="txt-point">추가 요청사항</p>
        <div class="textarea-required">
          <textarea placeholder="신체적인 특징이나 싫어하는 스타일, 장식등 별도 요청사항을 적어주세요." v-model="styleData.etc"></textarea>
        </div>
      </div>
    </div>
    <div class="btn-floating">
      <button class="btn btn-primary" type="button" @click="clickSendStyleData">저장</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Codes from '@/library/api/codes';

export default {
  name: 'styleInfo',
  components: {
  },
  computed: {
    ...mapGetters({
      storeStyleData: 'mypage/getStyleData',
    }),

  },
  watch: {

  },
  data() {
    return {
      IMAGE_URL: process.env.API_ORIGINAL_IMAGE_URL,
      styleData: {
        member_id: 0,
        tall_size: 0,
        bust_size: '',
        blouse_size: 0,
        skirt_size: 0,
        pants_size: 0,
        body_type: 0,
        mood: 0,
        prefer_color: 0,
        prefer_pattern: 0,
        prefer_brand: '',
        dress_code: 0,
        image_path: '',
        image_name: '',
        etc: '',
        inserted: '',
        updated: '',
        image_width: 0,
        image_height: 0,
      },
      imageFile: {},
      previewImage: '',

      // 받은 코드
      sizeCode: {},
      addInfoCode: {},
      bodyTypeText: '',
    };
  },
  methods: {
    ...mapActions({
      setMemberStyle: 'mypage/setMemberStyle',
    }),
    clickSetSize(type, data, event) {
      this.styleData[type] = data.code;
      if (type === 'body_type') {
        this.bodyTypeText = data.description;
      }
    },

    // 추가 정보 입력
    clickColor(data, event) {
      const eleParent = event.target.closest('.list-color');
      const eleSelf = (event.target.tagName === 'LI') ? event.target : event.target.closest('li');
      _.forEach(eleParent.querySelectorAll('li'), (value) => {
        const eleCurrent = value;
        // eleCurrent.style.backgroundColor = '#fff';
        eleCurrent.classList.remove('selected');
      });
      eleSelf.classList.add('selected');
      this.styleData.prefer_color = data.code;
    },
    colorName(data){
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
      const eleParent = event.target.closest('.list-pattern');
      const eleSelf = (event.target.tagName === 'LI') ? event.target : event.target.closest('li');
      if (eleSelf.classList.contains('selected')) {
        eleSelf.classList.remove('selected');
        this.styleData.prefer_pattern = null;
      } else {
        _.forEach(eleParent.querySelectorAll('li'), (value) => {
          const eleCurrent = value;
          // eleCurrent.style.backgroundColor = '#fff';
          eleCurrent.classList.remove('selected');
        });
        eleSelf.classList.add('selected');
        this.styleData.prefer_pattern = data.code;
      }
    },
    clickDressCode(data, event) {
      const eleParent = event.target.closest('.list-dresscode');
      const eleSelf = (event.target.tagName === 'LI') ? event.target : event.target.closest('li');
      _.forEach(eleParent.querySelectorAll('li'), function(value) {
        const eleCurrent = value;
        eleCurrent.classList.remove('selected');
      });
      eleSelf.classList.add('selected');
      this.styleData.dress_code = data.code;
    },
    patternName(data) {
      if (data === '스트라이프') {
        return 'stripe';
      } else if (data === '체크') {
        return 'check';
      }
      return 'floral';
    },
    dressCodeImage(data) {
      let imageUrl = '';
      if (data === '캐주얼') {
        imageUrl = '/static/img/signup/img_clothes_1.jpg';
      } else if (data === '캐주얼 정장') {
        imageUrl = '/static/img/signup/img_clothes_2.jpg';
      } else if (data === '세미 정장') {
        imageUrl = '/static/img/signup/img_clothes_3.jpg';
      } else if (data === '정장') {
        imageUrl = '/static/img/signup/img_clothes_4.jpg';
      }
      return imageUrl;
    },

    clickImageUpload() {
      this.$refs.imageFileInput.click();
    },
    changeImage(event) {
      if (event.target.files.length !== 0) {
        this.imageFile = event.target.files[0];
        this.styleData.image_name = this.imageFile.name;
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
    clickSendStyleData() {
      const $this = this;
      const styleData = this.styleData;
      const formData = new FormData();
      const setStyleData = {
        tallSize: styleData.tall_size,
        bustSize: styleData.bust_size,
        blouseSize: styleData.blouse_size,
        skirtSize: styleData.skirt_size,
        pantsSize: styleData.pants_size,
        bodyType: styleData.body_type,
        preferColor: styleData.prefer_color,
        preferPattern: styleData.prefer_pattern,
        preferBrand: styleData.prefer_brand,
        dressCode: styleData.dress_code,
        requirement: styleData.etc,
      };
      formData.append('userImages', $this.imageFile);

      if ($this.previewImage === '') {
        Codes.patchMeberStyle(setStyleData).then((res) => {
          if (res.data.result) {
            alert('정상적으로 수정되었습니다.');
          } else {
            alert('통신중 오류가 발생하였습니다');
          }
        });
      } else {
        Codes.patchMemberImageStyle(setStyleData, formData).then((res) => {
          alert('정상적으로 수정되었습니다.');
        });
      }
    },
  },
  async created() {
    const $this = this;
    if (_.isEmpty(this.storeStyleData)) {
      await this.setMemberStyle();
    }
    Codes.getSize().then((res) => {
      $this.sizeCode = res.data;
    }).catch((err) => {
      console.error(err);
    });
    // 추가입력 코드 불러오기
    Codes.getOptions().then((res) => {
      $this.addInfoCode = res.data;
    }).catch((err) => {
      console.error(err);
    });
    _.assignIn($this.styleData, $this.storeStyleData);

    if (this.styleData.body_type === 12701) {
      this.bodyTypeText = '허리둘레와 엉덩이 둘레가 거의 같으며 골격이 잘 발달되지 않은 보이쉬한 일자형 체형입니다.';
    } else if (this.styleData.body_type === 12702) {
      this.bodyTypeText = '전체적으로 어깨가 잘 발달되어 상체가 넓고 아래로 내려갈수록 점점 작아지는 체형입니다.';
    } else if (this.styleData.body_type === 12703) {
      this.bodyTypeText = '전반적으로 상체에 살이 많고 배가 조금 나온, 둥글둥글한 모습을 띠고 있는 체형입니다.';
    } else if (this.styleData.body_type === 12704) {
      this.bodyTypeText = '어깨에 비해서 히프 사이즈가 크고 하체로 갈수록 점점 넓어지는 한국인에게 흔히 볼 수 있는 체형입니다.';
    } else if (this.styleData.body_type === 12705) {
      this.bodyTypeText = '가슴둘레와 엉덩이 둘레는 거의 비슷한데, 허리는 가는 이상적인 체형입니다.'
    }
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
    letter-spacing: -0.9px;
    &.selected {
      font-weight: 700;
    }
  }

  .style-info {
    padding: 25px 20px 20px 20px;
  }
  .line {
    margin-top: 10px;
    margin-bottom: 16px;
  }
  // Image List
  .image-list {
    list-style: none;
    font-size: 0;
    .item {
      display: inline-block;
      width: calc(25% - 7.7px);
      margin-left: 7.7px;
      img {
        width: 100%;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  // Text List
  .text-list {
    list-style: none;
    font-size: 0;
    margin-left: -8px;
    margin-top: 8px;
    &.large {
      li {
        padding: 0 10.6px;
      }
    }
    li {
      padding: 0 6.8px;
      margin-left: 8px;
      margin-top: 8px;
      line-height: 28px;
      display: inline-block;
      font-size: 15px;
      letter-spacing: -0.9px;
      color: #797979;
      text-align: center;
      background-color: #f4f4f4;
    }
  }
  .text {
    font-size: 15px;
    line-height: 23px;
    letter-spacing: -0.9px;
    color: #797979;
    margin-top: 7px;
  }
  .style-type {
    .image-list {
      margin-top: 10px;
    }
  }
  .detail {
    padding: {
      top: 14px;
      bottom: 20px;
    }
    border: {
      top: 1px solid rgba(51,51,51,0.5);
      bottom: 1px solid rgba(51,51,51,0.5);
    }
    margin: {
      top: 20px;
      bottom: 20px;
    }
    .size {
    }
    .body-type,
    .prefer-color,
    .brand,
    .dress-code,
    .request,
    .daily-look {
      margin-top: 35px;
    }

    .body-type {
    }
    .prefer-color {
    }
    .brand {
    }
    .dress-code {
    }
    .request {
    }
    .daily-look {
      .image-list {
        margin-top: 14px;
      }
    }
  }

  .contents {
    .txt-point {
      margin-bottom: 13px;
    }
    .blouse {
    }
    .skirt {
      // 35.8
      margin-top: 36px;
    }
    .pants {
      margin-top: 36px;
    }
    .height {
      margin-top: 36px;
    }
    .chest {
      margin-top: 35px;
    }
    .body-type {
      margin-top: 36px;
    }
    .flex-list {
      ul {
        margin-left: 1px;
        margin-top: 1px;
        background: #f5f5f5;
        font-size: 0;
      }
      li {
        display: inline-block;
        width: calc(25% + 1px);
        position: relative;
        border: 1px solid #c4c4c4;
        margin-left: -1px;
        margin-top: -1px;
        line-height: 48px;
        text-align: center;
        color: #bbb;
        letter-spacing: -0.9px;
        background-color: #fff;
        user-select: none;
        cursor: pointer;
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        font-size: 15px;
        &.selected {
          font-weight: 700;
          color: #333;
          z-index: 10;
          outline: 2px solid #333;
          outline-offset: -2px;
        }
      }
    }
    .body-type {
      .text {
        text-align: center;
        font-size: 14px;
        color: #797979;
        line-height: 20px;
        letter-spacing: -0.8px;
        padding: 9px 27px 11.3px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
      }
      .body-type-list {
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
          letter-spacing: -0.9px;
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
    .image-upload-header {
      margin-bottom: 13px;
      .txt-point {
        margin-bottom: 0;
        float: left;
        line-height: 50px;
      }
      .btn {
        float: right;
        width: 120px;
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
        letter-spacing: -0.9px;
        font-size: 15px;
        color: #797979;
      }
    }
    .txt-point {
      margin-bottom: 14px;
    }
  }
  .btn-floating {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    .btn {
      width: 100%;
      height: 60px;
    }
  }
  @media (min-width: 768px) {
    .style-info {
      width: 1200px;
      padding: 20px 0;
      margin: 0 auto;
    }
  }
</style>
