

namespace flowui {
	export class SlotGroupViewModel extends NodeViewModel {
		// /**
		//  * 组高
		//  * @deprecated
		//  */
		// static sGroupHeight = 30
		/**
		 * 槽点间距
		 */
		static sSlotDivision = 3

		init() {
			this.slotViewModels = CleanArray(this.slotViewModels)

			super.init()

			this.layout.owner = "SlotGroupViewModel"

			return this
		}

		layout = NewData(WidgetLayout)

		slotGroupInfo: SlotGroup

		slotViewModels: SlotViewModel[]

		clear() {
			DelAll(this.slotViewModels)
			this.slotViewModels = CleanArray(this.slotViewModels)
		}

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

			this.layout.sizeOffset.width = 10
			this.layout.sizeOffset.height = (SlotViewModel.sModelHeight + SlotGroupViewModel.sSlotDivision) * this.slotViewModels.length

			this.updateLayout()

		}

		updateLayout() {
			this.applyLayoutPositionAffection()

			// 更新槽点列表布局
			this.slotViewModels.forEach((model, index) => {
				const layout = model.layout
				model.transformParent = this
				layout.posOffset.y = index * (SlotViewModel.sModelHeight + SlotGroupViewModel.sSlotDivision) + SlotGroupViewModel.sSlotDivision / 2

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
