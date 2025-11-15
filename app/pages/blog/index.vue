<script setup lang="ts">
const { data: posts } = await useAsyncData(() =>
  queryCollection("blog").order("date", "DESC").all(),
);
</script>

<template>
  <UContainer class="mt-8">
    <UBlogPosts orientation="vertical" :posts="posts">
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        v-bind="post"
        :to="
          $localePath({ name: 'blog-id', params: { id: post.path.slice(7) } })
        "
      />
    </UBlogPosts>
  </UContainer>
</template>
