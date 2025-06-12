import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRouter, e as useNuxtApp } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GameManagement",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter() || useNuxtApp().$router;
    const games = ref([]);
    const errorMessage = ref("");
    const successMessage = ref("");
    const isLoading = ref(false);
    const newGame = ref({
      rawgId: 0,
      name: "",
      slug: "",
      description: "",
      metacritic: null,
      website: "",
      esrb: "",
      backgroundImage: "",
      released: "",
      rating: null
    });
    const selectedGame = ref(null);
    const showEditModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative min-h-screen bg-gray-50 px-4 py-8" }, _attrs))} data-v-73f06dff><div class="max-w-7xl mx-auto" data-v-73f06dff><div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 mb-10 flex justify-between items-center shadow-lg" data-v-73f06dff><div data-v-73f06dff><h1 class="text-4xl font-extrabold tracking-tight" data-v-73f06dff>Game Management</h1><p class="text-lg mt-2 opacity-90" data-v-73f06dff>Manage your gaming platform&#39;s games.</p></div><button class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition transform active:scale-95" data-v-73f06dff> Back to Dashboard </button></div>`);
      if (errorMessage.value) {
        _push(`<div class="p-4 bg-red-50 border border-red-200 rounded-xl mb-6" data-v-73f06dff><p class="text-red-600 text-sm" data-v-73f06dff>${ssrInterpolate(errorMessage.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="p-4 bg-green-50 border border-green-200 rounded-xl mb-6" data-v-73f06dff><p class="text-green-600 text-sm" data-v-73f06dff>${ssrInterpolate(successMessage.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-xl shadow-md p-8 mb-10" data-v-73f06dff><h2 class="text-2xl font-bold text-gray-900 mb-6" data-v-73f06dff>Add New Game</h2><form class="grid grid-cols-1 gap-4 sm:grid-cols-2" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.rawgId)} type="number" placeholder="RAWG ID" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.name)} type="text" placeholder="Game Name" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.slug)} type="text" placeholder="Slug" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><textarea placeholder="Description" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows="4" data-v-73f06dff>${ssrInterpolate(newGame.value.description)}</textarea><input${ssrRenderAttr("value", newGame.value.metacritic)} type="number" placeholder="Metacritic Score" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.website)} type="url" placeholder="Website URL" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.esrb)} type="text" placeholder="ESRB Rating" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.backgroundImage)} type="url" placeholder="Background Image URL" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.released)} type="date" placeholder="Release Date" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", newGame.value.rating)} type="number" step="0.01" placeholder="Rating" class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50" data-v-73f06dff> Add Game </button></form></div><div class="bg-white rounded-xl shadow-md p-8" data-v-73f06dff><h2 class="text-2xl font-bold text-gray-900 mb-6" data-v-73f06dff>Games List</h2><div class="overflow-x-auto" data-v-73f06dff><table class="w-full text-left border-collapse" data-v-73f06dff><thead data-v-73f06dff><tr class="bg-gray-100" data-v-73f06dff><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>ID</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>RAWG ID</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Name</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Slug</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Metacritic</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>ESRB</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Released</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Rating</th><th class="p-4 text-sm font-semibold text-gray-700" data-v-73f06dff>Actions</th></tr></thead><tbody data-v-73f06dff><!--[-->`);
      ssrRenderList(games.value, (game) => {
        _push(`<tr class="border-t hover:bg-gray-50" data-v-73f06dff><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.id)}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.rawgId)}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.name)}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.slug)}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.metacritic || "-")}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.esrb || "-")}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.released ? new Date(game.released).toLocaleDateString() : "-")}</td><td class="p-4 text-sm text-gray-600" data-v-73f06dff>${ssrInterpolate(game.rating || "-")}</td><td class="p-4 text-sm flex gap-3" data-v-73f06dff><button class="text-indigo-600 hover:text-indigo-800 font-medium" data-v-73f06dff>Edit</button><button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="text-red-600 hover:text-red-800 font-medium disabled:opacity-50" data-v-73f06dff>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (showEditModal.value && selectedGame.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-73f06dff><div class="bg-white rounded-xl p-8 w-full max-w-md" data-v-73f06dff><h3 class="text-xl font-semibold text-gray-900 mb-6" data-v-73f06dff>Edit Game</h3><form class="space-y-4" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.rawgId)} type="number" placeholder="RAWG ID" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.name)} type="text" placeholder="Game Name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.slug)} type="text" placeholder="Slug" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" required data-v-73f06dff><textarea placeholder="Description" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" rows="4" data-v-73f06dff>${ssrInterpolate(selectedGame.value.description)}</textarea><input${ssrRenderAttr("value", selectedGame.value.metacritic)} type="number" placeholder="Metacritic Score" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.website)} type="url" placeholder="Website URL" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.esrb)} type="text" placeholder="ESRB Rating" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.backgroundImage)} type="url" placeholder="Background Image URL" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.released)} type="date" placeholder="Release Date" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><input${ssrRenderAttr("value", selectedGame.value.rating)} type="number" step="0.01" placeholder="Rating" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" data-v-73f06dff><div class="flex justify-end gap-3" data-v-73f06dff><button type="button" class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition" data-v-73f06dff>Cancel</button><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50" data-v-73f06dff>Save</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/GameManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GameManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73f06dff"]]);

export { GameManagement as default };
//# sourceMappingURL=GameManagement-D1m7tgXy.mjs.map
