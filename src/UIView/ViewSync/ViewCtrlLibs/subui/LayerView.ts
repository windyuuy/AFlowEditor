
namespace flowui {
	import Path = spritejs.Path;
	import Label = spritejs.Label;
	import Group = spritejs.Group;

	export class LayerView extends ViewBase {

		setupView() {
			let layer = new spritejs.Layer()
			return layer
		}

		setSceneView(sceneView: spritejs.Scene) {
			sceneView.appendChild(this.view)
		}
	}
}
