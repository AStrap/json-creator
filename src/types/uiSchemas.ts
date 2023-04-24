export interface RootUiSchema {
  type: string;
  elements: AllUiSchemas[];
}

export interface ObjGroupUiSchema {
  type: string;
  label: string;
  elements: AllUiSchemas[];
}

export interface ObjLstUiSchema {
  type: string;
  elements: AllUiSchemas[];
}

export type ObjUiSchema = ObjGroupUiSchema | ObjLstUiSchema | any[];
export type ObjNotRootUiSchema = ObjGroupUiSchema | ObjLstUiSchema;

export interface BaseArrayUiScheam {
  type: string;
  label: string;
  scope: string;
}

export interface ListWithDetailUiSchema {
  type: string;
  scope: string;
  label: string;
  options: {
    detail: ObjLstUiSchema;
  };
}

export type ArrayUiSchema =
  | ListWithDetailUiSchema
  | BaseArrayUiScheam
  | ObjLstUiSchema
  | StringUiSchema
  | NumberUiSchema
  | BooleanUiSchema;

export interface StringUiSchema {
  type: String;
  label: String;
  scope: String;
}

export interface NumberUiSchema {
  type: String;
  label: String;
  scope: String;
}

export interface BooleanUiSchema {
  type: String;
  label: String;
  scope: String;
}

export type AllUiSchemas =
  | StringUiSchema
  | NumberUiSchema
  | BooleanUiSchema
  | ObjUiSchema
  | ArrayUiSchema;
