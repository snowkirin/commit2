<template>
  <div class="contents">
    <div class="contents-header">
      <h3>줄라이는 베이직 스타일을 기본으로 합니다.</h3>
    </div>
    <div class="content content-border">
      <form>
        <div class="content-inner">
          <div class="grid-flex">
            <div class="column column-left">
              <!-- 블라우스/셔츠 -->
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
              <!-- 치마 -->
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
              <!-- 바지 -->
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
              <!-- 키 -->
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
                      placeholder="최근 측정한 키를 입력해주세요."
                    />
                  </div>
                  <p class="txt-error" v-show="errors.has('tallSize')">
                    {{ errors.first('tallSize') }}
                  </p>
                </div>
              </div>
              <!-- 가슴(브래지어) -->
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
              <!-- 체형 -->
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
            <div class="column column-right">
              <div class="row">
                <div class="form-title-wrap">
                  <p class=" txt-form-title">손이 가는 옷 색상이나 패턴</p>
                </div>
                <div>
                  <ul class="list-prefer-color">
                    <li
                      :class="[
                        { selected: data.code === addInfoData.preferColor },
                        setColorName(data)
                      ]"
                      v-for="(data, idx) in Options.prefer_color"
                      :key="idx"
                      @click="clickPreferColor(data, $event)"
                    >
                      <div class="center-align">
                        <span>{{ data.name }}</span>
                      </div>
                    </li>
                  </ul>
                  <ul class="list-prefer-pattern">
                    <li
                      v-for="(data, idx) in Options.prefer_pattern"
                      :key="idx"
                      @click="clickPattern(data, $event)"
                      :class="[
                        patternName(data.name),
                        { selected: data.code === addInfoData.preferPattern }
                      ]"
                    >
                      <div class="center-align">
                        <span>{{ data.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Brand -->
              <div class="row">
                <div class="form-title-wrap">
                  <p class=" txt-form-title">주로 구매하는 브랜드?</p>
                </div>
                <div class="text-field">
                  <input
                    type="text"
                    placeholder="한 개 이상인 경우 콤마(,)로 구분하여 입력해 주세요"
                    v-model="addInfoData.preferBrand"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-title-wrap">
                  <p class=" txt-form-title">주로 이용하는 온라인 쇼핑몰은?</p>
                </div>
                <div class="text-field">
                  <input
                    type="text"
                    placeholder="예) W 컨셉, 29cm"
                    v-model="addInfoData.preferShop"
                  />
                </div>
              </div>
              <!-- Dress Code -->
              <div class="row">
                <div class="form-title-wrap">
                  <p class=" txt-form-title">
                    내가 주로 활동 하는 곳의 드레스 코드는?
                  </p>
                </div>
                <ul class="list-dresscode">
                  <li
                    v-for="(data, idx) in Options.dress_code"
                    @click="clickDressCode(data, $event)"
                    :class="{ selected: data.code === addInfoData.dressCode }"
                    :key="idx"
                  >
                    <img :src="dressCodeImage(data.name)" />
                    <span class="text">{{ data.name }}</span>
                  </li>
                </ul>
              </div>
              <!-- 업로드 -->
              <div class="row">
                <div class="form-title-wrap" style="position: relative;">
                  <p class=" txt-form-title" style="line-height:56px;">
                    My Daily Look
                  </p>
                  <button
                    type="button"
                    class="btn btn-secondary h-50"
                    style="position: absolute; right: 0; top: 0; width: 170px;"
                    @click="clickImageUpload"
                  >
                    업로드
                  </button>
                </div>
                <div class="grid-flex grid-fixed image-upload" v-show="false">
                  <div class="column">
                    <div class="text-field">
                      <input
                        type="text"
                        readonly="true"
                        placeholder="사진을 올려주세요."
                        :value="changeImageFileName"
                      />
                      <!--
                        :value="!_.isEmpty(imageFile) ? imageFile.name : !_.isEmpty(getImageInfo.imageName) ? getImageInfo.imageName : ''"
                      -->
                    </div>
                  </div>
                  <div class="column w-31 o-2">
                    <button
                      type="button"
                      class="btn btn-secondary h-50"
                      @click="clickImageUpload"
                    >
                      업로드
                    </button>
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
                  ※ 고객님 일상에서 자연스러운 사진을 업로드 하시면
                  스타일링 추천에 많은 도움이 됩니다.<br />
                  (상, 하의를 볼 수 있는 착장샷이 좋아요)
                </p>
                <div
                  class="image-preview"
                  style="display: block;"
                  ref="imagePreview"
                  v-show="
                    !_.isEmpty(previewImage) ||
                      !_.isEmpty(getImageInfo.imagePath)
                  "
                >
                  <div>
                    <svg
                      version="1.1"
                      id="L3"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 100"
                      enable-background="new 0 0 0 0"
                      xml:space="preserve"
                      width="50"
                      style="margin: 0 auto; display: none;"
                    >
                      <circle
                        fill="none"
                        stroke="#333"
                        stroke-width="4"
                        cx="50"
                        cy="50"
                        r="44"
                        style="opacity:0.5;"
                      ></circle>
                      <circle
                        fill="none"
                        stroke="#333"
                        stroke-width="3"
                        cx="8"
                        cy="54"
                        r="6"
                        transform="rotate(323.517 50 51.5946)"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="2s"
                          type="rotate"
                          from="0 50 48"
                          to="360 50 52"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </circle>
                    </svg>
                    <img
                      :src="
                        !_.isEmpty(previewImage)
                          ? previewImage
                          : _.isEmpty(getImageInfo.imagePath)
                          ? null
                          : $common.ZulyImage(getImageInfo.imageWidth) +
                            getImageInfo.imagePath
                      "
                      width="163"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <!-- 추가 요청사항 -->
              <div class="row">
                <div class="form-title-wrap">
                  <p class=" txt-form-title">추가 요청사항</p>
                </div>
                <div class="textarea-required">
                  <textarea
                    placeholder="신체적인 특징이나 싫어하는 스타일, 장식등 별도 요청사항을 적어주세요."
                    v-model="addInfoData.requirement"
                  >
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="button-wrap">
      <button type="button" class="btn btn-primary h-56" @click="clickComplete">
        수정하기
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MemberAPI from '@/library/api/member';
import FlexList from '@/components/common/FlexList';

export default {
  name: 'Closet_Style-Info',
  components: {
    FlexList
  },
  data() {
    return {
      // 이거 추후에 글로벌 변수로 뺄것.
      dialogOptions: {
        okText: '확인',
        customClass: 'zuly-alert',
        backdropClose: true
      },

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
      bustResult: null,
      cupResult: null,

      sizesData: {
        blouseSize: null,
        skirtSize: null,
        pantsSize: null,
        tallSize: null,
        bustSize: null,
        bodyType: null
      },
      addInfoData: {
        preferColor: null,
        preferPattern: null,
        preferBrand: null,
        preferShop: null,
        dressCode: null,
        requirement: null
      },
      bodyTypeText: '',

      imageFile: {},
      previewImage: '',

      getImageInfo: {
        imageName: '',
        imagePath: '',
        imageWidth: null,
        imageHeight: null
      }
    };
  },
  watch: {
    bustCombination() {
      this.sizesData.bustSize = `${this.bustResult}${this.cupResult}`;
    }
  },
  computed: {
    ...mapGetters({
      Sizes: 'common/Sizes',
      Options: 'common/Options'
    }),
    bustCombination() {
      return this.bustResult, this.cupResult, Date.now();
    },
    changeImageFileName() {
      if (!_.isEmpty(this.imageFile.name)) {
        return this.imageFile.name;
      } else {
        if (!_.isEmpty(this.getImageInfo.imageName)) {
          return this.getImageInfo.imageName;
        } else {
          return '';
        }
      }
    }
  },
  methods: {
    ...mapActions({
      FETCH_SIZES: 'common/FETCH_SIZES',
      FETCH_OPTIONS: 'common/FETCH_OPTIONS'
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
    // 추가 정보 입력
    clickPreferColor(data, event) {
      const eleParent = event.target.closest('.list-prefer-color');
      const eleSelf =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      _.forEach(eleParent.querySelectorAll('li'), value => {
        value.classList.remove('selected');
      });
      eleSelf.classList.add('selected');
      this.addInfoData.preferColor = data.code;
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
      const eleParent = event.target.closest('.list-prefer-pattern');
      const eleSelf =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      if (eleSelf.classList.contains('selected')) {
        eleSelf.classList.remove('selected');
        this.addInfoData.preferPattern = null;
      } else {
        _.forEach(eleParent.querySelectorAll('li'), value => {
          const eleCurrent = value;
          eleCurrent.classList.remove('selected');
        });
        eleSelf.classList.add('selected');
        this.addInfoData.preferPattern = data.code;
      }
    },
    clickDressCode(data, event) {
      const eleParent = event.target.closest('.list-dresscode');
      const eleSelf =
        event.target.tagName === 'LI'
          ? event.target
          : event.target.closest('li');
      _.forEach(eleParent.querySelectorAll('li'), function(value) {
        const eleCurrent = value;
        eleCurrent.classList.remove('selected');
      });
      eleSelf.classList.add('selected');
      this.addInfoData.dressCode = data.code;
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
        if (
          event.target.files[0].type &&
          event.target.files[0].type.indexOf('image') !== -1
        ) {
          // 이미지라면
          this.imageFile = event.target.files[0];
          this.renderPreviewImage(this.imageFile);
        } else {
          this.$dialog.alert(
            '선택하신 파일은 이미지가 아닙니다. 이미지 파일을 선택해주세요.',
            {
              okText: '확인',
              customClass: 'zuly-alert',
              backdropClose: true
            }
          );
          this.imageFile = {};
          this.previewImage = '';
          this.$refs.imagePreview.style.display = 'none';
        }
      } else {
        this.imageFile = {};
        this.previewImage = '';
        this.$refs.imagePreview.style.display = 'none';
      }
    },
    renderPreviewImage(file) {
      const reader = new FileReader();
      const $this = this;
      reader.onloadstart = () => {
        this.$refs.imagePreview.style.display = 'block';
        this.$refs.imagePreview.querySelector('img').style.display = 'none';
        this.$refs.imagePreview.querySelector('svg').style.display = 'block';
      };
      reader.onloadend = () => {
        this.$refs.imagePreview.querySelector('svg').style.display = 'none';
        this.$refs.imagePreview.querySelector('img').style.display = 'block';
      };
      reader.onload = e => {
        $this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async clickComplete() {
      if (this.bustResult) {
        if (!this.cupResult) {
          this.$dialog.alert(
            '가슴둘레 항목을 확인해 주세요.',
            this.dialogOptions
          );
          return;
        }
      }
      if (this.cupResult) {
        if (!this.bustResult) {
          this.$dialog.alert('컵 항목을 확인해 주세요.', this.dialogOptions);
          return;
        }
      }

      await MemberAPI.PatchStyleInfo({
        ...this.sizesData,
        ...this.addInfoData
      })
        .then(async () => {
          if (this.previewImage) {
            const formData = new FormData();
            formData.append('userImages', this.imageFile);
            await MemberAPI.PostImages(formData);
          }
          this.$dialog.alert('수정되었습니다.', this.dialogOptions);
        })
        .catch(() => {
          this.$dialog.alert(
            '통신 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
            this.dialogOptions
          );
        });
    },
    changeBodyTypeText() {
      // 해당 함수는 join/Sizes에서도 사용된다.
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
    // 사이즈 코드 가져오기
    if (_.isEmpty(this.Sizes)) {
      this.FETCH_SIZES();
    }
    // 추가 정보 입력 코드 가져오기
    if (_.isEmpty(this.Options)) {
      this.FETCH_OPTIONS();
    }
    await MemberAPI.GetStyleInfo().then(({ data }) => {
      if (data.result) {
        const _data = data.data;
        // 사이즈 관련 데이터 추출
        const pickSizesData = {
          blouseSize: _data.blouse_size,
          skirtSize: _data.skirt_size,
          pantsSize: _data.pants_size,
          tallSize: _data.tall_size,
          bustSize: _data.bust_size,
          bodyType: _data.body_type
        };
        // 추가 정보 입력 관련 데이터 추출
        const pickAddInfoData = {
          preferColor: _data.prefer_color,
          preferPattern: _data.prefer_pattern,
          preferBrand: _data.prefer_brand,
          preferShop: _data.prefer_shop,
          dressCode: _data.dress_code,
          requirement: _data.etc
        };
        // 이미지 관련 데이터 추출
        const imageInfoData = {
          imageName: _data.image_name,
          imagePath: _data.image_path,
          imageWidth: _data.image_width,
          imageHeight: _data.image_height
        };
        // 사이즈 데이터 넣기
        this.sizesData = { ...pickSizesData };
        // 추가 정보 데이터 넣기
        this.addInfoData = { ...pickAddInfoData };
        // 이미지 데이터 넣기
        this.getImageInfo = { ...imageInfoData };
        // 가슴둘레 데이터 넣기
        this.bustResult = _.parseInt(_data.bust_size.replace(/[^0-9]/g, ''));
        this.cupResult = _data.bust_size.replace(/[^A-Z]/g, '');

        this.changeBodyTypeText();
      } else {
        // 데이터가 존재하지 않습니다.
      }
    });
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
@mixin txtListStyle {
  @include fontSize(15px);
  &.selected {
    font-weight: 700;
  }
}

.body-type {
  .txt-body-type {
    @include fontSize(14px);
    color: #797979;
    text-align: center;
    padding: 9px 27px 11.3px;
    background-color: #e9e9e9;
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
    background-image: url('~@/assets/img/signup/img_patten_1.png');
  }
  .check {
    background-image: url('~@/assets/img/signup/img_patten_2.png');
  }
  .floral {
    background-image: url('~@/assets/img/signup/img_patten_3.png');
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
  input[type='file'] {
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
  word-break: keep-all;
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
    padding: 11px;
  }
}

.button-wrap {
  margin-top: 30px;
}

.content {
  padding-top: 20px;
  padding-bottom: 30px;
}

@media (min-width: 768px) {
  .content {
    background-color: #f7f7f7;
    padding: 30px;
  }
  .column-right {
    margin-left: 7%;
  }
  .body-type {
    .txt-body-type {
      @include fontSize(15px);
      padding: 12px 27px;
    }
    .list-body-type {
      text-align: center;
      li {
        width: 90px;
      }
    }
  }
  .button-wrap {
    text-align: right;
    .btn {
      width: 287px;
    }
  }
}
</style>
