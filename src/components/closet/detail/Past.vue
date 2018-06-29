<template>
  <div class="past">
    <div>
      <p class="txt-main-title">그 동안의 옷장을 확인하실 수 있습니다.</p>
    </div>
    <div class="line line__default"></div>
    <div>
      <ul class="list-closet">
        <li
          v-for="(data, idx) in EX_pastCloset"
          class="closet-item"
          :key="idx">
          <p class="order">
            <span class="number">7th</span>
            <span class="date"> 18.06.20</span>
            <!--<span class="number">{{ numberSuffix(idx, pastCloset.length) }}</span>
            <span class="date"> {{ data.subscription_date }}</span>-->
          </p>
          <div class="product-desc">
            <ul
              class="list-product clearfix">
              <li
                v-for="(img, idx2) in data.images"
                :key="idx2"
                class="image"
              >
                <img :src="(img !== null)? API_IMAGE_URL + 'small/' + img : 'http://via.placeholder.com/60x70?text=Image '" alt=""/>
              </li>
            </ul>
            <div class="style-tip">
              <p class="title">스타일 팁</p>
              <p class="explain">
                심플하지만 갖춰입은듯 스타일리쉬 한 룩!
                - 허리에서 포켓까지 이어진 바이올렛톤의 새틴 배색이 포인트인 팬츠로, 이러한 디자인의 특징을 살려서 블라우스를 입을때 앞면을 살짝..
                {{ printStylingTip(data.styling_tip) }}
              </p>
            </div>

            <p class="purchase-info">
              <a
                @click="viewModal(data.id)"
                href="#"
                class="txt-link"
                v-if="data.is_sold === 'N'">
                구매 정보 보기
              </a>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <custom-modal ref="view" :dataId="dataId" title="" width="500" height="530" modalType="pastView"></custom-modal>
  </div>
  <!--<div class="past mt40">
    <div class="main-point-text closet-title">과거의 옷장</div>
    <div class="closet-title-text mt15">
      그 동안의 옷장을 확인하실 수 있습니다.
    </div>
    <div class="closet-content mt30">
      <div v-show="pastNone" class="past-content">
        이력이 존재하지 않습니다.
      </div>
      <template v-for="(past, k) in pastCloset">
        <div v-bind:key="k" class="past-content">
          <div class="content-first-number">
            {{ ( k > 0 ) ? pastCloset.length - 1 : pastCloset.length }}th
            <div class="vertical-line"></div>
            {{ past.subscription_date }}
          </div>
          <div class="content-second mt20">
            <div class="content-second-thumnail">
              <template v-for="(image, j) in past.images">
                <div
                  v-bind:key="j"
                  class="thumnail-image-area"
                >
                  <div
                    class="thumnail-image"
                    v-bind:style="{
                      'background-image': `url(${API_IMAGE_URL}small/${image})`,
                    }"
                  >

                  </div>
                </div>
              </template>
            </div>
            <div class="content-second-text">
              <div class="content-second-title">스타일 팁</div>
              <div class="content-second-tip mt10" v-html="printStylingTip(past.styling_tip)">
              </div>
            </div>
            <div class="content-second-view">
              <div class="content-second-view-cell" @click="viewModal(past.id)" v-show="past.is_sold === 'Y'">
                구매정보 보기
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <custom-modal ref="view" :dataId="dataId" title="" width="500" height="530" modalType="pastView"></custom-modal>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomModal from '@/components/common/CustomModal';

export default {
  name: 'past',
  data() {
    return {
      API_IMAGE_URL: process.env.API_IMAGE_URL,
      dataId: null,
      EX_pastCloset: [
        {
          "id": 342,
          "subscription_date": "18.05.28",
          "styling_title": "행복한 오후",
          "styling_tip": "11",
          "hashtag": "1111",
          "images": [
            "product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg",
            "product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg"
          ],
          "is_sold": "N"
        },
        {
          "id": 83,
          "subscription_date": "18.04.30",
          "styling_title": null,
          "styling_tip": "styling_tip",
          "hashtag": "#styling #tag #test",
          "images": [
            null,
            null
          ],
          "is_sold": "N"
        }
      ],
    };
  },
  components: {
    CustomModal,
  },
  computed: {
    ...mapGetters({
      pastCloset: 'mypage/closet/getPastCloset',
      pastNone: 'mypage/closet/getPastNone',
    }),
  },
  methods: {
    ...mapActions({
      setPastCloset: 'mypage/closet/setPastCloset',
    }),
    viewModal(id) {
      this.dataId = id.toString();
      this.$refs.view.openModal();
    },
    numberSuffix(num, total) {
      let result;
      if (num === 0) {
        if (total === 1) {
          result = `${total}st`;
        } else if (total === 2) {
          result = `${total}nd`;
        } else if (total === 3) {
          result = `${total}rd`;
        } else {
          result = `${total}th`;
        }
      } else if (num > 0) {
        const number = total - 1;
        if (number === 1) {
          result = `${number}st`;
        } else if (number === 2) {
          result = `${number}nd`;
        } else if (number === 3) {
          result = `${number}rd`;
        } else {
          result = `${number}th`;
        }
      }
      return result;
    },
    printStylingTip(data) {
      let printData = data;
      printData = printData.replace(new RegExp(/\r?\n/, 'g'), '<br/>');

      return printData;
    },
  },
  created() {
    this.setPastCloset();
  },
};
</script>

<style scoped lang="scss">
  .past {
    padding: 20px;
  }
  .txt-main-title {
    word-break: keep-all;
  }
  .line {
    margin-top: 15px;
  }
  .list-closet {
    .closet-item {
      border-bottom: 1px solid #e9e9e9;
      padding-top: 17px;
      padding-bottom: 26px;
    }
    .order {
      margin-bottom: 10px;
      font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      .number,
      .date {
        line-height: 21px;
        font-size: 16px;
        font-weight: 700;
      }
      .number {
        position: relative;
        margin-right: 12px;
        &:after {
          content: '';
          display: block;
          position: absolute;
          border-right: 2px solid #979797;
          height: 12px;
          top: 5px;
          right: -10px;
        }
      }
    }
    .list-product {
      margin-bottom: 16px;
      .image {
        width: 48.5745%;
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .style-tip {
      margin-bottom: 19px;
      .title,
      .explain {
        font-size: 15px;
        letter-spacing: -0.6px;
      }
      .title {
        line-height: 21px;
        font-weight: 700;
        margin-bottom: 7px;
      }
      .explain {
        line-height: 23px;
        color: #797979;
      }
    }
  }
  @media (min-width: 1279px) {
    .past {
      width: 1200px;
      margin: 0 auto;
      padding: 34px 0 0 0;
    }
    .line {
      margin-top: 26px;
      margin-bottom: 5px;
    }
    .list-closet {
      .closet-item {
        padding-top: 21px;
        padding-bottom: 30px;
      }
      .order {
        text-indent: 7px;
        margin-bottom: 15px;
      }
      .product-desc {
        display: flex;
      }
      .list-product {
        margin-bottom: 0;
        flex: 0 0 234px;
        .image {
          width: 112px;
          height: 132px;
          &:nth-child(1) {
            margin-right: 10px;
          }
          &:nth-child(2) {
            float: left;
          }
        }
      }
      .style-tip {
        margin-left: 28px;
        margin-bottom: 0;
        margin-right: 98px;
        flex: 0 0 697px;
        .title {
          margin-bottom: 10px;
        }

      }
      }
      .purchase-info {
        margin-top: 62px;
      }
    }
</style>
