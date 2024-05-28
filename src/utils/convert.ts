/**
 * 把 Enum 轉換成物件
 * @param enumType
 * @returns
 */
export function enumToMap<E>(enumType: E & object): { [key: string]: E[keyof E] } {
	const obj: { [key: string]: E[keyof E] } = {};
	for (const key of Object.keys(enumType)) {
		if (isNaN(Number(key))) {
			const valueKey = key as keyof E;
			obj[key] = enumType[valueKey];
		}
	}
	return obj;
}

/**
 * 把 Enum 的 Key 轉換成物件
 * @param enumType
 * @returns
 */
export function enumKeysToArray<E>(enumType: E & object): string[] {
	return Object.keys(enumType).filter((key) => isNaN(Number(key)));
}
