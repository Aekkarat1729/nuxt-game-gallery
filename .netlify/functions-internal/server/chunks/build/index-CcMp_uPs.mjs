import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, b as useFetch, c as useRuntimeConfig, a as __nuxt_component_0$3 } from './server.mjs';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue';
import '@vue/shared';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageGallery",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    function shuffleArray(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }
    const config = useRuntimeConfig();
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useFetch("/games", {
      baseURL: config.public.apiBase
    }, "$wbAUwY-Lyd")), __temp = await __temp, __restore(), __temp);
    const allGames = computed(() => {
      var _a;
      const shuffledGames = shuffleArray(((_a = response.value) == null ? void 0 : _a.data) || []);
      return shuffledGames.slice(0, 50);
    });
    const searchTerm = ref("");
    const showSearchText = ref(false);
    const filteredGames = computed(() => {
      if (!searchTerm.value) return allGames.value;
      return allGames.value.filter(
        (game) => game.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative px-4 masonry-wrapper" }, _attrs))} data-v-be5d5c72><div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50" data-v-be5d5c72>`);
      if (showSearchText.value) {
        _push(`<div class="text-white bg-black/70 px-4 py-2 rounded-lg shadow-md text-xl font-bold" data-v-be5d5c72> Searching: &quot;${ssrInterpolate(searchTerm.value)}&quot; </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full masonry-container" data-v-be5d5c72><ul class="grid grid-cols-1 gap-4 lg:block" data-v-be5d5c72><li class="relative w-full masonry-item bg-black text-white p-0 mb-8" data-v-be5d5c72><div class="flex flex-col text-white space-y-3" data-v-be5d5c72><h1 class="text-7xl font-bold" data-v-be5d5c72>Welcome !!</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-6xl font-bold hover:text-green-400 transition duration-200 underline-offset-4 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-6xl font-bold mt-2 hover:text-blue-400 transition duration-200 underline-offset-4 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Register `);
          } else {
            return [
              createTextVNode(" Register ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/user/deal",
        class: "text-6xl text-red-400 font-bold mt-2 hover:text-red-400 transition duration-200 underline-offset-4 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Deal 90% off 🕹️ `);
          } else {
            return [
              createTextVNode(" Deal 90% off 🕹️ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><!--[-->`);
      ssrRenderList(filteredGames.value, (game) => {
        _push(`<li class="relative w-full group masonry-item" data-v-be5d5c72>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/detail/${game.slug}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", game.backgroundImage || "/placeholder.jpg")} alt="Game image" class="h-auto w-full rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-[.2] object-cover" data-v-be5d5c72${_scopeId}><div class="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center px-4 transition duration-300" data-v-be5d5c72${_scopeId}><h2 class="text-2xl font-bold drop-shadow" data-v-be5d5c72${_scopeId}>${ssrInterpolate(game.name)}</h2><p class="text-lg text-gray-200 drop-shadow" data-v-be5d5c72${_scopeId}>${ssrInterpolate(((_a = game.released) == null ? void 0 : _a.slice(0, 10)) || "Unknown")}</p></div>`);
            } else {
              return [
                createVNode("img", {
                  src: game.backgroundImage || "/placeholder.jpg",
                  alt: "Game image",
                  class: "h-auto w-full rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-[.2] object-cover"
                }, null, 8, ["src"]),
                createVNode("div", { class: "absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 text-white text-center px-4 transition duration-300" }, [
                  createVNode("h2", { class: "text-2xl font-bold drop-shadow" }, toDisplayString(game.name), 1),
                  createVNode("p", { class: "text-lg text-gray-200 drop-shadow" }, toDisplayString(((_b = game.released) == null ? void 0 : _b.slice(0, 10)) || "Unknown"), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageGallery.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ImageGallery = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-be5d5c72"]]), { __name: "ImageGallery" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(ImageGallery, null, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CcMp_uPs.mjs.map
