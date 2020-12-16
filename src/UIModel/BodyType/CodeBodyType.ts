
namespace flowui {
	export class BodySlotSpec {
		inputs: Table<SlotGroup>
		outputs: Table<SlotGroup>

		init() {
			this.inputs = CleanTable(this.inputs)
			this.outputs = CleanTable(this.inputs)
			return this
		}

		reset() {
			this.init()
		}
	}

	export class CodeBodyType extends BodyType {
		code: string

	}

}