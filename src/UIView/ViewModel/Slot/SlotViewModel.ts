

namespace flowui {
	export class SlotViewModel extends NodeViewModel {
		static sModelHeight: number = 10

		init() {
			this.layout.owner = "SlotViewModel"
			return super.init()
		}

		layout = NewData(WidgetLayout)

		slotInfo: SlotInfo
		slotTemp: SlotTemp

		updateLayout() {
			this.applyLayoutPositionAffection()
		}

	}
}
