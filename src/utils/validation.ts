/**
 * 必填驗證
 */
export const requiredValid = (value: string | number) =>
	((!!value || value === 0) && (value + '').trim() !== '') || 'This field is required!';

/**
 * 信箱驗證
 */
export const emailValid = (value: string) =>
	(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) || 'The email is not valid!';

/**
 * 網址驗證
 */
const urlRegex =
	/^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
export const urlValid = (value: string) =>
	(value && urlRegex.test(value)) || 'The URL is not valid!';
