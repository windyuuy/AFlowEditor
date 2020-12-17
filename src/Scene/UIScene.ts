
namespace flowui {

	/**
	 * 
	 */
	export class UIScene {

		sceneView: spritejs.Scene

		rootLayer: LayerView
		init() {
			const container = document.getElementById('container');
			const sceneView = new spritejs.Scene({
				container,
				width: 1000,
				height: 1000,
			})
			this.sceneView = sceneView

			this.rootLayer = New(LayerView)
			this.rootLayer.setSceneView(this.sceneView)

			let bodyView = New(BodyView)
			bodyView.parent = this.rootLayer
			bodyView.contentSize = new Size2(200, 100)
			bodyView.position = new Size2(200, 100)

			return this
		}

		update() {

		}

		destroy() {

		}

	}

}
