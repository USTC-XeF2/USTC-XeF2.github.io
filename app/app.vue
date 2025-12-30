<script setup lang="ts">
import { en, zh_cn } from "@nuxt/ui/locale";

const i18nHead = useLocaleHead();
useHead(() => i18nHead.value);

const { t, locale } = useI18n();

useSeoMeta({
  description: t("site_description"),
});

const locales = {
  en,
  "zh-CN": zh_cn,
};
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />

    <AppHeader />

    <UMain as="main">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <GravityBallsBackground />
  </UApp>
</template>
