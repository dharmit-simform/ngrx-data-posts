import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetaData: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    }
  },
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetaData
}
