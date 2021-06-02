<i18n src="./ListDetail.txt"></i18n>
<script src="./ListDetail.js"></script>

<template>
  <div>
    <h1>hello world {{shoppingListName}}</h1>
    <ShoppingList :shoppingListName="shoppingListName" />
  </div>
</template>
