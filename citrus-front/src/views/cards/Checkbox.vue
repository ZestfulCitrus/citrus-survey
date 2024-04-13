<template>
  <div
    :style="
      (err ? 'border: 1px dashed red;' : '') +
      (seq === '1'
        ? ' margin: 0 0.8em 0 0.8em; padding: 0 0.8em 0 0.8em;'
        : 'margin: 0.4em 0.8em 0 0.8em; padding: 0 0.8em 0 0.8em;')
    "
  >
    <div style="display: flex">
      <p style="color: red">*</p>
      <p style="margin-left: 0.5em">
        {{ props["seq"] }}. {{ props["data"]["surveyTitle"] }}
      </p>
    </div>
    <div style="display: flex; flex-direction: column">
      <el-radio
        v-model="answer"
        v-for="(item, index) in props['data']['options']"
        :value="item.value"
        @change="selectRadio"
        size="default"
      >
        {{ item.value }}
      </el-radio>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["seq", "data", "err"]);
const answer = defineModel();
const selectRadio = (event) => {
  console.log(event);
};
</script>
