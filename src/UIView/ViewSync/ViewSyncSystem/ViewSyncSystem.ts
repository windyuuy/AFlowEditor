
namespace flowui {
	const ViewModelFeature: eds.IDataFeature<ViewBase> = {
		filter: (data) => data instanceof ViewBase
	}
	export class ViewSyncSystem extends SystemBase {

		update() {

			let views = dataManager.getFeatureGroup(ViewModelFeature)
			views.forEach(view => {
				view.update()
			})

		}
	}
}
