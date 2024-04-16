<template>
    <!--container-->
    <section class="container">

        <!--questionBox-->
        <div class="questionBox" id="app">

            <!-- transition -->
            <transition :duration="{ enter: 500, leave: 300 }" enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut" mode="out-in">
                
                <!--qusetionContainer-->
                <div class="questionContainer" v-if="questionIndex < quiz.questions.length" v-bind:key="questionIndex">

                    <header>
                        <el-avatar :size="50" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                        <h1 class="title is-6">小测验</h1>
                        <!--progress-->
                        <div class="progressContainer">
                            <progress class="progress is-info is-small"
                                :value="(questionIndex / quiz.questions.length) * 100"
                                max="100">{{ (questionIndex / quiz.questions.length) * 100 }}%</progress>
                            <p>{{ ((questionIndex / quiz.questions.length) * 100).toFixed(1) }}% complete</p>
                        </div>
                        <!--/progress-->
                    </header>

                    <!-- questionTitle -->
                    <h2 class="titleContainer title">{{ quiz.questions[questionIndex].text }}</h2>

                    <!-- quizOptions -->
                    <div class="optionContainer">
                        <div class="option" v-for="(response, index) in quiz.questions[questionIndex].responses"
                            @click="selectOption(index)"
                            :class="{ 'is-selected': userResponses[questionIndex] == index }" :key="index">
                            {{ index | charIndex(index) }}. {{ response.text }}
                        </div>
                    </div>

                    <!--quizFooter: navigation and progress-->
                    <footer class="questionFooter">

                        <!--pagination-->
                        <nav class="pagination" role="navigation" aria-label="pagination">

                            <!-- back button -->
                            <a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                                Back
                            </a>

                            <!-- next button -->
                            <a class="button" :class="(userResponses[questionIndex] == null) ? '' : 'is-active'"
                                v-on:click="next();" :disabled="questionIndex >= quiz.questions.length">
                                {{ (userResponses[questionIndex] == null) ? 'Skip' : 'Next' }}
                            </a>

                        </nav>
                        <!--/pagination-->

                    </footer>
                    <!--/quizFooter-->

                </div>
                <!--/questionContainer-->

                <!--quizCompletedResult-->
                <div v-else-if="questionIndex >= quiz.questions.length"
                    class="quizCompleted has-text-centered">

                    <!-- quizCompletedIcon: Achievement Icon -->
                    <span class="icon">
                        <i class="fa" :class="score() > 3 ? 'fa-check-circle-o is-active' : 'fa-times-circle'"></i>
                    </span>

                    <!--resultTitleBlock-->
                    <h2 class="title">
                        You did {{ (score() > 7 ? 'an amazing' : (score() < 4 ? 'a poor' : 'a good')) }} job! </h2>
                            <p class="subtitle">
                                Total score: {{ score() }} / {{ quiz.questions.length }}
                            </p>
                            <br>
                            <a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>
                            <!--/resultTitleBlock-->

                </div>
                <!--/quizCompetedResult-->

            </transition>

        </div>
        <!--/questionBox-->

    </section>
    <!--/container-->
</template>

<script setup>
import { ref } from 'vue';
var quizdata = {
    user: "Dave",
    questions: [{
    text: "HTTP 的全称是什么？",
    responses: [
      { text: "超文本传输封装" },
      { text: "超文本传输协议", correct: true },
      { text: "连字符文本测试程序" },
      { text: "以上都不是" }
    ]
  },
  {
    text: "计算机内存的英文缩写是什么？",
    responses: [
      { text: "RPM" },
      { text: "RAM", correct: true },
      { text: "CPU" },
      { text: "ROM" }
    ]
  },
  {
    text: "什么是LAN的全称？",
    responses: [
      { text: "局域网", correct: true },
      { text: "广域网" },
      { text: "互联网" },
      { text: "无线局域网" }
    ]
  },
  {
    text: "CSS 是用来描述网页的什么样式的？",
    responses: [
      { text: "行为样式" },
      { text: "外观样式", correct: true },
      { text: "数据样式" },
      { text: "功能样式" }
    ]
  },
  {
    text: "在 JavaScript 中，typeof 操作符用于做什么？",
    responses: [
      { text: "判断数据类型", correct: true },
      { text: "声明变量" },
      { text: "定义函数" },
      { text: "循环迭代" }
    ]
  },
  {
    text: "在计算机中，CPU 是什么的缩写？",
    responses: [
      { text: "中央处理单元", correct: true },
      { text: "计算机处理单元" },
      { text: "计算程序单元" },
      { text: "中央处理器" }
    ]
  },
  {
    text: "HTML 是用来定义什么的标记语言？",
    responses: [
      { text: "网络传输协议" },
      { text: "超文本标记语言", correct: true },
      { text: "数据交换格式" },
      { text: "样式表语言" }
    ]
  },
  {
    text: "JavaScript 中的箭头函数是用来做什么的？",
    responses: [
      { text: "定义对象" },
      { text: "创建数组" },
      { text: "声明变量" },
      { text: "定义函数", correct: true }
    ]
  },
  {
    text: "数据库中的 SQL 是什么的缩写？",
    responses: [
      { text: "数据查询语言" },
      { text: "结构化查询语言", correct: true },
      { text: "数据操作语言" },
      { text: "脚本查询语言" }
    ]
  },
  {
    text: "在计算机中，BIOS 是什么的缩写？",
    responses: [
      { text: "基本输入输出系统", correct: true },
      { text: "操作系统" },
      { text: "基本内存管理" },
      { text: "外部设备驱动" }
    ]
  },
  {
    text: "CSS 中的盒模型包括哪些部分？",
    responses: [
      { text: "内容、边框、外边距、内边距", correct: true },
      { text: "内容、边框、外边距" },
      { text: "内容、边框、内边距" },
      { text: "边框、外边距、内边距" }
    ]
  },
  {
    text: "在计算机中，GUI 是什么的缩写？",
    responses: [
      { text: "图形用户界面", correct: true },
      { text: "全局唯一标识符" },
      { text: "通用串行总线" },
      { text: "图像处理单元" }
    ]
  }]
},
    userResponseSkelaton = Array(quizdata.questions.length).fill(null);
const quiz = ref(quizdata);
const questionIndex = ref(0);
const userResponses = ref(userResponseSkelaton);
const isActive = ref(false);
const charIndex = function (i) {
    return String.fromCharCode(97 + i);
}

const restart = function () {
    questionIndex.value = 0;
    userResponses.value = Array(quiz.value.questions.length).fill(null);
};
const selectOption = function (index) {
    userResponses.value[questionIndex.value] = index;
    //console.log(this.userResponses);
};
const next = function () {
    if (questionIndex.value < quiz.value.questions.length)
        questionIndex.value++;
};

const prev = function () {
    if (quiz.value.questions.length > 0) questionIndex.value--;
};
// Return "true" count in userResponses
const score = function () {
    var score = 0;
    for (let i = 0; i < userResponses.value.length; i++) {
        if (
            typeof quiz.value.questions[i].responses[
            userResponses.value[i]
            ] !== "undefined" &&
            quiz.value.questions[i].responses[userResponses.value[i]].correct
        ) {
            score = score + 1;
        }
    }
    return score;

    //return this.userResponses.filter(function(val) { return val }).length;
}

</script>

<style lang="scss">
$trans_duration: 0.3s;
$primary_color: #3D5AFE;

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");

body {
    font-family: "Open Sans", sans-serif;
    font-size: 14px;

    height: 100vh;

    background: #CFD8DC;

    /* mocking native UI */
    cursor: default !important;
    /* remove text selection cursor */
    user-select: none;
    /* remove text selection */
    user-drag: none;
    /* disbale element dragging */

    display: flex;
    align-items: center;
    justify-content: center;
}

.button {
    transition: $trans_duration;
}

.title,
.subtitle {
    font-family: Montserrat, sans-serif;
    font-weight: normal;
}

.animated {
    transition-duration: $trans_duration/2;
}

.container {
    margin: 0 0.5rem;
}

.questionBox {

    max-width: 30rem;
    width: 30rem;
    min-height: 30rem;

    background: #FAFAFA;
    position: relative;
    display: flex;

    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    header {
        background: rgba(0, 0, 0, 0.025);
        padding: 1.5rem;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        h1 {
            font-weight: bold;
            margin-bottom: 1rem !important;
        }

        .progressContainer {
            width: 60%;
            margin: 0 auto;

            >progress {
                margin: 0;
                border-radius: 5rem;
                overflow: hidden;
                border: none;

                color: $primary_color;

                &::-moz-progress-bar {
                    background: $primary_color;
                }

                &::-webkit-progress-value {
                    background: $primary_color;
                }
            }

            >p {
                margin: 0;
                margin-top: 0.5rem;
            }
        }
    }

    .titleContainer {
        text-align: center;
        margin: 0 auto;
        padding: 1.5rem;

    }

    .quizForm {
        display: block;
        white-space: normal;

        height: 100%;
        width: 100%;

        .quizFormContainer {
            height: 100%;
            margin: 15px 18px;

            .field-label {
                text-align: left;
                margin-bottom: 0.5rem;
            }
        }
    }

    .quizCompleted {
        width: 100%;
        padding: 1rem;
        text-align: center;

        >.icon {
            color: #FF5252;
            font-size: 5rem;

            .is-active {
                color: #00E676;
            }
        }
    }

    .questionContainer {
        white-space: normal;

        height: 100%;
        width: 100%;

        .optionContainer {
            margin-top: 12px;
            flex-grow: 1;

            .option {
                border-radius: 290486px;
                padding: 9px 18px;
                margin: 0 18px;
                margin-bottom: 12px;
                transition: $trans_duration;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.05);
                color: rgba(0, 0, 0, 0.85);
                border: transparent 1px solid;

                &.is-selected {
                    border-color: rgba(black, 0.25);
                    background-color: white;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }

                &:active {
                    transform: scaleX(0.9);
                }
            }
        }

        .questionFooter {
            background: rgba(0, 0, 0, 0.025);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            width: 100%;
            align-self: flex-end;

            .pagination {
                //padding: 10px 15px;
                margin: 15px 25px;
            }
        }
    }
}

.pagination {
    display: flex;
    justify-content: space-between;
}

.button {
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5rem;
    margin: 0 0.25rem;

    transition: 0.3s;

    &:hover {
        cursor: pointer;
        background: #ECEFF1;
        border-color: rgba(0, 0, 0, 0.25);
    }

    &.is-active {
        background: $primary_color;
        color: white;
        border-color: transparent;

        &:hover {
            background: darken($primary_color, 10%);

        }
    }
}

@media screen and (min-width: 769px) {
    .questionBox {
        align-items: center;
        justify-content: center;

        .questionContainer {
            display: flex;
            flex-direction: column;
        }
    }
}

@media screen and (max-width: 768px) {
    .sidebar {
        height: auto !important;
        border-radius: 6px 6px 0px 0px;
    }
}
</style>