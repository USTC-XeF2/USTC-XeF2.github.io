<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :clear="{ label: $t('go_home') }" :error="error" />
  </UApp>
</template>
