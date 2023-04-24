export type Obj = { [key: string]: any };

export interface RootSchema {
  type: string;
  properties: Obj;
  required?: string[];
}

export interface ObjSchema {
  type: string;
  properties: { [key: string]: AllSchemas };
  label?: string;
  required?: string[];
}

export interface ArraySchema {
  type: string;
  items: Obj | ObjSchema;
  label?: string;
}

export interface StringSchema {
  type: string;
  minLength?: number;
  maxLength?: number;
  description?: string;
  format?: string;
  enum?: string[];
}

export interface NumberSchema {
  type: string;
  description?: string;
  maximum?: number;
  minimum?: number;
  default?: number;
}

export interface BooleanSchema {
  type: string;
}

export type AllSchemas =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjSchema
  | Obj;
