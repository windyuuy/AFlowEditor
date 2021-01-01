namespace eds {

	export class FrameSyncUtils {
		// static ls: FrameSyncUtils[] = []

		random: FrameSyncRandom
		timer: Timer
		uidTool: UniqueIDTool

		init() {
			// FrameSyncUtils.ls.push(this)
			this.random = new FrameSyncRandom()
			this.random.init()

			this.timer = new Timer()
			this.timer.init()

			this.uidTool = new UniqueIDTool()
			this.uidTool.init()
			return this
		}

	}

}