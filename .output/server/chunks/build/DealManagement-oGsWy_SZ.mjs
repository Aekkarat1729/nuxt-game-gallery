import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DealManagement",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const deals = ref([]);
    const games = ref([]);
    const stores = ref([]);
    const errorMessage = ref("");
    const successMessage = ref("");
    const isLoading = ref(false);
    const newDeal = ref({
      dealId: "",
      gameId: 0,
      storeId: 0,
      salePrice: 0,
      normalPrice: 0,
      savings: 0,
      dealRating: null
    });
    const selectedDeal = ref(null);
    const showEditModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-gray-100" }, _attrs))} data-v-165347a6><div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.blue.100)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_theme(colors.indigo.100)_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_theme(colors.gray.100)_0%,_transparent_50%)]" data-v-165347a6></div><div class="relative px-6 py-8" data-v-165347a6><div class="max-w-7xl mx-auto" data-v-165347a6><div class="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8" data-v-165347a6><div class="flex justify-between items-center" data-v-165347a6><div class="flex items-center space-x-4" data-v-165347a6><div class="h-12 w-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center" data-v-165347a6><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-165347a6></path></svg></div><div data-v-165347a6><h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" data-v-165347a6> Deal Management </h1><p class="text-gray-600 mt-1" data-v-165347a6>View and manage your gaming platform&#39;s deals</p></div></div><button class="group flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white rounded-xl transition-all duration-200 border border-indigo-200 hover:border-indigo-500" data-v-165347a6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-165347a6></path></svg><span class="font-medium" data-v-165347a6>Back to Dashboard</span></button></div></div>`);
      if (errorMessage.value) {
        _push(`<div class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl" data-v-165347a6><div class="flex items-center" data-v-165347a6><svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-165347a6><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-165347a6></path></svg><p class="text-red-700 font-medium" data-v-165347a6>${ssrInterpolate(errorMessage.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-xl" data-v-165347a6><div class="flex items-center" data-v-165347a6><svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-165347a6><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-165347a6></path></svg><p class="text-green-700 font-medium" data-v-165347a6>${ssrInterpolate(successMessage.value)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100" data-v-165347a6><h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center" data-v-165347a6><svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-165347a6></path></svg> Add New Deal </h2><form class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-v-165347a6><div class="relative" data-v-165347a6><input${ssrRenderAttr("value", newDeal.value.dealId)} type="text" placeholder="Deal ID" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10h16V7H4zm4 6h8m-8 2h4m6 0h2" data-v-165347a6></path></svg></div><select class="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><!--[-->`);
      ssrRenderList(games.value, (game) => {
        _push(`<option${ssrRenderAttr("value", game.id)} data-v-165347a6${ssrIncludeBooleanAttr(Array.isArray(newDeal.value.gameId) ? ssrLooseContain(newDeal.value.gameId, game.id) : ssrLooseEqual(newDeal.value.gameId, game.id)) ? " selected" : ""}>${ssrInterpolate(game.name)}</option>`);
      });
      _push(`<!--]--></select><select class="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><!--[-->`);
      ssrRenderList(stores.value, (store) => {
        _push(`<option${ssrRenderAttr("value", store.id)} data-v-165347a6${ssrIncludeBooleanAttr(Array.isArray(newDeal.value.storeId) ? ssrLooseContain(newDeal.value.storeId, store.id) : ssrLooseEqual(newDeal.value.storeId, store.id)) ? " selected" : ""}>${ssrInterpolate(store.name)}</option>`);
      });
      _push(`<!--]--></select><div class="relative" data-v-165347a6><input${ssrRenderAttr("value", newDeal.value.salePrice)} type="number" step="0.01" placeholder="Sale Price" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-165347a6></path></svg></div><div class="relative" data-v-165347a6><input${ssrRenderAttr("value", newDeal.value.normalPrice)} type="number" step="0.01" placeholder="Normal Price" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-165347a6></path></svg></div><div class="relative" data-v-165347a6><input${ssrRenderAttr("value", newDeal.value.savings)} type="number" step="0.01" placeholder="Savings (%)" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10m0 0v10m0-10L3 21" data-v-165347a6></path></svg></div><div class="relative" data-v-165347a6><input${ssrRenderAttr("value", newDeal.value.dealRating)} type="number" step="0.1" placeholder="Deal Rating" class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" data-v-165347a6><svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.365 2.684a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.364-2.684a1 1 0 00-1.176 0l-3.364 2.684c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L3.95 9.384c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" data-v-165347a6></path></svg></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center col-span-full sm:col-span-1" data-v-165347a6>`);
      if (isLoading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-165347a6><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-165347a6></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-165347a6></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Add Deal </button></form></div><div class="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden" data-v-165347a6><div class="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200/50" data-v-165347a6><div class="flex items-center space-x-3" data-v-165347a6><div class="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center" data-v-165347a6><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-165347a6></path></svg></div><h2 class="text-2xl font-bold text-gray-900" data-v-165347a6>Deals List</h2></div></div><div class="p-8" data-v-165347a6>`);
      if (isLoading.value) {
        _push(`<div class="text-center py-4 text-gray-600 flex items-center justify-center" data-v-165347a6><svg class="animate-spin h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" data-v-165347a6><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-165347a6></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-165347a6></path></svg> Loading... </div>`);
      } else if (errorMessage.value) {
        _push(`<div class="text-center py-4 text-red-600" data-v-165347a6>${ssrInterpolate(errorMessage.value)}</div>`);
      } else if (deals.value.length === 0) {
        _push(`<div class="text-center py-4 text-gray-600" data-v-165347a6> No deals available. </div>`);
      } else {
        _push(`<div class="overflow-x-auto" data-v-165347a6><table class="w-full" data-v-165347a6><thead class="bg-gradient-to-r from-gray-50 to-gray-100" data-v-165347a6><tr data-v-165347a6><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>ID</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Deal ID</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Game</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Store</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Sale Price</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Normal Price</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Savings (%)</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Deal Rating</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Added At</th><th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-v-165347a6>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-165347a6><!--[-->`);
        ssrRenderList(deals.value, (deal) => {
          var _a, _b;
          _push(`<tr class="hover:bg-gray-50 transition-colors duration-150" data-v-165347a6><td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600" data-v-165347a6>#${ssrInterpolate(deal.id)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(deal.dealId)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(((_a = deal.game) == null ? void 0 : _a.name) || "N/A")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(((_b = deal.store) == null ? void 0 : _b.name) || "N/A")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(deal.salePrice)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(deal.normalPrice)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(deal.savings)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(deal.dealRating || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-165347a6>${ssrInterpolate(new Date(deal.addedAt).toLocaleDateString("th-TH"))}</td><td class="px-6 py-4 whitespace-nowrap text-sm" data-v-165347a6><div class="flex space-x-3" data-v-165347a6><button class="text-indigo-600 hover:text-indigo-800 font-medium hover:bg-indigo-50 px-2 py-1 rounded-lg transition-all duration-150" data-v-165347a6> Edit </button><button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-2 py-1 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed" data-v-165347a6> Delete </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      if (showEditModal.value && selectedDeal.value) {
        _push(`<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-v-165347a6><div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all" data-v-165347a6><div class="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-2xl p-6" data-v-165347a6><h3 class="text-xl font-bold flex items-center" data-v-165347a6><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-165347a6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-165347a6></path></svg> Edit Deal </h3></div><form class="p-6 space-y-4" data-v-165347a6><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Deal ID</label><input${ssrRenderAttr("value", selectedDeal.value.dealId)} type="text" placeholder="Deal ID" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Game</label><select class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><!--[-->`);
        ssrRenderList(games.value, (game) => {
          _push(`<option${ssrRenderAttr("value", game.id)} data-v-165347a6${ssrIncludeBooleanAttr(Array.isArray(selectedDeal.value.gameId) ? ssrLooseContain(selectedDeal.value.gameId, game.id) : ssrLooseEqual(selectedDeal.value.gameId, game.id)) ? " selected" : ""}>${ssrInterpolate(game.name)}</option>`);
        });
        _push(`<!--]--></select></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Store</label><select class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6><!--[-->`);
        ssrRenderList(stores.value, (store) => {
          _push(`<option${ssrRenderAttr("value", store.id)} data-v-165347a6${ssrIncludeBooleanAttr(Array.isArray(selectedDeal.value.storeId) ? ssrLooseContain(selectedDeal.value.storeId, store.id) : ssrLooseEqual(selectedDeal.value.storeId, store.id)) ? " selected" : ""}>${ssrInterpolate(store.name)}</option>`);
        });
        _push(`<!--]--></select></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Sale Price</label><input${ssrRenderAttr("value", selectedDeal.value.salePrice)} type="number" step="0.01" placeholder="Sale Price" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Normal Price</label><input${ssrRenderAttr("value", selectedDeal.value.normalPrice)} type="number" step="0.01" placeholder="Normal Price" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Savings (%)</label><input${ssrRenderAttr("value", selectedDeal.value.savings)} type="number" step="0.01" placeholder="Savings (%)" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" required data-v-165347a6></div><div data-v-165347a6><label class="block text-sm font-medium text-gray-700 mb-2" data-v-165347a6>Deal Rating</label><input${ssrRenderAttr("value", selectedDeal.value.dealRating)} type="number" step="0.1" placeholder="Deal Rating" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" data-v-165347a6></div><div class="flex justify-end gap-3 pt-4" data-v-165347a6><button type="button" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium" data-v-165347a6> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 flex items-center" data-v-165347a6>`);
        if (isLoading.value) {
          _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-165347a6><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-165347a6></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-165347a6></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` Save Changes </button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/DealManagement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DealManagement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-165347a6"]]);

export { DealManagement as default };
//# sourceMappingURL=DealManagement-oGsWy_SZ.mjs.map
