
/// <reference path="DataFeature.ts" />

namespace eds {

	const doFilter = DataFeatureHelper.doFilter

	export class DataContainer {

		clearEntities() {
			this.init()
		}
		init() {
			if (this.allDatas) {
				this.allDatas.length = 0
			} else {
				this.allDatas = []
			}
			this.referRelationMap = EmptyTable()
			this.dataMap = EmptyTable()
			this.usingFeatures = EmptyTable()
			this.featureCache = EmptyTable()
			this.featureCacheMap = EmptyTable()
			return this
		}

		protected allDatas: IDataClass[]
		protected dataMap: { [key: string]: IDataClass }

		/**
		 * 对象引用关系表
		 */
		protected referRelationMap: { [key: string]: string[] }

		/**
		 * 构建引用依赖表
		 */
		buildReferRelationMap() {
			const referRelationMap = this.referRelationMap
			const dataMap = this.dataMap
			this.allDatas.forEach(data => {
				const oid = data.oid
				if (referRelationMap[oid]) {
					referRelationMap[oid].length = 0
				} else {
					referRelationMap[oid] = []
				}
			})
			this.allDatas.forEach(data => {
				const oid = data.oid
				for (let key of Object.getOwnPropertyNames(data)) {
					if (key.startsWith("__")) {
						let testOid = data[key]
						if (dataMap[testOid]) {
							referRelationMap[testOid].push(oid)
						}
					}
				}
			})
		}

		/**
		 * gc释放
		 */
		cleanUnused() {
			const referRelationMap = this.referRelationMap
			for (let key in referRelationMap) {
				let group = referRelationMap[key]
				if (group.length === 0) {
					let data = this.getDataById(key)
					this.deattach(data)
				}
			}
		}

		clearDatas() {
			this.init()
		}

		forEachDatas(call: (data: IDataClass) => void) {
			this.allDatas.forEach(call)
		}

		existsData(ecsdata: IDataClass) {
			return !!this.dataMap[ecsdata.oid]
		}

		getDataById(oid: TDataClassID) {
			return this.dataMap[oid]
		}

		protected presetDataFeature(data: IDataClass) {
			const featureCache = this.featureCache
			const featureCacheMap = this.featureCacheMap

			for (let key in this.usingFeatures) {
				let feature = this.usingFeatures[key]
				let b = doFilter(feature, data)
				if (b) {
					let cacheKey = feature.name
					const ls = featureCache[cacheKey]
					const map = featureCacheMap[cacheKey]
					ls.push(data)
					map[data.oid] = data
				}
			}
		}
		protected cleanDataFeature(data: IDataClass) {
			const featureCache = this.featureCache
			const featureCacheMap = this.featureCacheMap

			for (let key in this.usingFeatures) {
				let feature = this.usingFeatures[key]
				let cacheKey = feature.name
				const ls = featureCache[cacheKey]
				const map = featureCacheMap[cacheKey]
				let index = ls.indexOf(data)
				if (index >= 0) {
					ls.splice(index, 1)
				}
				delete map[data.oid]
			}
		}

		attach(data: IDataClass) {
			if (!this.dataMap[data.oid]) {
				this.dataMap[data.oid] = data
				this.allDatas.push(data)
				this.presetDataFeature(data)
			}
			return data
		}

		deattach(data: IDataClass) {
			let key = data.oid
			let dataMap = this.dataMap
			if (dataMap[key]) {
				let data = dataMap[key]

				let index = this.allDatas.indexOf(data)
				if (index !== -1) {
					this.allDatas.splice(index, 1)
				}

				delete dataMap[key]
				delete data["dataManager"]
			}
		}

		protected usingFeatures: { [key: string]: IDataFeature }
		protected featureCache: { [key: string]: IDataClass[] }
		protected featureCacheMap: { [key: string]: TFeatureGroupMap }

		addFeature(feature: IDataFeature) {
			this.usingFeatures[feature.name] = feature
		}
		addFeatures(features: IDataFeature[]) {
			features.forEach(feature => {
				this.addFeature(feature)
			})
		}
		removeFeature(feature: IDataFeature) {
			delete this.usingFeatures[feature.name]
		}
		removeFeatures(features: IDataFeature[]) {
			features.forEach(feature => {
				this.removeFeature(feature)
			})
		}

		/**
		 * 构建特征群组
		 */
		buildFeatureGroups(features: IDataFeature[]): void {
			const featureCache = this.featureCache
			const featureCacheMap = this.featureCacheMap

			// 生成默认的类映射
			this.forEachDatas((data) => {
				let key = data.otype
				if (featureCache[key]) {
					featureCache[key].length = 0
				} else {
					featureCache[key] = []
				}
				featureCacheMap[key] = EmptyTable()
			})
			this.forEachDatas((data) => {
				let key = data.otype
				featureCache[key].push(data)
				featureCacheMap[key][data.oid] = data
			})

			// 生成features的类映射
			features.forEach(feature => {
				let key = feature.name
				if (featureCache[key]) {
					featureCache[key].length = 0
				} else {
					featureCache[key] = []
				}
				featureCacheMap[key] = EmptyTable()
			})
			features.forEach(feature => {
				this._buildFeatureGroup(feature, feature.name)
			})

		}

		protected _buildFeatureGroup(feature: IDataFeature, key?: string): void {
			const featureCache = this.featureCache
			const featureCacheMap = this.featureCacheMap

			const ls = featureCache[key]
			const map = featureCacheMap[key]
			this.forEachDatas((data) => {
				let b = doFilter(feature, data)
				if (b) {
					ls.push(data)
					map[data.oid] = data
				}
			})
		}

		buildFeatureGroup(feature: IDataFeature, key?: string): void {
			const featureCache = this.featureCache
			const featureCacheMap = this.featureCacheMap

			key = key || feature.name
			if (featureCache[key]) {
				featureCache[key].length = 0
			} else {
				featureCache[key] = []
			}
			featureCacheMap[key] = EmptyTable()

			this._buildFeatureGroup(feature, key)
		}

		addFeatureGroup(cacheKey: string, validGroup: any[], validGroupMap: any) {
			this.featureCache[cacheKey] = validGroup
			this.featureCacheMap[cacheKey] = validGroupMap
		}

		existFeatureGroup(key: string) {
			return !!this.featureCache[key]
		}

		getFeatureGroupByName<T extends IDataClass = IDataClass>(name: string): T[] | undefined {
			let group = this.featureCache[name]
			return group as T[]
		}

		/**
		 * 获取类型所属特征组
		 * @param cls 
		 */
		getTypeFeatureGroup<T extends IDataClass>(cls: new () => T): T[] | undefined {
			return this.getFeatureGroupByName(cls.name) as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroup<T extends IDataClass>(feature: IDataFeature<T>): T[] | undefined {
			let group = this.featureCache[feature.name]
			return group as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroupMap<T extends IDataClass>(feature: IDataFeature<T>): TFeatureGroupMap<T> {
			let map = this.featureCacheMap[feature.name]
			return map as TFeatureGroupMap<T>
		}

		/**
		 * 按特征组移除所有对象
		 * @param feature
		 */
		deattachFeatureGroup(name: string): IDataClass[] | undefined {
			let group = this.featureCache[name]
			if (group) {
				group.forEach(data => {
					this.deattach(data)
				})
				delete this.featureCache[name]
				delete this.featureCacheMap[name]
			}
			return group
		}

	}
}
