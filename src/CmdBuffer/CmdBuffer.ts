
namespace flowui {

	/**
	 * if execute failed, throw an error
	 */
	export type IEditorAction = () => void
	export interface IEditorCmd {
		name: string
		forward: IEditorAction
		backward?: IEditorAction
	}

	/**
	 * 命令执行管理
	 */
	export class TEditorCmdManager {
		cmdBuffer: IEditorCmd[]

		init() {
			this.cmdBuffer = CleanArray(this.cmdBuffer)
			return this
		}

		/**
		 * 默认的回滚操作
		 */
		runDefaultUndo() {

		}

		runCmd(cmd: IEditorCmd) {
			try {
				cmd.forward()
			} catch (e) {
				console.error(`执行失败: ${cmd.name}`, e)
			}
			if (cmd.backward) {
				try {
					cmd.backward()
				} catch (e) {
					console.error(`回滚失败: ${cmd.name}`, e)

					this.runDefaultUndo()
				}
			} else {
				this.runDefaultUndo()
			}
		}
	}

	export const CmdManager = new TEditorCmdManager().init()

}
