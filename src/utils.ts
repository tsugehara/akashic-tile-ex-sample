export function mergeAssetIds(
	param: g.SceneParameterObject,
	assetIds: (string | g.DynamicAssetConfiguration)[]
) {
	param.assetIds = assetIds;
	return param;
}

export function mergeAssetPaths(
	param: g.SceneParameterObject,
	assetPaths: string[]
) {
	param.assetPaths = assetPaths;
	return param;
}
