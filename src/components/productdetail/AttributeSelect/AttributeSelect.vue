<script src="./AttributeSelect.js"></script>

<template>
    <HooverDropdown>
      <span class="text-uppercase"
        >{{name}} <i class="fa fa-angle-down angle-down"></i>
        <i class="fa fa-angle-up angle-up"></i
      ></span>
      <ul >
        <li v-for="value in values"
            data-test="attribute-select-option"
            :key="value">
          <a
            href="#"
            @click.prevent="setSelectedValue(id,value)"
          >
            {{value}}
          </a>
        </li>
      </ul>
    </HooverDropdown>
</template>
