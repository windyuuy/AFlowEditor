
namespace flowui {

	/**
	 * 支持包装组合型layout
	 */
	export class ComposeLayout extends LayoutBase {
		owner: string
		name: string

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

		protected _parent?: ILayout = DefaultLayout
		public get parent(): ILayout {
			return this._parent
		}
		public set parent(value: ILayout) {
			this._parent = value
			this.borderLayout.parent = value
		}

	}

}
