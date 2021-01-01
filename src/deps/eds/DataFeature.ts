
namespace eds {
	export type TFeatureGroupMap<T extends IDataClass = IDataClass> = { [key: string]: T }

	export type TDataFeatureFunc = (data: IDataClass) => boolean
	export interface IDataFeature<T extends IDataClass = IDataClass> {
		name?: string
		filter?(data: T): boolean

		includes?: IDataFeature<IDataClass>[]
		excludes?: IDataFeature<IDataClass>[]
	}

	export function ClassFeature<T>(cls: new () => T) {
		return {
			name: cls.name,
			filter: (data) => {
				return data instanceof cls
			}
		} as IDataFeature
	}

	export class DataFeature<T extends IDataClass> implements IDataFeature<T> {
		name: string
		filter?(data: T)
		includes?: IDataFeature<any>[]
		excludes?: IDataFeature<any>[]
	}

	const doFilter = function (filter: IDataFeature<IDataClass>, data: IDataClass) {
		let b = true

		if (filter.filter) {
			b = b && filter.filter(data)
		}
		if (filter.includes) {
			for (let include of filter.includes) {
				b = b && doFilter(include, data)
			}
		}
		if (filter.excludes) {
			for (let exclude of filter.excludes) {
				b = b && !doFilter(exclude, data)
			}
		}

		return b
	}

	export class DataFeatureHelper {
		static doFilter = doFilter
	}
}
