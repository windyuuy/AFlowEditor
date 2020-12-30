
namespace flowui {

	/**
	 * 支持流式布局
	 * - 计算顺序: {borderSize, borderPos} -> childContentSize -> childContentPos
	 */
	export interface ILayout {
		owner: string | undefined
		name: string | undefined

		readonly borderSize: Size2
		/**
		 * border position
		 */
		readonly position: Vector2

		/**
		 * world border position
		 */
		readonly worldPosition: Vector2

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

	export abstract class LayoutBase implements ILayout {
		owner: string;
		name: string;

		get borderSize(): Size2 {
			return new Size2()
		}
		get position(): Vector2 {
			return new Vector2()
		}
		get worldPosition(): Vector2 {
			return this.position.addUp(this.parent.worldPosition)
		}
		calcChildContentPosition(widget: ILayout): Vector2 {
			return new Vector2()
		}
		calcChildContentSize(widget: ILayout): Size2 {
			return new Size2()
		}
		abstract parent?: ILayout;
	}

	export class TDefaultLayout extends LayoutBase {
		parent?: ILayout;
		get worldPosition(): Vector2 {
			return this.position
		}
	}

	export const DefaultLayout = new TDefaultLayout()

}
