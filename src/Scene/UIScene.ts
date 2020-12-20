
namespace flowui {

	/**
	 * 
	 */
	export class UIScene {

		container: HTMLElement
		sceneView: spritejs.Scene

		rootLayer: LayerView
		rootGroup: GroupView

		init() {
			const container = document.getElementById('container');
			this.container = container
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
			this.rootGroup = rootGroup

			this.onInit()

			return this
		}

		onInit() {
			// this.test()
			this.test2()
		}

		test() {
			const rootGroup = this.rootGroup
			let pipeView = New(NodeView)
			pipeView.parent = rootGroup
			pipeView.contentSize = new Size2(200, 100)
			pipeView.position = new Size2(200, 100)

			let ellipseComp = pipeView.addComp(EllipseComp)
			ellipseComp.radius = 100
			ellipseComp.strokeColor = "blue"
			ellipseComp.fillColor = "red"

			pipeView.addComp(ArrowLineComp)
			pipeView.addComp(DragableComp)
			let editorComp = pipeView.addComp(EditorComp)
			editorComp.text = "qefwfe"

			let labelComp = pipeView.addComp(LabelComp)
			labelComp.text = "lwkjefljweflk"

			return this
		}

		test2() {
			const rootGroup = this.rootGroup

			const pipeView = New(PipeView)
			pipeView.parent = rootGroup
			pipeView.x = 400
			pipeView.y = 400

		}

		update() {
		}

		destroy() {

		}

	}

}
