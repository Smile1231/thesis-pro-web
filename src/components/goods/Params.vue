<template>
  <div>
    <el-input
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },

  methods: {
    handleInputConfirm() {
      this.inputVisible = false;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      //this.$refs.saveTagInput.$refs.input.focus();
    },
  },
  mounted() {
    window.Vue = this;
  },
};
</script>

<style lang="less" scoped>
</style>