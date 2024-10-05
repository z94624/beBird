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
				:loading="sendLoading"
				color="primary"
				label="SEND"
				type="submit"
			/>
		</q-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	import { sendEmailWithFormDataApi } from '@/api/emailjs/v1.0/email';
	import { EMAILJSSendEmailReq } from '@/models/emailjs/v1.0/email';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { requiredValid, emailValid } from '@/utils/validation';

	const { $notify } = useQuasarTool();

	const sendLoading = ref(false);
	const formRef = ref();
	const form = ref(new EMAILJSSendEmailReq());

	const onSubmit = () => {
		sendLoading.value = true;
		sendEmailWithFormDataApi(form.value)
			.then(() => {
				// 寄送成功
				form.value = new EMAILJSSendEmailReq();
			})
			.catch(() => {
				// 寄送失敗
				$notify.error('Send Fail! Please try again later...');
			})
			.finally(() => {
				sendLoading.value = false;
				// 清空表單不要驗證
				formRef.value.resetValidation();
			});
	};
</script>

<style lang="scss" scoped></style>
