import deserialize from './deserialize';

export default function getDeserializerFromAttributeType(attributeType, attributeForFaceting) {
  const attributeTypeToDeserializer = {
    string: (string) => deserialize(string),

    stringArray: (array) => array
      .map((string) => deserialize(string)),

    objectArray: (array) => array
      .map((object) => deserialize(object[attributeForFaceting])).flat(),
  };

  return attributeTypeToDeserializer[attributeType];
}
