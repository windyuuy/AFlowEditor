
namespace flowui {
	export class SlotGroup {
		oid: string
		name: string

		slots: SlotType[]

		init() {
			this.slots = CleanArray(this.slots)

			return this;
		}
	}

}