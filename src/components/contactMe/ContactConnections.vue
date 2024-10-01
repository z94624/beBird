<template>
	<div class="flex flex-col justify-center items-center gap-4">
		<q-avatar style="width: 90%; max-width: 350px; height: auto">
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

		<div class="flex gap-1">
			<BaseButton
				:color="step === ContactPageEnum.EMAIL && 'white'"
				:flat="step !== ContactPageEnum.EMAIL"
				:icon="`img:${GmailLogo}`"
				round
				@click="emit('change-step', ContactPageEnum.EMAIL)"
			/>
			<BaseButton
				:color="step === ContactPageEnum.FAN_PAGE && 'white'"
				:flat="step !== ContactPageEnum.FAN_PAGE"
				:icon="`img:${FanPageLogo}`"
				round
				@click="emit('change-step', ContactPageEnum.FAN_PAGE)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Logo from '@/assets/images/logo.png';
	import GmailLogo from '@/assets/icons/gmailLogo.svg';
	import FanPageLogo from '@/assets/icons/fbFanPageLogo.svg';

	import { ContactPageEnum } from '@/models/enum/contactEnum';

	const emit = defineEmits<{
		(e: 'change-step', n: ContactPageEnum): void;
	}>();
	const props = defineProps<{
		step: ContactPageEnum;
	}>();
</script>

<style lang="scss" scoped></style>
