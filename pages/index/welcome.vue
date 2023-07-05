<template>
	<view class="content" style="height: 100%;">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			setTimeout(()=>{
				uni.switchTab({
	　　　　　　　url: '/pages/login/login',
	　　　　　　});
			},3000)
		},
		methods: {

		}
	}
</script>

<style>
page{
	width: 100%;
	height: 100%;
}
.content{
	background: url('../../static/img/welcome.png')no-repeat;
	background-size: cover;
	width: 100%;
	height: 100%;
}
	
	


</style>
