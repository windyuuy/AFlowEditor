
namespace flowui {
	const ViewModelFeature: eds.IDataFeature<ViewBase> = {
		filter: (data) => data instanceof ViewBase
	}
	export class ViewSyncSystem extends SystemBase {

		update() {

			this.syncView()
			this.updateView()
		}

		syncView() {

		}

		updateView() {
			let views = dataManager.getFeatureGroup(ViewModelFeature)
			views.forEach(view => {
				view.update()
			})

		}
	}
}
