<script setup>
import QCard from "./cards/Qcard.vue";
import http from "@/utils/request";
import { ref } from "vue";
const loading = ref(true);
const SurveySubmit = () => {
  const answerContent = survey.value.surveyContent.question.map((e) => {
    return {
      qid: e.qid,
      answer: e.answer,
    };
  });
  http.post("/survey/123456", answerContent);
};
const survey = ref({
  sid: 0,
  meta: {},
  surveyContent: {
    title: "问卷加载中...",
    desc: "",
    question: [],
    footer: {
      desc: "问卷加载中...",
      button: "",
    },
  },
});
http
  .get("/survey/123456")
  .then((res) => {
    survey.value = res;
    loading.value = false;
  })
  .catch((err) => {
    //TODO !
  });
</script>

<template>
  <div v-loading="loading" class="survey-container">
    <div class="survey-title">
      <p>{{ survey.surveyContent.title }}</p>
    </div>
    <div class="survey-desc">
      <p>
        {{ survey.surveyContent.desc }}
      </p>
    </div>
    <div style="border: 1px dashed #606266; margin-left: 1em; margin-right: 1em" />
    <div class="survey-question">
      <QCard
        v-for="(item, index) in survey.surveyContent.question"
        :key="index"
        :type="item.type"
        :err="false"
        :seq="index + 1"
        :data="item.data"
        v-model="item.answer"
      ></QCard>
    </div>
    <div class="survey-footer">
      <p>{{ survey.surveyContent.footer.desc }}</p>
      <br />
      <el-button @click="SurveySubmit" type="primary">{{
        survey.surveyContent.footer.button
      }}</el-button>
    </div>
  </div>
</template>

<style>
.survey-container {
  background-color: #f2f3f5;
  width: 768px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  padding-bottom: 3em;
}
.survey-title {
  padding-top: 2em;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #ff0000;
}
.survey-desc {
  padding-left: 2em;
  padding-right: 2em;
  text-indent: 2em;
}
.survey-question {
  padding-left: 0.8em;
  padding-right: 0.8em;
  padding-top: 0.8em;
}
.survey-footer {
  padding-top: 2em;
  padding-left: 2em;
  padding-right: 2em;
  text-align: center;
}
</style>
