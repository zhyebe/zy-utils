<template>
  <canvas
    ref="canvas"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  ></canvas>
</template>

<script lang="ts" setup>
//@ts-ignore
defineOptions({
  name: "vite-sign",
});
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  nextTick,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
const props = defineProps({
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 300,
  },
  lineWidth: {
    type: Number,
    default: 4,
  },
  lineColor: {
    type: String,
    default: "#000000",
  },
  bgColor: {
    type: String,
    default: "",
  },
  isCrop: {
    type: Boolean,
    default: false,
  },
  isClearBgColor: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: "image/png",
  },
  quality: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(["update:bgColor"]);
const {
  height,
  width,
  bgColor,
  lineWidth,
  lineColor,
  isCrop,
  isClearBgColor,
  format,
  quality,
}: { [x: string]: Ref<any> } = toRefs(props);
const hasDrew = ref(false);
const resultImg = ref("");
const points: Ref<any[]> = ref([]);
const canvasTxt: Ref<any> = ref(null);
const startX = ref(0);
const startY = ref(0);
const isDrawing = ref(false);
const sratio = ref(1);
const canvas = ref();

const ratio = computed(() => height.value / width.value);
const stageInfo = computed(() => {
  return canvas.value?.getBoundingClientRect();
});
const myBg = computed(() => {
  return bgColor.value ? bgColor.value : "rgba(255, 255, 255, 0)";
});
watch(myBg, (newVal) => {
  canvas.value.style.background = newVal;
});
onBeforeMount(() => {
  window.addEventListener("resize", $_resizeHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", $_resizeHandler);
});
onMounted(() => {
  nextTick(() => {
    canvas.value.height = height.value;
    canvas.value.width = width.value;
    canvas.value.style.background = myBg.value;
    $_resizeHandler();
    // 在画板以外松开鼠标后冻结画笔
    document.onmouseup = () => {
      isDrawing.value = false;
    };
  });
});
const $_resizeHandler = () => {
  canvas.value.style.width = width.value + "px";
  const realw = parseFloat(window.getComputedStyle(canvas.value).width);
  canvas.value.style.height = ratio.value * realw + "px";
  canvasTxt.value = canvas.value.getContext("2d");
  canvasTxt.value.scale(1 * sratio.value, 1 * sratio.value);
  sratio.value = realw / width.value;
  canvasTxt.value.scale(1 / sratio.value, 1 / sratio.value);
};
// pc
const mouseDown = (e: any) => {
  e = e || event;
  e.preventDefault();
  isDrawing.value = true;
  hasDrew.value = true;
  let obj = {
    x: e.offsetX,
    y: e.offsetY,
  };
  drawStart(obj);
};
const mouseMove = (e: any) => {
  e = e || event;
  e.preventDefault();
  if (isDrawing.value) {
    let obj = {
      x: e.offsetX,
      y: e.offsetY,
    };
    drawMove(obj);
  }
};
const mouseUp = (e: any) => {
  e = e || event;
  e.preventDefault();
  let obj = {
    x: e.offsetX,
    y: e.offsetY,
  };
  drawEnd(obj);
  isDrawing.value = false;
};
// mobile
const touchStart = (e: any) => {
  e = e || event;
  e.preventDefault();
  hasDrew.value = true;
  if (e.touches.length === 1) {
    let obj = {
      x: e.targetTouches[0].clientX - canvas.value.getBoundingClientRect().left,
      y: e.targetTouches[0].clientY - canvas.value.getBoundingClientRect().top,
    };
    drawStart(obj);
  }
};
const touchMove = (e: any) => {
  e = e || event;
  e.preventDefault();
  if (e.touches.length === 1) {
    let obj = {
      x: e.targetTouches[0].clientX - canvas.value.getBoundingClientRect().left,
      y: e.targetTouches[0].clientY - canvas.value.getBoundingClientRect().top,
    };
    drawMove(obj);
  }
};
const touchEnd = (e: any) => {
  e = e || event;
  e.preventDefault();
  if (e.touches.length === 1) {
    let obj = {
      x: e.targetTouches[0].clientX - canvas.value.getBoundingClientRect().left,
      y: e.targetTouches[0].clientY - canvas.value.getBoundingClientRect().top,
    };
    drawEnd(obj);
  }
};
// 绘制
const drawStart = (obj: any) => {
  startX.value = obj.x;
  startY.value = obj.y;
  canvasTxt.value.beginPath();
  canvasTxt.value.moveTo(startX.value, startY.value);
  canvasTxt.value.lineTo(obj.x, obj.y);
  canvasTxt.value.lineCap = "round";
  canvasTxt.value.lineJoin = "round";
  canvasTxt.value.lineWidth = lineWidth.value * sratio.value;
  canvasTxt.value.stroke();
  canvasTxt.value.closePath();
  points.value.push(obj);
};
const drawMove = (obj: any) => {
  canvasTxt.value.beginPath();
  canvasTxt.value.moveTo(startX.value, startY.value);
  canvasTxt.value.lineTo(obj.x, obj.y);
  canvasTxt.value.strokeStyle = lineColor.value;
  canvasTxt.value.lineWidth = lineWidth.value * sratio.value;
  canvasTxt.value.lineCap = "round";
  canvasTxt.value.lineJoin = "round";
  canvasTxt.value.stroke();
  canvasTxt.value.closePath();
  startY.value = obj.y;
  startX.value = obj.x;
  points.value.push(obj);
};
const drawEnd = (obj: any) => {
  canvasTxt.value.beginPath();
  canvasTxt.value.moveTo(startX.value, startY.value);
  canvasTxt.value.lineTo(obj.x, obj.y);
  canvasTxt.value.lineCap = "round";
  canvasTxt.value.lineJoin = "round";
  canvasTxt.value.stroke();
  canvasTxt.value.closePath();
  points.value.push(obj);
  points.value.push({ x: -1, y: -1 });
};
// 操作
const generate = (options: any) => {
  let imgFormat = options && options.format ? options.format : format.value;
  let imgQuality = options && options.quality ? options.quality : quality.value;
  const pm = new Promise((resolve, reject) => {
    if (!hasDrew.value) {
      reject(`Warning: Not Signned!`);
      return;
    }
    var resImgData = canvasTxt.value.getImageData(
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    canvasTxt.value.globalCompositeOperation = "destination-over";
    canvasTxt.value.fillStyle = myBg.value;
    canvasTxt.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
    resultImg.value = canvas.value.toDataURL(imgFormat, imgQuality);
    let retImg = resultImg.value;
    canvasTxt.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    canvasTxt.value.putImageData(resImgData, 0, 0);
    canvasTxt.value.globalCompositeOperation = "source-over";
    if (isCrop.value) {
      const crop_area = getCropArea(resImgData.data);
      let crop_canvas: any = document.createElement("canvas");
      const crop_ctx: any = crop_canvas.getContext("2d");
      crop_canvas.width = crop_area[2] - crop_area[0];
      crop_canvas.height = crop_area[3] - crop_area[1];
      const crop_imgData = canvasTxt.value.getImageData(...crop_area);
      crop_ctx.globalCompositeOperation = "destination-over";
      crop_ctx.putImageData(crop_imgData, 0, 0);
      crop_ctx.fillStyle = myBg.value;
      crop_ctx.fillRect(0, 0, crop_canvas.width, crop_canvas.height);
      retImg = crop_canvas.toDataURL(imgFormat, imgQuality);
      crop_canvas = null;
    }
    resolve(retImg);
  });
  return pm;
};
const reset = () => {
  canvasTxt.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  if (isClearBgColor.value) {
    emit("update:bgColor", "");
    canvas.value.style.background = "rgba(255, 255, 255, 0)";
  }
  points.value = [];
  hasDrew.value = false;
  resultImg.value = "";
};
const getCropArea = (imgData: any) => {
  var topX = canvas.value.width;
  var btmX = 0;
  var topY = canvas.value.height;
  var btnY = 0;
  for (var i = 0; i < canvas.value.width; i++) {
    for (var j = 0; j < canvas.value.height; j++) {
      var pos = (i + canvas.value.width * j) * 4;
      if (
        imgData[pos] > 0 ||
        imgData[pos + 1] > 0 ||
        imgData[pos + 2] ||
        imgData[pos + 3] > 0
      ) {
        btnY = Math.max(j, btnY);
        btmX = Math.max(i, btmX);
        topY = Math.min(j, topY);
        topX = Math.min(i, topX);
      }
    }
  }
  topX++;
  btmX++;
  topY++;
  btnY++;
  const data = [topX, topY, btmX, btnY];
  return data;
};
defineExpose({
  reset,
  generate,
});
</script>

<style scoped>
canvas {
  max-width: 100%;
  display: block;
}
</style>

function defineOptions(arg0: {}) {
  throw new Error("Function not implemented.");
}
