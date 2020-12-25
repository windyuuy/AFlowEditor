
interface Array<T> {
	/**
	 * 统计数量
	 */
	countEqual(key, value): number;

	/**
	 * 统计数量
	 */
	count(callback: (a: T) => boolean): number;

	/**
	 * 获取结果集第一个对象
	 */
	single: T;

	/**
	 * 从列表中移除对象列表
	 */
	removeAll(list: Array<T>): Array<T>;

	/**
	 * 从列表中移除某个对象
	 */
	remove(item: T): Array<T>;

	/**
	 * 通过数组索引移除对象
	 */
	removeAt(index: number): Array<T>;

	/**
	 * 通过表达式移除对象
	 */
	removeWhere(callback: (a: T) => void): Array<T>;

	/**
	 * 查找出最大的值
	 */
	max(callback: (a: T) => number): T

	/**
	 * 查找出最小的值
	 */
	min(callback: (a: T) => number): T

	/**
	 * 将二维数组降为一唯数组
	 * 例:[[1,2,3],[4,5,6]]=>[1,2,3,4,5,6]
	 */
	destruct(): T;

	/**
	 * 兼容es5浏览器
	 * @param callback 
	 */
	find(callback: (a: T) => boolean): T
}
