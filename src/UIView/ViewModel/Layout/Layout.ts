
namespace flowui {

	/**
	 * 支持流式布局
	 * - 计算顺序: {borderSize, borderPos} -> childContentSize -> childContentPos
	 */
	export interface ILayout {
		readonly borderSize: Size2
		/**
		 * border position
		 */
		readonly position: Vector2

		/**
		 * 获取子部件定位
		 * @param widget 
		 */
		calcChildContentPosition(widget: ILayout): Vector2

		/**
		 * 获取子部件尺寸
		 * @param widget 
		 */
		calcChildContentSize(widget: ILayout): Size2

		parent?: ILayout
	}

	export class TDefaultLayout implements ILayout {
		get borderSize(): Size2 {
			return new Size2()
		}
		get position(): Vector2 {
			return new Vector2()
		}
		calcChildContentPosition(widget: ILayout): Vector2 {
			return new Vector2()
		}
		calcChildContentSize(widget: ILayout): Size2 {
			return new Size2()
		}
		parent?: ILayout;

	}

	export const DefaultLayout = new TDefaultLayout()

}
