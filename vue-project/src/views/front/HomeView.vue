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

      <img id="boss" src="../../assets/matching_半身-01.png">
      <div id="matching_intro">
        <p style="font-size: 1.5rem; margin-left: 2%;">
          【酒館老闆 - 邁邁】</p>

        <p id="matching_intro_text">
          ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.
          Iä! Iä! Hastur! Ugh! Ugh! Iä Hastur cf’ ayak ’vulgtmm, vugtlagln vulgtmm! Ai! Shub-Niggurath! ...
        </p>
      </div>
    </div>

    <div id="bg_3">
      <img id="you" src="../../assets/matching_半身-01.png">
      <div class="matching_answer">
        <p style="font-size: 1.5rem; margin-left: 28%;">
          【你】
        </p>
        <router-link
          :to="'/trpg'"
          style="text-decoration: none; font-weight: 800; color: #2F4F40; margin-left: 3%; margin-bottom: 2%;"
        >
          <p class="answer"> 我...第一次來這裡...   &nbsp; TRPG...那是什麼..?</p>
        </router-link>

        <a href="#bg_4" style="text-decoration: none; margin-left: 3%;">
          <!-- <p class="answer">當然是找新任務啦，等不及冒險了 ！</p> -->
        </a>

      </div>

    </div>

    <div id="bg_4">
      <div class="front_module_contain">
        <img id="light_title" src="../../assets/456.png" alt="">
        <h2 class="light_title">新進劇本</h2>

        <div
          v-for=" mod in modules"
          :key="mod._id"
          class="col"
        >
          <ModuleCard v-bind="mod" class="module_card" />

        </div>

      </div>
      <div id="footer">
        <p>泰山職訓局前端開發專題  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;董元琪</p>
      </div>
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
  gsap.to('#you', {
    xPercent: 40,
    // yPercent: -100,

    ease: 'power1',
    // duration: 2,
    scrollTrigger: {
      trigger: '#bg_3',
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
      scrub: true
      // end: 'center top',
      // start: 'top top',
      // pin: true,
      // pinSpacing: false

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
      scrub: true
      // end: 'center top',
      // start: 'top top',
      // pin: true,
      // pinSpacing: false

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
      pin: true
      // pinSpacing: false

    }
  })
  gsap.set('#bg_4', { opacity: 0 })
  gsap.to('#bg_4', {
    opacity: 1,
    // xPercent: -10,
    // xPercent: 0,
    yPercent: 10,
    ease: 'none',
    // duration: 2,
    scrollTrigger: {
      trigger: '#bg_3',
      start: 'bottom center ', // the default values
      scrub: true,
      // end: 'center top',
      // start: 'top top',
      pin: true
      // pinSpacing: false

    }
  })

  gsap.to('#matching_intro_text', {
    text: {
      value: '歡迎來到邁欽酒館！ 要來點新進任務嗎？ 或是說...了解我們 TRPG 嗎？',
      delimiter: ' '
    },
    ease: 'rough',
    duration: 15

  })
  gsap.set('#light_title', { opacity: 0 })

  gsap.to('#light_title', {
    // xPercent: -10,
    // xPercent: 0,
    yPercent: 40,
    opacity: 1,
    ease: 'none',
    // duration: 2,
    scrollTrigger: {
      trigger: '#bg_4',
      start: 'center center ', // the default values
      scrub: true,
      // end: 'center top',
      // start: 'top top',
      pin: true
      // pinSpacing: false

    }
  })
  // gsap.to('.light_title', {
  //   // xPercent: -10,
  //   // xPercent: 0,
  //   yPercent: 40,
  //   opacity: 1,
  //   ease: 'none',
  //   // duration: 2,
  //   scrollTrigger: {
  //     trigger: '#bg_4',
  //     start: 'center center ', // the default values
  //     scrub: true,
  //     // end: 'center top',
  //     // start: 'top top',
  //     pin: true
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
  // background: #ccf81e;
  width: 105vw;
  height: 80vh;
  margin-top: 40%;
  padding-bottom: 5%;
   flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -10vw -15vh;
    position: absolute;
    top:120%;

    .matching_answer{
      position: relative;
      width: 65%;
      height: 30%;
      top: 20%;
      left: 15%;
      font-size: 1.5rem;
      color: #2F4F40;
      font-weight: 600;
      background: #fbefbdcb;
      border: 5px solid;
      border-radius: 15px;
      box-shadow: 0.3rem 0.3rem 0.7rem #181818;
      p {
        line-height: 1.5rem;
      }

      .answer{
        position: relative;
        margin-top: -1%;
        margin-left: 35%;
        z-index: 100;
        line-height: 1.5rem;

        &::before {
      content:" ";
      display:block;
      width: 60%;
      // width: 100%;
      height: 1.9rem;
      border-radius: 10px;
      top: 0%;
      position: absolute;
      background-color: #F9B02D99;
      transition: .4s .2s;
      z-index: 0;
      opacity: 0;

    }
       &:hover::before{
      opacity: 0.8;

      }
      }

    }
}
#you{
    width: 10vw;
    position: absolute;
    top: 18%;
    left: 20%;
    z-index: 5;
    filter: hue-rotate(240deg);
    transform:scaleX(-1);
    // filter: drop-shadow(12px 12px 2px rgba(0, 0, 0, 0.7));
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
  // &::after {
  //     content:" ";
  //     display:block;
  //     width: 0%;
  //     // width: 100%;
  //     height: 3px;
  //     top: 75%;
  //     position: absolute;
  //     background-color: #F9B02D;
  //     transition: .4s .2s;

  //   }
  //    &:hover::after{
  //     width: 90%;
  //   }
}
}

#matching_intro_text {
  margin-left: 4%;
  &:before {
    content: '';
    position: absolute;
    border-right: solid 10px #2a7535;
    width: 62%;
    height: 20%;
    top: 42%;
    // background: #000;
    bottom: 0;
    left:0;
    animation: blink 0.6s steps(23) infinite;

@keyframes blink{
  from{border-right: solid 8px #379a46;}
  to{border-right: solid 8px transparent;}
}
  }
}

#bg_4 {
  // background: url('../../assets/tavern_5.jpg');
  width: 105vw;
  // height: 120vh;
  margin-top: 80%;
   flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 105%;
    background-position: -10vw -15vh;
    position: absolute;
    top:120%;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;

      background-color: #2F4F4F44;
    }

    #light_title {
      position: absolute;
      top:12%;
      left:45%;
    }
    .light_title{
        position: absolute;
        top: 19%;
        right: 37%;
        rotate: -3deg;
        color: #2F4F40;
        z-index: 100;
      }

    .front_module_contain {
      width: 80vw;
      height: 110vh;
      margin: auto;
      margin-top: 20%;
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
#footer{
  background: #ffac40;
  width: 100%;
  height: 50px;
  margin-top: 30%;
  p{
    margin: auto;
    text-align: center;
    line-height: 3rem;
  }

    // top:120%;
}

</style>
