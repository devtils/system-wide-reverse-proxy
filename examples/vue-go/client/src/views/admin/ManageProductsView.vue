<script setup lang="ts">
import { ref } from "vue";
import { ajax, getAPIURL } from "@/utils";
import NewProductForm from "@/components/forms/NewProduct.vue";
import ProductList from "@/components/ProductList.vue";
import type IProduct from "@/models/product";

const products = ref<IProduct[]>(await fetchProducts());
const isManageForm = ref(true);

async function fetchProducts(): Promise<IProduct[]> {
  const response = await ajax(new URL("/api/v1/products", getAPIURL()), "GET");
  if (response.status !== 200) return []; // TODO: Error handling
  return await response.json();
}

function addProduct(product: IProduct): void {
  products.value.push(product);
}

function updateProduct(product: IProduct): void {
  const storedProduct = products.value.find((o) => o.id === product.id);
  if (storedProduct) {
    storedProduct.name = product.name;
    storedProduct.price = product.price;
  }
}

function deleteProduct(product: IProduct): void {
  products.value = products.value.filter((o) => o.id !== product.id);
}
</script>

<template>
  <main class="ui-view ui-view--manage-products">
    <h2>Manage products</h2>
    <aside>
      <h3>Create new product</h3>
      <NewProductForm @done="addProduct" />
    </aside>

    <h3>Product list</h3>

    <label>
      <input v-model="isManageForm" type="radio" :value="false" />
      View
    </label>
    <label>
      <input v-model="isManageForm" type="radio" :value="true" />
      Manage
    </label>

    <ProductList
      :products="products"
      :variant="isManageForm ? 'manage' : 'view'"
      @update="updateProduct"
      @delete="deleteProduct"
    />
  </main>
</template>
