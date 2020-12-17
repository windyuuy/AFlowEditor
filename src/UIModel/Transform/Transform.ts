
namespace flowui {

	/**
	 * 相对坐标系统
	 */
	export class Transform {
		parent?: Transform

		position: Vector2 = new Vector2()

		getWorldPosition(): Vector2 {
			if (this.parent) {
				return this.parent.getWorldPosition().addUp(this.position)
			} else {
				return this.position.clone()
			}
		}

	}
}
