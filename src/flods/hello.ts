
namespace flods {
	import Scene = spritejs.Scene;
	import Sprite = spritejs.Sprite;
	import Path = spritejs.Path;
	import Label = spritejs.Label;
	import Group = spritejs.Group;

	export class RoundRect {
		static createNode(xx: {
			label?: string,
			width: number,
			height: number,
			radius?: number,
		}) {

			let radius = xx.radius || 0
			let halfWidth = xx.width / 2
			let halfWidth2 = xx.width / 2 - radius
			let halfH = xx.height / 2
			let halfH2 = xx.height / 2 - radius

			const p1 = new Path();
			p1.attr({
				// d: 'M0,0A200,200,0,1,1,400,0A200,200,0,1,1,0,0Z',
				d: `M${-halfWidth2},${halfH}
					L${halfWidth2},${halfH}A${radius},${radius},0,0,0,${halfWidth},${halfH2}
					L${halfWidth},${-halfH2}A${radius},${radius},90,0,0,${halfWidth2},${-halfH}
					L${-halfWidth2},${-halfH}A${radius},${radius},0,0,0,${-halfWidth},${-halfH2}
					L${-halfWidth},${halfH2}A${radius},${radius},90,0,0,${-halfWidth2},${halfH}
					`,
				scale: 0.5,
				strokeColor: '#033',
				fillColor: '#839',
				lineWidth: 12,
				pos: [0, 0],
			});

			let ret: { rect: Path, label?: Label } = {
				rect: p1,
			}

			let group = new Group()
			group.append(p1)

			if (xx.label) {
				let label = new Label(xx.label)
				label.attr({
					anchor: [0.5, 0.5],
					pos: [0, 0],
				})
				ret.label = label
				group.append(label)
			}

			// return ret
			return group
		}
	}

	export function test() {

		const imgUrl = 'https://s5.ssl.qhres.com/static/ec9f373a383d7664.svg'
		const container = document.getElementById('container');
		const paper = new Scene({
			container,
			width: 400,
			height: 400,
		})

		const sprite = new Sprite(imgUrl)
		sprite.attr({
			bgcolor: '#fff',
			pos: [0, 0],
			size: [400, 400],
			borderRadius: 200,
		})

		paper.layer().appendChild(sprite)

		let xx = {
			width: 200,
			height: 100,
			radius: 20,
			label: "lkwjefl",
		}
		let group = RoundRect.createNode(xx)
		group.attr({
			pos: [200, 100],
		})
		paper.layer().appendChild(group)

	}
}
