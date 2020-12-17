
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

			const rootLayer = New(TouchLayerView)
			this.rootLayer = rootLayer
			rootLayer.setSceneView(this)
			rootLayer.name = "touchLayer"
			rootLayer.scale = new Vector2(1, 1)

			let bodyView = New(BodyView)
			bodyView.parent = rootLayer
			bodyView.transform.parent = rootLayer.transform
			bodyView.contentSize = new Size2(200, 100)
			bodyView.position = new Size2(200, 100)

			bodyView.addComp(DragableComp)
			let editorComp = bodyView.addComp(EditorComp)
			editorComp.text = "qefwfe"

			return this
		}

		update() {

		}

		destroy() {

		}

	}

}
