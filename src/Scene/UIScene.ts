
namespace flowui {

	/**
	 * 
	 */
	export class UIScene {

		transform: Transform

		sceneView: spritejs.Scene

		rootLayer: LayerView
		init() {
			this.transform = new Transform()

			const container = document.getElementById('container');
			const sceneView = new spritejs.Scene({
				container,
				width: 1000,
				height: 1000,
			})
			this.sceneView = sceneView

			this.rootLayer = New(LayerView)
			this.rootLayer.setSceneView(this)

			const touchLayer = New(TouchLayerView)
			touchLayer.setSceneView(this)
			touchLayer.name = "touchLayer"

			let bodyView = New(BodyView)
			bodyView.parent = this.rootLayer
			bodyView.transform.parent = this.rootLayer.transform
			bodyView.contentSize = new Size2(200, 100)
			bodyView.position = new Size2(200, 100)

			bodyView.addComp(DragableComp)

			return this
		}

		update() {

		}

		destroy() {

		}

	}

}
