<template>
	<q-inner-loading
		:="attrs"
		:showing="show"
		dark
	>
		<template #default>
			<slot>
				<q-spinner-facebook
					:color="attrs.color || 'secondary'"
					size="3em"
				/>
			</slot>
		</template>
	</q-inner-loading>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QInnerLoading, QInnerLoadingProps, QSpinnerFacebook } from 'quasar';

	const props = defineProps<{
		show: boolean;
	}>();

	const attrs: QInnerLoadingProps = useAttrs();
	const slots: Partial<QInnerLoading> = useSlots();
</script>

<style lang="scss" scoped></style>
