<style src="./SlideDown.scss" lang="scss" scoped></style>
<script src="./SlideDown.js"></script>

<template>
  <div v-bind:class="[show ? 'show' : 'hide']" ref="content">
      <slot />
  </div>

</template>
