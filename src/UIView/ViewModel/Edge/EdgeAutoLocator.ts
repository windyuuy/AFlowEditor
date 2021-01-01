
namespace flowui {
	export class TEdgeAutoLocator {
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
		 * - 如果处于绑定状态:
		 * 	- 如果距离圆心距离 D>radius+1
		 * 		- 那么判定拆解
		 * 	- 否则
		 * 		- 回归绑定状态
		 * - 否则
		 * 		- 如果距离圆心距离 D<radius+10
		 * 			- 那么判定自动连接
		 * 		- 否则
		 * 			- 保持独立状态
		 * @param joint 
		 * @param slots 
		 */
		updateJointRelation(joint: EdgeJointViewModel, slots: SlotViewModel[]) {

		}
	}

	export const EdgeAutoLocator = new TEdgeAutoLocator()
}
