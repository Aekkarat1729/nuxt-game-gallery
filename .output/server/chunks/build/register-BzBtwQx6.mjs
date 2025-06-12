import { a as __nuxt_component_0$3 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const isLoading = ref(false);
    const countdown = ref(3);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md">`);
      if (successMessage.value) {
        _push(`<div class="p-4 mb-6 bg-green-50 border border-green-200 rounded-xl text-center"><p class="text-green-600 text-sm">${ssrInterpolate(successMessage.value)}</p><p class="text-green-600 text-sm mt-2">Redirecting in ${ssrInterpolate(countdown.value)} seconds...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-2xl shadow-sm p-8 space-y-6"><div class="text-center space-y-2"><h1 class="text-3xl font-bold text-gray-900">Create Account</h1><p class="text-gray-600">Join our gaming community</p></div>`);
      if (errorMessage.value) {
        _push(`<div class="p-3 bg-red-50 border border-red-200 rounded-xl"><p class="text-red-600 text-sm">${ssrInterpolate(errorMessage.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!successMessage.value) {
        _push(`<form class="space-y-4"><div class="space-y-2"><label for="email" class="block text-sm font-medium text-gray-700"> Email </label><input id="email"${ssrRenderAttr("value", email.value)} type="email" required placeholder="Enter your email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"></div><div class="space-y-2"><label for="password" class="block text-sm font-medium text-gray-700"> Password </label><input id="password"${ssrRenderAttr("value", password.value)} type="password" required placeholder="Create a password" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"></div><div class="space-y-2"><label for="confirmPassword" class="block text-sm font-medium text-gray-700"> Confirm Password </label><input id="confirmPassword"${ssrRenderAttr("value", confirmPassword.value)} type="password" required placeholder="Confirm your password" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (isLoading.value) {
          _push(`<span>Creating Account...</span>`);
        } else {
          _push(`<span>Create Account</span>`);
        }
        _push(`</button></form>`);
      } else {
        _push(`<!---->`);
      }
      if (!successMessage.value) {
        _push(`<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">or</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!successMessage.value) {
        _push(`<div class="text-center"><span class="text-gray-600">Already have an account? </span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Sign In `);
            } else {
              return [
                createTextVNode(" Sign In ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!successMessage.value) {
        _push(`<div class="text-center mt-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to Game Library `);
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
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ])),
                createTextVNode(" Back to Game Library ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BzBtwQx6.mjs.map
