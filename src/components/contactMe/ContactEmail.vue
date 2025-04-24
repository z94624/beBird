<template>
	<div class="flex flex-col justify-center gap-6">
		<h3 class="text-white text-center">{{ $t('emailUs') }}</h3>

		<q-form
			ref="formRef"
			class="flex flex-col gap-3"
			@submit="onSubmit"
		>
			<FormInput
				v-model="form.name"
				:rules="[requiredValid]"
				:title="$t('name')"
				dark
				dense
				for="contactEmailName"
				titleColor="white"
			/>

			<FormInput
				v-model="form.email"
				:rules="[requiredValid, emailValid]"
				:title="$t('email')"
				dark
				dense
				for="contactEmailEmail"
				titleColor="white"
				type="email"
			/>

			<FormInput
				v-model="form.subject"
				:title="$t('subject')"
				dark
				dense
				for="contactEmailSubject"
				titleColor="white"
			/>

			<FormInput
				v-model="form.message"
				:rules="[requiredValid]"
				:title="$t('message')"
				dark
				dense
				for="contactEmailMessage"
				titleColor="white"
				type="textarea"
			/>

			<BaseButton
				:label="$t('send')"
				:loading="sendLoading"
				color="primary"
				type="submit"
			/>
		</q-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { useI18n } from 'vue-i18n';

	import { sendEmailWithFormDataApi } from '@/api/emailjs/v1.0/email';
	import { EMAILJSSendEmailReq } from '@/models/emailjs/v1.0/email';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { requiredValid, emailValid } from '@/utils/validation';

	const { t } = useI18n();
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
				$notify.error(t('sendError'));
			})
			.finally(() => {
				sendLoading.value = false;
				// 清空表單不要驗證
				formRef.value.resetValidation();
			});
	};
</script>

<style lang="scss" scoped></style>
