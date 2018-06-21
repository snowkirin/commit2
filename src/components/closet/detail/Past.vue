<template>
  <div class="past">
    <div>
      <p class="txt-main-title">그 동안의 옷장을 확인하실 수 <br/>있습니다.</p>
    </div>
    <div class="line line__default"></div>
    <div class="closet-list">
      <ul>
        <li
          v-for="(data, idx) in pastCloset"
          class="closet-item"
          :key="idx">
          <p class="order en-font">
            <span class="number">{{ numberSuffix(idx, pastCloset.length) }}</span>
            <span class="date"> {{ data.subscription_date }}</span>
          </p>
          <ul class="product">
            <li
              v-for="(img, idx2) in data.images"
              :key="idx2"
              class="product-image"
            >
              <img :src="(img !== null)? API_IMAGE_URL + 'small/' + img : 'http://via.placeholder.com/60x70?text=Image '" alt=""/>
            </li>
          </ul>
          <div class="style-tip">
            <p class="title">스타일 팁</p>
            <ellipsis-plus
              class="explain"
              ref="noButton"
              :show-button="false"
              expand-text='+더보기'
              collapse-text="접기"
              :text="printStylingTip(data.styling_tip)"
              :ellipsis="'...'"
              :line="4">
            </ellipsis-plus>
          </div>
          <p>
            <a
              @click="viewModal(data.id)"
              class="link-purchase"
              v-if="data.is_sold === 'N'">
              구매 정보 보기
            </a>
          </p>
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
  .main-title {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -1px;
    margin-bottom: 15px;
  }
  .zuly-line {
    border-bottom: 2px solid #333;
  }
  .closet-list {
    ul {
      list-style: none;
      padding: 0;
    }
    .closet-item {
      border-bottom: 1px solid #e9e9e9;
      padding-top: 11px;
      padding-bottom: 26px;
    }
    .order {
      margin-bottom: 11px;
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
    .product {
      font-size: 0;
      margin-bottom: 10px;
      &-image {
        display: inline-block;
        width: 60px;
        height: 70px;
        overflow: hidden;
        margin-left: 8px;
        &:first-child {
          margin-left: 0;
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
    .link-purchase {
      line-height: 25px;
      font-size: 15px;
      letter-spacing: -0.4px;
      color: #566b9c;
      text-decoration: underline;
    }
  }

/*.past-content {
  padding: 30px 0;
  border-bottom: solid 2px #e9e9e9;
}

.content-first-number {
  display: flex;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: normal;
  color: #333333;
}

.content-second {
  display: flex;
  justify-content: space-between;
}

.content-second-text {
  width: 69.6%;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #333333;
}

.content-second-title {
  font-size: 16px;
  font-weight: 600;
}

.content-second-tip {
  line-height: 1.4;
}

.content-second-view {
  width: 11%;
  text-align: right;
}

.content-second-view-cell {
  position: relative;
  top: 50%;
  font-size: 16px;
  color: #566b9c;
  text-decoration: underline;
  letter-spacing: -0.8px;
}

.thumnail-image-area {
  position: relative;
  display: inline-block;
  width: 89px;
  height: 112px;
  background-color: #f5f5f5;
  border: solid 1px #e9e9e9;
  margin-right: 13px;
}

.thumnail-image {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 89px;
  height: 112px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@media screen and (max-width: 486px) {
  .content-second {
    display: block;
  }

  .content-second-text, .content-second-view {
    width: 100%;
  }

  .content-second-view {
    text-align: left;
  }
}*/
</style>
