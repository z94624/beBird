import { EMAILJSSendEmailReq } from '@/models/emailjs/v1.0/email';
import { emailjs } from '@/plugins/axios';

/**
 * /send
 * https://www.emailjs.com/docs/rest-api/send/
 */
export const sendEmailWithDynamicParamsApi = (data: EMAILJSSendEmailReq) =>
	emailjs.post(
		'/v1.0/email/send',
		{
			template_params: data,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

/**
 * /send-form
 * https://www.emailjs.com/docs/rest-api/send-form/
 */
export const sendEmailWithFormDataApi = (data: EMAILJSSendEmailReq) =>
	emailjs.post('/v1.0/email/send-form', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
