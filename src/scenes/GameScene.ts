import * as types from "../types";
import * as entities from "../entities";
import * as handlers from "../handlers";
import * as behaviors from "../behaviors";
import * as components from "../components";
import * as utils from "../utils";
import BaseScene from "./BaseScene";

export default class extends BaseScene {
	button?: components.BasicButton;

	rect?: entities.RedRect;

	constructor(param: g.SceneParameterObject) {
		super(utils.mergeAssetPaths(param, ["/assets/parts/buttons.png"]));

		this.onLoad.addOnce(this.onLoadHandler, this);
		this.onMessage.add(handlers.LogginHandler);
		this.onMessage.add(this.handleMessage, this);
		this.button = undefined;
		this.rect = undefined;
	}

	onLoadHandler() {
		this.rect = new entities.RedRect(this);
		new behaviors.LoopMoveToRight(this.rect).activate();

		this.button = new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/parts/buttons.png"),
			width: 34,
			height: 34,
			x: this.game.width / 2 - 34 / 2,
			y: this.game.height - 34 - 17,
			parent: this,
		});
		this.button.onClick.add(this.handleButtonClick, this);

		this.append(this.rect);
	}

	handleButtonClick() {
		if (this.rect.visible()) {
			this.rect.hide();
		} else {
			this.rect.show();
		}
		this.rect.modified();
		console.log("clicked");
	}

	handleMessage(arg: types.MessageEvent) {
		switch (arg.data.type) {
			default:
			// 無視
		}
	}
}
