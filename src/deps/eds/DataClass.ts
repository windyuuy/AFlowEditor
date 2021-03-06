
namespace eds {
	export type TDataClassID = string;
	export interface IDataClass extends IOID {
		readonly oid?: TDataClassID;
		/**
		 * 类型名
		 */
		readonly otype?: string

		/**
		 * TODO: 是否自动gc释放
		 */
		// autoRelease?: bool
	}
	export class DataClass implements IDataClass {
		readonly oid?: TDataClassID;
		/**
		 * 类型名
		 */
		readonly otype?: string
		/**
		 * 是否自动gc释放
		 */
		autoRelease?: bool

		protected dataManager?: DataManager

		init?() {
			return this
		}
	}

	export class DataClassDef extends DataClass {
		t: new () => IDataClass
	}

	// export const NullOID = EmptyTable()
	export const _NullData = new DataClassDef()
	Object.defineProperty(_NullData, "oid", {
		value: undefined,
		writable: false,
		enumerable: false,
	})
	Object.defineProperty(_NullData, 'otype', {
		value: "NullData",
		writable: false,
		enumerable: false,
	})
	export function NullData<T extends Object>(cls: new () => T): T {
		return _NullData as any as T
	}

	const DataClassDefTypeMap: StrTypeMap<DataClassDef> = EmptyTable()
	export function NewData<T extends Object>(cls: new () => T): T {
		let obj = DataClassDefTypeMap[cls.name]
		if (obj) {
			return obj as any as T
		}

		let typeData = new DataClassDef()
		typeData.t = cls
		DataClassDefTypeMap[cls.name] = typeData

		return typeData as any as T
	}

}
