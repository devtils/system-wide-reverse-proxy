<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";

const isAdmin = ref(true); // TODO: authentication mechanism
</script>

<template>
  <div class="ui-view ui-view--admin-root">
    <h1>Admininistration</h1>
    <Suspense>
      <RouterView v-if="isAdmin" />
      <div v-else>
        You require <strong>admin privileges</strong> to view this page.
      </div>
      <template #fallback>Loading data ...</template>
    </Suspense>
  </div>
</template>
