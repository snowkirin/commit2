<template>
  <div class="container">
    <benefit></benefit>
    <about></about>
    <process></process>
    <faq></faq>
    <new-arrivals></new-arrivals>
  </div>
</template>

<script>
import Benefit from "@/components/main/Benefit";
import About from "@/components/main/About";
import Process from "@/components/main/Process";
import Faq from "@/components/main/Faq";
import NewArrivals from "@/components/main/NewArrivals";

export default {
  name: "main-index",
  components: {
    Benefit,
    About,
    Process,
    Faq,
    NewArrivals
  }
};
</script>

<style scoped lang="scss">
/* Main Common Style */
@media (min-width: 768px) {
  .contents {
    width: 1200px;
    margin: 0 auto;
  }

}
</style>
