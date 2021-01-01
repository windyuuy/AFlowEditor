namespace eds {

	export interface IOverwritable {
		rewrite(d: IOverwritable): bool
	}

}