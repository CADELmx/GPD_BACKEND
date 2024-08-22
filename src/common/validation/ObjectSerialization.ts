export default function ObjectSerialization(object : any) {  
    let result = {...object};

    Object.keys(object).forEach((key, index) => {
      if (typeof object[key] === 'bigint') {
        result[key] = object[key].toString();
      } else {
        result[key] = object[key];
      }
    });

    if (object.data) {
      result.data = ObjectSerialization(object.data);
    }

    return result;
  }