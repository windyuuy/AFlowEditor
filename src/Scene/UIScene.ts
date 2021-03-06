
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
			let rectComp = rootGroup.addComp(RectComp)
			rootGroup.width = 1000 * 2
			rootGroup.height = 1000 * 2
			rootGroup.addComp(DragableComp)

			this.onInit()

			return this
		}

		onInit() {
			// this.test()
			// this.testView()
			this.testViewMode()
		}

		test() {
			const rootGroup = this.rootGroup
			let pipeView = New(NodeView)
			pipeView.addComp(DragableComp)
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

			let labelComp = pipeView.addComp(GLLabelComp)
			labelComp.text = "lwkjefljweflk"

			return this
		}

		testView() {
			const rootGroup = this.rootGroup

			const pipeView = New(CodePipeView)
			pipeView.parent = rootGroup
			pipeView.x = 400
			pipeView.y = 400

			const pipeView2 = New(CodePipeView)
			pipeView2.parent = rootGroup
			pipeView2.x = 600
			pipeView2.y = 400

			const lineView = New(EdgeView)
			lineView.addComp(DragableComp)
			lineView.parent = rootGroup
			lineView.tailPos = new Vector2(10, 0)
			lineView.arrowPos = new Vector2(100, 10)
			lineView.position = new Vector2(100, 100)

			const syncSlotView = New(SlotView)
			syncSlotView.parent = rootGroup
			syncSlotView.position = new Vector2(100, 300)

			const slotGroupView = New(SlotGroupView)
			slotGroupView.parent = rootGroup
			slotGroupView.position = new Vector2(100, 500)
		}

		testViewMode() {
			// let slotViewModel = New(SlotViewModel)
			// slotViewModel.transform.position = new Vector2(100, 100)

			// let slotGroupViewModel = New(SlotGroupViewModel)
			// slotGroupViewModel.transform.position = new Vector2(100, 100)
			{
				let groupPipeViewModel = New(GroupPipeViewModel)
				groupPipeViewModel.pipeTemp = New(PipeTemp)
				groupPipeViewModel.slotSpecCode = `
in A:Hello1,B:Hello1
out E:Hello2,G.C:Hello2,G.D:Hello2
`.trim()
				groupPipeViewModel.layout.posOffset.y = 400
				groupPipeViewModel.layout.posOffset.x = 150
			}
			{
				let groupPipeViewModel = New(GroupPipeViewModel)
				groupPipeViewModel.pipeTemp = New(PipeTemp)
				groupPipeViewModel.slotSpecCode = `
in A:Hello1,B:Hello1
out E:Hello2,G.C:Hello2,G.D:Hello2
`.trim()
				groupPipeViewModel.layout.posOffset.y = 400
				groupPipeViewModel.layout.posOffset.x = 350
			}
			// let codePipeViewModel = New(CodePipeViewModel)
			// codePipeViewModel.pipeTemp.slotSpecCode = `
			// in A,B
			// out E,G:C,G:D
			// `
			// codePipeViewModel.pipeTemp.updateSlotSpec()
		}

		update() {
		}

		destroy() {

		}

	}

}
