import * as tileEx from "akashic-tile-ex";
import * as types from "../types";
import * as entities from "../entities";
import * as handlers from "../handlers";
import * as behaviors from "../behaviors";
import * as components from "../components";
import * as utils from "../utils";
import BaseScene from "./BaseScene";

function convertRawTileToTileData(tileData: number[][]): tileEx.TileCell[][] {
	return tileData.map((row) => {
		return row.map((cell) => {
			switch (cell) {
				case -1:
					return [0, -1];
				case 0:
					return [1, 0];
				case 1:
					return [1, 1];
				default:
					return [0, cell - 2];
			}
		});
	});
}

export default class extends BaseScene {
	button?: components.BasicButton;

	rect?: entities.RedRect;

	constructor(param: g.SceneParameterObject) {
		super(
			utils.mergeAssetPaths(param, [
				"/assets/parts/buttons.png",
				"/assets/map/[A]Grass1-Grass2_pipo.png",
				"/assets/map/[Base]BaseChip_pipo.png",
				"/assets/map/[A]Water2_pipo.png",
			])
		);

		this.onLoad.addOnce(this.onLoadHandler, this);
		this.onMessage.add(handlers.LogginHandler);
		this.onMessage.add(this.handleMessage, this);
		this.button = undefined;
		this.rect = undefined;
	}

	createBaseTile() {
		const rawTile: number[][] = [
			[2, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0],
			[2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
			[2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0],
			[0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2],
			[0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0],
			[2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2],
			[2, 2, 2, 0, 2, 2, 0, 2, 0, 0, 0],
			[0, 2, 0, 2, 0, 0, 2, 2, 0, 2, 0],
			[0, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0],
			[0, 2, 0, 0, 2, 2, 4, 3, 2, 2, 2],
		];
		new tileEx.TileEx({
			scene: this,
			chipSets: [
				new tileEx.ChipSet({
					src: this.asset.getImage(
						"/assets/map/[Base]BaseChip_pipo.png"
					),
					tileWidth: 32,
					tileHeight: 32,
				}),
				new tileEx.WolfAutoTileChipSet({
					src: this.asset.getImage(
						"/assets/map/[A]Grass1-Grass2_pipo.png"
					),
					tileWidth: 32,
					tileHeight: 32,
				}),
			],
			tileData: convertRawTileToTileData(rawTile),
			tileWidth: 32,
			tileHeight: 32,
			parent: this,
		});
	}

	create2ndTile() {
		const rawTile: number[][] = [
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, 0, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, 0, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, 0, 0, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, 0, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, 0, 0, -1, -1, -1, -1],
			[-1, -1, -1, -1, 0, 0, -1, -1, -1, -1],
			[-1, -1, -1, 0, 0, 0, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		];
		new tileEx.TileEx({
			scene: this,
			chipSets: [
				new tileEx.ChipSet({
					src: this.asset.getImage("/assets/map/[A]Water2_pipo.png"),
					tileWidth: 32,
					tileHeight: 32,
				}),
				new tileEx.WolfAutoTileChipSet({
					src: this.asset.getImage("/assets/map/[A]Water2_pipo.png"),
					tileWidth: 32,
					tileHeight: 32,
				}),
			],
			tileData: convertRawTileToTileData(rawTile),
			tileWidth: 32,
			tileHeight: 32,
			parent: this,
		});
	}

	onLoadHandler() {
		this.createBaseTile();
		this.create2ndTile();
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
