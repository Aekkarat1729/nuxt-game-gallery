import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageDetail",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const game = ref(null);
    const additionalData = ref(null);
    const isLoading = ref(true);
    const error = ref(null);
    const currentIndex = ref(0);
    const showModal = ref(false);
    const modalImageIndex = ref(0);
    const allImages = computed(() => {
      var _a;
      const images = [];
      if ((_a = additionalData.value) == null ? void 0 : _a.screenshots) {
        images.push(...additionalData.value.screenshots);
      }
      return images.length ? images : [{ id: 0, url: "https://via.placeholder.com/800x450?text=No+Image", gameId: 0 }];
    });
    function formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A";
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 text-gray-900" }, _attrs))} data-v-4cc2dc25><div class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50" data-v-4cc2dc25><div class="max-w-7xl mx-auto px-6 py-4" data-v-4cc2dc25><button class="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200" data-v-4cc2dc25><svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" data-v-4cc2dc25></path></svg><span class="font-medium" data-v-4cc2dc25>Back</span></button></div></div>`);
      if (error.value) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]" data-v-4cc2dc25><div class="text-center" data-v-4cc2dc25><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-4cc2dc25><svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" data-v-4cc2dc25></path></svg></div><p class="text-gray-600" data-v-4cc2dc25>${ssrInterpolate(error.value)}</p></div></div>`);
      } else if (isLoading.value) {
        _push(`<div class="flex items-center justify-center min-h-[60vh]" data-v-4cc2dc25><div class="text-center" data-v-4cc2dc25><div class="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4" data-v-4cc2dc25></div><p class="text-gray-600" data-v-4cc2dc25>Loading...</p></div></div>`);
      } else if (game.value) {
        _push(`<div class="max-w-7xl mx-auto px-6 py-8 space-y-12" data-v-4cc2dc25><div class="space-y-6" data-v-4cc2dc25><div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" data-v-4cc2dc25><div data-v-4cc2dc25><h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight" data-v-4cc2dc25>${ssrInterpolate(game.value.name)}</h1>`);
        if (game.value.released) {
          _push(`<p class="text-gray-500 mt-2" data-v-4cc2dc25>${ssrInterpolate(formatDate(game.value.released))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (game.value.rating) {
          _push(`<div class="flex items-center gap-2" data-v-4cc2dc25><div class="flex text-yellow-400" data-v-4cc2dc25><!--[-->`);
          ssrRenderList(5, (i) => {
            _push(`<svg class="${ssrRenderClass([i <= Math.round(game.value.rating) ? "fill-current" : "fill-gray-200", "w-5 h-5"])}" viewBox="0 0 20 20" data-v-4cc2dc25><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-4cc2dc25></path></svg>`);
          });
          _push(`<!--]--></div><span class="text-gray-600 font-medium" data-v-4cc2dc25>${ssrInterpolate(game.value.rating.toFixed(1))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden" data-v-4cc2dc25><div class="relative aspect-video bg-gray-100" data-v-4cc2dc25><img${ssrRenderAttr("src", allImages.value[currentIndex.value].url)}${ssrRenderAttr("alt", `${game.value.name} Image ${currentIndex.value + 1}`)} class="w-full h-full object-cover cursor-pointer" data-v-4cc2dc25>`);
        if (allImages.value.length > 1) {
          _push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center" data-v-4cc2dc25><svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-4cc2dc25></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (allImages.value.length > 1) {
          _push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center" data-v-4cc2dc25><svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-4cc2dc25></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (allImages.value.length > 1) {
          _push(`<div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm" data-v-4cc2dc25>${ssrInterpolate(currentIndex.value + 1)} / ${ssrInterpolate(allImages.value.length)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (allImages.value.length > 1) {
          _push(`<div class="p-4 bg-gray-50/50" data-v-4cc2dc25><div class="flex gap-2 overflow-x-auto pb-2" data-v-4cc2dc25><!--[-->`);
          ssrRenderList(allImages.value, (image, index) => {
            _push(`<button class="${ssrRenderClass([currentIndex.value === index ? "border-gray-900" : "border-transparent hover:border-gray-300", "relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200"])}" data-v-4cc2dc25><img${ssrRenderAttr("src", image.url)}${ssrRenderAttr("alt", `Thumbnail ${index + 1}`)} class="w-full h-full object-cover" data-v-4cc2dc25></button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid lg:grid-cols-3 gap-8" data-v-4cc2dc25><div class="lg:col-span-2 space-y-8" data-v-4cc2dc25><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60" data-v-4cc2dc25><h2 class="text-xl font-semibold text-gray-900 mb-4" data-v-4cc2dc25>About</h2>`);
        if (game.value.description) {
          _push(`<p class="text-gray-700 leading-relaxed" data-v-4cc2dc25>${ssrInterpolate(game.value.description)}</p>`);
        } else {
          _push(`<p class="text-gray-500 italic" data-v-4cc2dc25>No description available</p>`);
        }
        _push(`</div>`);
        if ((_a = additionalData.value.genres) == null ? void 0 : _a.length) {
          _push(`<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60" data-v-4cc2dc25><h2 class="text-xl font-semibold text-gray-900 mb-4" data-v-4cc2dc25>Genres</h2><div class="flex flex-wrap gap-2" data-v-4cc2dc25><!--[-->`);
          ssrRenderList(additionalData.value.genres, (genre) => {
            _push(`<span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200" data-v-4cc2dc25>${ssrInterpolate(genre.name)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_b = additionalData.value.tags) == null ? void 0 : _b.length) {
          _push(`<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60" data-v-4cc2dc25><h2 class="text-xl font-semibold text-gray-900 mb-4" data-v-4cc2dc25>Tags</h2><div class="flex flex-wrap gap-2" data-v-4cc2dc25><!--[-->`);
          ssrRenderList(additionalData.value.tags.slice(0, 12), (tag) => {
            _push(`<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200" data-v-4cc2dc25>${ssrInterpolate(tag.name)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-4cc2dc25><div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 space-y-6 sticky top-24" data-v-4cc2dc25><h2 class="text-xl font-semibold text-gray-900" data-v-4cc2dc25>Game Info</h2><div class="space-y-4" data-v-4cc2dc25>`);
        if (game.value.metacritic) {
          _push(`<div data-v-4cc2dc25><div class="text-sm text-gray-500 mb-1" data-v-4cc2dc25>Metacritic Score</div><div class="flex items-center gap-2" data-v-4cc2dc25><div class="${ssrRenderClass([game.value.metacritic >= 75 ? "bg-green-500" : game.value.metacritic >= 50 ? "bg-yellow-500" : "bg-red-500", "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"])}" data-v-4cc2dc25>${ssrInterpolate(game.value.metacritic)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = additionalData.value.platforms) == null ? void 0 : _c.length) {
          _push(`<div data-v-4cc2dc25><div class="text-sm text-gray-500 mb-2" data-v-4cc2dc25>Platforms</div><div class="flex flex-wrap gap-1" data-v-4cc2dc25><!--[-->`);
          ssrRenderList(additionalData.value.platforms.slice(0, 6), (platform) => {
            _push(`<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs" data-v-4cc2dc25>${ssrInterpolate(platform.name)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (game.value.esrb) {
          _push(`<div data-v-4cc2dc25><div class="text-sm text-gray-500 mb-1" data-v-4cc2dc25>ESRB Rating</div><div class="text-gray-900 font-medium" data-v-4cc2dc25>${ssrInterpolate(game.value.esrb)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (game.value.website) {
          _push(`<div data-v-4cc2dc25><div class="text-sm text-gray-500 mb-1" data-v-4cc2dc25>Website</div><a${ssrRenderAttr("href", game.value.website)} target="_blank" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors duration-200" data-v-4cc2dc25><span class="text-sm" data-v-4cc2dc25>Visit Website</span><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-4cc2dc25></path></svg></a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showModal.value) {
        _push(`<div class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-4cc2dc25><div class="relative max-w-6xl w-full" data-v-4cc2dc25><img${ssrRenderAttr("src", allImages.value[modalImageIndex.value].url)}${ssrRenderAttr("alt", `${game.value.name} Image ${modalImageIndex.value + 1}`)} class="w-full h-auto rounded-lg shadow-2xl" data-v-4cc2dc25><button class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center" data-v-4cc2dc25><svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-4cc2dc25></path></svg></button>`);
        if (allImages.value.length > 1) {
          _push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center" data-v-4cc2dc25><svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-4cc2dc25></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (allImages.value.length > 1) {
          _push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center" data-v-4cc2dc25><svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4cc2dc25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-4cc2dc25></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-4cc2dc25"]]), { __name: "ImageDetail" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageDetail = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_ImageDetail, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/detail/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-DS2QkJFP.mjs.map
