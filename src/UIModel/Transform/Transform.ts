
namespace flowui {

	/**
	 * 相对坐标系统
	 */
	export class Transform {
		parent?: Transform

		scale: number = 1
		position: Vector2 = new Vector2()

		getWorldPosition(): Vector2 {
			if (this.parent) {
				return this.parent.getWorldPosition().addUp(this.position)
			} else {
				return this.position.clone()
			}
		}

		getWorldScale(): number {
			if (this.parent) {
				return this.parent.getWorldScale() * this.scale
			} else {
				return this.scale
			}
		}

	}
}
