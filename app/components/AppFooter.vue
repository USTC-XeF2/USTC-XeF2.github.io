<template>
  <UFooter>
    <p class="text-muted text-sm">
      Copyright © {{ new Date().getFullYear() }} XeF2
    </p>
    <template #right>
      <UButton
        icon="i-simple-icons-bilibili"
        color="neutral"
        variant="ghost"
        to="https://space.bilibili.com/2127010169"
        target="_blank"
        aria-label="Bilibili"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/USTC-XeF2"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
