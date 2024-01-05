<template>
  <div id="noAuth">
    <a-result
      status="403"
      subtitle="Access to this resource on the server is denied."
    >
      <template #extra>
        <a-space>
          <a-button type="primary">Back</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
