
namespace eds {
	export interface IDataQuery {
		forEach(call: (entity: IDataClass) => any): IDataQuery
		toArray(): IDataClass[]
		first(): IDataClass
		count(): number
	}

	export class DataQuery implements IOID, IDataQuery {
		oid: string;

		dataManager: DataManager

		protected filter: IDataFeature

		init(dataManager: DataManager) {

			this.dataManager = dataManager
			this.filter = {
				name: "",
				includes: [],
			}

			return this
		}

		with(feature: IDataFeature) {
			this.filter.includes.push(feature)
			return this
		}

		forEach(call: (data: IDataClass) => any): DataQuery {
			this.dataManager.forEachWithFeatures(this.filter.includes, call)
			return this
		}

		toArray(): IDataClass[] {
			let array: IDataClass[] = []
			this.forEach((data) => {
				array.push(data)
			})
			return array
		}
		first(): IDataClass {
			let first: IDataClass = null
			this.forEach((data) => {
				first = data
				return first
			})
			return first
		}
		count(): number {
			let count = 0
			this.forEach((data) => {
				++count
			})
			return count
		}

	}
}
