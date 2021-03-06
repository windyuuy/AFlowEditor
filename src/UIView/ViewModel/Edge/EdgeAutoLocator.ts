
namespace flowui {
	export class TEdgeAutoLocator {
		/**
		 * 距离 attractDistance 以内被自动吸引焊接
		 */
		attractDistance: number = 8
		/**
		 * 距离 departDistance 以外被自动拆解
		 */
		departDistance: number = 8
		/**
		 * 遍历所有所有 EdgeJoint 和 Slot, 判定是否拆解或者和周围槽点合并
		 */
		update() {
			let edgeJoints = dataManager.getTypeFeatureGroup(EdgeJointViewModel)
			let slots = dataManager.getTypeFeatureGroup(SlotViewModel)

			// TODO: 优化性能
			edgeJoints.forEach(joint => {
				this.updateJointRelation(joint, slots)
			})
		}

		/**
		 * ## 关节动态链接流程:
		 * - 仅允许 slot.out -> joint.in 或者 joint.out -> slot.in 的组合
		 * - 当且仅当拖动结束之后:
		 * 	- 如果处于绑定状态:
		 * 		- 如果距离绑定的槽点圆心距离 D>radius+1
		 * 			- 那么判定拆解
		 * 		- 否则
		 * 			- 回归绑定状态
		 * 	- 否则, 遍历槽点
		 * 			- 如果距离槽点圆心距离 D<radius+10
		 * 				- 那么判定自动连接
		 * 			- 否则
		 * 				- 保持独立状态
		 * @param joint 
		 * @param slots 
		 */
		updateJointRelation(joint: EdgeJointViewModel, slots: SlotViewModel[]) {
			if (!joint.isDraging && joint.isDragOnce) {
				if (joint.isPortBinded) {
					let D = joint.pos.distance(joint.slotViewModel.transform.getWorldPosition())
					if (D > joint.slotViewModel.radius + this.departDistance) {
						joint.depart()
					} else {
						// pass
					}
				} else {
					slots.forEach(slot => {
						let D = joint.pos.distance(slot.transform.getWorldPosition())
						if (D < slot.radius + this.attractDistance) {
							if (joint.jointPos != slot.slotTemp.slotPos) {
								joint.connectSlot(slot)
							}
						} else {
							// pass
						}
					})
				}
			}
		}
	}

	export const EdgeAutoLocator = new TEdgeAutoLocator()
}
