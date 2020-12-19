
namespace flowui {
	export class ViewBase implements IDataClass {
		readonly oid: string;
		/**
		 * 类型名
		 */
		readonly otype: string

		name: string = ""

		/**
		 * 视图组
		 */
		protected _view: ccs.Group
		public get view(): ccs.Group {
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

		protected onInit() {
			let view = this.setupView()
			this.setView(view)

			this.onLoad()
		}

		protected setupView(): ccs.Group {
			return null
		}

		event: UIEventHandler
		protected setView(view: ccs.Group) {
			this._view = view
			this.event = new UIEventHandler().init(view)
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
		getComp<T extends ViewComp>(cls: new () => T): T {
			const comp = this.comps[cls.name]
			return comp as T
		}

		protected onLoad() {

		}

		destroy() {
			this.onDestroy()

			this.view.remove()

		}

		protected onDestroy() {

		}

		update() {

		}

		private _active: bool = false;
		public get active(): bool {
			return this._active;
		}
		public set active(value: bool) {
			this._active = value;

			this.forEachComps((comp) => {
				if (value) {
					comp['onEnable']()
				}
			})
		}

		protected _transform: Transform;
		public get transform(): Transform {
			return this._transform;
		}

		get worldPosition() {
			return this._transform.getWorldPosition()
		}
		get worldScale() {
			return this._transform.getWorldScale()
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

		forEachComps(call: (comp: ViewComp, name?: string) => any) {
			for (let name in this.comps) {
				let comp = this.comps[name]
				if (call(comp, name)) {
					break
				}
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
		public get viewParent(): ViewBase {
			return this._parent;
		}
		public set viewParent(value: ViewBase) {
			let parentView = value.view
			if (parentView instanceof spritejs.Group) {
				this._parent = value;
				parentView.appendChild(this.view)
				this.updateTransform()
			} else if (parentView == null) {
				this._parent = null
				this.view.remove()
			}
		}

		set transformParent(parent: ViewBase) {
			this.transform.parent = parent.transform
		}

		protected lifecycleChildren: ViewBase[];
		addChild<T extends ViewBase = ViewBase>(child: T): T {
			if (this.lifecycleChildren.indexOf(child) < 0) {
				this.lifecycleChildren.push(child)
			}
			return child
		}
		removeChild<T extends ViewBase = ViewBase>(child: T): T {
			let index = this.lifecycleChildren.indexOf(child)
			if (index >= 0) {
				this.lifecycleChildren.splice(index, 0)
			}
			return child
		}
		get children(): ViewBase[] {
			return this.lifecycleChildren.concat()
		}

		protected _lifecycleParent: ViewBase;
		public get lifecycleParent(): ViewBase {
			return this._lifecycleParent;
		}
		public set lifecycleParent(parent: ViewBase) {
			this._lifecycleParent = parent;
			parent.addChild(this)
		}

		set parent(parent: ViewBase) {
			this.viewParent = parent
			this.transformParent = parent
			this.lifecycleParent = parent
		}

	}
}
