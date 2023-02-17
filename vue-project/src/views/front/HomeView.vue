<template>
  <!-- <h1> 官網~~~ </h1> -->
  <div class="container-fluid">
    <div class="bg_1"></div>
  </div>
</template>

<style lang="scss">
.container-fluid {
  // 橫向滾動
  // display: flex;
    // overflow-x: hidden;
    max-height: 500vh;
    width: 150vw;
    margin-left: -30px;

    // overflow-y: scroll;

  .bg_1 {
    background-image: url('../../../../image/tavern_5.jpg');
    margin-top: -5vw;
    width: 105vw;
    height: 111vh;
    // max-height: 150vh;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -5vw 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // z-index: 2;

      background-color: #2F4F4F99;
    }

}
}

</style>
