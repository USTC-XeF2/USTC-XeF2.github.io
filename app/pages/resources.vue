<script setup lang="ts">
const resources = [
  {
    category: "resources_category_course_materials",
    items: [
      {
        title: "《我的科大》课程资料",
        description: "科大各类课程学习资料分享",
        to: "https://share.feixu.site/",
        icon: "i-heroicons-folder-open",
      },
      {
        title: "USTC数学课考卷合集",
        description: "历年数学课程考试试卷整理",
        to: "https://ustcmathexam.github.io/",
        icon: "i-heroicons-document-chart-bar",
      },
    ],
  },
  {
    category: "resources_category_campus_websites",
    items: [
      {
        title: "评课社区",
        description: "USTC 课程评价与分享平台",
        to: "https://icourse.club",
        icon: "i-heroicons-chat-bubble-left-right",
      },
      {
        title: "USTC不完全入学指南",
        description: "科大新生入学指南",
        to: "https://ustcguide.gitbook.io",
        icon: "i-heroicons-book-open",
      },
      {
        title: "Vtix题库",
        description: "科大题库资源",
        to: "https://ti.u5tc.cn",
        icon: "i-heroicons-document-text",
      },
      {
        title: "正版软件",
        description: "USTC 正版软件服务",
        to: "https://software.ustc.edu.cn",
        icon: "i-heroicons-arrow-down-tray",
      },
      {
        title: "Vlab虚拟机",
        description: "USTC 虚拟机服务",
        to: "https://vlab.ustc.edu.cn/vm/",
        icon: "i-heroicons-computer-desktop",
      },
      {
        title: "Linux 101",
        description: "Linux 入门教程",
        to: "https://101.lug.ustc.edu.cn",
        icon: "i-heroicons-command-line",
      },
      {
        title: "USTC-OJ",
        description: "科大在线评测系统",
        to: "https://oj.ustc.edu.cn",
        icon: "i-heroicons-code-bracket-square",
      },
      {
        title: "USTC WebVPN",
        description: "校外访问校内资源的 VPN 服务",
        to: "https://wvpn.ustc.edu.cn",
        icon: "i-heroicons-shield-check",
      },
      {
        title: "LUG GitLab",
        description: "USTC LUG 代码托管平台",
        to: "https://git.lug.ustc.edu.cn",
        icon: "i-simple-icons-gitlab",
      },
    ],
  },
  {
    category: "resources_category_useful_tools",
    items: [
      {
        title: "Desmos",
        description: "在线图形计算器，支持函数绘图和数据可视化",
        to: "https://www.desmos.com/calculator",
        icon: "i-heroicons-chart-bar",
      },
      {
        title: "TeX2Typst",
        description: "TeX 到 Typst 转换工具",
        to: "https://qwinsi.github.io/tex2typst-webapp/",
        icon: "i-heroicons-arrow-path",
      },
      {
        title: "Wolfram Alpha",
        description: "强大的计算知识引擎，支持数学、物理等多领域计算",
        to: "https://www.wolframalpha.com",
        icon: "i-heroicons-calculator",
      },
      {
        title: "积分分步计算器",
        description: "详细的积分计算步骤展示",
        to: "https://mathdf.com/int/",
        icon: "i-heroicons-variable",
      },
    ],
  },
];
</script>

<template>
  <UContainer class="mt-8 space-y-6">
    <UCard v-for="category in resources" :key="category.category">
      <template #header>
        <h2 class="text-xl font-semibold">{{ $t(category.category) }}</h2>
      </template>

      <UPageGrid>
        <UPageCard
          v-for="item in category.items"
          :key="item.title"
          v-bind="item"
          target="_blank"
        />
      </UPageGrid>
    </UCard>
  </UContainer>
</template>
