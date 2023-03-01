<template>
  <div id="front_module_bg">

    <h1 style="text-align: center; font-size: 3vw; color: bisque; position: relative; top:3vh"> 模 組 任 務 </h1>
    <!-- <n-divider /> -->

    <!-- 輪播圖 -->
    <div id="carousel">
      <n-carousel
        effect="card"
        centered-slides
        slides-per-view="5"
        autoplay
        draggable
        show-arrow
        interval="1800"
      >
        <n-carousel-item style="width: 70%;">
          <img
            class="carousel-img"
            src="https://res.cloudinary.com/dvpgoachn/image/upload/v1677159495/oh7jf2vhzttet9sgigxx.jpg"
          >
        </n-carousel-item>
        <n-carousel-item style="width: 70%">
          <img
            class="carousel-img"
            src="https://res.cloudinary.com/dvpgoachn/image/upload/v1676555689/ut2gxdvspynnb7mlcknu.jpg"
          >
        </n-carousel-item>
        <n-carousel-item style="width: 70%">
          <img
            class="carousel-img"
            src="https://res.cloudinary.com/dvpgoachn/image/upload/v1676555786/brtnzqixnpipmvjss4qg.jpg"
          >
        </n-carousel-item>
        <n-carousel-item style="width: 70%">
          <img
            class="carousel-img"
            src="https://res.cloudinary.com/dvpgoachn/image/upload/v1677159046/exc3kafdx7srvfwsnwny.jpg"
          >
        </n-carousel-item>
      </n-carousel>
    </div>

    <div class="front_module_contain">

      <div
        v-for=" mod in modules"
        :key="mod._id"
        class="col"
      >
        <ModuleCard v-bind="mod" class="module_card" />

      </div>

    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { reactive, onMounted, onUnmounted } from 'vue'
import { api } from '@/plugins/axios'
import ModuleCard from '@/components/ModuleCard.vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const modules = reactive([])

gsap.registerPlugin(ScrollTrigger)
const triggers = ScrollTrigger.getAll()

onMounted(() => {
  gsap.set('.front_module_contain', { opacity: 0, x: -100 })
  gsap.to('.front_module_contain', {
    x: 80,
    opacity: 1,
    duration: 1,
    // rotation: 360,

    scrollTrigger: {
      trigger: '#carousal', // 觸發得物件
      start: 'top top', // (物件開始位置, 卷軸開始位置) top center bottom px
      end: '+=300', // (物件結束位置, 卷軸結束位置) , 也可以設卷軸捲動多少結束動畫(+=300)
      pin: true, // 物件執行完動畫會跟著卷軸走，類似 fixed-top
      scrub: true // 物件動畫根據卷軸捲動程度跑
      // markers: true // 顯示標記
    }
  })
})

onUnmounted(() => {
  triggers.forEach((trigger) => {
    // 把 ScrollTrigger 綁定的動畫消除
    trigger.kill()
  })
  // 消除綁定 MatchMedia();
  ScrollTrigger.clearMatchMedia()
})
;
(async () => {
  try {
    const { data } = await api.get('/modules')
    modules.push(...data.result)
  } catch (error) {
    message.error('模組取得失敗')
  }
})()

</script>

<style lang="scss">
#front_module_bg {
  width: 100vw;
  height: 200vh;
  margin-top: 10vh;
  background: #2F4F40;

  #carousel {
    border-radius: 40px;
    width: 80%;
    height: 50vh;
    margin: auto;
    margin-top: 5%;
    background: #000;
    box-shadow: 0 0 0.5rem #222;

    .carousel-img {
      width: 100%;
      height: 500px;
      // height: 100%;
      object-fit: cover;
    }
  }

 .front_module_contain {
  width: 80vw;
  height: 110vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;

  .col {
    width: 25%;
    height: 300px;
    margin-left: 5%;
    margin-top: 15%;

    display: flex;

    .n-card {
      width: 90%;
      height: 380px;
      margin: auto;
      padding: 0;

      border: 0px;
      background-color:#F8E9D6;
      box-shadow: 8px 8px 0px 5px  #F9B02DCC;

      text-align: left;
      font-weight: 800;

      display: flex;

      // animation
      animation:swing-in-top-fwd .5s linear 2s backwards;
      @keyframes swing-in-top-fwd{0%{transform:rotateX(-100deg);transform-origin:top;opacity:0}100%{transform:rotateX(0deg);transform-origin:top;opacity:1}}

      .n-card__content {
        padding: 0;
      }

      .module_title {
        width: 90%;
        min-height: 30%;

        text-decoration: none;
        font-weight: 800;
        color: #2F4F40;
        font-size:18px;

        position: absolute;
        top: 55%;
        left: 5%;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // overflow:hidden;
      }
        #module_front_info {
          width: 90%;
          height: 50px;
          // min-height: 30%;

          text-decoration: none;
          font-weight: 400;
          color: #2F4F4099;
          font-size:16px;

          text-overflow: ellipsis;
          // white-space: nowrap;
          overflow:hidden;

          position: absolute;
          top: 65%;
          left: 8%;
        }

      .card_info {
        text-overflow: ellipsis;
        overflow:hidden;
        width: 90%;
        height: 12%;
        position: absolute;
        top: 75%;
        left: 5%;
        font-size: 10px;
      }

      img {
          width: 100%;
          height: 200px;
          object-fit: cover;
      }

      }
    }
  }

}

  @media screen and (max-width: 1200px) and (min-width:768px){
  #front_module_bg{
    .front_module_contain{
   .col {
      width: 50%;
      height: 380px;
      display: flex;
      .n-card {
        margin: auto;
        display: flex;
        height: 400px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .n-card-cover {
          border-radius: 15px;
        }
        img{
           width: 100%;
          height: 350px;
          object-fit: cover;
        }
        .card_info {
          display: none;
        }
      }
    }
  }

  transition-duration: 0.5s;
  }
}

@media screen and (max-width: 768px) {
   #front_module_bg{
    .front_module_contain{
      .col{
          width: 100%;
          height: 460px;
          display: flex;
          .n-card {
            margin: auto;
            display: flex;
            height: 400px;
            width: 90%;
            padding: 0;
            background: none;
            text-align: left;

            .n-card__content {
              padding: 0;
            }
            .n-card-cover {
          border-radius: 15px;
        }
        .card_info {
          display: none;
        }
            img{
              width: 100%;
              height: 350px;
              object-fit: scale-down;
            }
          }
        }
      }
      transition-duration: 0.5s;
  }
}

</style>
