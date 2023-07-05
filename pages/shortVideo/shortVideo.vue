<template>
	<view class="shortVideoAll">
		<!-- 搜索 -->
		<view style="color: white;position: fixed;top: 40px;
		right:25px;z-index: 9999;font-size: 20px;font-weight: 600;" class="iconfont icon-sousuo" @click="toSearch()"></view>

		<swiper :vertical="true" style="height: 100%;" @change="changeSwaper">
			<swiper-item v-for="(shortVideo,index) in shortVideoList" :key="index">
				<view style="height: 100%;position: relative;">
					<!-- 在 轮播中使用video标签不能滑动 层级太高  需改成 <iframe>标签使用src属性 -->
					<iframe v-if="iframe === index" frameBorder="0" height="100%" width="100%"
						:src="shortVideo.videoPath"></iframe>
					<!-- <video :id="'video'+index" enable-play-gesture :src="path +shortVideo.videoPath" autoplay :style="{'height':windowHeight + 'px'}" style="width: 100%;"></video> -->
					<!-- 用来遮档视频上面的部分 -->
					<view
						style="height: 200px;width: 100%;background-color: transparent;position: absolute;left: 0;top:50px;">
					</view>


					<view style="width: 70px;height: 100px;position: absolute;top: 310px;right: 0;">

					</view>
					<!-- 视频下方布局 绝对定位的view能够遮挡住视频的优先级 -->
					<view style="height: 100%;position: absolute;left: 0;width: 100%;top: 60%;">
						<!-- 头像 -->
						<view style="position: absolute;right: 10px;top: -80px;">
							<image
								class="avatarImageOut"
								:src="shortVideo.userPic"></image>
							<!-- 关注图标 -->
							<view v-if="!shortVideo.guanZhu && userId != shortVideo.userId"
								style="width: 50px;height: 30px;margin-top: -15px;" @click="guanzhu(shortVideo.userId)">
								<view class="guanzhuIcon">
									<view class="iconfont icon-plus"
										style="color: white;font-size: 10px;padding-top: 5px;"></view>
								</view>
							</view>
						</view>

						<!-- 点赞 -->
						<view class="dianzanAndPinglun" style="margin-top: 8px;" @click="like(shortVideo.id)">
							<view
								:style="shortVideo.confirmLike?' font-size: 30px;color: #f7226d':' font-size: 30px;color: white;'"
								class="iconfont icon-dianzan1"></view>
							<view style="font-size: 10px;color: white;">{{shortVideo.likeCount}}</view>
						</view>
						<!-- 评论 -->
						<view class="dianzanAndPinglun" style="margin-top: 75px;" @click="showShortTalke(shortVideo)">
							<view style="font-size: 30px;color: white;" class="iconfont icon-pinglun"></view>
							<view style="font-size: 10px;color: white;">{{shortVideo.talkeAndReplyCount}}</view>
						</view>
						<!-- 收藏 -->
						<view class="dianzanAndPinglun" style="margin-top: 135px;">
							<view style="font-size: 30px;color: white;" class="iconfont icon-shoucang"
								@click="shouCang()"></view>
						</view>
						<!-- 分享 -->
						<view class="dianzanAndPinglun" style="margin-top: 190px;" @click="fenxiang(shortVideo)">
							<view style="font-size: 30px;color: white;" class="iconfont icon-arrow-"></view>
						</view>
						<!-- 标题 介绍 用户名 -->
						<view style="position: absolute;top: 90px;left: 15px;">
							<view style="color: white;font-weight: bolder;">@{{shortVideo.userName}}</view>
							<view style="color: white;margin-top: 10px;font-size: 14px;width: 300px;">
								{{shortVideo.videoContent}}</view>
						</view>
					</view>

				</view>

			</swiper-item>

		</swiper>
		<live-player id="liveplayer" src="https://domain/pull_stream" mode="live" :autoplay="true"
			orientation="vertical" object-fit="fillCrop">
		</live-player>


		<!-- 短视频评论弹出框 -->
		<u-popup :show="showShortTalkeBottom" :round="10">
			<view style="height:450px;">

				<u-icon name="close" size="20px" @click="showShortTalkeBottom = false"
					style="float: right;margin-right: 10px;margin-top: 10px;"></u-icon>
				<view style="text-align: center;margin-top: 5px;padding-left: 25px;">全部评论</view>

				<!-- 评论为空时展示的空状态图标 -->
				<view v-if="shortTalkeAndReplyList.length == 0"
					style="position: absolute;left: 0;bottom: 50%;right: 0;margin: auto;text-align: center;">
					<view style="font-size: 90px;color: #b8d1e6;" class="iconfont icon-meiyoushuju"></view>
					<view style="margin-top: 30px;color: #79828a;">还没有人评论呢，抢个沙发吧</view>
				</view>
				<!-- 评论区域布局 -->
				<view>
					<!-- 纵向滑动 -->
					<scroll-view scroll-y="true" style="height: 380px;margin-top: 10px;">
						<view v-for="(shortVideoTalke,index) in shortTalkeAndReplyList" :key="index"
							style="margin-top: 20px;">
							<view class="talkeHeader">
								<view style="margin-right: 15px;">
									<image :src="shortVideoTalke.userPic"
										style="width: 40px;height: 40px;border-radius: 20px;"></image>
								</view>
								<view>
									<view style="display: flex;flex-direction: row;align-items: center;">
										<view style="margin-left: -5px;font-size: 14px;">{{shortVideoTalke.userName}}
										</view>
										<view v-if="shortVideoTalke.userId == shortVideoUserId"
											style="background-color: rgb(235 29 90);margin-left: 5px;height: 15px;border-radius: 2px;">
											<view style="color: white;font-size: 10px;padding: 1px;">作者</view>
										</view>
									</view>

									<view style="margin-left: -5px;font-size: 13px;color: #b6b8bb;">
										{{shortVideoTalke.publishTime}}</view>
								</view>
							</view>
							<view style="margin-left: 60px;">{{shortVideoTalke.shortTalkeContent}}</view>
							<view style="display: flex;flex-direction: row;justify-content: flex-end;">
								<view class="talkeLikeOut">
									<view  class="iconfont icon-iconfontzhizuobiaozhun023148"
									    :style="shortVideoTalke.confirmLike?'padding-top: 4px;font-size: 15px;color: #f7226d':'color: #7c7e7f;padding-top: 4px;font-size: 15px;'"
										 @click="shortTalkAndReplyLike('shortVideoTalke',shortVideoTalke.id)"></view>
									<view style="margin-left: 5px;margin-top: -6px;font-size: 10px;">{{shortVideoTalke.likeCount}}</view>
								</view> 
								
								<view style="margin-right: 20px;color: #7c7e7f; font-size: 15px;"
									@click="replyContent(shortVideoTalke.userName,shortVideoTalke.id)">回复</view>
							</view>
							
							
							<!-- 判断showReplyContentVisiable的 -->
							<view class="isZhanKai" v-if="shortVideoTalke.shortVideoReplyList.length !=0"
								@click="(showReplyContentVisiable == shortVideoTalke.id)?showReplyContentVisiable = false:showReplyContentVisiable = shortVideoTalke.id">
								<u-line color="black" style="width: 20px;"></u-line>
								<text
									style="margin-left: 5px;color: #737271;font-size: 14px;">展开{{shortVideoTalke.shortVideoReplyList.length}}条回复</text>
								<u-icon name="arrow-down"></u-icon>
							</view>
							<!-- 每条评论中的回复内容展示区域 -->
							<view v-for="(shortVideoReply,index) in shortVideoTalke.shortVideoReplyList" :key="index"
								v-if="showReplyContentVisiable == shortVideoTalke.id">
								<view class="talkeHeader" style="margin-left: 50px;">
									<view style="margin-right: 15px;">
										<image :src="shortVideoReply.shortReplyUserPic"
											style="width: 30px;height: 30px;border-radius: 20px;"></image>
									</view>
									<view>
										<view style="display: flex;flex-direction: row;">
											<view style="margin-left: -5px;font-size: 14px;">
												{{shortVideoReply.shortReplyUserName}}</view>
									
											<view v-if="shortVideoReply.userId == shortVideoUserId"
												style="background-color: rgb(235 29 90);margin-left: 5px;height: 15px;border-radius: 2px;">
												<view style="color: white;font-size: 10px;padding: 1px;">作者</view>
											</view>
											<view v-if="shortVideoReply.rname != null"
												class="iconfont icon-xiangyousanjiao" style="font-size: 14px;">
												{{shortVideoReply.rname}}</view>
										</view>

										<view style="margin-left: -5px;font-size: 13px;color: #b6b8bb;">
											{{shortVideoReply.replyTime}}</view>
									</view>
								</view>
								<view style="margin-left: 90px;">{{shortVideoReply.shortReplyContent}}</view>
								<view style="display: flex;flex-direction: row;justify-content: flex-end;">
									<view class="talkeLikeOut">
										<view  class="iconfont icon-iconfontzhizuobiaozhun023148"
										    :style="shortVideoReply.confirmLike?'padding-top: 4px;font-size: 15px;color: #f7226d':'color: #7c7e7f;padding-top: 4px;font-size: 15px;'"
											 @click="shortTalkAndReplyLike('shortVideoReply',shortVideoReply.id)"></view>
										<view style="margin-left: 5px;margin-top: -6px;font-size: 10px;">{{shortVideoReply.likeCount}}</view>
									</view> 
									<view style="margin-right: 20px;color: #7c7e7f; font-size: 15px;"
										@click="replyContent(shortVideoReply.shortReplyUserName,shortVideoTalke.id)">回复
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 评论点击按钮位置 -->
					<view class="talkeBottonOutClass">
						<view class="talkeBottomClass">
							<view style="width: 80vw;">
								<u--input v-if="showTalk"  placeholder="善于结善缘,恶语伤人心" shape="circle" border="surround" v-model="shortVideoForm.shortTalkeContent" ></u--input>
								<u--input v-if="!showTalk" @blur="talkBlur()" :focus="replyfocus" :placeholder="talkeAndReplyPlaceholder" shape="circle" border="surround" v-model="shortReplyForm.shortReplyContent" ></u--input>
							</view>
							<view class="sendClass">
								<view v-if="showTalk"  style="color: white;padding: 5px;font-size: 13px;"  @click="submitShortTalke()">发布</view>
								<view v-if="!showTalk"  style="color: white;padding: 5px;font-size: 13px;"  @click="submitShortReply()">回复</view>
							</view>
						</view>
					</view>
					
					
					<!-- <view class="talkeButton" >
						 <button style="height: 30px;border-radius: 20px;" @click="showTalkeInput()">
							 <view  style="text-align: center;font-size: 15px;margin-top: -3px;color: #59aae8;">发表评论</view>
						</button>
					</view> -->
				</view>
			</view>
		</u-popup>
		<view v-if="iframe + 1 === total" style="position: absolute;bottom: 3px;left: 30%;text-align: center;">
			<text style="color: black;">视频都被你看光光啦~~</text>
			<view style="color: black;margin-top: 10px;" class="iconfont icon-dixian"></view>
		</view>
		<!-- 评论的输入框 -->
		<u-popup :show="showTalkeInputVisiable" mode="center" :closeable="true" @close="showTalkeInputVisiable = false">
			<view style="height: 50px;width: 100vw;">
				<u--textarea style="height: 145px;" v-model="shortVideoForm.shortTalkeContent"
					placeholder="发表您精彩的评论吧..." :focus="talkeInput"></u--textarea>
				<button class="submitTalkeButton" @click="submitShortTalke()">
					<view style="font-size: 14px;margin-top: -2px;">发布</view>
				</button>
			</view>
		</u-popup>
		<!-- 回复的输入框 -->
		<u-popup :show="showReplyInputVisiable" mode="center" :closeable="true"
			@close="showReplyInputVisiable = false,shortReplyForm = {}">
			<view style="height: 50px;width: 100vw;">
				<u--textarea style="height: 145px;" v-model="shortReplyForm.shortReplyContent"
					placeholder="和你想要回复的人说点啥把..." :focus="talkeInput"></u--textarea>
				<button class="submitTalkeButton" @click="submitShortReply()">
					<view style="font-size: 14px;margin-top: -2px;">回复他</view>
				</button>
			</view>
		</u-popup>

		<!-- 分享底部弹窗 -->
		<u-popup round="15" :show="showBottomOtherOption" mode="bottom" :closeable="true"
			@close="showBottomOtherOption = false,queryAllShortVideo(1)">
			<view class="bottomOtherOptionClass">
				<view class="optionHzClass">功能选项</view>
				<u-line></u-line>
				<view style="display: flex;margin: 10px;">
					<view class="optionOut" v-for="(item,index) in optionList" :key="index">
						<view class="optionIconOut" @click="toPage(item.toPage)">
							<view :class="item.icon"></view>
						</view>
						<view class="reportHz">{{item.title}}</view>
					</view>
				</view>

			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				replyfocus:true,
				showTalk:true,//控制展示评论还是回复
				talkeAndReplyPlaceholder:'善于结善缘，恶语伤人心',
				showBottomOtherOption: false, //底部分享中的其他功能弹窗
				windowHeight: '',
				showReplyInputVisiable: false, //是否展示回复弹窗
				showReplyContentVisiable: false, //是否展示回复内容属性
				talkeInput: false, //是否将光标聚焦于评论的输入框
				showTalkeInputVisiable: false,
				isLikeVisiable: false,
				showShortTalkeBottom: false,
				shortVideoList: [],
				iframe: 0,
				pageNum: 1,
				total: 0,
				shortVideoForm: {
					userId: '',
					shortVideoId: '',
					talkeAndReplyCount: 0,
					shortTalkeContent: ''
				},
				shortReplyForm: {
					userId: '',
					rname: '',
					shortVideoTalkeId: '',
					shortReplyContent: ''
				},
				shortTalkeAndReplyList: [],
				shortVideoUserId: '',
				userId: '', //全局用户id
				//功能选项集合
				optionList: [{
						icon: 'iconfont icon-jubao optionIcon',
						title: '举报',
						toPage: 'report'
					},
					{
						icon: 'iconfont icon-fankui optionIcon',
						title: '播放反馈',
						toPage: null
					},
					{
						icon: 'iconfont icon-buganxingqu optionIcon',
						title: '不感兴趣',
						toPage: null
					}
				],

				//点击其他功能获取当前段视频数据
				optionShortVideo: {

				}
			}

		},
		methods: {
			//跳转搜索
			toSearch() {
				uni.navigateTo({
					url: '/pages/shortVideo/shortSearch/shortSearch'
				})
			},
			toPage(page) {
				if (page !== null) {
					uni.navigateTo({
						url: "/pages/report/" + page + "?shortVideo=" + encodeURIComponent(JSON.stringify(this
							.optionShortVideo)) + '&userId=' + JSON.parse(uni.getStorageSync('user')).id
					})
				} else {
					uni.$u.toast('功能暂未开放~')
				}
			},

			// 关注用户
			guanzhu(shortVideoUserId) {
				if (uni.getStorageSync('user') != "" && uni.getStorageSync('user') != null) {
					uni.request({
						url: this.videoPath + '/video/guanzhu',
						data: {
							guanZhuUserId: JSON.parse(uni.getStorageSync('user')).id,
							beiGuanZhuUserId: shortVideoUserId
						},
						success: res => {
							if (res.data.data.isGuanZhu) {
								this.shortVideoList.forEach((shortVideo, index) => {
									if (shortVideo.userId === shortVideoUserId) {
										shortVideo.guanZhu = true
									}
								})
								uni.showToast({
									position: 'center',
									title: '关注成功',
									duration: 3000,
									icon: 'none'
								})

							}
						}
					})
				} else {
					uni.showToast({
						position: 'center,',
						title: '请登录后再来关注别人哦'
					})
				}
			},

			// 发布短视频回复
			submitShortReply() {
				uni.request({
					url: this.videoPath + '/video/addShortVideoReply',
					method: 'POST',
					data: this.shortReplyForm,
					success: res => {
						if (res.data.code === 200) {
							uni.showToast({
								title: '回复成功✌',
								duration: 2000
							})
							this.showReplyInputVisiable = false
							this.shortReplyForm.rname = ""
							this.shortReplyForm.shortReplyContent = ""
							this.selectAllShortVideoTalkeAndReply(this.shortVideoForm.shortVideoId)
							this.shortVideoList.forEach((shortVideo, index) => {
								if (this.shortVideoForm.shortVideoId == shortVideo.id) {
									shortVideo.talkeAndReplyCount++
								}
							})
						}
					}
				})
			},
			//回复框失去焦点操作
			talkBlur(){
				if(this.shortReplyForm.shortReplyContent == ''){
					this.showTalk = true
				}
			},
			// 展示回复弹窗
			replyContent(rname, shortVideoTalkeId) {
				// this.showReplyInputVisiable = true
				// setTimeout(() => {
				// 	this.talkeInput = true
				// }, 200)
				this.showTalk = false
				this.talkeAndReplyPlaceholder ='回复：@' +rname 
				this.shortReplyForm.rname = rname
				this.shortReplyForm.shortVideoTalkeId = shortVideoTalkeId
				this.shortReplyForm.userId = JSON.parse(uni.getStorageSync('user')).id
			},
			// 发布短视频评论
			submitShortTalke() {
				uni.request({
					url: this.videoPath + '/video/addShortVideoTalke',
					method: 'POST',
					data: this.shortVideoForm,
					success: res => {
						if (res.data.code === 200) {
							uni.showToast({
								position: 'center',
								title: '发表成功',
								duration: 2000
							})
							this.showTalkeInputVisiable = false
							this.shortVideoForm.shortTalkeContent = ''
							this.selectAllShortVideoTalkeAndReply(this.shortVideoForm.shortVideoId)
							this.shortVideoList.forEach((shortVideo, index) => {
								if (this.shortVideoForm.shortVideoId == shortVideo.id) {
									shortVideo.talkeAndReplyCount++
								}
							})
						} else {
							uni.showToast({
								position: 'center',
								title: '发表失败/(ㄒoㄒ)/~~',
								duration: 2000,
							})
						}
					}
				})
			},
			selectAllShortVideoTalkeAndReply(shortVideoId) {
				uni.request({
					url: this.videoPath + '/video/selectAllShortVideoTalkeAndReply',
					data: {
						id: shortVideoId,
						userId:JSON.parse(uni.getStorageSync('user')).id
					},
					success: res => {
						this.shortTalkeAndReplyList = res.data.data.rows
					}
				})
			},
			showTalkeInput() {
				this.showTalkeInputVisiable = true
				setTimeout(() => {
					this.talkeInput = true
				}, 200)
			},
			shortTalkAndReplyLike(type,talkeId){
				let likeTypeId = type + talkeId 
				let userId = JSON.parse(uni.getStorageSync('user')).id
				uni.request({
					url:this.videoPath + '/video/like',
					data: {
						likeTypeId: likeTypeId,
						userId: userId
					},
					success: (res) => {
						//判断是给评论点赞还是给回复点赞渲染
						if(type == 'shortVideoTalke'){
							this.shortTalkeAndReplyList.forEach((talke,index)=>{
								if(talke.id == talkeId){
									talke.confirmLike = res.data.data.confirmLike
									talke.likeCount = res.data.data.likeCount
								}
								
							})
						}else{
							//给回复渲染
							this.shortTalkeAndReplyList.forEach((talke,index)=>{
								talke.shortVideoReplyList.forEach((reply,index)=>{
									if(reply.id == talkeId){
										reply.confirmLike = res.data.data.confirmLike
										reply.likeCount = res.data.data.likeCount
									}
								})
							})
						}
						
					}
				})
			},
			like(shortVideoId) {
				if (uni.getStorageSync('user') != "" && uni.getStorageSync('user') != null) {
					let likeTypeId = 'shortVideo' + shortVideoId
					let userId = JSON.parse(uni.getStorageSync('user')).id
					uni.request({
						url: this.videoPath + '/video/like',
						data: {
							likeTypeId: likeTypeId,
							userId: userId,
						},
						success: res => {
							this.shortVideoList.forEach((shortVideo, index) => {
								if (shortVideo.id === shortVideoId) {
									shortVideo.confirmLike = res.data.data.confirmLike
									shortVideo.likeCount = res.data.data.likeCount
								}
							})
						}
					})
				} else {
					uni.showToast({
						position: 'center',
						title: '请登录后再来点赞哦≧ ﹏ ≦',
						duration: 3000,
					})
				}

			},
			shouCang() {
				uni.showToast({
					position: 'center',
					title: '正在努力开发中(ง •_•)ง',
					duration: 3000,
				})
			},
			showShortTalke(shortVideo) {
				if (uni.getStorageSync('user') != "" && uni.getStorageSync('user') != null) {
					this.showShortTalkeBottom = true
					this.shortVideoForm.talkeAndReplyCount = shortVideo.talkeAndReplyCount
					this.shortVideoForm.userId = JSON.parse(uni.getStorageSync('user')).id
					this.shortVideoForm.shortVideoId = shortVideo.id
					this.shortVideoUserId = shortVideo.userId //存储发布视频的作者id
					this.selectAllShortVideoTalkeAndReply(shortVideo.id)
				} else {
					uni.showToast({
						position: 'center',
						title: '请登录后再来评论哦≧ ﹏ ≦',
					})
				}
			},
			fenxiang(shortVideo) {
				//将段视频数据存储后传到举报界面
				this.optionShortVideo = shortVideo
				this.showBottomOtherOption = true
			},
			changeSwaper(e) {
				this.iframe = e.detail.current
				// 判断是否要继续加载剩余数据
				if ((e.detail.current + 1) === this.shortVideoList.length) {
					this.queryAllShortVideo(this.pageNum + 1)
				} else if (e.detail.current + 1 === this.total) {
					this.$u.toast('视频都被你看光光啦~')
				}

			},
			queryAllShortVideo(pageNum) {
				let userId = ""
				if (uni.getStorageSync('user') != null && uni.getStorageSync('user') != "") {
					userId = JSON.parse(uni.getStorageSync('user')).id
					this.userId = userId
				} else {
					userId = 0
				}

				uni.request({
					url: this.videoPath + '/video/queryAllShortVideo',
					data: {
						pageNum: pageNum,
						userId: userId,
						videoStatus:2
					},
					success: res => {
						if (res.data.code === 200) {
							res.data.data.rows.forEach((shortVideo, index) => {
								this.shortVideoList.push(shortVideo)
							})
							this.pageNum = res.data.data.pageNum
							this.total = res.data.data.total
							//uni.stopPullDownRefresh()
						}
					}
				})
			}
		},
		mounted() {
			this.queryAllShortVideo(1)



		},
		//tabbar被点击时出发
		onTabItemTap() {
			this.shortVideoList = []
			this.queryAllShortVideo(1)
		},
		onHide() {
			this.shortVideoList = []
		},
		// onPullDownRefresh(){
		// 	this.shortVideoList = []
		// 	this.queryAllShortVideo(1)
		// }

	}
</script>

<style scoped>
	@import url("shortVideo.css");
</style>