/// <reference path="ViewBase.ts" />

namespace flowui {
	import Path = spritejs.Path;
	import Label = spritejs.Label;
	import Group = spritejs.Group;

	export class LayerView extends ViewBase {

		public get view(): ccs.Layer {
			return this._view as ccs.Layer
		}

		setupView() {
			let layer = new spritejs.Layer()
			return layer
		}

		scene: UIScene
		setSceneView(scene: UIScene) {
			this.scene = scene
			scene.sceneView.appendChild(this.view)

			this.transform.parent = scene.transform
		}

	}
}
