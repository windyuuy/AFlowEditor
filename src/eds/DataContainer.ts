
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

		filterDatas(call: (data: IDataClass) => boolean) {
			return this.allDatas.filter(call)
		}

		existsData(ecsdata: IDataClass) {
			return !!this.dataMap[ecsdata.oid]
		}

		getDataById(oid: TDataClassID) {
			return this.dataMap[oid]
		}

		attach(data: IDataClass) {
			if (!this.dataMap[data.oid]) {
				this.dataMap[data.oid] = data
				this.allDatas.push(data)
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
				return true
			}
			return false
		}

		/**
		 * 获取类型所属特征组
		 * @param cls 
		 */
		getTypeFeatureGroup<T extends IDataClass>(cls: new () => T): T[] | undefined {
			let otype = cls.name;
			let datas = this.filterDatas(data => data.otype == otype)
			return datas as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroup<T extends IDataClass>(feature: IDataFeature<T>): T[] | undefined {
			let datas = this.filterDatas(data => doFilter(feature, data))
			return datas as T[]
		}

		/**
		 * 获取特征组
		 * @param feature 
		 */
		getFeatureGroupMap<T extends IDataClass>(feature: IDataFeature<T>): TFeatureGroupMap<T> {
			let datas = this.filterDatas(data => doFilter(feature, data))
			let map: { [key: string]: IDataClass } = {}
			datas.forEach((data) => {
				map[data.oid] = data
			})
			return map as TFeatureGroupMap<T>
		}

		/**
		 * 按特征组移除所有对象
		 * @param feature
		 */
		deattachFeatureGroup(feature: IDataFeature): IDataClass[] | undefined {
			let group = this.getFeatureGroup(feature)
			if (group) {
				group.forEach(data => {
					this.deattach(data)
				})
			}
			return group
		}

		/**
		 * 按特征组移除所有对象
		 * @param feature
		 */
		deattachTypeFeatureGroup(cls: new () => IDataClass): IDataClass[] | undefined {
			let group = this.getTypeFeatureGroup(cls)
			if (group) {
				group.forEach(data => {
					this.deattach(data)
				})
			}
			return group
		}

	}
}
