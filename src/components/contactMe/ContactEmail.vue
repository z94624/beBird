<template>
	<div class="flex flex-col justify-center gap-6">
		<div class="text-h3 text-darkText text-center">{{ $t('contact.emailUs') }}</div>

		<q-form
			ref="formRef"
			class="flex flex-col gap-3"
			@submit="onSubmit"
		>
			<FormInput
				v-model="form.name"
				:rules="[requiredValid]"
				:title="$t('contact.form.name')"
				dark
				dense
				for="contactEmailName"
				titleColor="darkText"
			/>

			<FormInput
				v-model="form.email"
				:rules="[requiredValid, emailValid]"
				:title="$t('contact.form.email')"
				dark
				dense
				for="contactEmailEmail"
				titleColor="darkText"
				type="email"
			/>

			<FormInput
				v-model="form.subject"
				:title="$t('contact.form.subject')"
				dark
				dense
				for="contactEmailSubject"
				titleColor="darkText"
			/>

			<FormInput
				v-model="form.message"
				:rules="[requiredValid]"
				:title="$t('contact.form.message')"
				dark
				dense
				for="contactEmailMessage"
				titleColor="darkText"
				type="textarea"
			/>

			<BaseButton
				:label="$t('contact.form.send')"
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
				$notify.error(t('contact.message.sendError'));
			})
			.finally(() => {
				sendLoading.value = false;
				// 清空表單不要驗證
				formRef.value.resetValidation();
			});
	};
</script>

<style lang="scss" scoped></style>
