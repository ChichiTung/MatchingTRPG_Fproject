<template>
  <!-- <h1> 官網~~~ </h1> -->
  <div class="container-fluid">
    <div class="bg_1">

      <img src="../../../image/matching.png" class="boss">

    </div>
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
    height: 120vh;
    // max-height: 150vh;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -5vw 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;

      background-color: #2F4F4F99;
    }
    .boss {
      position: absolute;
      left: 50%;
      top: 45%;
      z-index: 5;
      filter: drop-shadow(12px 12px 2px rgba(0, 0, 0, 0.7));

      animation:swing-in-bottom-bck 2s cubic-bezier(.175,.885,.32,1.275) both;
      animation-delay: 0.2s;

      @keyframes swing-in-bottom-bck{0%{transform:rotateX(-70deg);transform-origin:bottom;opacity:0}100%{transform:rotateX(0);transform-origin:bottom;opacity:1}}

    }

}
}

</style>
