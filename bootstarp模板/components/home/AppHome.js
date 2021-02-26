;(function(){
    const template = `
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

            <!--右边上半区域-->
            <h1 class="page-header">Dashboard</h1>
            <dashboard :fruits = fruits></dashboard>
            <!--右边下半区域-->
            <h2 class="sub-header">Section title</h2>
            <homelist></homelist>
            
        </div>
    `
    window.appHome = {
        template,
        data: function(){
            return {
                fruits: ['苹果🍎','香蕉🍌','鸭梨🍐','橘子🍊']
            }
        },
        components:{
            dashboard,
            homelist
        }
    }
})()