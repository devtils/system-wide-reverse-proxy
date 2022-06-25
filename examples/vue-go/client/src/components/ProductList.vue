<script setup lang="ts">
import ManageProductForm from "@/components/forms/ManageProduct.vue";
import type IProduct from "@/models/product";

const emit = defineEmits<{
  (e: "update", product: IProduct): void;
  (e: "delete", product: IProduct): void;
}>();

const props = withDefaults(
  defineProps<{
    products: IProduct[];
    variant: "view" | "manage";
  }>(),
  { variant: "view" }
);

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
function formatPrice(price: number): string {
  return formatter.format(price);
}
</script>

<template>
  <ul class="product-list">
    <li
      v-for="product in props.products"
      :key="`ProductList_Product_${product.id}`"
    >
      <ManageProductForm
        v-if="variant === 'manage'"
        :product="product"
        @update="emit('update', $event)"
        @delete="emit('delete', product)"
      />
      <div v-else class="product-info">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-price">{{ formatPrice(product.price) }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.product-info {
  display: flex;
}
.product-name {
  flex: 1;
}
.product-price {
  flex: 0;
  min-width: 5.5em;
  text-align: right;
}
</style>
