
namespace flowui {
	const ViewFeature: eds.IDataFeature<ViewBase> = {
		filter: (data) => data instanceof ViewBase
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

		update() {

			this.syncView()
			this.updateView()
		}

		syncView() {
			let viewModels = dataManager.getFeatureGroup(ViewModelFeature)
			viewModels.forEach(viewModel => {
				viewModel.updateLayout()
			})

			let views = dataManager.getFeatureGroup(ViewFeature)
			views.forEach(view => {
				if ((view as any as IViewSync).syncFromModel) {
					view["syncFromModel"]()
				}
			})
		}

		updateView() {
			let views = dataManager.getFeatureGroup(ViewFeature)
			views.forEach(view => {
				view.update()
			})

		}
	}
}
