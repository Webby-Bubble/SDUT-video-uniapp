<template>
	<view class="videoPlayAll">
		<view class="videoAndTalkeHeader">
			<view class="videoBJ">
				<video 
					:autoplay="false"
					:danmu-list="danmuList"
					enable-danmu
					:src="video.videoPath"
					style="width: 100%;margin-top: 25px;"></video>
			</view>
			<!-- 视频底部评论条 -->
			<view class="talkeHeader">
				 <u-tabs
					style="padding-top: 5px;"
					:list="tabs"
					lineWidth="30"
					lineColor="rgb(48 157 240)"
					:activeStyle="{
								color: '#303133',
								fontWeight: 'bold',
								transform: 'scale(1.05)'
							}"
					:inactiveStyle="{
								color: '#606266',
								transform: 'scale(1)'
							}"
					itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				 </u-tabs>
				 <view style="font-size: 10px;margin-top: 10px;margin-left: -5px``;">{{TalkeAndReplyCount}}</view>
				 <view class="talkeBottomIcon" @click="toShouCang()">
					 <text class="iconfont icon-shoucang" style="font-size: 18px;"></text>
					 <text style="font-size: 12px;">收藏</text>
				 </view>
				 <u-line style="position: absolute;bottom: 0;"></u-line>
			</view>
		</view>
		
		<!-- 点击某个评论展示详细的评论和回复信息 -->
		<view>
			<u-popup :show="showTalkeDetailsVisiable"   mode="bottom" style="border-radius: 10px;">
				<view style="height: 530px;">
					<u-icon style="position: absolute;top: 5px;right: 10px;" name="close" color="black" size="23px" @click="showTalkeDetailsVisiable = false"></u-icon>
					<view style="text-align: center;margin-bottom: 15px;margin-top: 10px;">评论详情</view>
					<u-line></u-line>
					<!-- 主要评论 -->
					<view style="margin-top: 10px;margin-left: 10px;">
						<u-row>
							<u-col :span="2">
								<image :src="videoTalkeForm.userPic" style="width: 40px;height: 40px;border-radius: 20px;"></image>
							</u-col>
							<u-col :span="5">
								<view style="margin-left: -5px;font-size: 13px;">{{videoTalkeForm.userName}} (<text style="color: red;">发帖人</text> )</view>
							</u-col>
						</u-row>
						<view style="margin-top: 5px;margin-bottom: 20px;">
							<text style="font-size: 15px;">{{videoTalkeForm.talkeContent}}</text>
						</view>
						<u-line></u-line>
						
						<!-- 此贴回复 -->
						<view>
							<view style="font-size: 18px;margin-bottom: 20px;">评论<text style="font-size: 15px;margin-left: 5px;">{{videoTalkeForm.videoReplyList.length}}</text></view>
							 <!-- 实现局部区域滚动 此标签高度属性必填 否则不起作用 -->
							 <scroll-view  scroll-y="true" style="height: 330px;">
									<view v-for="(reply,index) in videoTalkeForm.videoReplyList" :key="index">
										<u-row>
											<u-col :span="2">
												<image :src="reply.replyUserPic" style="width: 40px;height: 40px;border-radius: 20px;"></image>
											</u-col>
											<u-col :span="5">
												<view style="margin-left: -5px;font-size: 13px;">{{reply.replyUserName}}</view>
											</u-col>
										</u-row>
										<view style="margin-top: 5px;margin-bottom: 20px;margin-left: 48px;">
											<text style="font-size: 15px;">{{reply.rname != null?' 回复@'+reply.rname +' : ':''}}{{reply.replyContent}}</text>
										</view>
										<view class="dianzanAndHuiFuStyle" >
											<view style="margin-right: 50px;" class="iconfont icon-dianzan"></view>
											<view style="margin-right: 45px;" class="iconfont icon-xiaoxi" @click="showReplyForm(reply)"></view>
											<text style="font-size: 10px;position: absolute;right: 95px;top: -5px;">81</text>
										</view>
										<u-line></u-line>
									</view>	
								</scroll-view>
						</view>
						
					</view>
				</view>
				<view style="position:fixed;bottom: 0;left: 0;width: 100%;z-index: 1;">
					<button @click="showReplyForm({})">对此贴评论</button>
				</view>
			</u-popup>
			
		</view>
		<!-- 回复评论的弹窗 -->
		<u-popup :show="showReplyVisiable" mode="center" style="z-index: order;">
			<view style="height: 24vh;width: 90vw;background-color: rgb(232 235 238);border-radius: 10px;">
				
				<u--textarea :focus="inputFocus" style="margin-top: 10px;margin-left: 5px;margin-right: 5px;" v-model="replyForm.replyContent" placeholder="请输入您想回复的内容..." ></u--textarea>
				<view style="display: flex;flex-direction: row;">
					<u-button style="margin-top: 20px;width: 80px;" shape="circle"  size="small" @click="resetReply()" text="取  消"></u-button>
					<u-button style="margin-top: 20px;width: 80px;" shape="circle" type="primary" size="small" @click="submitReply()" text="回  复"></u-button>
				</view>
			</view>
		</u-popup>

		
		<!-- 评论内容展示区域 -->
		<view style="margin-top: 310px;margin-left: 15px;">
			<view v-for="(talke,index) in talkeAndReplyList" :key="talke.id" style="margin-top: 10px;"  ><!-- @click="showTalkeDetails(talke)" -->
			
				<view class="talkeAvatarAndUserName">
					<view>
						<image :src="talke.userPic" style="width: 40px;height: 40px;border-radius: 20px;"></image>
					</view>
					<view class="avatarAndTime">
						<view style="margin-left: -5px;font-size: 14px;">{{talke.userName}}</view>
						<view style="font-size: 14px;color: #898c8e;margin-left: -5px;">{{talke.publishTime.substring(0,talke.publishTime.lastIndexOf(':'))}}</view>
					</view>
				</view>
				<view style="margin-top: 5px;margin-left: 55px;">
					<text style="font-size: 15px;">{{talke.talkeContent}}</text>
				</view>
				
			<!-- 	<view style="background-color: #ebf5ffbf;font-size: 13px;">
					<view v-for="(reply,index) in talke.videoReplyList" :key="reply.id" style="margin-left: 5px;">
						<view style="margin-top: 5px;" v-if="(index +1)<= 2">{{reply.replyUserName}}{{reply.rname != null?'@'+reply.rname +': ':' : '}}{{reply.replyContent}}</view>
					</view>
					<view style="text-align: center;color: #a2abb3;" v-if="talke.videoReplyList.length > 2" class="iconfont icon-ziyuan"></view>
				</view> -->
				
				<view class="dianzanAndHuiFuStyle" >
					<view v-show="talke.videoReplyList.length > 0" @click="showReplyListVisiable ==false?showReplyListVisiable =  talke.id:showReplyListVisiable = false">
						<text style="margin-left: 15px;color: #898c8e;">——</text>
						<text style="color: #898c8e;font-size: 15px;">展开{{talke.videoReplyList.length}}条评论</text>
						<text style="margin-left: 5px;" class="iconfont icon-xiajiantou"></text>
					</view>
					<view></view>
					<view style="display: flex;justify-content: flex-end;">
						<view style="margin-right: 50px;" ><u-icon size="22px" name="thumb-up"></u-icon></view>
						<view style="margin-right: 45px;color: #898c8e;font-size: 15px;margin-top: -2px;" @click="showReplyKeyBord(talke.userName,talke.id,null)">回复</view>
						
						
					</view>
				</view>
				
				<!-- 每条评论的恢复内容 -->
				<view v-show="showReplyListVisiable == talke.id" v-for="(reply,index) in talke.videoReplyList" :key="index" style="margin-top: 10px;">
					<view class="replyListImageAndName"> 
						<view>
							<image :src="reply.replyUserPic" style="width: 25px;height: 25px;border-radius: 20px;"></image>
						</view>
						<view style="margin-left: 10px;font-size: 13px;">
							<text>{{reply.replyUserName}}</text>
							<text style="font-size: 13px;" v-show="reply.rname != null" class="iconfont icon-xiangyousanjiao">{{reply.rname}}</text>
							<view style="font-size: 14px;color: #898c8e; ">{{reply.replyTime.substring(0,reply.replyTime.lastIndexOf(':'))}}</view>
						</view>
					</view>
					<view style="margin-left: 85px;font-size: 15px;">{{reply.replyContent}}</view>
					
					<!-- 回复点赞和回复的图标 -->
					<view style="display: flex;flex-direction: row;justify-content: flex-end;">
						<view style="margin-right: 50px;" ><u-icon size="22px" name="thumb-up"></u-icon></view>
						<view style="margin-right: 44px;font-size: 15px;color: #898c8e;" @click="showReplyKeyBord(reply.replyUserName,talke.id,reply.replyUserName)">回复</view>
					</view>
				</view>
				
				<u-line style="margin-top: 10px;"></u-line>
				<view v-if="talkeAndReplyList.length == (index+1)" style="text-align: center;margin-bottom: 20%;margin-top: 20px;">
					<text style="color: #8c9298;">我也是有底线的~</text>
					<!-- <view style="color: #7e8b96;margin-top: 10px;" class="iconfont icon-dixian"></view> -->
				</view>
			</view>
			
		</view>
		
		
		<!-- 评论的显示区域 -->
		<u-popup  :show="showTalkeBottom" mode="bottom" :round="10" :closeable="true"  @close="closeTalke()" @open="openTalke()">
			<view style="height: 500px;">
				<view style="text-align: center;font-weight: bolder;margin-top: 12px;">发表优质言论</view>
				<u-line style="margin-top: 10px;"></u-line>
				<!-- 没有评论的时候展示 -->
				<view v-if="talkeAndReplyList.length === 0" style="position: absolute;left: 0;right: 0;margin: auto;text-align: center;margin-top: 40px;">
					<view class="iconfont icon-xiaoxi"
					 style="font-size: 60px;color:#c5c8cb ;"></view>
					<view style="margin-top: 20px;color: #55585a;">还没有人评论，点击抢沙发~</view>
					<button class="talkeButton" @click="showTalkeInput()">立即评论</button>
				</view>
				<view v-if="talkeAndReplyList.length !== 0">
					<u--textarea :focus="inputFocus" v-model="talkeForm.talkeContent" style="margin-top: 5px;margin-left: 5px;margin-right: 5px;" placeholder="发表您精彩的评论,让视频更加精彩..." ></u--textarea>
					<u-button @click="submitTalke()" style="margin-top: 15px;margin-left: 80%;width: 10px;" type="primary" size="small" text="发  布"></u-button>
				</view>
			</view>
			
		</u-popup>
		<!-- 底部视频评论区域 -->
		<view class="videoTalkeBottom">
			<u-row style="margin-top: 5px;">
				<u-col :span="1">
					<view class="iconfont icon-houtui" @click="comeback()" style="font-size: 20px;margin-top: 5px;margin-left: 20px;"></view>
				</u-col>
				<u-col :span="9">
					<view>
						<input v-if="showTalkeInput" @blur="inputBlur()"  :focus="inputFocus" class="talkeInput" type="text" v-model="talkeForm.talkeContent"
						 placeholder="发表神评妙论..."   placeholder-style="color:black;font-size:12px;padding-left:20px"/>
						<input v-if="showReplyInput" @blur="inputBlur()" :focus="inputFocus" class="talkeInput" type="text" v-model="replyForm.replyContent"
						:placeholder="replyPlaceholder"   placeholder-style="color:black;font-size:12px;padding-left:20px"/>
					</view>
				</u-col>
				<u-col :span="2">
					<view  style="color: whites;background-color: rgb(96 199 202);
							height: 30px;
							width: 56px;
							text-align: center;
							border-radius: 20px;
							margin-left: -5px;color: white;"
							@click="submitTalke()">
							<view style="margin-top: 5px;font-size: 14px;" >发布</view>
					</view>
				</u-col>
			</u-row>
			
	
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showTalkeInput:true,
				showReplyInput:false,
				showReplyListVisiable:false,//控制回复数据是否展示
				showReplyVisiable:false,//回复评论的弹窗属性
				showTalkeDetailsVisiable:false,//某个评论具体弹窗
				showTalkeBottom:false,
				inputFocus:false,//输入框的焦点属性
				tabs:[{name:'讨论'}],
				replyPlaceholder:'',
				danmuList: [{
								text: '这不是妹妹250盗版网站~',
								color: '#55aaff',
								time: 1
							},
							{
								text: '你在说么',
								color: '#aaffff',
								time: 3
							}
						],
				video:{
					id:'',
					videoTitle:'',
					videoCover:'',
					videoPath:'',
					videoTypes:'',
					director:'',
					stars:'',
					publishTime:'',
					videoKind:'',
					videoContent:'',
					videoChildrenList:[]
				},
				talkeAndReplyList:[],
				TalkeAndReplyCount:0,//评论和回复的总数量
				talkeForm:{
					userId:'',
					talkeContent:'',
					videoId:''
				},
				videoTalkeForm:{
					id:'',
					publishTime:'',
					talkeContent:'',
					userId:'',
					userName:'',
					userPic:'',
					videoId:'',
					videoReplyList:[]

				},
				replyForm:{
					videoTalkeId:'',
					userId:'',
					rname:'',
					replyContent:''
				}
			}
		},
		methods:{
			inputBlur(){
				this.showReplyInput = false,
				this.showTalkeInput = true,
				this.inputFocus = false
				
			},
			showReplyKeyBord(replyName,talkeId,rname){
				this.inputFocus = true
				this.showTalkeInput = false
				this.showReplyInput = true
				this.replyPlaceholder = '@'+replyName + ':'
				this.replyForm.videoTalkeId = talkeId
				this.replyForm.rname = rname
			},
			toShouCang(){
				let userId = JSON.parse(uni.getStorageSync('user')).id 
				if(userId != "undefind" && userId != null){
					
					uni.request({
						url:this.videoPath + '/video/queryShouCangByUserIdAndVideoId',
						data:{userId:userId,videoId:this.video.id},
						success:res=>{
							if(res.data.code == 200){
								uni.request({
									url:this.path + '/video/addShouCang',
									data:{userId:userId,videoId:this.video.id},
									success:res=>{
										if(res.data.code === 200){
											uni.showToast({
												position:'center',
												title:'成功收藏,可去我的收藏查看',
												duration:3000,
												icon:'none'
											})
										}else{
											uni.showToast({
												position:'center',
												title:'出现了点问题，请稍后再试(；′⌒`)',
												duration:3000,
												icon:'none'
											})
										}
									}
								})
							}else{
								uni.showToast({
									position:'center',
									title:'已经收藏过此视频啦o(*￣▽￣*)ブ',
									duration:3000,
									icon:'none'
								})
							}
						}
					})
					
				}else{
					uni.showToast({
						position:'center',
						title:'还未登录，请登录后再来收藏',
						duration:3000,
						icon:'none'
					})
				}
			},
		    submitReply(){
			   	uni.request({
					url:this.videoPath + '/video/addReply',
					data:this.replyForm,
					method:'POST',
					success:res=>{
						if(res.data.code === 200){
							uni.$u.toast('回复成功')
							this.showReplyVisiable = false
							this.showTalkeDetailsVisiable = false
						    this.queryAllTalkeAndReply(this.videoTalkeForm.videoId)
							
						}
					}
				})
				
				
			},
			resetReply(){
				this.showReplyVisiable = false
				this.replyForm = {}
				this.inputFocus = false
			},
			showReplyForm(reply){
				this.showReplyVisiable = true
				setTimeout(()=>{
					this.inputFocus = true
				},300)
				this.replyForm.rname = reply.replyUserName
				this.replyForm.videoTalkeId = this.videoTalkeForm.id
				this.replyForm.userId = JSON.parse(uni.getStorageSync('user')).id
			},
			showTalkeDetails(talke){
				this.showTalkeDetailsVisiable = true
				this.videoTalkeForm = talke
			},
			submitTalke(){
				if(this.talkeForm.talkeContent != '' ){
						this.talkeForm.userId = JSON.parse(uni.getStorageSync('user')).id
						this.talkeForm.videoId = this.video.id
						uni.request({
							url:this.videoPath + '/video/addTalke',
							method:'POST',
							data:this.talkeForm,
							success:res=>{
								if(res.data.code === 200){
									uni.$u.toast('评论发表成功')
									this.talkeForm.talkeContent = ''
									this.showTalkeBottom = false
									this.queryAllTalkeAndReply(this.video.id)
									this.queryAllTalkeAndReplyCount(this.video.id)
								}
							}
						})
				
					
				}else if(this.replyForm.replyContent != ''){
					this.replyForm.userId = JSON.parse(uni.getStorageSync('user')).id
					uni.request({
						url:this.videoPath + '/video/addReply',
						method:'POST',
						data:this.replyForm,
						success:res=>{
							if(res.data.code === 200){
								uni.$u.toast('回复成功')
								this.replyForm.replyContent = ''
								this.replyForm.videoTalkeId = ''
								this.queryAllTalkeAndReply(this.video.id)
								this.queryAllTalkeAndReplyCount(this.video.id)
							}
						}
					})
				}else{
					uni.showToast({
							position:'center',							title:'写点东西再发布吧╮(╯▽╰)╭',							duration:3000,
							icon:'none'
					})
				}
			
			},
			 queryAllTalkeAndReply(videoId){
				 return new Promise((resolve,reject)=>{
					 uni.request({
					 	url:this.videoPath + '/video/selectAllVideoTalkeAndReply',
					 	data:{
					 		id:videoId
					 	},
					 	success:res=>{
					 		this.talkeAndReplyList = res.data.data.rows
					 	}
					 })
				 })
				 
			},
			queryAllTalkeAndReplyCount(videoId){
				uni.request({
					url:this.videoPath + '/video/queryAllTalkeAndReplyCount',
					data:{
						videoId:videoId
					},
					success:res=>{
						this.TalkeAndReplyCount = res.data.data
					}
				})
			},
			talkeInput(){
				if(uni.getStorageSync('user') != "" && uni.getStorageSync('user') != null){
					this.inputFocus = true
					
				}else{
					uni.showToast({
						position:'center',
						title:'请登录后再来评论哦=￣ω￣=',
						duration:3000,
					})
				}
				
				
			},
			closeTalke(){
				this.showTalkeBottom = false
				this.inputFocus = false
			},
			comeback(){
				uni.navigateBack({
					delta:1
				})
			},
		},
		onLoad(option) {
			this.video = JSON.parse(decodeURIComponent(option.video))
		},
		mounted() {
			this.queryAllTalkeAndReply(this.video.id)
			this.queryAllTalkeAndReplyCount(this.video.id)
		}
	}
</script>

<style scoped>
	@import url("videoPlay.css");
</style>
