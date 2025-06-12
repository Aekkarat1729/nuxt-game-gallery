import { c as useRouter, d as useNuxtApp, a as __nuxt_component_0$3 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const isLoading = ref(false);
    useRouter() || useNuxtApp().$router;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md"><div class="bg-white rounded-2xl shadow-sm p-8 space-y-6"><div class="text-center space-y-2"><h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1><p class="text-gray-600">Sign in to your account.</p></div>`);
      if (errorMessage.value) {
        _push(`<div class="p-3 bg-red-50 border border-red-200 rounded-xl"><p class="text-red-600 text-sm">${ssrInterpolate(errorMessage.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4"><div class="space-y-2"><label for="email" class="block text-sm font-medium text-gray-700"> Email </label><input id="email"${ssrRenderAttr("value", email.value)} type="email" required placeholder="Enter your email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"></div><div class="space-y-2"><label for="password" class="block text-sm font-medium text-gray-700"> Password </label><input id="password"${ssrRenderAttr("value", password.value)} type="password" required placeholder="Enter your password" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 focus:bg-white"></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (isLoading.value) {
        _push(`<span>Signing In...</span>`);
      } else {
        _push(`<span>Sign In</span>`);
      }
      _push(`</button></form><div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">or</span></div></div><div class="text-center"><span class="text-gray-600">Don&#39;t have an account? </span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create Account `);
          } else {
            return [
              createTextVNode(" Create Account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="text-center mt-6">`);
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
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-d_Srblho.mjs.map
