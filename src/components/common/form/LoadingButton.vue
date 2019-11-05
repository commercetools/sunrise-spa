<template>
  <button type="submit"
          :disabled="formState !== null"
          :class="formState">
    <slot></slot>
    <transition name="fade"
                mode="in-out">
      <span v-if="formState === 'loading'"
            key="loading"
            class="state-layer">
        <img src="../../../assets/img/loading.svg"
             class="loading-animation"/>
      </span>
    </transition>
    <transition name="fade"
                mode="in-out">
      <span v-if="formState === 'success'"
            key="success"
            data-test="success-state-success"
            class="state-layer">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="check"
             viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="59.4"/>
          <path d="M24.75 62l27.5 27.5 51-51"/>
        </svg>
      </span>
    </transition>
  </button>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      validator: value => ['success', 'loading'].includes(value),
    },
  },

  data: () => ({
    formState: null,
  }),

  watch: {
    state(newState) {
      this.formState = newState;
      if (newState === 'success') {
        setTimeout(() => {
          this.formState = null;
          this.$emit('reset');
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  margin-right: 15px;
  font-weight: 900;
  background-color: #FFBA27;
  padding: 10px 20px;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
  position: relative;

  &:hover {
    background-color: lighten(#FFBA27, 5%);
  }

  .state-layer {
    background-color: #FFBA27;
  }
  .state-layer {
    background-color: inherit;
  }
  .state-layer, .loading-animation, svg.check {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: .5em;
  }

  &.success {
    .state-layer {
      background-color: #3AB795;
    }

    .fade-enter, .fade-leave-to {
      opacity: 1;
      background-color: inherit;
    }

    .fade-enter-to, .fade-leave {
      background-color: #3AB795;
    }
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
}

svg.check {
  circle, path {
    fill: none;
    stroke: #333333;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-width: 8px;
    stroke-dasharray: 400;
  }

  path {
    animation: check-stroke 1s forwards;
    animation-timing-function: ease-in;
    stroke-linejoin: round;
    opacity: 0;
  }

  @keyframes check-stroke {
    0% {
      stroke-dashoffset: 400px;
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>
