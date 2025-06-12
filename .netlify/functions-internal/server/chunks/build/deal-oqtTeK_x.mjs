import { _ as _export_sfc, f as __nuxt_component_0$6, a as __nuxt_component_0$3 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createBlock, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "deal",
  __ssrInlineRender: true,
  setup(__props) {
    const deals = ref([]);
    const errorMessage = ref("");
    const sortOption = ref("nameAsc");
    const isThaiBaht = ref(false);
    const isLoading = ref(true);
    useRouter();
    const wishlist = ref([]);
    const wishlistActionLoading = ref(null);
    ref(/* @__PURE__ */ new Map());
    const dealCount = computed(() => {
      return new Set(deals.value.map((deal2) => deal2.gameId)).size;
    });
    const formatCurrency = (price) => {
      const exchangeRate = 33;
      const formattedPrice = isThaiBaht.value ? price * exchangeRate : price;
      const currencySymbol = isThaiBaht.value ? "฿" : "$";
      return `${currencySymbol}${formattedPrice.toFixed(2)}`;
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };
    const isClient = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$6;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 text-gray-900" }, _attrs))} data-v-eb87b09d><div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" data-v-eb87b09d><div class="max-w-7xl mx-auto px-6 py-4" data-v-eb87b09d><button class="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" data-v-eb87b09d><svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" data-v-eb87b09d></path></svg><span class="font-medium" data-v-eb87b09d>Back</span></button></div></div><div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" data-v-eb87b09d><div class="max-w-7xl mx-auto px-6 py-6" data-v-eb87b09d><div class="text-center space-y-4" data-v-eb87b09d><h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight" data-v-eb87b09d> Game Deals </h1><p class="text-lg text-gray-600" data-v-eb87b09d> Discover the best deals on your favorite games! <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold ml-2 border border-blue-200" data-v-eb87b09d>${ssrInterpolate(dealCount.value)} games on sale ! </span></p><div class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6" data-v-eb87b09d><div class="relative" data-v-eb87b09d><select class="bg-white border border-gray-300 text-gray-900 p-3 pr-10 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer shadow-sm" data-v-eb87b09d><option value="nameAsc" data-v-eb87b09d${ssrIncludeBooleanAttr(Array.isArray(sortOption.value) ? ssrLooseContain(sortOption.value, "nameAsc") : ssrLooseEqual(sortOption.value, "nameAsc")) ? " selected" : ""}>Name A-Z</option><option value="nameDesc" data-v-eb87b09d${ssrIncludeBooleanAttr(Array.isArray(sortOption.value) ? ssrLooseContain(sortOption.value, "nameDesc") : ssrLooseEqual(sortOption.value, "nameDesc")) ? " selected" : ""}>Name Z-A</option><option value="priceAsc" data-v-eb87b09d${ssrIncludeBooleanAttr(Array.isArray(sortOption.value) ? ssrLooseContain(sortOption.value, "priceAsc") : ssrLooseEqual(sortOption.value, "priceAsc")) ? " selected" : ""}>Low to High Price</option><option value="priceDesc" data-v-eb87b09d${ssrIncludeBooleanAttr(Array.isArray(sortOption.value) ? ssrLooseContain(sortOption.value, "priceDesc") : ssrLooseEqual(sortOption.value, "priceDesc")) ? " selected" : ""}>High to Low Price</option></select><div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" data-v-eb87b09d><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-eb87b09d></path></svg></div></div><button class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200" data-v-eb87b09d> 💱 Switch to ${ssrInterpolate(isThaiBaht.value ? "USD" : "THB")}</button></div></div></div></div>`);
      if (isLoading.value) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]" data-v-eb87b09d><div class="text-center" data-v-eb87b09d><div class="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" data-v-eb87b09d></div><p class="text-gray-600" data-v-eb87b09d>Loading amazing deals...</p></div></div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-6 py-8" data-v-eb87b09d><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-eb87b09d><!--[-->`);
        ssrRenderList(deals.value, (deal2) => {
          _push(`<div class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200/60 hover:shadow-lg hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-1" data-v-eb87b09d><div class="relative overflow-hidden aspect-video bg-gray-100" style="${ssrRenderStyle({ "height": "192px" })}" data-v-eb87b09d>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-full h-full flex items-center justify-center bg-gray-200" data-v-eb87b09d${_scopeId}><span class="text-gray-500 text-sm" data-v-eb87b09d${_scopeId}>Image loading...</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "w-full h-full flex items-center justify-center bg-gray-200" }, [
                    createVNode("span", { class: "text-gray-500 text-sm" }, "Image loading...")
                  ])
                ];
              }
            })
          }, _parent));
          _push(`<div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg" data-v-eb87b09d>${ssrInterpolate(deal2.savings.toFixed(0))}% OFF </div><div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs font-medium" data-v-eb87b09d>${ssrInterpolate(deal2.store.name)}</div></div><div class="p-5 space-y-4" data-v-eb87b09d><h3 class="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200" data-v-eb87b09d>${ssrInterpolate(deal2.game.name)}</h3><div class="space-y-2" data-v-eb87b09d><div class="flex items-center justify-between" data-v-eb87b09d><span class="text-gray-500 line-through text-sm" data-v-eb87b09d>${ssrInterpolate(formatCurrency(deal2.normalPrice))}</span><div class="text-right" data-v-eb87b09d><div class="text-2xl font-bold text-green-600" data-v-eb87b09d>${ssrInterpolate(formatCurrency(deal2.salePrice))}</div></div></div></div><div class="flex items-center gap-4 text-sm text-gray-500" data-v-eb87b09d>`);
          if (deal2.game.rating) {
            _push(`<div class="flex items-center gap-1" data-v-eb87b09d><svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" data-v-eb87b09d><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-eb87b09d></path></svg><span data-v-eb87b09d>${ssrInterpolate(deal2.game.rating.toFixed(1))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (deal2.game.released) {
            _push(`<div class="flex items-center gap-1" data-v-eb87b09d><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-eb87b09d></path></svg><span data-v-eb87b09d>${ssrInterpolate(formatDate(deal2.game.released))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="space-y-2" data-v-eb87b09d><a${ssrRenderAttr("href", `https://www.${deal2.store.name.toLowerCase()}.com/deal/${deal2.dealId}`)} target="_blank" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2" data-v-eb87b09d><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-eb87b09d></path></svg> Buy Now </a><div class="flex gap-2" data-v-eb87b09d>`);
          if (isClient.value) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/detail/${deal2.game.slug}`,
              class: "flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium text-center text-sm transition-all duration-200 flex items-center justify-center gap-1"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb87b09d${_scopeId}></path></svg> Details `);
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
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="${ssrRenderClass([
            "flex-1 text-white py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 relative overflow-hidden flex items-center justify-center gap-1",
            wishlist.value.includes(deal2.gameId) ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"
          ])}"${ssrIncludeBooleanAttr(wishlistActionLoading.value === deal2.gameId) ? " disabled" : ""} data-v-eb87b09d>`);
          if (wishlistActionLoading.value === deal2.gameId) {
            _push(`<div class="absolute inset-0 bg-white/20 animate-pulse rounded-lg" data-v-eb87b09d></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<svg class="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 20 20" data-v-eb87b09d><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" data-v-eb87b09d></path></svg><span class="relative z-10" data-v-eb87b09d>${ssrInterpolate(wishlist.value.includes(deal2.gameId) ? "Added" : "Wishlist")}</span></button></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      if (errorMessage.value) {
        _push(`<div class="fixed bottom-6 right-6 z-50" data-v-eb87b09d><div class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-lg max-w-sm" data-v-eb87b09d><div class="flex items-center" data-v-eb87b09d><div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3" data-v-eb87b09d><svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb87b09d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" data-v-eb87b09d></path></svg></div><p class="font-medium" data-v-eb87b09d>${ssrInterpolate(errorMessage.value)}</p></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/deal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const deal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb87b09d"]]);

export { deal as default };
//# sourceMappingURL=deal-oqtTeK_x.mjs.map
