
namespace flowui {
	const ViewFeature: eds.IDataFeature<ViewBase> = {
		filter: (data) => data instanceof ViewBase
	}
	const DynViewFeature: eds.IDataFeature<DynView> = {
		filter: (data) => data instanceof DynView
	}
	const ViewModelFeature: eds.IDataFeature<ViewModelBase> = {
		filter: (data) => data instanceof ViewModelBase
	}

	/**
	 * 建立数据表现关系
	 */
	export class ViewModelMap {
		protected _map: { [key: string]: string } = {}

		registerViewModel(viewModel: ViewModelBase, view: ViewBase) {
			this._map[viewModel.oid] = view.oid
		}

		getView(viewModel: ViewModelBase): ViewBase {
			let viewId = this._map[viewModel.oid]
			let view = dataManager.getDataById(viewId)
			return view as ViewBase
		}
	}

	export class ViewSyncSystem extends SystemBase {

		scene: UIScene

		update() {

			this.syncView()
			this.updateView()
		}

		createView(model: ViewModelBase): ViewBase {
			let view: ViewBase
			if (model instanceof GroupPipeViewModel) {
				view = New(GroupPipeView)
			} else if (model instanceof CodePipeViewModel) {
				view = New(CodePipeView)
			} else if (model instanceof SlotViewModel) {
				// 只有一种slot, 触发源slot通过构造pipe实现
				view = New(SlotView)
			} else if (model instanceof SlotGroupViewModel) {
				view = New(SlotGroupView)
			} else if (model instanceof EdgeViewModel) {
				view = New(EdgeView)
			} else {
				throw new Error("unable to create view for invalid model.")
			}

			view.parent = this.scene.rootGroup

			return view
		}

		syncView() {
			let viewModels = dataManager.getFeatureGroup(ViewModelFeature)
			viewModels.forEach(viewModel => {
				viewModel.updateLayout()
			})

			const modelMap: { [key: string]: ViewModelBase } = EmptyTable()
			viewModels.forEach(model => {
				modelMap[model.oid] = model
			})

			let modelViewMap: { [key: string]: ViewBase } = EmptyTable()
			let views = dataManager.getFeatureGroup(DynViewFeature)
			views.forEach(view => {
				modelViewMap[view.modelId] = view
			})

			// 比对差异
			viewModels.forEach(model => {
				if (!modelViewMap[model.oid]) {
					let view = this.createView(model)
					modelViewMap[model.oid] = view
				}
			})
			for (let modelId in modelViewMap) {
				if (!modelMap[modelId]) {
					let view = modelViewMap[modelId]
					Del(view)
					delete modelViewMap[modelId]
				}
			}

			// 遍历更新视图
			viewModels.forEach(model => {
				let view = modelViewMap[model.oid]
				if ((view as any as IViewSync).syncFromModel) {
					(view as any as IViewSync).syncFromModel(model)
				}
			})

		}

		updateView() {
			// 从模型更新完数据之后,执行更多的视图更新逻辑
			let views = dataManager.getFeatureGroup(ViewFeature)
			views.forEach(view => {
				view.update()
			})

		}
	}
}
