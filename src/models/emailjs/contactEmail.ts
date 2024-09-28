/**
 * 聯絡我 > 寄送 Email
 */
export class EMAILJSContactEmailReq {
	constructor(data?: EMAILJSContactEmailReq) {
		if (!data) return;
		const { name = '', email = '', subject = '', message = '' } = data;
		this.name = name;
		this.email = email;
		this.subject = subject;
		this.message = message;
	}
	name: string = ''; // 姓名
	email: string = ''; // Email
	subject?: string = ''; // 標題
	message: string = ''; // 訊息
}
