<template>
  <div>
    <div style="padding: 8px 0 0 0">
      <el-row :gutter="8">
        <el-col :span="18">
          <el-row :gutter="4">
            <el-col :span="8" v-for="(item, index) in questionBankList" v-key="index">
              <el-card style="height: 100px; margin-top: 8px" shadow="hover">
                <el-row :gutter="1">
                  <el-col :span="6">
                    <el-avatar
                      :size="50"
                      :src="baseMediaUrl + item.image"
                      shape="square"
                    ></el-avatar>
                  </el-col>
                  <el-col :span="14">
                    <el-text size="default">{{ item.title }}</el-text>
                    <div style="height: 8px"></div>
                    <el-text size="small">{{ item.desc }}</el-text>
                  </el-col>
                  <el-col :span="4">
                    <div
                      style="
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                      "
                    >
                      <el-button size="small" style="width: 100%">✏编辑</el-button>
                      <div style="height: 8px"></div>
                      <el-button size="small">🔍查看</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card
                @click="formVisible = true"
                style="
                  height: 100px;
                  cursor: pointer;
                  display: flex;
                  margin-top: 8px;
                  align-items: center;
                  justify-content: center;
                "
                shadow="hover"
                ><el-text size="large">新增题库</el-text></el-card
              >
            </el-col>
          </el-row>
          <div style="margin-top: 8px">
            <el-text class="mx-1" size="large">练习题库</el-text>
            <el-row style="margin-top: 8px" class="mb-4">
              <el-check-tag style="margin-right: 8px">所有题目</el-check-tag>
              <el-check-tag checked style="margin-right: 8px">C语言</el-check-tag>
              <el-check-tag style="margin-right: 8px">操作系统</el-check-tag>
            </el-row>
            <el-table style="margin-top: 8px; width: 100%" :data="tableData">
              <el-table-column prop="status" label="状态" width="60" />
              <el-table-column prop="name" label="题目" width="300" />
              <el-table-column prop="answer" label="解析" width="150" />
              <el-table-column prop="rate" label="一次通过率" width="150" />
              <el-table-column prop="level" label="难度" width="150" />
            </el-table>
          </div>
        </el-col>
        <el-col :span="6">
          <VCalendar style="width: 100%; height: 300px" />
          <el-card style="margin-top: 8px" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>公告🔈</span>
              </div>
            </template>
            <div>
              <el-text class="indented-paragraph" size="default"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无论您是想要巩固知识、提升技能，还是准备计算机相关考试，我们都有适合您的题目。希望我们的题库程序能够为您带来学习的乐趣和成功的成果！代码完全开源！</el-text
              >
            </div>
            <template #footer>
              <div style="float: right">
                <el-text size="small">2023 年由站长编辑</el-text>
              </div>
              <div style="height: 8px"></div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
