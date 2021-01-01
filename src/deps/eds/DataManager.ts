
namespace eds {
	export class DataManager implements IOID {
		private static _IdAcc = 0

		oid: string
		name: string

		protected dataContainer: DataContainer

		utils: FrameSyncUtils

		constructor() {
			this.oid = `DataManager_${DataManager._IdAcc++}`
		}

		init() {
			this.utils = new FrameSyncUtils().init()
			this.dataContainer = new DataContainer().init()
			return this
		}

		//#region basic

		clearDatas() {
		}

		existsData(ecsdata: IDataClass) {
			return this.dataContainer.existsData(ecsdata)
		}


		getDataById(oid: TDataClassID) {
			return this.dataContainer.getDataById(oid)
		}

		/**
		 * 创建查询器
		 */
		query(): DataQuery {
			let ret = new DataQuery()
			ret.init(this)
			return ret
		}

		addData<T extends IDataClass>(cls: new () => T): T {
			let data = new cls()
			this.attachData(data)
			return data
		}

		deattachDatas<T extends IDataClass>(cls: new () => T): T[] | undefined {
			let group = this.dataContainer.deattachFeatureGroup(ClassFeature(cls)) || []
			return group as T[]
		}

		deattachData<T extends IDataClass>(data: T): bool {
			return this.dataContainer.deattach(data)
		}

		attachData<T extends IDataClass>(data: T): T {
			DecoECSDataClass(data, this)
			this.dataContainer.attach(data) as T
			return data
		}
		//#endregion basic

		//#region feature function

		/**
		 * 移除特征组
		 * @param feature
		 */
		deattachFeatureGroup<T extends IDataClass = IDataClass>(feature: IDataFeature<T>): T[] {
			let group = this.dataContainer.deattachFeatureGroup(feature)
			return (group || []) as T[]
		}

		/**
		 * 按类型取
		 * @param cls 
		 */
		getTypeFeatureGroup<T extends IDataClass>(cls: new () => T): T[] {
			return this.dataContainer.getTypeFeatureGroup(cls) || [] as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroup<T extends IDataClass>(feature: IDataFeature<T>): T[] {
			let group = this.dataContainer.getFeatureGroup(feature)
			return group || [] as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroupMap<T extends IDataClass>(feature: IDataFeature<T>): TFeatureGroupMap<T> {
			let map = this.dataContainer.getFeatureGroupMap(feature)
			return map as TFeatureGroupMap<T>
		}

		forEachWithFeatures(features: IDataFeature[], call: (data: IDataClass) => any): void {
			if (!call) {
				call = EmptyCall
			}

			let minFeature = ArrayHelper.min(features, (feature) => {
				return this.getFeatureGroup(feature).length
			})

			if (minFeature) {
				let index = features.indexOf(minFeature)
				let otherFeatures = features.concat().splice(index, 1)
				let maps = otherFeatures.map(feature => {
					return this.getFeatureGroupMap(feature)
				})


				let group = this.getFeatureGroup(minFeature)
				for (let data of group) {
					let isMatched = true
					for (let map of maps) {
						if (!map[data.oid]) {
							isMatched = false
							break
						}
					}

					if (isMatched) {
						if (call(data)) {
							break
						}
					}
				}

			}
		}

		//#endregion feature function

	}
}
