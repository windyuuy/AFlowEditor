
namespace eds {
	export class DataManager implements IOID {
		private static _IdAcc = 0

		oid: string
		name: string

		protected dataContainer: DataContainer

		constructor() {
			this.oid = `DataManager_${DataManager._IdAcc++}`
		}

		init() {
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
			this.dataContainer.attach(data)
			return data
		}

		deattachDatas<T extends IDataClass>(cls: new () => T): void {
			let group = this.dataContainer.deattachFeatureGroup(cls.name) || []
		}

		deattachData<T extends IDataClass>(data: T): void {
			this.dataContainer.deattach(data)
		}

		attachData<T extends IDataClass>(data: T): T {
			this.dataContainer.attach(data) as T
			return data
		}
		//#endregion basic

		//#region feature function

		addFeature(feature: IDataFeature) {
			this.dataContainer.addFeature(feature)
		}
		addFeatures(features: IDataFeature[]) {
			this.dataContainer.addFeatures(features)
		}
		removeFeature(feature: IDataFeature) {
			this.dataContainer.removeFeature(feature)
		}
		removeFeatures(features: IDataFeature[]) {
			this.dataContainer.removeFeatures(features)
		}

		/**
		 * 移除特征组
		 * @param feature
		 */
		deattachFeatureGroup<T extends IDataClass = IDataClass>(feature: IDataFeature<T>): T[] {
			let group = this.dataContainer.deattachFeatureGroup(feature.name)
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
		 * 按feature名称取
		 * @param name 
		 */
		getFeatureGroupByName<T extends IDataClass = IDataClass>(name: string): T[] {
			return this.dataContainer.getFeatureGroupByName(name) || [] as T[]
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

		forEachWithFeatures(features: IDataFeature[], call: (data: IDataClass) => any, cacheKey?: string): void {
			if (!call) {
				call = EmptyCall
			}

			const dataContainer = this.dataContainer

			/**
			 * 先检查是否已构建缓存
			 */
			let directGroup = dataContainer.getFeatureGroupByName(cacheKey)
			if (directGroup) {
				for (let data of directGroup) {
					if (call(data)) {
						break;
					}
				}
				return
			}

			let minFeature = ArrayHelper.min(features, (feature) => {
				return this.getFeatureGroup(feature).length
			})

			if (minFeature) {
				let index = features.indexOf(minFeature)
				let maps = features.map(feature => {
					return this.getFeatureGroupMap(feature)
				})
				maps.splice(index, 1)


				if (cacheKey) {
					var validGroupMap = EmptyTable()
					var validGroup = []
				}

				let group = this.getFeatureGroup(minFeature)
				let isContinue = true
				for (let data of group) {
					let isMatched = true
					for (let map of maps) {
						if (map[data.oid]) {
							isMatched = false
							break
						}
					}

					if (isMatched) {
						if (cacheKey) {
							validGroup.push(data)
							validGroupMap[data.oid] = data
						}

						if (isContinue) {
							if (call(data)) {
								isContinue = false
							}
						}
					}
				}

				if (cacheKey) {
					dataContainer.addFeatureGroup(cacheKey, validGroup, validGroupMap)
				}
			}
		}

		//#endregion feature function

	}
}
