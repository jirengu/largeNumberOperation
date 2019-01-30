
/**
 * Large number addition of string types
 *
 * @param {string} num1 a non-negative integer value of string type
 * @param {string} num2 a non-negative integer value of string type
 * @return {string} the result of adding two large numbers
 * 
 * Example: 
 *   add('789120039', '432345992)
 * result is '1221466031'
 */
function add(num1, num2) {
  let len = Math.max(num1.length, num2.length)
  num1 = num1.padStart(len, 0)
  num2 = num2.padStart(len, 0)
  let flag = 0,
      result = '',
      temp
  for(let i=len-1; i>=0; i--){
      temp = flag + parseInt(num1[i]) + parseInt(num2[i])
      result = (temp%10) + result 
      flag = parseInt(temp/10)
  }
  result = (flag===1?'1':'') + result
  return result
}



/**
 * Subtraction of large numbers of two string types
 *
 * @param {string} num1 a non-negative integer value of string type
 * @param {string} num2 a non-negative integer value of string type
 * @return {string} the result of subtracting two large numbers
 * 
 * Example: 
 *   sub('789120039', '23432345992)
 * result is '-22643225953'
 */
function sub(num1, num2) {
  let isMinus = false
  if(lt(num1, num2)) {
    [num1, num2] = [num2, num1]
    isMinus = true
  }
  
  let len = Math.max(num1.length, num2.length)
  num1 = num1.padStart(len, 0)
  num2 = num2.padStart(len, 0)

  let flag = 0,
      result = '',
      temp
  for(let i=len-1; i>=0; i--) {
     temp = parseInt(num1[i]) - flag -parseInt(num2[i]) 
     if(temp < 0) {
       result = (10 + temp) + result
       flag = 1
     }else {
       result = temp + result 
       flag = 0
     }
  }
  result = (isMinus?'-':'') + result.replace(/^0+/, '')
  return result
}

/**
 * Multiplying large numbers of two string types
 *
 * @param {string} num1 a non-negative integer value of string type
 * @param {string} num2 a non-negative integer value of string type
 * @return {string} the result of multiplying two large numbers
 * 
 * Example: 
 *   mul('789120039', '23432345992)
 * result is '-22643225953'
 */
function mul(num1, num2) {
  if(num1 === '0' || num2 === '0') return '0'
  let flag = 0,
      result = '0',
      tempResult = '',
      temp = 0
  for(let i=num2.length-1; i>=0; i--) {
    flag = 0
    tempResult = ''
    temp = 0
    for(let j=num1.length-1; j>=0; j--) {
      temp = parseInt(num2[i])*parseInt(num1[j]) + flag
      tempResult = (temp%10) + tempResult
      flag = parseInt(temp/10)
    }
    tempResult = (flag>0?flag:'') + tempResult
    result = add(result, tempResult+'0'.repeat(num2.length-1-i))
  }
  return result
}


function lt(num1, num2) {
  if(num1.length < num2.length) {
    return true
  } else if(num1.length === num2.length) {
    return num1 < num2
  } else {
    return false;
  }
}

function lte(num1, num2) {
  if(num1.length < num2.length) {
    return true
  } else if(num1.length === num2.length) {
    return num1 <= num2
  } else {
    return false
  }
}

function eq(num1, num2) {
  return num1 === num2
}


function fact(num) {
  let result = '1'
  for(let i='1'; lte(i, num); i=add(i, '1')){
    result = mul(result, i)
  }
  return result
}
