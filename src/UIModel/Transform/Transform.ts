
namespace flowui {

	/**
	 * 相对坐标系统
	 */
	export class Transform implements eds.IMerge<Transform> {
		mergeFrom(target: Transform) {
			this.position.merge(target.position)
			this.scale.merge(target.scale)
			this.rotation.merge(target.rotation)
		}
		parent?: Transform

		private _scale: Vector2 = new Vector2(1, 1)
		public get scale(): Vector2 {
			return this._scale
		}
		public set scale(value: Vector2) {
			this._scale.merge(value)
		}
		private _position: Vector2 = new Vector2()
		public get position(): Vector2 {
			return this._position
		}
		public set position(value: Vector2) {
			this._position.merge(value)
		}
		private _rotation: Vector3 = new Vector3()
		public get rotation(): Vector3 {
			return this._rotation
		}
		public set rotation(value: Vector3) {
			this._rotation.merge(value)
		}

		getWebPagePosition(): Vector2 {
			if (this.parent) {
				let parentPos = this.parent.getWebPagePosition()
				let parentScale = this.parent.getWorldScale()
				let offset = this.position.clone().multUp(parentScale)
				let pos = parentPos.addUp(offset)
				return pos
			} else {
				return this.position.clone()
			}
		}

		getWorldPosition(): Vector2 {
			if (this.parent) {
				let parentPos = this.parent.getWorldPosition()
				let pos = parentPos.addUp(this.position)
				return pos
			} else {
				return this.position.clone()
			}
		}

		getWorldScale(): Vector2 {
			if (this.parent) {
				return this.parent.getWorldScale().multUp(this.scale)
			} else {
				return this.scale.clone()
			}
		}

	}
}
