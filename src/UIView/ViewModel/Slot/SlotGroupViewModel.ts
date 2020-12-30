

namespace flowui {
	export class SlotGroupViewModel extends NodeViewModel {
		static sGroupHeight = 20

		init() {
			this.slotViewModels = CleanArray(this.slotViewModels)

			super.init()

			this.layout.owner = "SlotGroupViewModel"

			return this
		}

		layout = NewData(WidgetLayout)

		slotGroupInfo: SlotGroup

		slotViewModels: SlotViewModel[]

		updateSlots() {
			ArrayHelper.foreachDifferentPairs(
				this.slotViewModels, (slotViewModel) => { return slotViewModel.slotTemp.oid },
				this.slotGroupInfo.slots, (slotTemp) => { return slotTemp.oid },
				(slotViewModel, slotTemp) => {
					if (slotTemp == null) {
						Del(slotViewModel)
						this.slotViewModels.remove(slotViewModel)
					} else {
						if (slotViewModel == null) {
							slotViewModel = this.createSlotViewModel(slotTemp)
							this.slotViewModels.push(slotViewModel)
						}
						slotViewModel.updateLayout()
					}
				})

			this.updateLayout()

		}

		updateLayout() {
			// 更新列表所有信号槽布局
			this.slotViewModels.forEach((model, index) => {
				const layout = model.layout
				model.transformParent = this
				layout.parentAnchor.y = -0.5
				layout.selfAnchor.y = 0.5
				layout.posOffset.y = index * SlotViewModel.sModelHeight

				// model.transform.position = layout.position
				model.applyLayoutPositionAffection()
			})
		}

		createSlotViewModel(slotTemp: SlotTemp) {
			let slotInfo = New(SlotInfo)
			slotInfo.slotTemp = slotTemp

			let slotViewModel = New(SlotViewModel)
			slotViewModel.slotInfo = slotInfo
			slotViewModel.slotTemp = slotTemp

			return slotViewModel
		}
	}
}
