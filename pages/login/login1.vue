<template>
	<view class="login1">
		<view style="width: 100%;height: 80px;padding-top: 20px;position: fixed;width: 100%;left: 0;top: 0;z-index: 99;
		background-image: linear-gradient(to left, rgb(130 218 236), rgb(21 147 171));display: flex;align-items: center;justify-content: space-between;">
			<view>
				<image src="../../static/img/164793461631723.png" class="image"></image>
			</view>
			<view style="display: flex;align-items: center;">
				<view style="margin-left: -20px;">
					<u--input
							style="padding: 6px 9px;
								border-radius: 20px;
								margin-left: -20px;
								margin-top: 5px;
								height: 20px;
								background-color: aliceblue;"
						    placeholder="影视名称"
						    suffixIcon="search"
						    suffixIconStyle="color: #909399"
					></u--input>
				</view>
				<view style="width: 100px;margin-left: 20px; font-size: 17px;color: white;margin-right: -35px;">搜索</view>
			</view>
		</view>
		<view style="margin-top: 108px;position: relative;">
			  <u-swiper
					style="width: 98%;margin-left: 1%;border-radius: 10px;"
					height="230px"
					:list="list5"
					indicatorStyle="right:10px"
					@change="e => current = e.current"
					:autoplay="true">
			            <view
							slot="indicator"
							class="indicator">
			                <view
								class="indicator__dot"
								v-for="(item, index) in list5"
								:key="index"
								:class="[index === current && 'indicator__dot--active']">
			                </view>
			        </view>
			  </u-swiper>
			 <view style="width: 98%;height: 30px;color: white;background-color: rgb(0 0 0 / 37%);bottom: 0px;
			 position: absolute;margin-left: 1%;border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;">
				<view style="margin-top: 5px;margin-left: 10px;">{{list5[current].title}}</view>
			 </view>
		</view>
		<view style="width: 98%;height: 80px;background-color: rgb(232 235 239);margin-left: 1%;border-radius: 10px;margin-top: 10px;">
			<u-row>
				<u-col :span="3" v-for="(item,index) in 4" :key="index">
					<view style="display: flex;flex-direction: column;align-items: center;margin-top: 12px;">
						<view class="backImage" style="width: 40px;height: 40px;background-color: rgb(105 166 233);text-align: center;border-radius: 20px;">
							<view style="font-size: 25px;margin-top: 6px;color: #eae9e9;" class="iconfont icon-dianshiju"></view>
						</view>
						<view style="font-size: 13px;">电视剧</view>
					</view>		  
				</u-col>
			</u-row>
			
		</view>
		
	<refrash title="最新电影" :videoKind="1"></refrash>
	
	</view>
</template>

<script>
	import refrash from '@/components/videoList.vue'
	export default{
		components:{
			refrash
		},
		data(){
			return{
				current:0,
				 list5: [
					 {
						 title:'标题1',
						 url:'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					 },
					 {
						 title:'标题2',
						 url:'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					 },
					 {
						 title:'标题3',
						 url:'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					 }
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.image{
		height: 60px !important;
		width: 185px;
		margin-top: 10px;
	}
	.uni-input-placeholder{
		color: rgb(139 ,139, 139)!important;
		margin-left: 10px;
	}
	 .indicator {
	        @include flex(row);
	        justify-content: center;
	
	        &__dot {
				z-index: 99;
	             height: 6px;
	             width: 6px;
	             border-radius: 100px;
	             background-color: rgba(255, 255, 255, 0.35);
	             margin: 0 5px;
	             transition: background-color 0.3s;
	    
	            &--active {
	                 background-color: white;
	             }
	        }
	    }
	
	
</style>
