import { isNumber, isArray } from './dataType';

/**
 * 衍生样式数据，会像css中的样式一样进行自动扩展
 * @param data number | number[]
 */
export function derivativeStyle(data?: number | number[]): number[] {
  const defaultData = [0, 0, 0, 0];
  
  if (!data) {
    return defaultData;
  }

  if (isNumber(data)) {
    const int = Math.floor(data as number);
    return [int, int, int, int];
  }


  if (isArray(data) && (data as Array<number>).length > 0) {
    switch ((data as Array<number>).length) {
      case 1:
        return [data[0], data[0], data[0], data[0]];
      case 2:
        return [data[0], data[1], data[0], data[1]];
      case 3:
        return [data[0], data[1], data[2], data[1]];
      case 4:
        return [data[0], data[1], data[2], data[3]];
      default:
        break;
    }
  }
  
  return defaultData;
}

/**
 * 对象化样式数据
 * @param data number | number[]
 */
export function derivativeStyleObject(data: number | number[]): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  const styleData = derivativeStyle(data);
  return {
    top: styleData[0],
    right: styleData[1],
    bottom: styleData[2],
    left: styleData[3],
  };
}
