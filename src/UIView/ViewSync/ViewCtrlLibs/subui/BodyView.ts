
namespace flowui {
	import Path = spritejs.Path;
	import Label = spritejs.Label;
	import Group = spritejs.Group;

	export class BodyView extends ViewBase {

		get radius(): number {
			let size = this._contentSize
			let min = Math.min(size.width, size.height) / 4
			min = Math.min(20, min)
			return min
		}

		private _label: string;
		public get label(): string {
			return this._label;
		}
		public set label(value: string) {
			this._label = value;

			this.labelView.attr({
				label: value,
			})
		}

		protected genRectPath() {
			let size = this._contentSize

			let radius = this.radius || 0
			let halfWidth = size.width / 2
			let halfWidth2 = size.width / 2 - radius
			let halfH = size.height / 2
			let halfH2 = size.height / 2 - radius

			return `M${-halfWidth2},${halfH}
					L${halfWidth2},${halfH}A${radius},${radius},0,0,0,${halfWidth},${halfH2}
					L${halfWidth},${-halfH2}A${radius},${radius},90,0,0,${halfWidth2},${-halfH}
					L${-halfWidth2},${-halfH}A${radius},${radius},0,0,0,${-halfWidth},${-halfH2}
					L${-halfWidth},${halfH2}A${radius},${radius},90,0,0,${-halfWidth2},${halfH}
					`
		}

		protected updateContentSize() {
			this.rectView.attr({
				d: this.genRectPath(),
			})
		}

		protected labelView: Label
		protected rectView: Path

		setupView() {
			let size = this._contentSize

			const p1 = new Path();
			p1.attr({
				d: this.genRectPath(),
				strokeColor: '#033',
				fillColor: '#839',
				lineWidth: 4,
				pos: [0, 0],
			});

			let ret: { rect: Path, label?: Label } = {
				rect: p1,
			}

			this.rectView = p1

			let group = new Group()
			group.append(p1)

			if (this.label) {
				let label = new Label(this.label)
				label.attr({
					anchor: [0.5, 0.5],
					pos: [0, 0],
				})
				ret.label = label
				group.append(label)
				this.labelView = label
			}

			let worldPosition = this.worldPosition
			group.attr({
				pos: [worldPosition.x, worldPosition.y],
			})

			return group
		}
	}
}
