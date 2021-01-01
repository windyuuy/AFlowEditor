

namespace flowui {
	export class SlotViewModel extends NodeViewModel {
		static sModelHeight: number = 20
		static sModelWidth: number = 20

		init() {
			this.layout.owner = "SlotViewModel"
			return super.init()
		}

		layout = NewData(WidgetLayout)

		slotInfo: SlotInfo
		slotTemp: SlotTemp

		initLayout() {
			const layout = this.layout
			layout.parentAnchor.x = -0.5
			layout.parentAnchor.y = -0.5
			layout.selfAnchor.y = 0.5
			layout.selfAnchor.x = 0.5
			layout.sizeOffset.width = SlotViewModel.sModelWidth
			layout.sizeOffset.height = SlotViewModel.sModelHeight
		}

		updateLayout() {
			this.applyLayoutPositionAffection()
		}

	}
}
