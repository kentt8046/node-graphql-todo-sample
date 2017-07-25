import * as DataLoader from "dataloader";

export const globalOptions = {
  define: {
    underscored: true,
    underscoredAll: true,
    classMethods: {
      cache() {
        const model = <any>this;
        if (model._cache) return model._cache;
        const loadMany = (keys: string[]) => model.findAll({ where: { id: { $in: keys } } });
        const cache = new DataLoader(loadMany);

        return model._cache = cache;
      }
    },
    hooks: {
      afterDestroy: clearCacheHook(),
      afterUpdate: clearCacheHook(),
      afterSave: clearCacheHook(),
    }
  }
};

function clearCacheHook() {
  return function hook(instance: any) {
    const model = instance.Model;

    return model._cache.clear(instance.id);
  };
}
