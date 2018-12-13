<template>
  <div class="modal-product-detail">
    <div class="modal-header">
      <p class="txt-modal-title">{{ this.basics.product_name }}</p>
    </div>
    <div class="modal-content">
      <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
          <swiper-slide
            v-for="(data, idx) in images"
            :key="idx"
            class="swiper-item"
          >
            <img :src="$common.ZulyImage() + data.image_path" />
          </swiper-slide>
          <swiper-slide
            class="swiper-item"
            :style="{ height: containerHeight + 'px' }"
            v-if="this.$mq === 'sm'"
          >
            <div class="swiper-explain">
              <div class="product-information">
                <div class="item">
                  <span>핏감</span>
                  <span>{{ details.fit }}</span>
                </div>
                <div class="item">
                  <span>두께</span>
                  <span>{{ details.thickness }}</span>
                </div>
                <div class="item">
                  <span>신축성</span>
                  <span>{{ details.flexibility }}</span>
                </div>
                <div class="item">
                  <span>비침</span>
                  <span>{{ details.see_through }}</span>
                </div>
                <div class="item item-column">
                  <span>제품 소재</span>
                  <span v-if="materialType('겉감')">겉감: {{ materialType('겉감') }}</span>
                  <span v-if="materialType('안감')">안감: {{ materialType('안감') }}</span>
                </div>
                <div class="item">
                  <span>색상</span>
                  <span> {{ basics.color }}</span>
                </div>
                <div class="item">
                  <span>치수</span>
                  <span> {{ sizes.size_name}}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide
            class="swiper-item"
            :style="{ height: containerHeight + 'px' }"
            v-if="this.$mq === 'sm'"
          >
            <div class="swiper-explain">
              <div class="product-information">
                <div class="item">
                  <span>제조사</span>
                  <span>{{ basics.brand_id }}</span>
                </div>
                <div class="item">
                  <span>세탁방법</span>
                  <span>{{ details.wash_label }}</span>
                </div>
                <div class="item">
                  <span>제조년도</span>
                  <span>{{ basics.make_year }}</span>
                </div>
                <div class="item">
                  <span>A/S책임자</span>
                  <span>{{ basics.as_manager }}</span>
                </div>
                <div class="item item-column">
                  <span>품질보증기준</span>
                  <span>{{ basics.quality_text }}</span>
                </div>
                <div class="item item-column">
                  <span>소비자 피해보상 기준</span>
                  <span>소비자 분쟁 해결 기준<br/>(공정거래위원회 고시)에 따름</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide
            class="swiper-item"
            :style="{ height: containerHeight + 'px' }"
            v-if="this.$mq !== 'sm'"
          >
            <div class="swiper-explain">
              <div class="product-information">
                <div class="item">
                  <span>핏감</span>
                  <span>{{ details.fit }}</span>
                </div>
                <div class="item">
                  <span>두께</span>
                  <span>{{ details.thickness }}</span>
                </div>
                <div class="item">
                  <span>신축성</span>
                  <span>{{ details.flexibility }}</span>
                </div>
                <div class="item">
                  <span>비침</span>
                  <span>{{ details.see_through }}</span>
                </div>
                <div class="item item-column">
                  <span>제품 소재</span>
                  <span v-if="materialType('겉감')">겉감: {{ materialType('겉감') }}</span>
                  <span v-if="materialType('안감')">안감: {{ materialType('안감') }}</span>
                </div>
                <div class="item">
                  <span>색상</span>
                  <span> {{ basics.color }}</span>
                </div>
                <div class="item">
                  <span>치수</span>
                  <span> {{ sizes.size_name}}</span>
                </div>
              </div>
              <div class="product-information">
                <div class="item">
                  <span>제조사</span>
                  <span>{{ basics.brand_id }}</span>
                </div>
                <div class="item">
                  <span>세탁방법</span>
                  <span>{{ details.wash_label }}</span>
                </div>
                <div class="item">
                  <span>제조년도</span>
                  <span>{{ basics.make_year }}년</span>
                </div>
                <div class="item">
                  <span>A/S책임자</span>
                  <span>{{ basics.as_manager }}</span>
                </div>
                <div class="item">
                  <span>품질보증기준</span>
                  <span>{{ basics.quality_text }}</span>
                </div>
                <div class="item item-column">
                  <span>소비자 피해보상 기준</span>
                  <span>소비자 분쟁 해결 기준<br/>(공정거래위원회 고시)에 따름</span>
                </div>
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div>
        <div class="table-model-info">
          <table>
            <caption>
              모델 사이즈
            </caption>
            <colgroup>
              <col width="14.51612903225806%" />
              <col width="*" />
              <col width="*" />
              <col width="*" />
              <col width="22.58064516129032%" />
              <col width="21.61290322580645%" />
            </colgroup>
            <thead>
              <tr>
                <th>키</th>
                <th>가슴</th>
                <th>상의</th>
                <th>치마</th>
                <th>바지</th>
                <th>체형</th>
              </tr>
            </thead>
            <tr>
              <td>168cm</td>
              <td>75</td>
              <td>55</td>
              <td>55</td>
              <td>55(26inch)</td>
              <td>모래시계형</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="modal-close">
      <a class="btn-close" @click="$emit('close')">
        <span class="icon-close"></span>
      </a>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'ModalProductDetail',
  props: ['data', 'type'],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      basics: {},
      details: {},
      images: [],
      sizes: {},
      containerHeight: 0
    };
  },
  computed: {},
  methods: {
    materialType(type) {
      const materialData = this.details.material;
      let materialResult = '';
      _.forEach(materialData, value => {
        if (value.type === type) {
          _.forEach(value.composition, (value2, idx2) => {
            materialResult += `${idx2 > 0 ? ', ' : ''}${value2.material} ${
              value2.ratio
            }%`;
          });
        }
      });
      return materialResult;
    },
    resize() {
      this.containerHeight = this.$refs.mySwiper.$el.offsetHeight;
    }
  },
  created() {
    this.basics = this.data.basics;
    this.details = this.data.details;
    this.images = this.data.images;
    this.sizes = this.data.sizes;
  },
  mounted() {
    this.resize();
  }
};
</script>
<style scoped lang="scss">
.modal-product-detail {
  padding: 15px 20px 20px;
}
.modal-content {
  margin-top: 15px;
}

.txt-modal-title {
  @include fontSize(15px);
  font-weight: 700;
}
.swiper {
  .swiper-container {
    background-color: #f5f5f5;
  }
  .swiper-item {
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .swiper-explain {
    /*width: 60%;*/
  }
}

.table-model-info {
  margin-top: 15px;
  table {
    width: 100%;
  }
  caption {
    @include fontSize(14px);
    text-align: left;
    margin-bottom: 10px;
  }
  th,
  td {
    @include fontSize(12px);
    text-align: center;
    height: 34px;
    vertical-align: middle;
    border: 1px solid #e9e9e9;
  }
  th {
    background-color: #f5f5f5;
    color: $color-primary;
  }
  td {
    color: $color-secondary;
    letter-spacing: 0;
    :last-child {
      letter-spacing: -1px;
    }
  }
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  overflow: hidden;
  z-index: 10;
  .btn-close {
    cursor: pointer;
    display: block;
    width: 30px;
    height: 30px;
  }
  .icon-close {
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before,
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #333;
      position: absolute;
      transform-origin: 50% 50%;
      top: 50%;
      left: 0;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
};
.product-information {
  display: inline-flex;
  flex-direction: column;
  width: 200px;
  margin-left: 15px;
  .item {
    @include fontSize(12px);
    display: flex;
    text-align: left;
    border-bottom: 1px solid #e9e9e9;
    padding-top: 5px;
    padding-bottom: 6px;
    &:last-child {
      border-bottom: 0;
    }
    span {
      white-space: pre-wrap;
      &:first-child {
        flex: 0 0 67px;
        font-weight: 700;
        color: #3d3d35;
      }
      &:not(:first-child) {
        color: #797979;
      }
    }
  }
  .item-column {
    flex-direction: column;

    span {
      flex: 1 !important;
    }
  }
};
@media (min-width: 768px) {
}

@media (min-width: 1080px) {
  .table-model-info {
    th,
    td {
      @include fontSize(14px);
    }
  }
}
</style>
