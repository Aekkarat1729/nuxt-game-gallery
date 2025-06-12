import { _ as _export_sfc, c as useRouter, d as useNuxtApp, e as __nuxt_component_0$6, a as __nuxt_component_0$3 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createBlock, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const favorites = ref([]);
    const searchTerm = ref("");
    ref(false);
    const isLoading = ref(true);
    const errorMessage = ref("");
    const wishlistActionLoading = ref(null);
    const favoriteCount = computed(() => favorites.value.length);
    const formatDate = (dateStr) => {
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };
    const filteredFavorites = computed(() => {
      if (!searchTerm.value) return favorites.value;
      return favorites.value.filter(
        (favorite) => favorite.game.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
    useRouter() || useNuxtApp().$router;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$6;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 text-gray-900" }, _attrs))} data-v-fc63dce2><div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" data-v-fc63dce2><div class="max-w-7xl mx-auto px-6 py-4" data-v-fc63dce2><button class="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" data-v-fc63dce2><svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fc63dce2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" data-v-fc63dce2></path></svg><span class="font-medium" data-v-fc63dce2>Back</span></button></div></div><div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" data-v-fc63dce2><div class="max-w-7xl mx-auto px-6 py-6" data-v-fc63dce2><div class="text-center space-y-4" data-v-fc63dce2><h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight" data-v-fc63dce2> My Wishlist </h1><p class="text-lg text-gray-600" data-v-fc63dce2> Your collection of Wishlist games! <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold ml-2 border border-blue-200" data-v-fc63dce2>${ssrInterpolate(favoriteCount.value)} games saved </span></p></div></div></div>`);
      if (isLoading.value) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]" data-v-fc63dce2><div class="text-center" data-v-fc63dce2><div class="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" data-v-fc63dce2></div><p class="text-gray-600" data-v-fc63dce2>Loading your Wishlist...</p></div></div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-6 py-8" data-v-fc63dce2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-fc63dce2><!--[-->`);
        ssrRenderList(filteredFavorites.value, (favorite) => {
          _push(`<div class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-lg hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-1" data-v-fc63dce2><div class="relative overflow-hidden aspect-video bg-gray-100" style="${ssrRenderStyle({ "height": "192px" })}" data-v-fc63dce2>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-full h-full flex items-center justify-center bg-gray-200" data-v-fc63dce2${_scopeId}><span class="text-gray-500 text-sm" data-v-fc63dce2${_scopeId}>Image loading...</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "w-full h-full flex items-center justify-center bg-gray-200" }, [
                    createVNode("span", { class: "text-gray-500 text-sm" }, "Image loading...")
                  ])
                ];
              }
            })
          }, _parent));
          _push(`</div><div class="p-5 space-y-4" data-v-fc63dce2><h3 class="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200" data-v-fc63dce2>${ssrInterpolate(favorite.game.name)}</h3><div class="flex items-center gap-4 text-sm text-gray-500" data-v-fc63dce2>`);
          if (favorite.game.rating) {
            _push(`<div class="flex items-center gap-1" data-v-fc63dce2><svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" data-v-fc63dce2><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-fc63dce2></path></svg><span data-v-fc63dce2>${ssrInterpolate(favorite.game.rating.toFixed(1))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (favorite.game.released) {
            _push(`<div class="flex items-center gap-1" data-v-fc63dce2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fc63dce2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-fc63dce2></path></svg><span data-v-fc63dce2>${ssrInterpolate(formatDate(favorite.game.released))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="space-y-2" data-v-fc63dce2>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/detail/${favorite.game.slug}`,
            class: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fc63dce2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-fc63dce2${_scopeId}></path></svg> Details `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  ])),
                  createTextVNode(" Details ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button${ssrIncludeBooleanAttr(wishlistActionLoading.value === favorite.id) ? " disabled" : ""} class="w-full text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 relative overflow-hidden flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600" data-v-fc63dce2>`);
          if (wishlistActionLoading.value === favorite.id) {
            _push(`<div class="absolute inset-0 bg-white/20 animate-pulse rounded-lg" data-v-fc63dce2></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<svg class="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20" data-v-fc63dce2><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-fc63dce2></path></svg><span class="relative z-10" data-v-fc63dce2>Remove</span></button></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      if (errorMessage.value) {
        _push(`<div class="fixed bottom-6 right-6 z-50" data-v-fc63dce2><div class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-lg max-w-sm" data-v-fc63dce2><div class="flex items-center" data-v-fc63dce2><div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3" data-v-fc63dce2><svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fc63dce2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" data-v-fc63dce2></path></svg></div><p class="font-medium" data-v-fc63dce2>${ssrInterpolate(errorMessage.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wishlist = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc63dce2"]]);

export { wishlist as default };
//# sourceMappingURL=wishlist-DeITtw5E.mjs.map
