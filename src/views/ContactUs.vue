<template>
	<div class="h-full">
		<BackgroundVideo
			:src="TaiwanBirds"
			style="padding-top: 50px; filter: brightness(50%) saturate(125%) contrast(125%)"
		/>

		<q-scroll-area class="cuScrollArea h-full">
			<div class="w-full grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-8">
				<!-- 聯絡管道 -->
				<ContactConnections
					:step="step"
					@change-step="(nextStep: ContactPageEnum) => onChangeStep(nextStep)"
				/>

				<ContactEmail v-if="isMobile" />
				<q-stepper
					v-else
					v-model="step"
					animated
					class="bg-transparent flex flex-col justify-center"
					flat
					header-class="hidden"
					infinite
					keep-alive
					swipeable
					transition-next="scale"
					transition-prev="scale"
				>
					<!-- EMAIL -->
					<q-step
						:name="ContactPageEnum.EMAIL"
						:title="ContactPageEnum.EMAIL"
					>
						<ContactEmail />
					</q-step>
					<!-- FB 粉專 -->
					<q-step
						:name="ContactPageEnum.FAN_PAGE"
						:title="ContactPageEnum.FAN_PAGE"
					>
						<ContactFanPage />
					</q-step>
				</q-stepper>
			</div>
		</q-scroll-area>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import TaiwanBirds from '@/assets/videos/taiwanBirds.webm';

	import { usePlatform } from '@/hooks/platform';
	import { ContactPageEnum } from '@/models/enum/contactEnum';

	const { isMobile } = usePlatform();

	const step = ref(ContactPageEnum.EMAIL);

	/**
	 * 切換步驟至目標元件
	 * @param nextStep 目標元件步驟
	 */
	const onChangeStep = (nextStep: ContactPageEnum) => {
		step.value = nextStep;
	};
</script>

<style lang="scss" scoped></style>
