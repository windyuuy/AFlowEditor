
namespace flowui {
	export class BodySlotSpec {
		inputs: SlotGroup[]
		outputs: SlotGroup[]

		init() {
			this.inputs = []
			this.outputs = []
			return this
		}

		reset() {
			this.inputs.length = 0
			this.outputs.length = 0
		}
	}

	export class CodeBodyType extends BodyType {
		code: string

	}

}