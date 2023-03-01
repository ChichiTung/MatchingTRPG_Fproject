<template>
  <!-- <h1> 官網~~~ </h1> -->
  <div class="container-fluid">
    <div id="bg_1">
    </div>
    <img id="matching" src="../../assets/TRPG_LOGO_word.png">
    <img id="TRPG" src="../../assets/TRPG_LOGO_word2.png">
    <h2 id="slogan">(( Match Your Team ! ))</h2>

    <div id="position"></div>

    <!-- <div class="boss_img"> -->
    <!-- </div> -->
    <div id="bg_2">

      <!-- <router-link
        :to="'/modules/' + _id"
        style="text-decoration: none; font-weight: 800; color: #2F4F40;"
        >
        <p class="module_title" style="height: 30%;"> ▋{{ name }}</p>
      </router-link> -->

      <img id="boss" src="../../assets/matching_半身-01.png">
      <div id="matching_intro">
        <p style="font-size: 1.7rem;">
          【酒館老闆 - 邁邁】</p>

        <p id="matching_intro_text">
          歡迎來到邁欽酒館！ 要來點新進任務嗎？
          或是說...了解我們 TRPG 嗎？
        </p>
      </div>
    </div>

    <div id="bg_3">
      <p id="matching_intro">我...第一次來...</p>

      <p id="matching_intro">又來找夥伴啦~</p>

    </div>

  </div>
  <Loaded :loaded="isLoad" />

</template>

<script setup>
import { gsap } from 'gsap'
import { ref, onMounted, reactive } from 'vue'
import { api } from '@/plugins/axios'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { useMessage } from 'naive-ui'
import Loaded from '@/components/TheLoaded.vue'

const message = useMessage()
const isLoad = ref(true)
const modules = reactive([])

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(TextPlugin)

// const ScrollTrigger = ScrollTrigger.getAll();
onMounted(() => {
  // gsap.set('#bg_1', { xPercent: 10 })
  // gsap.to('#bg_2', {
  //   opacity: 1,
  //   xPercent: -110,
  //   yPercent: 100,
  //   ease: 'none',

  //   scrollTrigger: {
  //     trigger: '#bg_2',
  //     scrub: true,
  //     markers: true,

  //     start: 'top top',
  //     end: 'bottom top',

  //     pin: true

  //   }
  // })
  // gsap.set('#boss', { yPercent: -120, xPercent: 10 })

  gsap.to('#boss', {
    xPercent: -120,
    yPercent: -80,

    ease: 'power1',
    // duration: 2,
    scrollTrigger: {
      trigger: '#bg_2',
      start: 'top bottom ', // the default values
      scrub: true,
      end: 'bottom top'
      // start: 'top top',
      // pin: true
      // pinSpacing: false
    }
  })
  // gsap.set('#matching', { xPercent: 100 })
  gsap.to('#matching', {
    opacity: 0.8,
    xPercent: 100,
    yPercent: 100,
    ease: 'power1',
    // duration: 2,
    scrollTrigger: {
      trigger: '#position',
      start: 'top bottom ', // the default values
      scrub: true,
      // end: 'center top',
      // start: 'top top',
      // pin: true,
      // pinSpacing: false
      markers: true

    }
  })
  gsap.to('#TRPG', {
    opacity: 0.8,
    xPercent: -10,
    yPercent: -20,
    ease: 'power1',
    // duration: 2,
    scrollTrigger: {
      trigger: '#position',
      start: 'top bottom ', // the default values
      scrub: true,
      // end: 'center top',
      // start: 'top top',
      // pin: true,
      // pinSpacing: false
      markers: true

    }
  })
  // gsap.set('#bg_2', { xPercent: 400 })
  gsap.to('#bg_2', {
    // opacity: 0.5,
    // xPercent: -10,
    yPercent: -10,
    ease: 'power1',
    // duration: 2,
    scrollTrigger: {
      trigger: '#position',
      start: 'top bottom ', // the default values
      scrub: true,
      // end: 'center top',
      // start: 'top top',
      pin: true,
      // pinSpacing: false
      markers: true

    }
  })
  gsap.to('#matching_intro_text', {
    text: 'gabby is the motherFucking shit',
    ease: 'power1.in',
    duration: 2
  })
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
    background-image: url('../../assets/tavern_4.jpg');
    margin-top: -5vw;
    width: 105vw;
    height: 130vh;
    // max-height: 150vh;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -10vw -15vh;
    // position: relative;
    position: fixed;

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
  #matching {
    // filter: drop-shadow(0 0 0.3rem rgb(255, 248, 205));

    position: absolute;
    top:47%;
    right: 7%;
    width: 25%;
    animation:jello-horizontal .9s both;
   @keyframes jello-horizontal{0%{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,.75,1)}40%{transform:scale3d(.75,1.25,1)}50%{transform:scale3d(1.15,.85,1)}65%{transform:scale3d(.95,1.05,1)}75%{transform:scale3d(1.05,.95,1)}100%{transform:scale3d(1,1,1)}}
  }
  #TRPG {
    // filter: drop-shadow(0 0 0.3rem rgb(205, 255, 212));
    position: absolute;
    top:75%;
    right: 8%;
    width: 22%;
     animation:jello-diagonal-1 .8s both;
     @keyframes jello-diagonal-1{0%{transform:skew(0deg 0deg)}30%{transform:skew(-25deg -25deg)}40%{transform:skew(15deg,15deg)}50%{transform:skew(-15deg,-15deg)}65%{transform:skew(5deg,5deg)}75%{transform:skew(-5deg,-5deg)}100%{transform:skew(0deg 0deg)}}
    // width: 110%;
  }
  #slogan{
    font-size: 2rem;
    color: #fff4c7;
    position: absolute;
    top:92%;
    right: -22%;
    width: 50%;
    text-shadow: 0.2rem 0.2rem 0.2rem #2F4F40;
    animation:tracking-in-expand .7s cubic-bezier(.215,.61,.355,1.000) both 0.5s;
    @keyframes tracking-in-expand{0%{letter-spacing:-.5em;opacity:0}40%{opacity:.6}100%{opacity:1}}
  }
  #position {
    position: absolute;
    top:75%;
    right: 10%;
    width: 35%;
  }
  #boss {
    width: 15vw;
    position: absolute;
    top: 52%;
    right: 10%;
    z-index: 5;
    filter: drop-shadow(12px 12px 2px rgba(0, 0, 0, 0.7));

    // animation:swing-in-bottom-bck 2s cubic-bezier(.175,.885,.32,1.275) both;
    // animation-delay: 0.2s;

    // @keyframes swing-in-bottom-bck{0%{transform:rotateX(-70deg);transform-origin:bottom;opacity:0}100%{transform:rotateX(0);transform-origin:bottom;opacity:1}}

  }

#bg_2 {
  //  background-image: url('../../assets/tavern_4.jpg');
  // background: #ff4d4d;
  width: 105vw;
  height: 120vh;
  // margin-top: 10%;
   flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -10vw -15vh;
    position: absolute;
    top:120%;

}
#bg_3 {
  background: #ccf81e;
  width: 105vw;
  height: 120vh;
  margin-top: 40%;
   flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -10vw -15vh;
    position: absolute;
    top:120%;
}
#matching_intro {
  position: relative;
  width: 65%;
  height: 20%;
  top: 40%;
  left: 15%;
  font-size: 1.5rem;
  color: #2F4F40;
  font-weight: 600;
  background: #fbefbdcb;
  border: 5px solid;
  border-radius: 15px;
  padding: 1%;
  box-shadow: 0.3rem 0.3rem 0.7rem #181818;
  &::before{
    content: '';
          position: absolute;
          top: 90%;
          right: 5%;
          width: 0;
          height: 0;
          transform: rotate(-15deg);
          border: 22px solid;
          border-color: #fff9e1 transparent transparent transparent;
          filter: drop-shadow(0.1rem 0.1rem 0.5rem #222);
          z-index: -1;

  }
  &::after {
      content:" ";
      display:block;
      width: 0%;
      // width: 100%;
      height: 3px;
      top: 75%;
      position: absolute;
      background-color: #F9B02D;
      transition: .4s .2s;

    }
     &:hover::after{
      width: 90%;
    }
}
}

</style>
