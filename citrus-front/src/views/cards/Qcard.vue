<template>
  <div v-if="props.type === 'checkbox'">
    <Checkbox
      :err="props.err"
      :seq="props.seq"
      :data="props.data"
      v-model="answer"
    ></Checkbox>
  </div>
</template>
<script setup>
import Checkbox from "./Checkbox.vue";
const props = defineProps(["type", "seq", "data", "err"]);
const answer = defineModel();
</script>
