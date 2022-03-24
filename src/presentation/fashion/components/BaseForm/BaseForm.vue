<script src="./BaseForm.js"></script>

<template>
  <form @submit.prevent="submit">
    <slot :error="error" :state="state" />
  </form>
</template>
