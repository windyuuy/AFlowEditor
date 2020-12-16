
namespace eds {
	/**
	 * 每个对象都要有id
	 */
	export interface IOID {
		readonly oid?: string
	}

	export type bool = boolean

	export import ArrayHelper = lang.helper.ArrayHelper
	export import EmptyTable = lang.EmptyTable
	export import EmptyCall = lang.EmptyCall
	export import StrTypeMap = lang.StrTypeMap

}
