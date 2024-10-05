/**
 * /send
 * https://www.emailjs.com/docs/rest-api/send/
 */
export class EMAILJSSendEmailReq {
	constructor(data?: EMAILJSSendEmailReq) {
		if (!data) return;
		const { name = '', email = '', subject = '', message = '' } = data;
		this.name = name;
		this.email = email;
		this.subject = subject;
		this.message = message;
	}
	name: string = ''; // 姓名
	email: string = ''; // 信箱
	subject?: string = ''; // 主題
	message: string = ''; // 內容
}
