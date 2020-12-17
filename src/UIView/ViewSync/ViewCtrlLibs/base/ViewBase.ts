
namespace flowui {
	export class ViewBase implements IDataClass {
		readonly oid?: string;
		/**
		 * 类型名
		 */
		readonly otype?: string

		/**
		 * 视图组
		 */
		protected view: spritejs.Node


		protected comps: Table<ViewComp>

		init() {
			this._transform = new Transform()
			this._scale = 1
			this._contentSize = new Size2()

			this.comps = CleanTable(this.comps)

			this.onInit()
			return this
		}

		onInit() {
			let view = this.setupView()
			this.setView(view)
		}

		setupView(): spritejs.Node {
			return null
		}

		event: UIEventHandler
		setView(view: spritejs.Node) {
			this.view = view
			this.event = new UIEventHandler().init(view)

			this.onLoad()

			return this
		}

		addComp(cls: new () => ViewComp) {
			const comp = new cls().init(this)
			this.comps[cls.name] = comp
			comp.add()
		}
		removeComp(cls: new () => ViewComp) {
			const comp = this.comps[cls.name]
			comp.remove()
			delete this.comps[cls.name]
		}

		onLoad() {

		}

		destroy() {
			this.onDestroy()

			this.view.remove()
		}

		onDestroy() {

		}

		update() {

		}

		protected _transform: Transform;
		public get transform(): Transform {
			return this._transform;
		}

		public get position(): Vector2 {
			return this._transform.position;
		}
		public set position(value: Vector2) {
			this._transform.position.merge(value)
			this.view.attr({
				pos: [value.x, value.y],
			})
		}

		get worldPosition() {
			return this._transform.getWorldPosition()
		}

		protected _scale: number;
		public get scale(): number {
			return this._scale;
		}
		public set scale(value: number) {
			this._scale = value;
			this.view.attr({
				scale: value,
			})
		}

		protected _contentSize: Size2
		set contentSize(size: Size2) {
			this._contentSize.merge(size)
			this.updateContentSize()
		}
		get contentSize() {
			return this._contentSize
		}

		set width(width: number) {
			this._contentSize.width = width
			this.updateContentSize()
		}
		set height(height: number) {
			this._contentSize.height = height
			this.updateContentSize()
		}

		protected updateContentSize() {

		}

		private _parent: ViewBase;
		public get parent(): ViewBase {
			return this._parent;
		}
		public set parent(value: ViewBase) {
			let parentView = value.view
			if (parentView instanceof spritejs.Group) {
				this._parent = value;
				parentView.appendChild(this.view)
			} else if (parentView instanceof spritejs.Layer) {
				this._parent = value;
				parentView.appendChild(this.view)
			} else if (parentView == null) {
				this._parent = null
				this.view.remove()
			}
		}

	}
}
