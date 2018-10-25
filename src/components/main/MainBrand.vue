<template>
  <div class="contents">
    <div class="contents-header">
      <h3>BRANDS WE LOVE</h3>
      <p>주요 브랜드</p>
    </div>
    <div class="content">
      <ul class="list-brand">
        <li class="item"><img src="@/assets/img/main/brand_among.jpg" alt="among"/></li>
        <li class="item"><img src="@/assets/img/main/brand_atre.jpg" alt="ATRE"/></li>
        <li class="item"><img src="@/assets/img/main/brand_ines.jpg" alt="INES"/></li>
        <li class="item"><img src="@/assets/img/main/brand_kindersalmon.jpg" alt="KINDERSALMON"/></li>
        <li class="item"><img src="@/assets/img/main/brand_maison.jpg" alt="Maison de Ines"/></li>
        <li class="item"><img src="@/assets/img/main/brand_rocketxlunch.jpg" alt="ROCKET X LUNCH"/></li>
        <li class="item"><img src="@/assets/img/main/brand_wnderkammerp.jpg" alt="WNDERKAMMER"/></li>
        <li class="item"><img src="@/assets/img/main/brand_youness.jpg" alt="YOUNESS"/></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainBrand'
};
</script>
<style scoped lang="scss" src="@/assets/css/main-style.scss">
</style>
<style scoped lang="scss">
.contents {
  background-color: #f7f7f7;
  padding-bottom: 45px;
}
.list-brand {
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  .item {
    flex: 0 0 calc(50% - (11px / 2));
    max-width: calc(50% - (11px / 2));
    margin-top: 10px;
    img {
      width: 100%;
    }
    &:nth-child(even) {
      margin-left: 11px;
    }
  }
}
@media (min-width: 1080px) {
  .contents {
    padding-bottom: 65px;
  }
  .list-brand {
    width: 1080px;
    margin: -20px auto 0;
    .item {
      flex: 0 0 calc(25% - ((24px * 3) / 4));
      max-width: 25%;
      margin-top: 20px;
      &:not(:nth-child(4n + 1)) {
        margin-left: 24px;
      }
    }
  }
}
</style>
