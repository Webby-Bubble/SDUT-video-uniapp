<template>
	<view class="shortSearch">
		<view class="queryHeaderClass">
			<view class="queryIndex">
				<view style="font-size: 20px;" class="iconfont icon-houtui" @click="comeBack()"></view>
				<view class="queryInputClass">
					<u--input v-model="shortVideoName" style="border-radius: 30px;background-color: #eaecf2"
						placeholder="请输入关键词" suffixIcon="search" placeholderStyle="text-align:center"
						suffixIconStyle="color: #909399;font-size:19px"></u--input>
				</view>
				<view style="font-size: 15px;" @click="queryShortVideoByName()">搜索</view>
			</view>
		</view>
		
		<!-- 搜索记录 -->
		<view class="searchHistoryOut">
			<view class="historyRow" v-for="(item,index) in searchHistory" :key="index"> 
				<view class="iconAndTitle">
					<view class="iconfont icon-shizhong"></view>
					<view style="margin-left: 10px;font-size: 15px;">{{item}}</view>
				</view>
				<view style="font-size: 14px;" class="iconfont icon-cuowu"></view>
			</view>
		</view>
		
		<view class="tishi">
			<view style="margin-bottom: 20px;font-size: 14px;color: gray;">全部搜索记录</view>
			<u-line></u-line>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchHistory:[
					'罗云熙打游戏',
					'小圈文化',
					'淄博烧烤怎么样'
				],
				shortVideoName:''
			}
		},
		methods: {
			comeBack(){
				uni.navigateBack({
					delta:1
				})
			},
			queryShortVideoByName(){
				if(this.shortVideoName != ''){
					uni.navigateTo({
						url:'/pages/shortVideo/shortSearch/shortSearchDetailsList/shortSearchDetailsList?shortVideoName=' + this.shortVideoName
					})
				}else{
					uni.showToast({
						title:'请输入关键词搜索',
						icon:'none'
					})
				}
				
			}
		},
		onLoad() {

		}
	}
</script>

<style scoped>
	@import url("shortSearch.css");
</style>