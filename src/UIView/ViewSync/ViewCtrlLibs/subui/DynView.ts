
namespace flowui {

	export class DynView extends NodeView implements IViewSync {

		get modelId(): string {
			return this.viewModel && this.viewModel.oid
		}

		viewModel: NodeViewModel

		syncFromModel(viewModel: NodeViewModel): void {
		}
	}
}
