<template>
	<div>
		<q-form
			ref="formRef"
			class="q-gutter-md"
			@reset="onReset"
			@submit="onSubmit"
		>
			<FormInput
				v-model="form.name"
				:rules="[requiredValid]"
				title="Name"
				titleColor="white"
			/>

			<FormInput
				v-model="form.email"
				:rules="[requiredValid]"
				title="Email"
				titleColor="white"
			/>

			<FormInput
				v-model="form.subject"
				title="Subject"
				titleColor="white"
			/>

			<FormInput
				v-model="form.message"
				:rules="[requiredValid]"
				title="Message"
				titleColor="white"
			/>
		</q-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	import { EMAILJSContactEmailReq } from '@/models/emailjs/contactEmail';

	import { requiredValid } from '@/utils/validation';

	const formRef = ref();
	const form = ref(new EMAILJSContactEmailReq());

	const onSubmit = () => {};

	const onReset = () => {};
</script>

<style lang="scss" scoped></style>
