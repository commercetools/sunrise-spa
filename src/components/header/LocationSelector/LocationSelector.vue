<i18n src="./LocationSelector.txt"></i18n>
<script src="./LocationSelector.js"></script>

<template>
<li>
  <a href="javascript:;">{{$t(title)}}</a>
  <ul>
    <li v-for="value in listValues">
      <a @click.prevent="()=>setValue(value.id)" href="javascript:;"
        >{{value.name}}</a
      >
    </li>
  </ul>
</li>

</template>
