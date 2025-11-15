<script setup lang="ts">
import { en, zh_cn } from "@nuxt/ui/locale";

const { locale } = useI18n();

const locales = {
  en,
  "zh-CN": zh_cn,
};
</script>

<template>
  <UApp :locale="locales[locale]">
    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <GravityBallsBackground />
  </UApp>
</template>
