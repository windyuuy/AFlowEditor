
namespace flowui {

	/**
	 * 支持单通道流式布局
	 */
	export class FlowLayout extends LayoutBase {
		owner: string
		name: string

		horizontal: boolean = false
		vertical: boolean = true

		childMargin: Size2 = new Size2()

		parent?: ILayout = DefaultLayout

		get borderSize(): Size2 {
			let width = this.parent.borderSize.width - this.childMargin.width * 2
			let height = this.parent.borderSize.height - this.childMargin.height * 2
			return new Size2(width, height)
		}

		get position(): Vector2 {
			return Vector2.zero.clone()
		}

		children: ILayout[] = []

		calcChildContentPosition(widget: WidgetLayout): Vector2 {
			let index = this.children.indexOf(widget)
			let pos = this.getChildPosAt(index).addUp(this.position)
				.subDown(this.borderSize.clone().multUpVar(0.5))
			return pos
		}

		calcChildContentSize(widget: WidgetLayout): Size2 {
			return this.borderSize.clone()
				.subDown(this.childMargin)
				.subDown(this.childMargin)
		}

		protected checkChildIndex(index: number) {
			if (index >= this.children.length || index < 0) {
				throw new Error("invalid child index that out-of-boundarry.")
			}
		}

		/**
		 * 获取子节点位置
		 * @param index 
		 */
		protected getChildPosAt(index: number): Vector2 {
			this.checkChildIndex(index)

			let y = 0
			if (this.vertical) {
				for (let i = 0; i <= index; i++) {
					y += this.childMargin.height * 2
					y += this.children[i].borderSize.height
				}
			}
			y -= this.childMargin.height
			y -= this.children[index].borderSize.height / 2

			let x = 0
			if (this.horizontal) {
				for (let i = 0; i <= index; i++) {
					x += this.childMargin.width * 2
					x += this.children[i].borderSize.width
				}
			}
			x -= this.childMargin.width
			x -= this.children[index].borderSize.width / 2

			return new Vector2(x, y)
		}

	}

}
