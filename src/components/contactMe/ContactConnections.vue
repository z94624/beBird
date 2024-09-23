<template>
	<div class="flex flex-col justify-center items-center gap-4">
		<q-avatar style="width: 90%; height: auto">
			<img :src="Logo" />
		</q-avatar>

		<span class="text-white">Email: z94624@gmail.com</span>

		<div class="flex gap-4">
			<Facebook href="https://www.facebook.com/profile.php?id=61565159713117" />
			<Instagram href="https://www.instagram.com/smobee_universe/" />
			<Line href="https://lin.ee/ctu3G0j" />
			<YouTube href="https://www.youtube.com/@smoBEEUniverse" />
			<Github href="https://github.com/z94624/beBird" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Logo from '@/assets/images/logo.png';
</script>

<style lang="scss" scoped></style>
