import { defineComponent as P, toRefs as j, ref as u, computed as M, watch as ee, onBeforeMount as te, onBeforeUnmount as ae, onMounted as le, nextTick as ue, openBlock as oe, createElementBlock as ne } from "vue";
const ve = P({
  name: "vite-sign"
}), re = /* @__PURE__ */ P({
  ...ve,
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 300
    },
    lineWidth: {
      type: Number,
      default: 4
    },
    lineColor: {
      type: String,
      default: "#000000"
    },
    bgColor: {
      type: String,
      default: ""
    },
    isCrop: {
      type: Boolean,
      default: !1
    },
    isClearBgColor: {
      type: Boolean,
      default: !0
    },
    format: {
      type: String,
      default: "image/png"
    },
    quality: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:bgColor"],
  setup(c, { expose: h, emit: w }) {
    const D = c, {
      height: C,
      width: _,
      bgColor: S,
      lineWidth: X,
      lineColor: N,
      isCrop: U,
      isClearBgColor: W,
      format: q,
      quality: O
    } = j(D), x = u(!1), R = u(""), f = u([]), t = u(null), p = u(0), m = u(0), b = u(!1), n = u(1), a = u(), z = M(() => C.value / _.value);
    M(() => {
      var e;
      return (e = a.value) == null ? void 0 : e.getBoundingClientRect();
    });
    const T = M(() => S.value ? S.value : "rgba(255, 255, 255, 0)");
    ee(T, (e) => {
      a.value.style.background = e;
    }), te(() => {
      window.addEventListener("resize", k);
    }), ae(() => {
      window.removeEventListener("resize", k);
    }), le(() => {
      ue(() => {
        a.value.height = C.value, a.value.width = _.value, a.value.style.background = T.value, k(), document.onmouseup = () => {
          b.value = !1;
        };
      });
    });
    const k = () => {
      a.value.style.width = _.value + "px";
      const e = parseFloat(window.getComputedStyle(a.value).width);
      a.value.style.height = z.value * e + "px", t.value = a.value.getContext("2d"), t.value.scale(1 * n.value, 1 * n.value), n.value = e / _.value, t.value.scale(1 / n.value, 1 / n.value);
    }, J = (e) => {
      e = e || event, e.preventDefault(), b.value = !0, x.value = !0;
      let l = {
        x: e.offsetX,
        y: e.offsetY
      };
      Y(l);
    }, F = (e) => {
      if (e = e || event, e.preventDefault(), b.value) {
        let l = {
          x: e.offsetX,
          y: e.offsetY
        };
        I(l);
      }
    }, A = (e) => {
      e = e || event, e.preventDefault();
      let l = {
        x: e.offsetX,
        y: e.offsetY
      };
      E(l), b.value = !1;
    }, H = (e) => {
      if (e = e || event, e.preventDefault(), x.value = !0, e.touches.length === 1) {
        let l = {
          x: e.targetTouches[0].clientX - a.value.getBoundingClientRect().left,
          y: e.targetTouches[0].clientY - a.value.getBoundingClientRect().top
        };
        Y(l);
      }
    }, Q = (e) => {
      if (e = e || event, e.preventDefault(), e.touches.length === 1) {
        let l = {
          x: e.targetTouches[0].clientX - a.value.getBoundingClientRect().left,
          y: e.targetTouches[0].clientY - a.value.getBoundingClientRect().top
        };
        I(l);
      }
    }, V = (e) => {
      if (e = e || event, e.preventDefault(), e.touches.length === 1) {
        let l = {
          x: e.targetTouches[0].clientX - a.value.getBoundingClientRect().left,
          y: e.targetTouches[0].clientY - a.value.getBoundingClientRect().top
        };
        E(l);
      }
    }, Y = (e) => {
      p.value = e.x, m.value = e.y, t.value.beginPath(), t.value.moveTo(p.value, m.value), t.value.lineTo(e.x, e.y), t.value.lineCap = "round", t.value.lineJoin = "round", t.value.lineWidth = X.value * n.value, t.value.stroke(), t.value.closePath(), f.value.push(e);
    }, I = (e) => {
      t.value.beginPath(), t.value.moveTo(p.value, m.value), t.value.lineTo(e.x, e.y), t.value.strokeStyle = N.value, t.value.lineWidth = X.value * n.value, t.value.lineCap = "round", t.value.lineJoin = "round", t.value.stroke(), t.value.closePath(), m.value = e.y, p.value = e.x, f.value.push(e);
    }, E = (e) => {
      t.value.beginPath(), t.value.moveTo(p.value, m.value), t.value.lineTo(e.x, e.y), t.value.lineCap = "round", t.value.lineJoin = "round", t.value.stroke(), t.value.closePath(), f.value.push(e), f.value.push({ x: -1, y: -1 });
    }, $ = (e) => {
      let l = e && e.format ? e.format : q.value, v = e && e.quality ? e.quality : O.value;
      return new Promise((g, r) => {
        if (!x.value) {
          r("Warning: Not Signned!");
          return;
        }
        var o = t.value.getImageData(
          0,
          0,
          a.value.width,
          a.value.height
        );
        t.value.globalCompositeOperation = "destination-over", t.value.fillStyle = T.value, t.value.fillRect(0, 0, a.value.width, a.value.height), R.value = a.value.toDataURL(l, v);
        let i = R.value;
        if (t.value.clearRect(0, 0, a.value.width, a.value.height), t.value.putImageData(o, 0, 0), t.value.globalCompositeOperation = "source-over", U.value) {
          const d = K(o.data);
          let s = document.createElement("canvas");
          const B = s.getContext("2d");
          s.width = d[2] - d[0], s.height = d[3] - d[1];
          const Z = t.value.getImageData(...d);
          B.globalCompositeOperation = "destination-over", B.putImageData(Z, 0, 0), B.fillStyle = T.value, B.fillRect(0, 0, s.width, s.height), i = s.toDataURL(l, v), s = null;
        }
        g(i);
      });
    }, G = () => {
      t.value.clearRect(0, 0, a.value.width, a.value.height), W.value && (w("update:bgColor", ""), a.value.style.background = "rgba(255, 255, 255, 0)"), f.value = [], x.value = !1, R.value = "";
    }, K = (e) => {
      for (var l = a.value.width, v = 0, y = a.value.height, g = 0, r = 0; r < a.value.width; r++)
        for (var o = 0; o < a.value.height; o++) {
          var i = (r + a.value.width * o) * 4;
          (e[i] > 0 || e[i + 1] > 0 || e[i + 2] || e[i + 3] > 0) && (g = Math.max(o, g), v = Math.max(r, v), y = Math.min(o, y), l = Math.min(r, l));
        }
      return l++, v++, y++, g++, [l, y, v, g];
    };
    return h({
      reset: G,
      generate: $
    }), (e, l) => (oe(), ne("canvas", {
      ref_key: "canvas",
      ref: a,
      onMousedown: J,
      onMousemove: F,
      onMouseup: A,
      onTouchstart: H,
      onTouchmove: Q,
      onTouchend: V
    }, null, 544));
  }
});
const ie = (c, h) => {
  const w = c.__vccOpts || c;
  for (const [D, C] of h)
    w[D] = C;
  return w;
}, se = /* @__PURE__ */ ie(re, [["__scopeId", "data-v-42278ae9"]]), L = se, ce = [L], de = {
  install(c) {
    ce.forEach((h) => {
      c.component(h.name, L);
    });
  }
};
export {
  L as ViteSign,
  de as default
};
