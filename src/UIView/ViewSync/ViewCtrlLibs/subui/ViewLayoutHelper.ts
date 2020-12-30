
namespace flowui {
	export class TViewLayoutHelper {
		// applyLayout(view: NodeView, layout: ILayout) {
		// 	view.position = layout.worldPosition
		// 	const borderSize = layout.borderSize
		// 	view.width = borderSize.width
		// 	view.height = borderSize.height
		// }
		applyModelLayout(view: NodeView, model: NodeViewModel) {
			// const layout = model.layout
			// this.applyLayout(view, layout)
			view.position = model.transform.getWorldPosition()
			view.contentSize = model.contentSize
		}
	}

	export const ViewLayoutHelper = new TViewLayoutHelper()
}

