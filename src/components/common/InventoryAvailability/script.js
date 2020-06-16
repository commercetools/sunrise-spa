export default {
  props: { inventory: Object },
  methods: {
    showStoreFinder() {
      $('#store-finder-modal').modal('show');
    },
  },
  computed: {
    storeInventory() {
      let inventoryStatus = 'Out of Stock';
      const atStore = (this.inventory && this.$store.state.storeName) ? ` at ${this.$store.state.storeName}` : '';
      if (!this.inventory || !this.$store.state.storeName) {
        inventoryStatus = 'Find In Store';
      } else if (this.inventory.availableQuantity > 20) {
        inventoryStatus = 'In Stock';
      } else if (this.inventory.availableQuantity > 0) {
        inventoryStatus = 'Only a few left';
      }
      return ` ${inventoryStatus}${atStore}`;
    },
    storeInventoryIcon() {
      let inventoryIcon = 'times';
      if (!this.inventory || !this.$store.state.storeName) {
        inventoryIcon = 'map-marker-alt';
      } else if (this.inventory.availableQuantity > 20) {
        inventoryIcon = 'check';
      } else if (this.inventory.availableQuantity > 0) {
        inventoryIcon = 'exclamation-triangle';
      }
      return inventoryIcon;
    },
  },
};
