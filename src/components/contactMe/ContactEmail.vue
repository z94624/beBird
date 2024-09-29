<template>
	<div class="flex flex-col justify-center gap-6">
		<h3 class="text-white text-center">Email Us</h3>

		<q-form
			ref="formRef"
			class="flex flex-col gap-3"
			@submit="onSubmit"
		>
			<FormInput
				v-model="form.name"
				:rules="[requiredValid]"
				dark
				dense
				title="Name"
				titleColor="white"
			/>

			<FormInput
				v-model="form.email"
				:rules="[requiredValid, emailValid]"
				dark
				dense
				title="Email"
				titleColor="white"
			/>

			<FormInput
				v-model="form.subject"
				dark
				dense
				title="Subject"
				titleColor="white"
			/>

			<FormInput
				v-model="form.message"
				:rules="[requiredValid]"
				dark
				dense
				title="Message"
				titleColor="white"
				type="textarea"
			/>

			<BaseButton
				color="primary"
				label="SEND"
				type="submit"
			/>
		</q-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	import { EMAILJSContactEmailReq } from '@/models/emailjs/contactEmail';

	import { requiredValid, emailValid } from '@/utils/validation';

	const formRef = ref();
	const form = ref(new EMAILJSContactEmailReq());

	const onSubmit = () => {};
</script>

<style lang="scss" scoped></style>
