<template>
  <div class="colors subContent mauto">
    <div class="content-title mt20">색상 선택</div>
    <div class="explain mt20">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="colorsLine mt25"></div>
    <div class="colors-form d-flex mt30 w100">
      <div class="colors-area">
        <div class="colors-title-detail">선호 색상</div>
        <template v-for="(colors, k) in this.printColors">
          <div class="colors-card-list" v-bind:class="{ mt20: (k === 0), mt12: (k !== 0) }" v-bind:key="k">
            <template v-for="(color, dk) in colors">
              <div
                class="colors-card"
                v-on:mouseover="cardMouseOver"
                v-on:mouseout="cardMouseOut"
                v-bind:key="'dk_card_'+ dk"
                data-type="prefer"
                :data-selected="color.selected"
                :data-color="color.code"
                :style="(color.selected) ? { backgroundColor: `#${color.code}`, color: color.textColor } : { backgroundColor: '#FFFFFF' }"
                @click="colorPick($event, 'prefer', color.id)"
              >
                <span class="colors-card-text" :data-color="color.code" v-on:mouseover="textMouseOver" v-on:mouseout="textMouseOut" >
                  {{ color.text }}
                </span>
              </div>
              <div v-if="colors[dk+1]" class="colors-block" v-bind:key="'dk_block_'+ dk"></div>
            </template>
          </div>
        </template>
      </div>
      <div style="width: 3%; position: relative;">
        <div class="line"></div>
      </div>
      <div class="colors-area">
        <div class="colors-title-detail">기피 색상</div>
        <template v-for="(colors, k) in this.printColors">
          <div class="colors-card-list" v-bind:class="{ mt20: (k === 0), mt12: (k !== 0) }" v-bind:key="k">
            <template v-for="(color, dk) in colors">
              <div class="colors-card"
                v-on:mouseover="cardMouseOver"
                v-on:mouseout="cardMouseOut"
                v-bind:key="'dk_card_'+ dk"
                :data-selected="color.selected"
                :data-color="color.code"
                :style="(color.selected) ? { backgroundColor: `#${color.code}`, color: color.textColor } : { backgroundColor: '#FFFFFF' }"
                @click="colorPick($event, 'except')"
              >
                <span class="colors-card-text" v-on:mouseover="textMouseOver" v-on:mouseout="textMouseOut">
                  {{ color.text }}
                </span>
              </div>
              <div v-if="colors[dk+1]" class="colors-block" v-bind:key="'dk_block_'+ dk"></div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="mt30">
      <div style="width: 392px; float: right;">
        <button class="button-login" @click="moveNext">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'colors',
  computed: {
    ...mapGetters({
      colors: 'signup/getColors',
      prefer: 'signup/getPreferColors',
    }),
    printColors() {
      const rtn = [];
      let data = [];
      const dataLength = Object.keys(this.colors).length;

      for (let i = 0; i < dataLength; i += 1) {
        data.push({ id: i, ...this.colors[i] });

        if ((i + 1) % 3 === 0) {
          rtn.push(data);
          data = [];
        }
      }

      if (data.length > 0) rtn.push(data);

      return rtn;
    },
  },
  methods: {
    ...mapActions({
      setColors: 'signup/setColors',
      pickColors: 'signup/pickColors',
    }),
    cardMouseOver(evt) {
      const obj = evt;
      const title = obj.target.querySelector('.colors-card-text');
      const color = obj.target.getAttribute('data-color');
      const selected = obj.target.getAttribute('data-selected');
      const textColor = (color === 'FFFFFF') ? '212121' : 'FFFFFF';

      if (!selected === 'true') {
        if (obj.target) obj.target.style.backgroundColor = `#${color}`;
        if (title) {
          title.style.backgroundColor = `#${obj.target.getAttribute('data-color')}`;
          title.style.color = `#${textColor}`;
        }
      }
    },
    cardMouseOut(evt) {
      const obj = evt;
      const title = obj.target.querySelector('.colors-card-text');
      const selected = obj.target.getAttribute('data-selected');

      if (!selected === 'true') {
        if (obj.target) obj.target.style.backgroundColor = '#FFFFFF';
        if (title) {
          title.style.backgroundColor = '#FFFFFF';
          title.style.color = '#212121';
        }
      }
    },
    textMouseOver(evt) {
      const obj = evt;
      const parent = obj.target.parentNode;
      const color = parent.getAttribute('data-color');
      const selected = parent.getAttribute('data-selected');
      const textColor = (color === 'FFFFFF') ? '212121' : 'FFFFFF';

      if (!selected === 'true') {
        parent.style.backgroundColor = `#${color}`;
        obj.target.style.backgroundColor = `#${color}`;
        obj.target.style.color = `#${textColor}`;
      }
    },
    textMouseOut(evt) {
      const obj = evt;
      const parent = obj.target.parentNode;
      const selected = parent.getAttribute('data-selected');

      if (!selected === 'true') {
        parent.style.backgroundColor = '#FFFFFF';
        obj.target.style.backgroundColor = '#FFFFFF';
        obj.target.style.color = '#212121';
      }
    },
    colorPick(evt, type, id) {
      this.pickColors({
        type,
        id,
        color: evt.target.getAttribute('data-color'),
      });
    },
    moveNext() {
      this.$router.push({ path: 'clothes' });
    },
  },
  mounted() {
    this.setColors();
  },
};
</script>

<style scoped>
.line {
  width: 1px;
  height: 100%;
  background-color: #dadada;
  margin: auto;
}

.colors {
  text-align: center;
}

.colorsLine {
  height: 1px;
  opacity: 0.2;
  background-color: #212121;
}

.colors-area {
  width: 48.5%;
}

.colors-title-detail {
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #212121;
}

.colors-card-list {
}

.colors-card {
  width: 118px;
  height: 56px;
  display: inline-block;
  vertical-align: middle;
  background-color: #FFFFFF;
  border: solid 2px #dadada;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.5px;
  color: #333333;
  cursor: pointer;
}

.colors-card-text {
  position: relative;
  top: 25%;
}

.mt12 {
  margin-top: 12px;
}

.colors-block {
  display: inline-block;
  width: 2.5%;
}
</style>
