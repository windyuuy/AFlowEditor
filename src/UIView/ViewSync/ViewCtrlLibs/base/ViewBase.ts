
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

			this.lifecycleChildren = CleanArray(this.lifecycleChildren)
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

		addComps<T extends ViewComp>(comps: (new () => T)[]): T[] {
			return comps.map(comp => {
				return this.addComp(comp)
			})
		}

		protected onLoad() {

		}

		protected _strarted: bool = false
		start() {

		}

		clear() {
			this.destroy()
		}

		destroy() {
			this.onDestroy()

			this.view.remove()
			if (this.lifecycleChildren.length > 0) {
				this.lifecycleChildren.forEach(child => child.destroy())
			}
		}

		protected onDestroy() {

		}

		update() {
			if (!this._strarted) {
				this._strarted = true
				this.start()
			}
			this.updateViewParent()
			this.onUpdateTransform()
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

		get x(): number {
			return this._transform.position.x
		}
		set x(value: number) {
			this._transform.position.x = value
			this.markTransformDirty()
		}
		public get y(): number {
			return this._transform.position.y
		}
		public set y(value: number) {
			this._transform.position.y = value
			this.markTransformDirty()
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
			const worldPos = this.worldPosition.clone()
			this.view.attr({
				pos: [worldPos.x, worldPos.y],
			})
			this.markTransformDirty()
		}

		protected _transformDirty: bool = false
		protected markTransformDirty() {
			this._transformDirty = true
		}

		protected onUpdateTransform(force: bool = false) {
			if (force || this._transformDirty) {
				this._transformDirty = false

				// let pos = this.worldPosition
				// let scale = this.worldScale
				let pos = this.position
				let scale = this.scale
				this.view.attr({
					pos: [pos.x, pos.y],
					scale: [scale.x, scale.y],
				})

				this.emitCompsMsg("transform", this.transform)
				this.children.concat().forEach(child => {
					child.onUpdateTransform(true)
				})

			}
		}

		protected _scale: Vector2;
		public get scale(): Vector2 {
			return this._transform.scale
		}
		public set scale(value: Vector2) {
			this._transform.scale.merge(value)
			const worldScale = this.worldScale
			this.view.attr({
				scale: [worldScale.x, worldScale.y,],
			})
			this.markTransformDirty()
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
		get width() {
			return this.contentSize.height
		}
		set height(height: number) {
			this._contentSize.height = height
			this.updateContentSize()
		}
		get height() {
			return this._contentSize.height
		}

		protected updateContentSize() {
			this.emitCompsMsg("contentSize", this._contentSize)
		}

		protected get viewContainer(): ccs.Group {
			// return this.viewParent.viewContainer
			return this.view
		}

		protected _viewParentDirty: bool = false
		protected markViewParentDirt() {
			this._viewParentDirty = true
		}
		protected _viewParent: ViewBase;
		public get viewParent(): ViewBase {
			return this._viewParent;
		}
		public set viewParent(value: ViewBase) {
			this.markTransformDirty()
			this.markViewParentDirt()
			this._viewParent = value
		}
		protected updateViewParent() {
			if (this._viewParentDirty) {
				this._viewParentDirty = false
				let viewParent = this._viewParent
				let parentView = viewParent.viewContainer
				if (viewParent == null) {
					this._viewParent = null
					this.view.remove()
					return true
				} else if (parentView instanceof spritejs.Group) {
					parentView.appendChild(this.view)
					return true
				}
			}
			return false
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

		/**
		 * 严格应该用viewchildren,而不是lifechildren
		 */
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
			this.transformParent = parent
			this.lifecycleParent = parent
			this.viewParent = parent
		}

		get parent() {
			return this._viewParent
		}

	}
}
