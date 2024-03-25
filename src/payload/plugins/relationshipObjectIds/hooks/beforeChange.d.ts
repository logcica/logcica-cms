import type { FieldHook, RelationshipField, UploadField } from 'payload/types';
import type { Config } from 'payload/config';
export declare const getBeforeChangeHook: ({ config, field }: {
    config: Config;
    field: RelationshipField | UploadField;
}) => FieldHook;
