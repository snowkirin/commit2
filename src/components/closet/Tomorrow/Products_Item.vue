<template>
  <div class="column">
    <div
      v-if="productData[productTarget]"
      class="product"
      :class="{ selected: TomorrowSelected === productName }"
    >
      <div class="product-top">
        <!-- Text ZONE -->
        <p class="txt-type">{{ productName }}</p>
        <p class="txt-styling-title">
          {{ productData[productTarget][0].styling_title }}
        </p>
      </div>
      <div class="product-mid">
        <div
          class="product-image"
          v-for="(data, idx) in productData[productTarget]"
          :key="idx"
          v-if="data.id !== null"
        >
          <div class="image">
            <img
              :src="$common.ZulyImage() + data.image"
              @error="$common.IMAGE_NOT_EXIST($event, '303px')"
            />
          </div>
          <button
            type="button"
            class="btn btn-product-detail h-40"
            @click="clickProductDetail(data)"
          >
            {{ data.category }} 상세보기
          </button>
        </div>
      </div>
      <div class="product-bot">
        <p class="txt-styling-tip">
          {{ productData[productTarget][0].styling_tip }}
        </p>
      </div>
      <div class="btn-selected">
        <button
          v-if="showButton"
          type="button"
          class="btn btn-primary h-56"
          @click="clickProductSelect"
        >
          {{ productName }} {{ TomorrowSelected === productName ? '선택됨': '선택하기'}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SubsciptionAPI from '@/library/api/subscriptions';
import ModalProductDetail from '@/components/common/modal/ModalProductDetail.vue';

export default {
  name: 'Products_Item',
  components: {
    ModalProductDetail
  },
  props: ['productData', 'productTarget', 'productName'],
  data() {
    return {
      productSelected: false
    };
  },
  computed: {
    ...mapGetters({
      TomorrowSelected: 'closet/TomorrowSelected'
    }),
    showButton() {
      // Status 상태가 14403일때만 선택하기 버튼이 보여진다.
      return this.productData.subscription_status === 14403;
    }
  },
  methods: {
    ...mapActions({
      UPDATE_TOMORROW_SELECTED: 'closet/UPDATE_TOMORROW_SELECTED'
    }),
    checkSelected() {
      if (this.productData[this.productTarget]) {
        this.productSelected = !!this.productData[this.productTarget][0]
          .selected;
      }
    },
    clickProductSelect() {
      const payload = {
        subscription_id: _.parseInt(this.productData.subscription_id),
        products: [
          _.parseInt(this.productData[this.productTarget][0].id),
          _.parseInt(this.productData[this.productTarget][1].id)
        ]
      };
      SubsciptionAPI.PutTomorrow(payload).then(() => {
        this.$dialog.alert(
          `${this.productName}를 선택하셨습니다.`,
          this.$common.dialogAlertOptions
        );
        this.UPDATE_TOMORROW_SELECTED(this.productName);
      });
    },
    async clickProductDetail(data) {
      const modalConfig = {
        scrollable: true,
        height: 'auto',
        width: '98%',
        maxWidth: 600,
        adaptive: true
      };
      const barcode = data.barcode;
      const resultData = await SubsciptionAPI.GetProductDetail(barcode);
      this.$modal.show(
        ModalProductDetail,
        { data: resultData.data },
        modalConfig
      );
    }
  },
  created() {
    this.checkSelected();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.column {
  @include mobile {
    margin-top: 25px;
  }
  @include tablet {
    margin-left: 15px;
  }
}
.product {
  display: flex;
  flex-direction: column;

  background-color: #f9f9f9;
  border: 2px solid #e1e1e1;
  padding: 25px 20px 35px;
  text-align: center;
  position: relative;
  height: 100%;

  &.selected {
    &::before {
      @include fontSize(20px);
      font-weight: 100;
      color: #fff;
      white-space: pre;
      content: '좋아요.\A선택할께요.';
      background: {
        image: url('~@/assets/img/closet/ico_white.svg');
        repeat: no-repeat;
        position-x: 50%;
        size: 43px 38px;
      }
      padding-top: 60px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    &::after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(51, 51, 51, 0.4);
      position: absolute;
      outline: 3px solid $color-primary;
    }
  }
  .product-top {
    margin-bottom: 21px;
    .txt-type {
      @include fontSize(15px, en);
      font-weight: 700;
      margin-bottom: 6px;
    }
    .txt-styling-title {
      @include fontSize(18px);
      font-weight: 100;
    }
  }
  .product-mid {
    margin-bottom: 30px;
    margin-top: -13px;
    @include desktop {
      display: flex;
    }
    .product-image {
      margin-top: 13px;
      border: 1px solid #e8e8e8;
      @include desktop {
        margin: {
          left: auto;
          right: auto;
        }
      }
      .image {
        border: 5px solid #fff;
      }
      img {
        width: 100%;
        @include desktop {
          width: 225px;
        }
      }
    }
    .btn-product-detail {
      @include fontSize(14px);
      border-top: 1px solid #e8e8e8;
      background-color: #fff;
      color: $color-secondary;
    }
  }
  .product-bot {
    text-align: left;
    @include desktop {
      margin-bottom: 30px;
    }
    .txt-styling-tip {
      @include fontSize(15px);
    }
  }
  .btn-selected {
    margin-top: auto;
    @include mobile-tablet {
      display: none;
    }
  }
}
</style>
