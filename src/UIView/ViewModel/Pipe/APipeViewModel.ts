

namespace flowui {
	export class PipeViewModel extends ViewModelBase {
		init() {
			this.slotGroupViewModels = CleanArray(this.slotGroupViewModels)

			return super.init()
		}

		/**
		 * 管线实例信息
		 */
		pipeInfo: PipeInfo
		/**
		 * 管线展开模板信息
		 */
		pipeTemp: PipeTemp

		/**
		 * 管线是否处于展开状态
		 * 暂时无效
		 */
		isExpand: boolean = false

		slotGroupViewModels: SlotGroupViewModel[]

		updateSlotGroups() {
			ArrayHelper.foreachDifferentPairs(
				this.slotGroupViewModels, (groupViewModel) => groupViewModel.slotGroupInfo.oid,
				this.pipeTemp.slotSpec.inputs, (slotGroup) => slotGroup.oid,
				(groupViewModel, slotGroup) => {
					if (slotGroup == null) {
						Del(groupViewModel)
						this.slotGroupViewModels.remove(groupViewModel)
					} else {
						if (groupViewModel == null) {
							groupViewModel = this.createSlotGroup(slotGroup)
							this.slotGroupViewModels.push(groupViewModel)
						}
						groupViewModel.updateSlots()
					}
				}
			)
		}

		createSlotGroup(slotGroup: SlotGroup): SlotGroupViewModel {
			let slotGroupViewModel = New(SlotGroupViewModel)
			slotGroupViewModel.slotGroupInfo = slotGroup
			slotGroupViewModel.transform.position = this.transform.position
			return slotGroupViewModel
		}

		/**
		 * 模板规格定义代码
		 */
		public get slotSpecCode(): string {
			return this.pipeTemp.slotSpecCode
		}
		public set slotSpecCode(value: string) {
			this.pipeTemp.slotSpecCode = value
			this.pipeTemp.updateSlotSpec()
			this.updateSlotGroups()
		}

		/**
		 * 是否正在编辑块规格
		 */
		isSlotSpecCodeEditable: boolean = false

	}
}
