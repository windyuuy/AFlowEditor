
namespace flowui {

	/**
	 * 
	 */
	export class UIScene {

		transform: Transform

		sceneView: spritejs.Scene

		rootLayer: LayerView

		test() {
			this.transform = new Transform()

			const container = document.getElementById('container');
			const sceneView = New(SceneView)
			sceneView.container = container

			const rootLayer = New(LayerView)
			this.rootLayer = rootLayer
			rootLayer.parent = sceneView

			const rootLayer2 = New(TouchLayerView)
			rootLayer2.name = "touchLayer"
			rootLayer2.parent = sceneView

			const rootGroup = New(GroupView)
			rootGroup.parent = rootLayer

			let pipeView = New(NodeView)
			pipeView.parent = rootGroup
			pipeView.contentSize = new Size2(200, 100)
			pipeView.position = new Size2(200, 100)

			pipeView.addComp(ArrowLineComp)
			pipeView.addComp(DragableComp)
			let editorComp = pipeView.addComp(EditorComp)
			editorComp.text = "qefwfe"

			let labelComp = pipeView.addComp(LabelComp)
			labelComp.text = "lwkjefljweflk"

			let ellipseComp = pipeView.addComp(EllipseComp)
			ellipseComp.radius = 100
			ellipseComp.strokeColor = "blue"
			ellipseComp.fillColor = "red"

			return this
		}

		init() {
			// let pipeView = New(PipeView)
			this.test()
		}

		update() {

		}

		destroy() {

		}

	}

}
