<script setup lang="ts">
import { ref } from "vue";
import { ajax, getFormActionAndMethod } from "@/utils";
import type IProduct from "@/models/product";

const emit = defineEmits<{ (e: "done", product: IProduct): void }>();

const name = ref("");
const price = ref<string | number>(""); // default empty string so that input placeholer will be displayed initially

async function submit(event: Event): Promise<void> {
  await createProduct(event.target);
}

async function createProduct(form: HTMLFormElement): Promise<IProduct | null> {
  const data = { name: name.value, price: price.value };
  const { url, method } = getFormActionAndMethod(form);
  const response = await ajax(url, method, data);
  if (response.status !== 201) return null; // TODO: Error handling
  const product = await response.json();
  emit("done", product);
  return product;
}
</script>

<template>
  <form action="/api/v1/product" method="PUT" @submit.prevent="submit">
    <input v-model="name" type="text" name="name" placeholder="Product name" />
    <input
      v-model="price"
      type="number"
      name="price"
      min="0"
      max="1000"
      step=".1"
      placeholder="0.99€"
    />€
    <button type="submit">Create</button>
  </form>
</template>
