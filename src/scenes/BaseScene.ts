import * as types from "../types";

export default class extends g.Scene {
	get vars() {
		return this.game.vars as types.GameVars;
	}

	get config() {
		const vars = this.game.vars as types.GameVars;
		return vars.config;
	}

	get gameState() {
		const vars = this.game.vars as types.GameVars;
		return vars.gameState;
	}
}
