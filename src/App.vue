<template>
  <div id="app">
    <div class="box-container">
      <div class="form-container">
        <h2>用户登录</h2>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData" 
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')" class="btn-login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // 表单数据
      formData: {
        username: "",
        password: ""
      },
      // 表单验证规则
      // require:
      // message:提示信息
      // trigger:触发实际
      // min:最小
      // max:最长
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max:8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        password: [
         { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3,  message: '长度太小', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  .box-container {
    width: 100%;
    height: 100%;
    background-color: #324152;
    position: relative;
    .form-container {
      width: 600px;
      height: 400px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -300px;
      margin-top: -200px;
      padding: 40px 40px;
      box-sizing: border-box;
      border-radius: 5px;
      h2 {
        margin-bottom: 16px;
      }
      .btn-login {
        width: 100%;
      }
    }
  }
}
</style>
