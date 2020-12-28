
namespace flowui {

	/**
	 * 支持包装组合型layout
	 */
	export class ComposeLayout implements ILayout {
		borderLayout: ILayout
		contentLayout: ILayout

		get borderSize(): Size2 {
			return this.borderLayout.borderSize
		}

		get position(): Vector2 {
			return this.borderLayout.position
		}

		calcChildContentPosition(widget: ILayout): Vector2 {
			return this.contentLayout.calcChildContentPosition(widget)
		}
		calcChildContentSize(widget: ILayout): Size2 {
			return this.contentLayout.calcChildContentSize(widget)
		}

		parent?: ILayout = DefaultLayout

	}

}
