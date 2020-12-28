
namespace flowui {
	export class WidgetLayout implements ILayout {

		/**
		 * 按父节点尺寸作偏移
		 */
		parentAnchor: Vector2 = new Vector2(0.5, 0.5)
		/**
		 * 按自身尺寸做偏移
		 */
		selfAnchor: Vector2 = new Vector2(0.5, 0.5)

		/**
		 * 偏移固定值
		 */
		posOffset: Vector2 = new Vector2()

		/**
		 * 固定尺寸偏移
		 */
		sizeOffset: Size2 = new Size2()

		/**
		 * 相对于父节点的尺寸比例
		 */
		parentSizing: Vector2 = new Vector2(1, 1)

		parent: ILayout = DefaultLayout

		/**
		 * 获取子部件容器定位
		 * @param widget 
		 */
		calcChildContentPosition(widget: ILayout): Vector2 {
			return Vector2.zero.clone()
		}

		/**
		 * 获取自己相对父部件的定位
		 */
		get position() {
			let pos = this.posOffset.clone()
				.addUp(this.selfAnchor.clone().multUp(this.borderSize))
				.addUp(this.parentAnchor.clone().multUp(this.parent.borderSize))
			return pos.asVector2()
		}

		/**
		 * 获取子部件容器尺寸
		 * @param widget 
		 */
		calcChildContentSize(widget: ILayout): Size2 {
			return this.borderSize.clone() as Size2
		}

		get borderSize(): Size2 {
			let size = this.sizeOffset.clone()
				.addUp(this.parentSizing.clone().multUp(this.parent.borderSize))
			// 暂时不考虑相对子节点的尺寸适应
			return size as Size2
		}
	}
}
