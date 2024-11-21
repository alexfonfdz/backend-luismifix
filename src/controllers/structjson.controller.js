'use strict';

// Convierte un objeto JSON a un objeto Struct de Protobuf
function jsonToStructProto(json) {
  const fields = {};
  for (const k in json) {
    fields[k] = jsonValueToProto(json[k]);
  }

  return { fields };
}

const JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP = {
  [typeof 0]: 'numberValue',
  [typeof '']: 'stringValue',
  [typeof false]: 'boolValue',
};

const JSON_SIMPLE_VALUE_KINDS = new Set([
  'numberValue',
  'stringValue',
  'boolValue',
]);

// Convierte un valor JSON a un valor Protobuf
function jsonValueToProto(value) {
  const valueProto = {};

  if (value === null) {
    valueProto.kind = 'nullValue';
    valueProto.nullValue = 'NULL_VALUE';
  } else if (value instanceof Array) {
    valueProto.kind = 'listValue';
    valueProto.listValue = { values: value.map(jsonValueToProto) };
  } else if (typeof value === 'object') {
    valueProto.kind = 'structValue';
    valueProto.structValue = jsonToStructProto(value);
  } else if (typeof value in JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP) {
    const kind = JSON_SIMPLE_TYPE_TO_PROTO_KIND_MAP[typeof value];
    valueProto.kind = kind;
    valueProto[kind] = value;
  } else {
    console.warn('Unsupported value type ', typeof value);
  }
  return valueProto;
}

// Convierte un objeto Struct de Protobuf a un objeto JSON
function structProtoToJson(proto) {
  if (!proto || !proto.fields) {
    return {};
  }
  const json = {};
  for (const k in proto.fields) {
    json[k] = valueProtoToJson(proto.fields[k]);
  }
  return json;
}

// Convierte un valor Protobuf a un valor JSON
function valueProtoToJson(proto) {
  if (!proto || !proto.kind) {
    return null;
  }

  if (JSON_SIMPLE_VALUE_KINDS.has(proto.kind)) {
    return proto[proto.kind];
  } else if (proto.kind === 'nullValue') {
    return null;
  } else if (proto.kind === 'listValue') {
    if (!proto.listValue || !proto.listValue.values) {
      console.warn('Invalid JSON list value proto: ', JSON.stringify(proto));
    }
    return proto.listValue.values.map(valueProtoToJson);
  } else if (proto.kind === 'structValue') {
    return structProtoToJson(proto.structValue);
  } else {
    console.warn('Unsupported JSON value proto kind: ', proto.kind);
    return null;
  }
}

export { jsonToStructProto, structProtoToJson }; // Exporta las funciones para su uso en otros módulos