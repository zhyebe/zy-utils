<template>
  <div id="app" class="sign">
    <div class="sign-box">
      <vite-sign
        class="signature"
        ref="sign"
        :width="800"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        v-model:bgColor="bgColor"
      />
    </div>
    <div class="esigh-btns">
      <button @click="handleReset">清空画板</button>
      <button @click="handleGenerate">生成图片</button>
    </div>
    <div class="esigh-result">
      <img v-if="resultImg" :src="resultImg" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const lineWidth = ref(6);
const lineColor = ref("#000000");
const bgColor = ref("");
const resultImg = ref("");
const isCrop = ref(false);
const sign = ref();
const handleReset = () => {
  sign?.value.reset();
};
const handleGenerate = () => {
  sign.value
    .generate()
    .then((res: string) => {
      resultImg.value = res;
    })
    .catch((err: any) => {
      console.warn(err);
    });
};
</script>

<style scoped>
.sign {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}
.esigh-btns button {
  color: #fff;
  height: 40px;
  width: 100px;
  font-size: 16px;
  margin-right: 10px;
  outline: none;
  border-radius: 4px;
  background: #f60;
  border: 1px solid transparent;
}
.esigh-btns button:active {
  color: #fff;
  box-shadow: 0px 0px 50px orangered inset;
}
.esigh-result {
  margin-top: 10px;
}
.esigh-result img {
  display: block;
  max-width: 100%;
  height: auto;
  border: 1px solid #ececee;
}
.signature {
  margin: 10px 0;
  border: 2px solid #ccc;
}
</style>
