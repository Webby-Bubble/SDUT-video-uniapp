<template>
	<view>
		<view style="display: flex;justify-content: space-between;margin-top: 20px;">
			<view style="margin-left: 2%;font-weight: 600;">{{title}}</view>
			<view style="margin-right: 2%;">更多</view>
		</view>
		<view style="margin-left: 2%">
			<u-row style="display: flex;flex-wrap: wrap;">
				<u-col :span="4" v-for="(item,index) in 6" :key="index">
					<view style="width: 110px;height: 195px;border: 1px solid rgb(204 204 204);
					margin-top: 20px;border-radius: 10px;display: flex;flex-direction: column;">
						<view style="position: relative;">
							<image src="/static/img/lanbeijing.jpg" 
							style="width: 110px;height: 120px;border-top-left-radius: 10px;border-top-right-radius: 10px;
							    box-shadow: 0px 0px 2px black;"></image>
							<view style="position: absolute;top: 5px;right: 10px;color: orange;">9.0</view>
						</view>
						<view>
							<view style="margin-left: 5px;">我是电影标题</view>
							<view style="display: flex;justify-content: space-between;margin-top: 20px;">
								<view style="margin-left: 5px;">动作</view>
								<view  class="iconfont icon-24gf-ellipsisVertical"></view>
							</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		name:"videoList",
		props:{
			title:String,
			videoKind:Number
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
