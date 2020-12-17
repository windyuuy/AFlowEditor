
namespace flowui {
	export class ViewBase implements IDataClass {
		readonly oid?: string;
		/**
		 * 类型名
		 */
		readonly otype?: string

		name: string = ""

		/**
		 * 视图组
		 */
		private _view: spritejs.Node;
		public get view(): spritejs.Node {
			return this._view;
		}


		protected comps: Table<ViewComp>

		init() {
			this._transform = new Transform()
			this._scale = new Vector2(1, 1)
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
			this._view = view
			this.event = new UIEventHandler().init(view)

			this.onLoad()

			return this
		}

		addComp<T extends ViewComp>(cls: new () => T): T {
			const comp = new cls().init(this)
			this.comps[cls.name] = comp
			comp.add()
			return comp
		}
		removeComp<T extends ViewComp>(cls: new () => T): T {
			const comp = this.comps[cls.name]
			comp.remove()
			delete this.comps[cls.name]
			return comp as T
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

		setTransformParent(parent: ViewBase) {
			this.transform.parent = parent.transform
		}

		protected _transform: Transform;
		public get transform(): Transform {
			return this._transform;
		}

		getWorldPosition() {
			return this.transform.getWorldPosition()
		}
		getWorldScale() {
			return this.transform.getWorldScale()
		}

		public get position(): Vector2 {
			return this._transform.position;
		}
		public set position(value: Vector2) {
			this._transform.position.merge(value)
			this.view.attr({
				pos: [value.x, value.y],
			})
			this.updateTransform()
		}

		protected updateTransform() {
			this.emitCompsMsg("transform", this.transform)
		}

		get worldPosition() {
			return this._transform.getWorldPosition()
		}

		protected _scale: Vector2;
		public get scale(): Vector2 {
			return this._transform.scale
		}
		public set scale(value: Vector2) {
			this._transform.scale.merge(value)
			this.view.attr({
				scale: [this.scale.x, this.scale.y,],
			})
			this.updateTransform()
		}

		emitCompsMsg(key: string, data: any) {
			for (let name in this.comps) {
				let comp = this.comps[name]
				comp.emit(key, data)
			}
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
			this.emitCompsMsg("contentSize", this._contentSize)
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
				this.updateTransform()
			} else if (parentView instanceof spritejs.Layer) {
				this._parent = value;
				parentView.appendChild(this.view)
				this.updateTransform()
			} else if (parentView == null) {
				this._parent = null
				this.view.remove()
			}
		}

	}
}