<template>
  <div>
    <div>
      {{ address.title }}
      {{ address.firstName }}
      {{ address.lastName }}
    </div>
    <div>{{ address.streetName }} {{ address.streetNumber }}</div>
    <div>{{ address.additionalStreetInfo }}</div>
    <div>{{ address.postalCode }}, {{ address.city }} ({{ address.country }})</div>
    <br>
    <div>{{ address.contactInfo.phone }}</div>
    <div>{{ address.contactInfo.email }}</div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>
