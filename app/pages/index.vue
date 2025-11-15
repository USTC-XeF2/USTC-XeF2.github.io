<script setup lang="ts">
const infoCardRef = useTemplateRef("infoCard");
const isMobile = ref(false);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

const interests = ["Python", "TypeScript", "Web 开发", "AI 应用"];

const resources = [
  {
    title: "学术资料",
    description: "物理实验报告与排版模板分享",
  },
  {
    title: "学习资源",
    description: "课程资料、校园网站与实用工具推荐",
  },
];
</script>

<template>
  <UPage
    :ui="{
      center: 'lg:col-span-7',
      left: 'lg:col-span-3',
    }"
  >
    <template #left>
      <UPageAside>
        <Teleport defer :to="infoCardRef" :disabled="!isMobile">
          <UCard class="lg:ml-8">
            <div class="flex flex-col items-center">
              <UAvatar
                src="/favicon.jpg"
                text="Xe"
                class="mb-4 size-32 hover:rotate-360 duration-400"
              />

              <h1 class="text-2xl font-bold mb-1">XeF2</h1>
              <p class="text-muted mb-4">@USTC-XeF2</p>

              <p class="text-sm text-toned text-center mb-4">
                Physics Student | USTC
              </p>

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
        </Teleport>
      </UPageAside>
    </template>

    <UPageBody class="max-lg:mx-4 mr-8">
      <div ref="infoCard" class="lg:hidden"></div>

      <!-- 个人简介 -->
      <UCard>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            欢迎来到我的个人主页！我是一名物理学专业的学生，同时辅修计算机科学。
          </p>
          <p>
            在学习的同时，我也在不断探索编程的世界。通过结合多个领域的知识，我开发了一些实用的工具和应用，希望能为学习和生活带来便利。
          </p>
          <p>
            我乐于分享自己的学习经验和心得。如果你对我的项目或资料感兴趣，欢迎随时交流！
          </p>
        </div>
      </UCard>

      <!-- 项目开发 -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">项目开发</h2>
        </template>

        <div class="space-y-3">
          <div class="flex flex-wrap gap-2 mb-4">
            <UBadge
              v-for="interest in interests"
              :key="interest"
              variant="soft"
            >
              {{ interest }}
            </UBadge>
          </div>

          <div class="prose dark:prose-invert max-w-none text-sm">
            <p>
              在学习之余，我喜欢开发一些实用的工具和应用。这些项目涵盖了智能对话系统、数据处理工具、Web
              应用等多个领域。
            </p>
            <p>
              通过实践，我将课堂学到的理论知识转化为解决实际问题的能力，也在这个过程中不断提升自己的编程技能。
            </p>
            <p>
              所有项目都在 GitHub
              上开源，欢迎查看详细介绍。如果你有改进建议或想要参与开发，欢迎交流！
            </p>
          </div>
        </div>
      </UCard>

      <!-- 资料分享 -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">资料分享</h2>
        </template>

        <div class="space-y-4">
          <div class="prose dark:prose-invert max-w-none text-sm">
            <p>
              在学习过程中，我积累了一些学习资料和工具推荐，希望能够帮助到其他同学。
            </p>
          </div>

          <div class="space-y-3">
            <div
              v-for="resource in resources"
              :key="resource.title"
              class="p-3 bg-muted/50 rounded-lg"
            >
              <h4 class="font-semibold mb-1">
                {{ resource.title }}
              </h4>
              <p class="text-sm text-muted">
                {{ resource.description }}
              </p>
            </div>
          </div>

          <div class="prose dark:prose-invert max-w-none text-sm">
            <p>
              这些资料会持续更新，包括实验报告、排版模板、课程资源和实用工具等。欢迎探索使用！
            </p>
          </div>
        </div>
      </UCard>
    </UPageBody>
  </UPage>
</template>
