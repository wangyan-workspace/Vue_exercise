; (function () {
    const template = `
        <div class="row placeholders">
            <div v-for="(fruit,index) in fruits" :key="index" class="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                <h4>{{fruit}}</h4>
                <span class="text-muted">Something else</span>
                <br>
                <a href="#" @click="deleteFruit(index)">删除</a>
            </div>
            
        </div>
    `
    window.dashboard = {
        template,
        props: ['fruits'],
        methods: {
            deleteFruit(index) {
                // 触发父组件里的自定义事件  子组件向父组件通信
                this.$emit('delete_fruit', index);
            }
        }
    }
})()