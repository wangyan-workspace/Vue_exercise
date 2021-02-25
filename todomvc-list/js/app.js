(function (Vue) {
	const STORAGE_KEY = "items-vue";
	// 进行本地数据存储/获取
	const itemStorage = {
		// 获取数据
		fetch(){
			// 将获取到的信息(字符串形式)转换成数组形式
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
		},
		// 存储数据
		save(items){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
		}
	}
	// const items = [
	// 	{
	// 		id: 1,//主键id
	// 		content: "HTML",//输入的内容
	// 		completed: false//是否完成
	// 	},
	// 	{
	// 		id: 1,//主键id
	// 		content: "CSS",//输入的内容
	// 		completed: false//是否完成
	// 	},
	// 	{
	// 		id: 1,//主键id
	// 		content: "JS",//输入的内容
	// 		completed: true//是否完成
	// 	},
	// ]
	// 自定义全局指令
	Vue.directive('app-focus', {
		// 只在加载时绑定一次
		inserted(el, binding) {
			el.focus();
		},
		// 当数据更新时，就会执行一次
		update(el, binding) {
			el.focus();
		},
	})
	const vm = new Vue({
		el: "#todoapp",
		data: {
			items: itemStorage.fetch(), //相当于items:items这个写法，ES6中对象属性的简写方式(如果对象中的key和value名字一样，就可以简写成一个)
			currentItem: null,//记录被双击的任务项
			filterStatus: 'all'//接收变化的状态值
		},
		watch: {
			// 只能实现当数组长度变化时才会监听的到
			/* items:function(newValue,old){
				console.log("watch",newValue);
				
			} */
			// 深度监听：数组长度变化，数组内对象中属性(content,completed)的变化都会监听的到
			items:{
				deep:true,
				handler:function(newValue,old){
					// console.log("watch",newValue);
					itemStorage.save(newValue)
				}
			}
		},
		// 定义计算属性
		computed: {
			remaining() { //remaining:function(){}
				// item.completed代表的是已完成，取反就代表是未完成的了
				// filter方法会把数组中满足completed为false的元素一个一个的拿出来，添加到unItems数组中，
				// 这样当filter方法执行完毕之后就得到了所有未完成的元素，最后将所有未完成的数量返回出去显示在页面中

				/*
				const unItems = this.items.filter(function(item){  //将符合条件的item过滤出来
					return !item.completed  //返回未完成的item
				})
				return unItems.length;
				*/

				// ES6简写形式
				const unItems = this.items.filter(item => !item.completed) //filter过滤出数组中符合条件的数据
				return unItems.length
			},
			// 切换所有状态，控制全选按钮是否勾选
			toggleAll: {
				//当所有任务项都被勾选上，表示已完成，input框中的光标就变亮
				get() {
					// console.log('get',this.remaining);
					return this.remaining === 0;
				},
				set(newStatus) {
					// console.log("set",newStatus);//set true
					// this.items.forEach(function(){

					// })
					//ES6简写方式
					// this.items.forEach((item) => {
					// 	item.completed = newStatus;
					// })
					// 更加简写
					this.items.forEach(item => item.completed = newStatus);//forEach查询整个数组
				}
			},
			// 根据下面的all，active，completed三个按钮不同点击状态过滤显示不同的列表
			filterItems(){
				switch (this.filterStatus) {
					case 'active':
						return this.items.filter(item => !item.completed)
						break;
					case 'completed':
						return this.items.filter(item => item.completed)
						break;
					default:
						return this.items
						break;
				}
			}
		},
		methods: {
			// 向数组里添加数据
			addItem(event) {  //当想获取跟标签有关的内容，需要手动传递一个形参event(如果只需event一个参数不需要传递实参)
				// 1.获取输入框的内容
				// console.log(event.target.value);
				const content = event.target.value.trim(); //trim():用于去掉输入内容中的前后空格，将输入框的内容保存在常量content中
				// 2.判断内容是否为空
				if (!content.length) {
					//如果长度为0，即没有输入的内容，取反为1，进入条件判断后的执行语句，return之后，不再继续执行
					// 如果长度为>=1,即有输入的内容，取反为0，不会进入判断条件后的执行语句，执行判断条件以后的执行语句
					return
				}
				// 3.如果不为空，就添加数据到items数组中
				const id = this.items.length + 1;
				this.items.push( //将输入框里的内容添加到items数组中
					{
						id,//ES6语法相当于id:id//主键id
						content,//content:content,//输入的内容
						completed: false
					}
				)
				// 4.清空输入框的内容
				event.target.value = ""
			},
			// 删除任务项
			removeItem(index) {
				this.items.splice(index, 1);//splice(删除数据的索引值，删除的个数)  splice：切割数组
			},
			// 移除所有已完成任务项
			removeCompleted() {
				// 返回的是未完成的任务项数组
				const unItems = this.items.filter(item => !item.completed);
				// 将过滤出来的所有未完成任务项的这个数组重新赋值给数据列表(this.items)
				this.items = unItems;
			},
			// 定位要编辑哪一条
			toEdit(item) {
				this.currentItem = item;
			},
			// 取消编辑状态
			canceEdit() {
				this.currentItem = null;
			},
			// 完成编辑保存数据
			finishEdit(item, index, event) {
				// 1.获取当前输入框中输入的内容
				const content = event.target.value.trim();
				// 2.判断输入框中的内容是否为空，如果为空则进行删除任务项
				if (!content) {
					this.removeItem(index);
					return;
				}
				// 3.如果不为空，则添加到原有任务项中，（更新操作）
				item.content = content;
				// 4.移除编辑模式
				this.currentItem = null;

			}
		}
	})

	window.onhashchange = function () {
		const hash = window.location.hash.substr(2) || "all"; //截取路由  substr(从那个索引开始截取，截取几个)
		console.log(hash);
		vm.filterStatus = hash;
	}
	// 页面加载时调用方法，来确定hash值对应的显示任务项
	window.onhashchange();
})(Vue);