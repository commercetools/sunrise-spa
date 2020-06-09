<style src="./root.scss" lang="scss" scoped></style>
<script src="./root.js" />

<template>
<div
  v-if="locale"
  class="main-wrapper main-wrapper-2 main-wrapper-3"
  :class="miniCartOpen ? 'overlay-active' : ''"
>
  <div class="body-overlay"></div>
  <MiniCart />
  <router-view name="header" />
  <router-view />
  <footer>
    <router-view name="footer" />
  </footer>
</div>

</template>
