
namespace flowui {
	export class ViewModelBase implements IDataClass {
		readonly oid: string;
		/**
		 * 类型名
		 */
		readonly otype: string

		/**
		 * 所有viewModel自带tranform父子关系
		 */
		transform: Transform = new Transform()

		contentSize: Size2 = new Size2()

		/**
		 * 自身默认的布局
		 */
		layout: ILayout = NewData(TDefaultLayout)

		/**
		 * 应用布局影响坐标
		 */
		applyLayoutPositionAffection() {
			// this.transform.position.merge(
			// 	this.transform.parent.getWorldPosition()
			// 		.addUp(this.layout.position)
			// )
			this.transform.position.merge(this.layout.position)
			this.contentSize.merge(this.layout.borderSize)
		}

		set transformParent(parent: ViewModelBase) {
			this.transform.parent = parent.transform
			this.layout.parent = parent.layout
		}

		init() {
			this.initLayout()
			return this
		}

		initLayout() {
		}

		clear() {

		}

		updateLayout() {

		}

	}
}
