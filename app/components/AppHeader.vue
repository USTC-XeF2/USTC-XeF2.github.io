<script setup lang="ts">
const route = useRoute();
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();

const pages = computed(() => [
  {
    label: $t("home"),
    to: localePath("index"),
    active: route.path === localePath("index"),
  },
  ...["blog", "academic", "projects", "resources"].map((page) => ({
    label: $t(page),
    to: localePath(page),
    active: route.path.startsWith(localePath(page)),
  })),
]);

const toggleLocale = () => {
  const newLocale = locale.value === "en" ? "zh-CN" : "en";
  setLocale(newLocale);
};
</script>

<template>
  <UHeader :title="$t('title')" :to="localePath('index')">
    <UNavigationMenu :items="pages" />
    <template #body>
      <UNavigationMenu :items="pages" orientation="vertical" />
    </template>

    <template #right>
      <UButton
        icon="i-heroicons-language"
        color="neutral"
        variant="ghost"
        :aria-label="$t('toggle_locale')"
        @click="toggleLocale"
      />
      <UColorModeButton />
    </template>
  </UHeader>
</template>
