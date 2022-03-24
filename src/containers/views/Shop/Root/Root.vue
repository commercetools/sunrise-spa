<script src="./Root.js" />
<style src="./Root.scss" lang="scss" scoped></style>

<template>
  <div
    v-if="paramsSet"
    class="main-wrapper main-wrapper-2 main-wrapper-3"
    :class="isOpen ? 'overlay-active' : ''"
  >
    <div @click="close()" class="body-overlay"></div>
    <MiniCart />
    <router-view name="header" />
    <router-view />
    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>
