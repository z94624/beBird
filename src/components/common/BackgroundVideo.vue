<template>
	<div class="bvContainer">
		<video
			autoplay
			loop
			muted
		>
			<source
				:src="src"
				:type="`video/${type}`"
			/>
		</video>
	</div>
</template>

<script lang="ts" setup>
	const props = withDefaults(
		defineProps<{
			src: string;
			type?: 'ogg' | 'mp4' | 'webm';
		}>(),
		{
			type: 'webm',
		}
	);
</script>

<style lang="scss" scoped>
	.bvContainer {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;

		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
