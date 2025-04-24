<template>
	<div class="flex flex-col justify-center items-center gap-4">
		<q-avatar style="width: 90%; max-width: 350px; height: auto">
			<img :src="Logo" />
		</q-avatar>

		<span class="text-white">{{ $t('email') }}：z94624@gmail.com</span>

		<div class="flex gap-4">
			<Facebook
				:has-color="isMobile"
				href="https://www.facebook.com/profile.php?id=61565159713117"
			/>
			<Instagram
				:has-color="isMobile"
				href="https://www.instagram.com/smobee_universe/"
			/>
			<Line
				:has-color="isMobile"
				href="https://lin.ee/ctu3G0j"
			/>
			<YouTube
				:has-color="isMobile"
				href="https://www.youtube.com/@smoBEEUniverse"
			/>
			<Github
				:has-color="isMobile"
				href="https://github.com/z94624/beBird"
			/>
		</div>

		<div
			v-if="!isMobile"
			class="flex gap-1"
		>
			<BaseButton
				:color="step === ContactPageEnum.EMAIL ? 'white' : undefined"
				:flat="step !== ContactPageEnum.EMAIL"
				:icon="`img:${GmailLogo}`"
				round
				@click="emit('change-step', ContactPageEnum.EMAIL)"
			/>
			<BaseButton
				:color="step === ContactPageEnum.FAN_PAGE ? 'white' : undefined"
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

	import { usePlatform } from '@/hooks/platform';
	import { ContactPageEnum } from '@/models/enum/contactEnum';

	const emit = defineEmits<{
		(e: 'change-step', n: ContactPageEnum): void;
	}>();
	const props = defineProps<{
		step: ContactPageEnum;
	}>();

	const { isMobile } = usePlatform();
</script>

<style lang="scss" scoped></style>
