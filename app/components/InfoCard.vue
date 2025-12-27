<template>
  <UCard>
    <div class="flex flex-col items-center">
      <UAvatar
        src="/favicon.jpg"
        alt="XeF2"
        class="mb-4 size-32 hover:rotate-360 duration-400"
      />

      <h1 class="text-2xl font-bold mb-1">XeF2</h1>
      <p class="text-muted mb-4">@USTC-XeF2</p>

      <p class="text-sm text-toned text-center mb-4">Physics Student | USTC</p>

      <div class="w-full space-y-3 text-sm">
        <div class="flex items-center justify-center gap-2 text-toned">
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
          <span>Hefei, China</span>
        </div>

        <div class="flex items-center justify-center gap-2 text-toned">
          <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
          <a href="mailto:contact@xef2.top" class="hover:text-primary">
            contact@xef2.top
          </a>
        </div>
      </div>
    </div>
  </UCard>
</template>
