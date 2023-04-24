import {
  RootSchema,
  ObjSchema,
  NumberSchema,
  BooleanSchema,
  StringSchema,
  Obj,
  AllSchemas,
  ArraySchema,
} from "../../types/schemas";
import {
  AllUiSchemas,
  ArrayUiSchema,
  BaseArrayUiScheam,
  BooleanUiSchema,
  ListWithDetailUiSchema,
  NumberUiSchema,
  ObjLstUiSchema,
  ObjNotRootUiSchema,
  ObjUiSchema,
  RootUiSchema,
  StringUiSchema,
} from "../../types/uiSchemas";

export class ServiceParser {
  public schema: RootSchema = {
    type: "object",
    properties: {},
    required: [],
  };
  public uischema: RootUiSchema = { type: "VerticalLayout", elements: [] };
  public initialData: Obj = {};

  constructor(data) {
    this.initialData = data;
    this.convertServiceToSchemas();
  }

  private convertServiceToSchemas(): void {
    let [properties, elements] = this.processObject(
      "",
      this.initialData,
      true,
      "#/properties"
    );
    this.schema.properties = properties;
    this.uischema.elements = elements as any[];
  }

  private processObject(
    label: string,
    obj: { [key: string]: any },
    root: boolean,
    scope: string
  ): [Obj | ObjSchema, ObjUiSchema] {
    let properties: Obj | ObjSchema = {};
    let elements: ObjUiSchema = [];

    if (!root) {
      properties = { type: "object", properties: {} };
      if (label !== "") {
        elements = { type: "Group", label: label, elements: [] };
        scope = scope + "/" + label + "/properties";
      } else {
        elements = { type: "VerticalLayout", elements: [] };
        scope = scope + "/properties";
      }
    }

    for (const key in obj) {
      let val = obj[key];
      let processedData: [AllSchemas, AllUiSchemas];
      if (typeof val === "string") {
        processedData = this.processString(key, scope);
      } else if (typeof val === "number") {
        processedData = this.processNumber(key, scope);
      } else if (typeof val === "boolean") {
        processedData = this.processBoolean(key, scope);
      } else if (Array.isArray(val)) {
        processedData = this.processArray(key, val, scope, false);
      } else {
        processedData = this.processObject(key, val, false, scope);
      }

      if (!root) {
        (properties as ObjSchema).properties[key] = processedData[0];
        (elements as ObjNotRootUiSchema).elements.push(processedData[1]);
      } else {
        (properties as Obj)[key] = processedData[0];
        (elements as AllUiSchemas[]).push(processedData[1]);
      }
    }

    return [properties, elements];
  }

  private processArray(
    label: string,
    obj: any[],
    scope: string,
    fromArray: boolean
  ): [ArraySchema, ArrayUiSchema] {
    let properties: ArraySchema = {
      type: "array",
      items: {},
    };
    let elements: ArrayUiSchema;
    let processedData: [AllSchemas, AllUiSchemas];
    let item = obj[0];
    if (typeof item !== "object") {
      if (typeof item === "string") {
        processedData = this.processString(label, scope);
      } else if (typeof item === "number") {
        processedData = this.processNumber(label, scope);
      } else {
        processedData = this.processBoolean(label, scope);
      }
      properties.items = processedData[0];
      elements = processedData[1] as BaseArrayUiScheam;
    } else {
      if (Array.isArray(item)) {
        processedData = this.processArray(label, item, scope, true);
        properties.items = processedData[0];
        properties.items.label = label;
        elements = { type: "VerticalLayout", elements: [processedData[1]] };
      } else {
        item = this.getCompleteObject(obj);
        processedData = this.processObject("", item, false, "#");
        properties.items = processedData[0];
        properties.items.label = label;
        if (fromArray) {
          elements = (processedData[1] as ObjLstUiSchema)
            .elements[0] as BaseArrayUiScheam;
          (elements as BaseArrayUiScheam).label = label;
          (elements as BaseArrayUiScheam).scope = scope + "/" + label;
        } else {
          elements = {
            type: "ListWithDetail",
            scope: scope + "/" + label,
            options: { detail: processedData[1] as ObjLstUiSchema },
          } as ListWithDetailUiSchema;
        }
      }
    }

    return [properties, elements];
  }

  private processString(
    label: string,
    scope: string
  ): [StringSchema, StringUiSchema] {
    let property: StringSchema = {
      type: "string",
    };
    let uiElement: StringUiSchema = {
      type: "Control",
      label: label,
      scope: scope + "/" + label,
    };
    return [property, uiElement];
  }

  private processNumber(
    label: string,
    scope: string
  ): [NumberSchema, NumberUiSchema] {
    let property: NumberSchema = {
      type: "number",
    };
    let uiElement: NumberUiSchema = {
      type: "Control",
      label: label,
      scope: scope + "/" + label,
    };
    return [property, uiElement];
  }

  private processBoolean(
    label: string,
    scope: string
  ): [BooleanSchema, BooleanUiSchema] {
    let property: BooleanSchema = {
      type: "boolean",
    };
    let uiElement: BooleanUiSchema = {
      type: "Control",
      label: label,
      scope: scope + "/" + label,
    };
    return [property, uiElement];
  }

  private getCompleteObject(arr: Obj[]): Obj {
    let ret = arr[0];
    arr.slice(1).forEach(function (item: Obj) {
      for (const key in item) {
        if (!(key in ret)) {
          ret[key] = item[key];
        }
      }
    });
    return ret;
  }
}
