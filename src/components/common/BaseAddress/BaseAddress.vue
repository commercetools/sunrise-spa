<script src="./BaseAddress.js"></script>

<template>
  <div>
    <div data-test="address-name">
      {{ address.title }} {{ address.firstName }} {{ address.lastName }}
    </div>
    <div data-test="address-street">{{ address.streetName }} {{ address.streetNumber }}</div>
    <div data-test="address-street-info">{{ address.additionalStreetInfo }}</div>
    <div data-test="address-city">{{ address.postalCode }}, {{ address.city }} ({{ address.country }})</div>
    <br>
    <div data-test="address-phone">{{ address.phone }}</div>
    <div data-test="address-email">{{ address.email }}</div>
  </div>

</template>
