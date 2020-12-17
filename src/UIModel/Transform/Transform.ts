
namespace flowui {

	/**
	 * 相对坐标系统
	 */
	export class Transform {
		parent?: Transform

		scale: Vector2 = new Vector2(1, 1)
		position: Vector2 = new Vector2()

		getWebPagePosition(): Vector2 {
			if (this.parent) {
				let parentPos = this.parent.getWebPagePosition()
				let parentScale = this.parent.scale
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
