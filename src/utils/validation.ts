/**
 * 必填驗證
 */
export const requiredValid = (value: string | number) =>
	((!!value || value === 0) && (value + '').trim() !== '') || 'This field is required!';
