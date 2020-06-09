<style src="./style.css"></style>
<script src="./SelectBoxIt.js"></script>

<template>
  <select>
    <option v-for="option in options"
            :value="option.id"
            :key="option.id">
      {{ option.name }}
    </option>
  </select>

</template>
