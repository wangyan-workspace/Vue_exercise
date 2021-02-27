; (function () {
    const template = `
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>id</th>
                    <th>姓名</th>
                    <th>工资</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                    <!--父组件向子组件传参-->
                    <item v-for="(emp,index) in empList" :key="emp.id" :emp=emp :deleteEmp="deleteEmp" :index="index"></item>
                </tbody>
            </table>
        </div>
    `
    window.HomeList = {
        template,
        // 接收父组件传递过来的数据
        props: {
            empList: Array,
            deleteEmp: Function
        },
        components: {
            Item
        }
    }
})()