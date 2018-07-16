<template>
  <div class="modal">
    <div class="dim" @click="closeDetailModal"></div>
    <div class="modal-inner">
      <div class="clearfix">
        <!-- ThumbNail-->
        <div class="thumbnail">
          <div>
            <!-- Backup Data
            <div
              v-for="(data, idx) in detailData.image"
              :key="idx"
              v-if="detailData.image[idx]"
              @click="slideMove(idx)"
              class="item">
              <img :src="$common.IMAGEURL() + data" alt="" width="60" height="70"/>
            </div>
            -->
            <div class="item">
              <img :src="$common.IMAGEURL() + detailData.image" alt="" width="60" height="70"/>
            </div>
          </div>
        </div>
        <!-- Main-->
        <div class="detail-view">
          <div class="clearfix">
            <div class="images">
              <img :src="$common.IMAGEURL() + detailData.image" alt="" width="400"/>
            </div>
            <div class="explain">
              <p class="txt-product" ref="product">{{ detailData.product_options[0].name }}</p>
              <p class="txt-options" ref="desc" v-if="detailData.description">
                {{ detailData.description }}
              </p>
              <div
                class="txt-options"
                v-html="parseOptions(detailData.product_options[0])"></div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn-close" type="button" @click="closeDetailModal">
        <span>Close Popup</span>
      </button>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  props: {
    detailData: {},
  },
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    };
  },
  methods: {
    closeDetailModal() {
      this.$emit('closeDetailModal');
    },
    slideMove(idx) {
      this.$refs.mySwiper.swiper.slideTo(idx);
      // this.$refs.desc.innerHTML = this.detailData.description[idx];
    },
    parseOptions(data) {
      let temp = {
        color: '',
        fit: '',
        thickness: '',
        flexibility: '',
        see_through: '',
      };
      if (data) {
        _.forEach(data,(value, key) => {
          /* Key Type
          *  color: 색상
          *  fit: 핏감
          *  thickness: 두께
          *  flexibility: 신축성
          *  see_through: 비침
          * */

          if (key === 'color') {
            temp.color = `색상: ${value}`;
          } else if (key === 'fit') {
            temp.fit = `핏감: ${value}`;
          } else if (key === 'thickness') {
            temp.thickness = `두께: ${value}`;
          } else if (key === 'flexibility') {
            temp.flexibility = `신축성: ${value}`;
          } else if (key === 'see_through') {
            temp.see_through = `비침: ${value}`;
          }
        });
      }
      const parseHTML = `<ul><li>${temp.color}</li><li>${temp.fit}</li><li>${temp.thickness}</li><li>${temp.flexibility}</li><li>${temp.see_through}</li></ul>`
      return parseHTML;
    },

    parserJSON(data) {
      return JSON.parse(data);
    },
  },
  created() {
    // document.body.style.overflow = 'hidden';
  },
  destroyed() {
    // document.body.removeAttribute('style');
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>
<style lang="scss" scoped>
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 1000;
    .dim {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .modal-inner {
      padding: 25px 27px;
      width: 873px;
      position: absolute;
      border: 1px solid #212121;
      background-color: #fff;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.17);
      .thumbnail {
        float: left;
        height: 100%;
        .item {
          margin-bottom: 5px;
        }
      }
      .detail-view {
        float: left;
        margin-left: 15px;
        .images {
          float: left;
          width: 400px;
        }
        .explain {
          margin-left: 25px;
          float: left;
          width: 288px;
          .txt-product {
            font-size: 18px;
            line-height: 28px;
            color: #212121;
            font-weight: 700;
          }
          .txt-options {
            font-size: 16px;
            line-height: 24px;
            color: #212121;
            margin-top: 19px;
            &:first-child {
              margin-top: 25px;
            }
          }
        }
      }
      .btn-close {
        position: absolute;
        right: 26px;
        top: 26px;
        border: 0;
        margin: 0;
        background-color: transparent;
        span {
          width: 24px;
          height: 24px;
          position: relative;
          text-indent: -9999px;
          overflow: hidden;
          display: block;
          &::before, &::after {
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #212121;
            content: '';
            display: block;
            left: 50%;
            top: 50%;
            transform-origin: 0 0;
          }
          &::after {
            transform: rotate(45deg) translate(-50%, -50%);
          }
          &::before {
            transform: rotate(-45deg) translate(-50%, -50%);
          }
        }
      }
    }
  }
  @media (min-width: 768px) {
    .modal {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      display:flex;
      justify-content:center;
      align-items:center;
      z-index: 1000;
      .dim {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
      }
      .modal-inner {
        padding: 25px 27px;
        width: 873px;
        position: absolute;
        border: 1px solid #212121;
        background-color: #fff;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.17);
        .thumbnail {
          float: left;
          height: 100%;
          .item {
            margin-bottom: 5px;
          }
        }
        .detail-view {
          float: left;
          margin-left: 15px;
          .images {
            float: left;
            width: 400px;
          }
          .explain {
            margin-left: 25px;
            float: left;
            width: 288px;
            .txt-product {
              font-size: 18px;
              line-height: 28px;
              color: #212121;
              font-weight: 700;
            }
            .txt-options {
              font-size: 16px;
              line-height: 24px;
              color: #212121;
              margin-top: 19px;
              &:first-child {
                margin-top: 25px;
              }
            }
          }
        }
        .btn-close {
          position: absolute;
          right: 26px;
          top: 26px;
          border: 0;
          margin: 0;
          background-color: transparent;
          span {
            width: 24px;
            height: 24px;
            position: relative;
            text-indent: -9999px;
            overflow: hidden;
            display: block;
            &::before, &::after {
              position: absolute;
              width: 100%;
              height: 2px;
              background-color: #212121;
              content: '';
              display: block;
              left: 50%;
              top: 50%;
              transform-origin: 0 0;
            }
            &::after {
              transform: rotate(45deg) translate(-50%, -50%);
            }
            &::before {
              transform: rotate(-45deg) translate(-50%, -50%);
            }
          }
        }
      }
    }
  }
</style>
