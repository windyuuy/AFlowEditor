namespace eds {

	export class FrameSyncRandom implements IMerge<FrameSyncRandom>{
		protected seed: number
		protected inc: number

		init() {
			this.inc = 0
			return this
		}

		setRandSeed(seed: number) {
			this.seed = seed
		}

		// return [0~1)
		rand(): number {
			// this.inc++
			// const r = 77
			// let dv = (this.seed + this.inc * this.inc) % r * 2
			// let rand = (dv % r + dv * dv % (r * r) + dv * dv * dv % (r * r * r)) / (r + r * r + r * r * r)
			// return rand
			this.inc = (this.inc * 9301 + 49297) % 233280;
			return this.inc / 233280.0;
		}

		mergeFrom(rand: FrameSyncRandom) {
			this.inc = rand.inc
			this.seed = rand.seed
		}
	}

}