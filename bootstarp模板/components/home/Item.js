; (function () {
    const template = `
        <tr>
            <td>{{emp.id}}</td>
            <td>{{emp.name}}</td>
            <td>{{emp.salary}}</td>
            <td>
                <!--阻止浏览器的默认行为-->
                <a href="#" @click.prevent="deleteItem">删除</a>
            </td>
        </tr>
    `
    window.Item = {
        template,
        // 接收父组件传递过来的数据
        props: {
            emp: {
                type: Object,//指定数据类型
                required: true//指定父组件是否必须把这个数据传过来
            },
            deleteEmp: Function,
            index: Number
        },
        methods: {
            deleteItem() {
                this.deleteEmp(this.index);
            }
        }
    }
})()