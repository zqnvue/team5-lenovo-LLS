<template>
  <div id>
    <div id="navbg">
      <div id="navbg-img">
        <div id="h-name">学员管理</div>
        <p id="h-ul">真实客观统计学员数据 贴近学员生活学习 记录学生成长</p>
      </div>
    </div>
    <div id="c-title">
      <p>学员管理</p>
      <div class="c-add">
        <el-row>
          <el-button type="success" @click="addClass = true">新增班级</el-button>
          <el-button type="success" @click="addStu = true">新增学生</el-button>

          <el-dialog title="新增学生" :visible.sync="addStu">
            <el-form :model="form">
                <el-form-item label="学生班级：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择学生班级">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：" :label-width="formLabelWidth">
                    <el-input class="inpWidth" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话：" :label-width="formLabelWidth">
                    <el-input class="inpWidth" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" :label-width="formLabelWidth">
                    <el-input class="inpWidth" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" :label-width="formLabelWidth">
                    <el-input class="inpWidth" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addStu = false">取 消</el-button>
              <el-button type="primary" @click="addStu = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StuManger",
  data() {
    return {
      //当前组件用到的数据
      addStu: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
    };
  },
  methods: {
    //当前组件用到的函数
    
  },
  created() {
    //组件加载完之后的生命周期函数，如果页面一加载就需要展示数据，那么数据在这获取
  }
};
</script>

<style lang="">
#navbg {
  height: 144px;
  background: #f80355;
}
#navbg-img {
  height: 144px;
  background: url(../../images/back04.png) no-repeat 720px -20px;
  position: relative;
}
#h-name {
  min-width: 400px;
  color: #fff;
  font-size: 25px;
  padding-top: 40px;
  margin-left: 125px;
}
#h-ul {
  margin-left: 125px;
  color: #fff;
}
#c-title p {
  min-width: 100px;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  text-indent: 11px;
  margin: 15px 0 12px 125px;
  position: relative;
  border-left: 4px solid#49c0e0;
}
.c-add {
  width: 250px;
  margin-left: 1000px;
}
.inpWidth {
    width: 300px;
}
</style>