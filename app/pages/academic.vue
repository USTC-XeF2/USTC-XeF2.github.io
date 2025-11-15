<script setup lang="ts">
useHead({
  title: `${$t("academic")} | XeF2`,
});

const reports = [
  {
    title: "单摆法测重力加速度",
    date: "2025-04",
    pdf: "单摆法测重力加速度实验报告.pdf",
  },
  {
    title: "切变模量",
    date: "2025-05",
    pdf: "切变模量实验报告.pdf",
  },
  {
    title: "声速测量",
    date: "2025-06",
    pdf: "声速测量实验报告.pdf",
  },
  {
    title: "霍尔效应",
    date: "2025-11",
    pdf: "霍尔效应实验报告.pdf",
  },
];
</script>

<template>
  <UContainer class="mt-8 space-y-6">
    <!-- Typst 模板推荐 -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-document-duplicate" class="w-5 h-5" />
          <h2 class="text-xl font-semibold">实验报告模板</h2>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-3">Typst 实验报告模板</h3>
          <div class="prose dark:prose-invert max-w-none text-sm space-y-3">
            <p>
              这是我自己编写的 Typst
              实验报告模板,专门用于物理实验课程的报告撰写。相比传统的
              LaTeX，Typst
              具有更简洁的语法和更快的编译速度，同时保持了专业的排版质量。
            </p>
            <p>
              模板提供了完整的中文排版支持，包括标题、正文、数学公式、表格、图片等常用元素。内置了实验报告所需的各种环境，如实验数据表格、图表插入等，同时支持代码高亮显示和定理环境。
            </p>
            <p>
              模板包含三个核心文件：<code>template.typ</code>
              是基本模板文件，提供报告的整体结构和样式；<code>plot.typ</code>
              是绘图工具包，方便在报告中插入和定制图表；<code>tools.typ</code>
              包含了我常用的自定义工具函数，可以简化报告编写过程。
            </p>
          </div>
        </div>

        <UButton
          to="/typst-report-template.zip"
          icon="i-heroicons-arrow-down-tray"
          color="primary"
          target="_blank"
        >
          下载模板
        </UButton>
      </div>
    </UCard>

    <!-- 物理实验报告 -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-academic-cap" class="w-5 h-5" />
          <h2 class="text-xl font-semibold">物理实验报告</h2>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard
          v-for="report in reports"
          :key="report.title"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">{{ report.title }}</h3>
              </div>
              <UIcon
                name="i-heroicons-document-text"
                class="w-6 h-6 text-primary"
              />
            </div>

            <div class="flex items-center justify-between pt-2">
              <span class="text-xs text-muted">{{ report.date }}</span>
              <UButton
                :to="`reports/${report.pdf}`"
                target="_blank"
                size="sm"
                icon="i-heroicons-arrow-down-tray"
                color="primary"
                variant="outline"
              >
                下载 PDF
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UCard>
  </UContainer>
</template>
