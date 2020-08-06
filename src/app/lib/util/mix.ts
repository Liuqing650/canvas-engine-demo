function _mix(source: any, object: any) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && key !== 'constructor' && object[key] !== undefined) {
      source[key] = object[key];
    }
  }
}

function mix(dist: any, src1?: any, src2?: any, src3?: any) {
  if (src1) {
    _mix(dist, src1);
  }
  if (src2) {
    _mix(dist, src2);
  }
  if (src3) {
    _mix(dist, src3);
  }
  return dist;
}

export default mix;
