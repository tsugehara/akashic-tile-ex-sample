import * as types from "./types";
import * as scenes from "./scenes";

function main(param: g.GameMainParameterObject): void {
	const initialScene = new scenes.GameScene({
		game: g.game,
	});
	const vars = g.game.vars as types.GameVars;
	vars.gameState = {
		score: 0,
	};
	vars.config = {};
	g.game.pushScene(initialScene);
}

export = main;
