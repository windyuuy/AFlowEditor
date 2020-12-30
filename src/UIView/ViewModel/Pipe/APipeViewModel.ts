

namespace flowui {

	/**
	 * 信号槽布局
	 */
	export class PipeSlotCodeViewModel extends CompViewModel {
		layout: WidgetLayout = NewData(WidgetLayout)
	}

	/**
	 * 标题布局
	 */
	export class TitleViewModel extends CompViewModel {
		layout: WidgetLayout = NewData(WidgetLayout)
	}

	export class PipeViewModel extends NodeViewModel {
		init() {
			this.pipeInfo = New(PipeInfo)
			this.slotGroupViewModels = CleanArray(this.slotGroupViewModels)

			const layout = New(WidgetLayout)
			this.layout = layout
			layout.owner = "PipeViewModel"

			super.init()

			return this
		}

		layout = RefData(WidgetLayout)

		/**
		 * 管线实例信息
		 */
		pipeInfo: PipeInfo
		/**
		 * 管线展开模板信息
		 */
		pipeTemp: PipeTemp

		/**
		 * 标题布局
		 */
		titleViewModel = NewData(TitleViewModel)
		/**
		 * 信号槽布局模型
		 */
		slotCodeViewModel = NewData(PipeSlotCodeViewModel)

		/**
		 * 管线是否处于展开状态
		 * 暂时无效
		 */
		isExpand: boolean = false

		slotGroupViewModels: SlotGroupViewModel[]

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

		/**
		 * 从选中列表中重组模板
		 */
		loadPipeTempFromGroups(pipeViewModels: PipeViewModel[]) {

		}

		/**
		 * 引用现有模板
		 */
		loadPipeTempFromTemp(pipeTemp: PipeTemp) {

		}

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
			// slotGroupViewModel.transform.position = this.transform.position
			slotGroupViewModel.transformParent = this
			return slotGroupViewModel
		}

		initLayout() {
			// 初始化自身布局
			{
				const layout = this.layout
				layout.sizeOffset.width = 140
				layout.sizeOffset.height = 120
			}

			// 标题布局
			{
				const layout = this.titleViewModel.layout
				this.titleViewModel.transformParent = this
				layout.sizeOffset.width = this.layout.borderSize.width - 20
				layout.sizeOffset.height = 20
				layout.parentAnchor.y = -0.5
				layout.selfAnchor.y = -0.5
				layout.posOffset.y = 5
			}

			// 信号槽定义代码
			{
				const layout = this.slotCodeViewModel.layout
				this.slotCodeViewModel.transformParent = this
				layout.sizeOffset.width = this.layout.borderSize.width - 20
				layout.sizeOffset.height = 20
				layout.parentAnchor.y = -0.5
				layout.selfAnchor.y = 0.5
				layout.posOffset.y = 20
			}

		}

		/**
		 * 更新所有信号槽组信息
		 */
		updateLayout() {
			const inputs = this.slotGroupViewModels.filter(group => group.slotGroupInfo.slotPos == "in")
			const outputs = this.slotGroupViewModels.filter(group => group.slotGroupInfo.slotPos == "out")

			let maxGroupCount = Math.max(inputs.length, outputs.length)
			this.layout.sizeOffset.height = 120 + maxGroupCount * SlotGroupViewModel.sGroupHeight

			this.applyLayoutPositionAffection()

			this.updateSlotGroupsLayout(inputs)
			this.updateSlotGroupsLayout(outputs)

		}

		/**
		 * 从自动布局模块重新生成坐标
		 * @param groups 
		 */
		updateSlotGroupsLayout(groups: SlotGroupViewModel[]) {
			groups.forEach((groupModel, index) => {
				let layout = groupModel.layout
				groupModel.transformParent = this
				if (groupModel.slotGroupInfo.slotPos == "in") {
					// 统一靠右
					layout.selfAnchor.x = 0.5
					// 输入处于左侧
					layout.parentAnchor.x = -0.5
				} else {
					// 统一靠右
					layout.selfAnchor.x = 0.5
					// 输出处于右侧
					layout.parentAnchor.x = 0.5
				}
				layout.posOffset.y = index * SlotGroupViewModel.sGroupHeight
				// 应用layout更新布局
				groupModel.applyLayoutPositionAffection()
			})
		}


	}
}
