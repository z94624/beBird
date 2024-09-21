<template>
	<div>
		<BackgroundVideo
			:src="TaiwanBirds"
			style="filter: brightness(50%) saturate(125%) contrast(125%)"
		/>
	</div>
</template>

<script lang="ts" setup>
	import TaiwanBirds from '@/assets/videos/taiwanBirds.webm';
</script>

<style lang="scss" scoped></style>
