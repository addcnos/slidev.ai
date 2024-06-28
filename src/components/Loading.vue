<template>
 <div class="rocket-bg">
  <div class="rocket-loader">
    <div class="rocket">
      <div class="rocket-extras"></div>
      <div class="jet"><span></span></div>
    </div>
  </div>
  <div class="rocker-text" v-show="serverProcess === +key" v-for="(content, key) in serverProcessMap" :key="key">
      <span class="txt">{{ content }}</span>
    </div>
</div>
</template>

<script setup lang="ts">
import { serverProcess, serverProcessMap } from '@main/webcontainer';
</script>

<style lang="scss" scoped>
.rocket-bg {
  width: 100%;
  height: calc(100% - 0px);
  background: url("@assets/images/load-bg5.jpg") no-repeat center center;
  background-size: cover;
  object-fit: cover;
}

.rocket-loader *,
.rocket-loader *::before,
.rocket-loader *::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  word-break: break-all;
}

.rocket-loader { // Moving particles
  position: absolute;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 240px;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(90deg, #fff, transparent 10%) 0 20%/180% 0.2rem repeat-x, linear-gradient(90deg, #fff, transparent 20%) 0 80%/150% 0.2rem repeat-x, linear-gradient(90deg, #fff, transparent 5%) 0 65%/100% 0.2rem repeat-x, linear-gradient(90deg, #fff, transparent 5%) 0 40%/220% 0.2rem repeat-x;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
  animation: move-particles 6s linear infinite;

  &::before {
    position: absolute;
    right: 0;
    bottom: 10%;
    left: 0;
    font-size: 20px;
    color: #fff;
    content: "Loading...";
    animation: blink 1s infinite;
  }
}

@keyframes move-particles {
  100% {
    background-position-x: -500rem;
  }
}

.rocket {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35%;
  height: 15%;
  background: lightgray;
  background: linear-gradient(darken(#23d2e2, 20), #23d2e2, darken(#23d2e2, 20));
  border-left: 3px solid rgb(0 0 0 / 40%);
  border-radius: 50%/30%;
  transform: translate(-50%, -50%);
  animation: moveRocket 2s linear infinite;

  &::before,
  &::after {
    position: absolute;
    content: "";
  }

  &::before { // Rocket fin
    top: 50%;
    left: 6px;
    width: 20%;
    height: 140%;
    background: darken(lightgray, 10);
    background: linear-gradient(darken(#23d2e2, 20), #23d2e2, darken(#23d2e2, 20));
    border: 2px solid transparent;
    border-radius: 0 50% 50% 0;
    transform: translate(0, -50%);
    animation: rotateFins 1s infinite;
  }

  &::after { // Rocket tip
    top: 8px;
    right: -28px;
    border: 10px solid transparent;
    border-left: 20px solid rgb(0 0 0 / 40%);
    border-radius: 15%;
  }

  &-extras { // Rocket body mark
    position: absolute;
    top: 50%;
    left: 12px;
    width: 10px;
    height: 2px;
    margin: -2px 0 0;
    background: rgb(0 0 0 / 40%);
    transform: translate(0, -50%);
    animation: move-extras 1s infinite;

    &::before,
    &::after {
      position: absolute;
      content: "";
    }

    &::before { // Rocket eye
      top: -1px;
      right: -7px;
      width: 5px;
      height: 5px;
      background: white;
      border-radius: 50%;
    }

    &::after { // Rocket 3rd small fin
      top: 1px;
      left: -10px;
      width: 6px;
      height: 1px;
      background: darken(red, 10);
      border-top: 1px solid darken(red, 30);
    }
  }
}

@keyframes moveRocket {
  0%,
  100% {
    transform: translate(-50%, calc(-50% - 1rem));
  }

  50% {
    transform: translate(-50%, calc(-50% + 1rem));
  }
}

@keyframes rotateFins {
  0%,
  100% {
    height: 140%;
  }

  50% {
    height: 110%;
    border-top: 2px solid darken(red, 30);
    border-bottom: 2px solid darken(red, 30);
  }
}

@keyframes move-extras {
  0%,
  100% {
    transform: translate(0, calc(-50% + 0.1rem));
  }

  50% {
    transform: translate(0, calc(-50% - 0.1rem));
  }
}

.rocker-text {
  position: absolute;
  top: calc(50% + 160px);
  left: 50%;
  font-size: 18px;
  color: #fff;
  white-space: nowrap;
  transform: translateX(-50%);
}

.jet {
  position: absolute;
  top: calc(50% - 5px);
  left: -10px;
  width: 10px;
  height: 10px;

  &::before,
  &::after,
  span {
    position: absolute;
    top: 1px;
    left: -6px;
    width: 15px;
    height: 8px;
    content: "";
    background: darken(orange, 6);
    filter: blur(2px);
    border-radius: 50%;
    opacity: 1;
    transform: translate(0, 0) scale(1);
    animation: move-smoke 0.3s infinite;
  }

  &::after {
    animation-delay: 0.1s;
  }

  span {
    animation-delay: 0.2s;
  }
}

@keyframes move-smoke {
  100% {
    filter: blur(3px);
    opacity: 0;
    transform: translate(-40px, 0) scale(2);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }
}
</style>
