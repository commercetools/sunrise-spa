<template>
  <div id="app">
    <header>
      <router-view name="header"/>
    </header>
    <router-view/>
    <!--{{> common/wishlist wishlist=content.wishlist}}-->
    <footer>
      <router-view name="footer"/>
    </footer>
  </div>
</template>
