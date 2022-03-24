<i18n src="./Selector.txt" lang="yaml"></i18n>
<script src="./Selector.js"></script>

<template>
  <li>
    <a href="javascript:;">{{ t(title) }}</a>
    <ul>
      <li v-for="value in values" v-bind:key="value">
        <a
          @click.prevent="() => setValue(value)"
          href="javascript:;"
          >{{ t(value) }}</a
        >
      </li>
    </ul>
  </li>
</template>
