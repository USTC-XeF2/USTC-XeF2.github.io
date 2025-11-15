<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(`/posts/${route.params.id}`).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: $t("post_not_found"),
    fatal: true,
  });
}

useSeoMeta({
  title: `${post.value.title} | XeF2`,
  description: post.value.description,
});
</script>

<template>
  <UContainer>
    <UPage v-if="post">
      <UPageHeader
        :title="post.title"
        :description="post.description"
        :headline="post.date"
      />
      <UPageBody>
        <ContentRenderer :value="post" />
      </UPageBody>

      <template v-if="post.body.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
