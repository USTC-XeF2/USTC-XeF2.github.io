<script setup lang="ts">
const projects = ref([
  {
    name: "XeF4",
    description: "基于 NoneBot 和 LangChain 框架开发的智能聊天机器人",
    tags: ["Python", "NoneBot", "LangChain"],
    status: "开发中",
    repo: "https://github.com/USTC-XeF2/XeF4",
    demo: "",
    longDescription: `
      XeF4 是一个基于 NoneBot 和 LangChain 框架开发的智能聊天机器人。
      它不仅支持智能对话，还提供丰富的群聊交互功能和完整的指令集成系统。
      技术栈基于 Python，使用 NoneBot 作为机器人框架，LangChain 处理 AI 对话逻辑。
    `,
    features: [
      "NoneBot 框架",
      "LangChain 集成",
      "多种 LLM 支持",
      "群聊交互",
      "指令系统",
      "插件化架构",
      "多平台适配",
      "异步消息处理",
    ],
  },
  {
    name: "PyUSTC",
    description: "用于方便地进行学校网站网络请求的 Python 库",
    tags: ["Python", "Library", "HTTP", "USTC"],
    status: "维护中",
    repo: "https://github.com/USTC-XeF2/pyustc",
    demo: "",
    longDescription: `
      PyUSTC 是一个专为中国科学技术大学学生开发的 Python 库，简化了与学校各类网站的交互流程。
      目前已集成 CAS 统一身份认证系统、教务系统、青春科大第二课堂系统等 USTC 专属服务。
    `,
    features: [
      "简洁易用的 API",
      "CAS 统一认证",
      "教务系统集成",
      "第二课堂系统",
      "自动会话管理",
      "完整类型提示",
      "异常处理机制",
    ],
  },
  {
    name: "PhyTools",
    description: "使用 React + Vite 开发的纯前端物理实验数据计算分析单页应用",
    tags: ["React", "Vite", "TypeScript", "Physics"],
    status: "维护中",
    repo: "https://github.com/USTC-XeF2/PhyTools",
    demo: "https://phytools.xef2.top",
    longDescription: `
      PhyTools 是一个专为物理实验数据处理设计的纯前端单页应用。
      使用现代化的前端技术栈，提供快速、便捷的不确定度计算工具。
    `,
    features: [
      "React + Vite",
      "TypeScript 开发",
      "不确定度计算",
      "数据处理",
      "响应式设计",
      "纯静态部署",
    ],
  },
]);

const tabs = computed(() =>
  projects.value.map((project, idx) => ({
    label: project.name,
    slot: `project-${idx + 1}`,
  })),
);
</script>

<template>
  <UContainer>
    <UPageHeader title="我的项目" class="border-none" />
    <UCard>
      <UTabs :items="tabs" class="w-full">
        <template #project-1>
          <ProjectDetail :project="projects[0]!" />
        </template>

        <template #project-2>
          <ProjectDetail :project="projects[1]!" />
        </template>

        <template #project-3>
          <ProjectDetail :project="projects[2]!" />
        </template>
      </UTabs>
    </UCard>
  </UContainer>
</template>
