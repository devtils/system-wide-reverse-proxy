<script setup lang="ts">
import { ref } from "vue";
import { ajax, getFormActionAndMethod, getAPIURL } from "@/utils";
import type IProduct from "@/models/product";

const emit = defineEmits<{
  (e: "update", product: IProduct): void;
  (e: "delete"): void;
}>();

const props = defineProps<{ product: IProduct }>();

const name = ref(props.product.name);
const price = ref(props.product.price);

async function submit(event: Event): Promise<void> {
  await updateProduct(event.target);
}

async function updateProduct(form: HTMLFormElement): Promise<IProduct | null> {
  const data = { name: name.value, price: price.value };
  const { url, method } = getFormActionAndMethod(form);
  const response = await ajax(url, method, data);
  if (response.status !== 200) return null; // TODO: Error handling
  const product = await response.json();
  emit("update", product);
  return product;
}

async function submitDelete(event: Event): Promise<void> {
  await deleteProduct(event.target);
}

async function deleteProduct(form: HTMLFormElement): Promise<void> {
  if (confirm("Do you really want to delete this product?")) {
    const { url, method } = getFormActionAndMethod(form);
    const response = await ajax(url, method);
    if (response.status !== 200) return; // TODO: Error handling
    emit("delete");
  }
}
</script>

<template>
  <form
    :action="`/api/v1/product/${props.product.id}`"
    method="PATCH"
    @submit.prevent="submit"
  >
    <input v-model="name" type="text" name="name" placeholder="Product name" />
    <input
      v-model="price"
      type="number"
      name="price"
      min="0"
      max="1000"
      step=".1"
      placeholder="0.99"
    />€
    <form
      :action="`/api/v1/product/${props.product.id}`"
      method="DELETE"
      @submit.prevent="submitDelete"
    >
      <button type="submit">x</button>
    </form>
    <button type="submit">Update</button>
  </form>
</template>

<style scoped>
form[method="PATCH"] form[method="DELETE"] {
  display: inline-block;
}
</style>
