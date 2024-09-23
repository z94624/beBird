<template>
	<div class="w-full h-full flex justify-center items-center">
		<BackgroundVideo
			:src="TaiwanBirds"
			style="filter: brightness(50%) saturate(125%) contrast(125%)"
		/>

		<div class="w-[90%] h-[90%] grid grid-flow-row grid-cols-1 lg:grid-cols-3">
			<!-- 聯絡管道 -->
			<ContactConnections />
			<!-- EMAIL -->
			<ContactEmail />
			<!-- FB 粉專 -->
			<ContactFanPage />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import TaiwanBirds from '@/assets/videos/taiwanBirds.webm';
</script>

<style lang="scss" scoped></style>
