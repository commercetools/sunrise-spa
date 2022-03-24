<style src="./LoadingButton.scss" lang="scss" scoped></style>
<script src="./LoadingButton.js"></script>

<template>
  <button
    type="submit"
    :disabled="formState !== null"
    :class="formState"
    class="loading-button"
  >
    <slot></slot>
    <transition name="fade" mode="in-out">
      <span
        v-if="formState === 'loading'"
        key="loading"
        class="state-layer"
      >
        <img
          :src="
            require('presentation/assets/img/loading.svg')
          "
          class="loading-animation"
        />
      </span>
    </transition>
    <transition name="fade" mode="in-out">
      <span
        v-if="formState === 'success'"
        key="success"
        data-test="success-state-success"
        class="state-layer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="check"
          viewBox="0 0 128 128"
        >
          <circle cx="64" cy="64" r="59.4" />
          <path d="M24.75 62l27.5 27.5 51-51" />
        </svg>
      </span>
    </transition>
  </button>
</template>
