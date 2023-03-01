<template>
  <teleport v-if="props.loaded" to="body">
    <div class="loaded_wrapper">
      <span class="cssload-loader">
        <span class="cssload-loader-inner"></span>
      </span>
    </div>
    <!-- <div class="fixed top-0 left-0 z-30 w-full h-full bg-black/80"></div> -->
  </teleport>
</template>

<script setup>
const props = defineProps({
  loaded: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.loaded_wrapper{
  position: fixed;
  width: 100%;
  height: 100%;
  margin: auto;

}
.cssload-loader {
display: block;
margin:0 auto;
width: 29px;
height: 29px;
position: relative;
border: 4px solid rgb(55,102,46);
animation: cssload-loader 2.3s infinite ease;
-o-animation: cssload-loader 2.3s infinite ease;
-ms-animation: cssload-loader 2.3s infinite ease;
-webkit-animation: cssload-loader 2.3s infinite ease;
-moz-animation: cssload-loader 2.3s infinite ease;
}

.cssload-loader-inner {
vertical-align: top;
display: inline-block;
width: 100%;
background-color: rgb(245,185,35);
animation: cssload-loader-inner 2.3s infinite ease-in;
-o-animation: cssload-loader-inner 2.3s infinite ease-in;
-ms-animation: cssload-loader-inner 2.3s infinite ease-in;
-webkit-animation: cssload-loader-inner 2.3s infinite ease-in;
-moz-animation: cssload-loader-inner 2.3s infinite ease-in;
}

@keyframes cssload-loader {
0% {
transform: rotate(0deg);
}

25% {
transform: rotate(180deg);
}
0% {
transform: rotate(180deg);
}

75% {
transform: rotate(360deg);
}

100% {
transform: rotate(360deg);
}
}

@-o-keyframes cssload-loader {
0% {
transform: rotate(0deg);
}

25% {
transform: rotate(180deg);
}
50% {
transform: rotate(180deg);
}
75% {
transform: rotate(360deg);
}

100% {
transform: rotate(360deg);
}
}

@-ms-keyframes cssload-loader {
0% {
transform: rotate(0deg);
}

25% {
transform: rotate(180deg);
}

50% {
transform: rotate(180deg);
}

75% {
transform: rotate(360deg);
}
100% {
transform: rotate(360deg);
}
}

@-webkit-keyframes cssload-loader {
0% {
transform: rotate(0deg);
}

25% {
transform: rotate(180deg);
}

50% {
transform: rotate(180deg);
}

75% {
transform: rotate(360deg);
}

100% {
transform: rotate(360deg);
}
}

@-moz-keyframes cssload-loader {
0% {
transform: rotate(0deg);
}

25% {
transform: rotate(180deg);
}

50% {
transform: rotate(180deg);
 }

75% {
transform: rotate(360deg);
}

100% {
transform: rotate(360deg);
}
}

@keyframes cssload-loader-inner {
0% {
height: 0%;
}

25% {
height: 0%;
}

50% {
height: 100%;
}

75% {
height: 100%;
}

100% {
height: 0%;
}
}

@-o-keyframes cssload-loader-inner {
0% {
height: 0%;
}

25% {
height: 0%;
}

50% {
height: 100%;
}

75% {
height: 100%;
}

100% {
height: 0%;
}
}

@-ms-keyframes cssload-loader-inner {
0% {
height: 0%;
}

25% {
height: 0%;
}

50% {
height: 100%;
}

75% {
height: 100%;
}

100% {
height: 0%;
}
}

@-webkit-keyframes cssload-loader-inner {
0% {
height: 0%;
}

25% {
height: 0%;
}

50% {
height: 100%;
}

75% {
height: 100%;
}

100% {
height: 0%;
}
}

@-moz-keyframes cssload-loader-inner {
0% {
height: 0%;
}

25% {
height: 0%;
}

50% {
height: 100%;
}

  75% {
height: 100%;
}

100% {
height: 0%;
}
}
</style>
