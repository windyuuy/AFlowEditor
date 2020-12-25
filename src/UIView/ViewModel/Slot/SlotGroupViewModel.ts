

namespace flowui {
	export class SlotGroupViewModel extends ViewModelBase {
		init() {
			this.slotViewModels = CleanArray(this.slotViewModels)

			return super.init()
		}

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
		}

		createSlotViewModel(slotTemp: SlotTemp) {
			let slotInfo = New(SlotInfo)
			slotInfo.slotTemp = slotTemp

			let slotViewModel = New(SlotViewModel)
			slotViewModel.slotInfo = slotInfo
			slotViewModel.slotTemp = slotTemp
			if (slotTemp.slotType == "in") {
				slotViewModel.transform.position = this.transform.position
			} else if (slotTemp.slotType == "out") {
				slotViewModel.transform.position = this.transform.position
			}

			return slotViewModel
		}
	}
}
