<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  tags: string[];
  status: string;
  repo: string;
  demo?: string;
  longDescription: string;
  features: string[];
}

const props = defineProps<{
  project: Project;
}>();

const statusColor = computed(() => {
  return props.project.status === "维护中" ? "success" : "info";
});
</script>

<template>
  <div class="py-6">
    <!-- 项目头部信息 -->
    <div class="flex-1 mb-6">
      <div class="flex items-center gap-3 mb-3">
        <h2 class="text-2xl font-bold">
          {{ project.name }}
        </h2>
        <UBadge :color="statusColor" variant="subtle">
          {{ project.status }}
        </UBadge>
      </div>

      <p class="text-muted mb-4">
        {{ project.description }}
      </p>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          variant="subtle"
          size="sm"
        >
          {{ tag }}
        </UBadge>
      </div>

      <!-- 链接按钮 -->
      <div class="flex gap-3">
        <UButton
          :to="project.repo"
          target="_blank"
          icon="i-heroicons-code-bracket"
        >
          查看源码
        </UButton>

        <UButton
          v-if="project.demo"
          :to="project.demo"
          target="_blank"
          icon="i-heroicons-globe-alt"
          color="neutral"
          variant="soft"
        >
          在线演示
        </UButton>
      </div>
    </div>

    <!-- 详细描述 -->
    <div class="mb-6">
      <div class="max-w-none text-toned">
        <p
          v-for="(paragraph, index) in project.longDescription
            .trim()
            .split('\n')"
          :key="index"
          class="mb-3 whitespace-pre-line"
        >
          {{ paragraph.trim() }}
        </p>
      </div>
    </div>

    <!-- 主要特性 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">主要特性</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="feature in project.features"
          :key="feature"
          class="flex items-start gap-2"
        >
          <UIcon
            name="i-heroicons-check-circle"
            class="w-5 h-5 text-primary shrink-0 mt-0.5"
          />
          <span class="text-sm text-toned">
            {{ feature }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
