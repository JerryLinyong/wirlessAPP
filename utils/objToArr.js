function ObjToArr (obj) {
  let arr = []
  for (let i in obj) {
      arr.push(obj[i]); //属性
      //arr.push(obj[i]); //值
  }
  return arr;
}

export default ObjToArr