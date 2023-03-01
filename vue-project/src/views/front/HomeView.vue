<template>
  <!-- <h1> 官網~~~ </h1> -->
  <div class="container-fluid">
    <div id="bg_1">
    </div>
    <div class="boss_img">
      <img id="boss" src="../../assets/matching_半身-01.png">
    </div>
    <div id="bg_2">

    </div>

  </div>
  <Loaded :loaded="isLoad" />

</template>

<script setup>
import { gsap } from 'gsap'
import { ref, onMounted, reactive } from 'vue'
import { api } from '@/plugins/axios'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMessage } from 'naive-ui'
import Loaded from '@/components/TheLoaded.vue'

const message = useMessage()
const isLoad = ref(true)
const modules = reactive([])

gsap.registerPlugin(ScrollTrigger)

// const ScrollTrigger = ScrollTrigger.getAll();
onMounted(() => {
  gsap.set('#boss', { opacity: 1 })
  gsap.to('#boss', {
    opacity: 1,
    x: 100,
    // xPercent: -100,
    // yPercent: 200,
    // x: '-100vw',
    // y: '100vw',
    ease: 'none',
    scrollTrigger: {
      trigger: '#bg_1',
      scrub: true,
      markers: true,

      start: 'top top-=100px',
      pin: true

    }
  })

  // gsap.to('#boss', {
  //   yPercent: '500',
  //   // ease: 'power1',
  //   duration: 2,
  //   scale: 0.3,
  //   scrollTrigger: {
  //     trigger: '#bg_2',
  //     start: 'bottom top+=80vw', // the default values
  //     end: 'bottom bottom',
  //     scrub: true
  //     // start: 'top top',
  //     // pin: true
  //     // pinSpacing: false
  //   }
  // })
});

(async () => {
  try {
    const { data } = await api.get('/modules')
    isLoad.value = false

    modules.push(...data.result)
  } catch (error) {
    console.log(error)
    message.error('模組取得失敗')
  }
})()

</script>

<style lang="scss">
.container-fluid {
  // display: flex;
    max-height: 500vh;
    width: 150vw;
    margin-left: -30px;

    // overflow-y: scroll;

  #bg_1 {
    background-image: url('../../assets/tavern_1.jpg');
    margin-top: -5vw;
    width: 105vw;
    height: 130vh;
    // max-height: 150vh;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -5vw 0;
    position: relative;

    // background-attachment: fixed;

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

  }
  #boss {
    position: sticky;
    width: 25vw;
    left: 25vw;
    // top: 100%;
    z-index: 5;
    filter: drop-shadow(12px 12px 2px rgba(0, 0, 0, 0.7));

    // animation:swing-in-bottom-bck 2s cubic-bezier(.175,.885,.32,1.275) both;
    // animation-delay: 0.2s;

    // @keyframes swing-in-bottom-bck{0%{transform:rotateX(-70deg);transform-origin:bottom;opacity:0}100%{transform:rotateX(0);transform-origin:bottom;opacity:1}}

  }

#bg_2 {
  // background: #ff4d4d;
      width: 105vw;
    height: 120vh;
    position: relative;

}
}

</style>
