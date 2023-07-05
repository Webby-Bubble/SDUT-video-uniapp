<template>
  <div class="content">
    <chunlei-video :title="title" :srcList="srcList" class="video" ref="video" color="#c93756" :gDuration="gDuration">

    </chunlei-video>
  </div>
</template>

<script>
	import chunlerVideo from "@/components/chunlei-video/chunLei-danmu/chunLei-danmu.nvue"
	export default{
		components:{
			chunlerVideo
		},
		data(){
			return{
				srcList:[
					"https://www.douyin.com/vsdetail/7094232783404766248"
				]
			}
		}
	}
</script>

<style>
</style>
