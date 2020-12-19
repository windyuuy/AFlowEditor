
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

			const rootLayer2 = New(TouchLayerView)
			rootLayer2.parent = rootLayer

			const rootGroup = New(GroupView)
			rootGroup.parent = rootLayer

			let bodyView = New(BodyView)
			bodyView.parent = rootGroup
			bodyView.contentSize = new Size2(200, 100)
			bodyView.position = new Size2(200, 100)

			bodyView.addComp(ArrowLineComp)
			bodyView.addComp(DragableComp)
			let editorComp = bodyView.addComp(EditorComp)
			editorComp.text = "qefwfe"
			let ellipseComp = bodyView.addComp(EllipseComp)
			ellipseComp.radius = 10
			ellipseComp.strokeColor = "blue"
			ellipseComp.fillColor = "red"

			return this
		}

		update() {

		}

		destroy() {

		}

	}

}
