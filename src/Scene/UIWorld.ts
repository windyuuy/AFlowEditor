
namespace flowui {
	export class UIWorld {
		scene: UIScene
		systems: SystemBase[]
		init() {
			dataManager = new eds.DataManager().init()

			// TODO: debug
			window["dataManager"] = dataManager

			this.setupScene()

			this.systems = CleanArray(this.systems)
			let sys = new ViewSyncSystem().init()
			sys.scene = this.scene

			this.systems.push(sys)

			this.isRunning = true
			return this
		}

		setupScene() {
			let scene = new UIScene().init()
			this.scene = scene
		}

		protected scheduleId: any = null
		startSchedule() {
			this.stopSchedule()
			this.scheduleId = setInterval(() => {
				if (this.isRunning) {
					this.update()
				}
			}, 1000 / 40)
		}
		stopSchedule() {
			if (this.scheduleId) {
				clearInterval(this.scheduleId)
				this.scheduleId = null
			}
		}

		isRunning: bool = false
		pause() {
			this.isRunning = false
		}
		resume() {
			this.isRunning = true
		}

		update() {
			this.systems.forEach(system => {
				system.update()
			})
			if (this.scene) {
				this.scene.update()
			}
		}

		destroy() {
			this.pause()
			this.stopSchedule()
			this.scene.destroy()
		}
	}
}
