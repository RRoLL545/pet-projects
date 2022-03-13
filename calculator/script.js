//переменные для операций
var MemoryCurrentNumber = 0;      //Значение введённого операнда
var MemoryNewNumber = false;      //введён первый операнд
var MemoryPendingOperation = '';  //какой оператор нажат


//Обработка нажатия цифровых кнопок
function digitBtnPress(digit) {
  if (MemoryNewNumber) {
    display.value = digit;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = digit;
    } else {
      display.value += digit;
    }
  }
}

//Обработка нажатия кнопок операций
function operationBtnPress(operator) {
  let localOperationMemory = display.value; //значение операнда
  
  //Поставить(убирать) знак минус перед первым числом
  if ( MemoryPendingOperation === '' && MemoryNewNumber === false && operator === '-' && (localOperationMemory === '0' || localOperationMemory === '-') ) {
    if ( localOperationMemory[0] === '-') {
      display.value = localOperationMemory.slice(1);
      return;
    } else {
      display.value = operator;
      return;
    }
  }

  //Поставить знак минус перед вторым числом
  if ( MemoryNewNumber && MemoryPendingOperation !== '' && operator === '-') {
    display.value = operator;
    MemoryNewNumber = false;
    return;
    
  }

  //Убрать знак минус перед вторым числом
  if ( MemoryNewNumber === false && MemoryPendingOperation !== '' && operator === '-' && display.value === '-') {
    display.value = '0';
    MemoryNewNumber = true;
    return;
    
  }
  
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    //display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true; //Можно вводить второй операнд
    switch (MemoryPendingOperation) {
      case '+': 
        MemoryCurrentNumber += +localOperationMemory;
        if ( isFloat(MemoryCurrentNumber) ) {
          MemoryCurrentNumber = MemoryCurrentNumber.toFixed(10);
          MemoryCurrentNumber = removeExtraZero(MemoryCurrentNumber);
        } 
        break;
      case '-':
        MemoryCurrentNumber -= +localOperationMemory;
        if ( isFloat(MemoryCurrentNumber) ) {
          MemoryCurrentNumber = MemoryCurrentNumber.toFixed(10);
          MemoryCurrentNumber = removeExtraZero(MemoryCurrentNumber);
        }
        break;
      case '*': 
        MemoryCurrentNumber *= +localOperationMemory;
        if ( isFloat(MemoryCurrentNumber) ) {
          MemoryCurrentNumber = MemoryCurrentNumber.toFixed(10);
          MemoryCurrentNumber = removeExtraZero(MemoryCurrentNumber);
        }
        break;
      case '/': 
        MemoryCurrentNumber /= +localOperationMemory;
        break;
      case 'pow':
        MemoryCurrentNumber = MemoryCurrentNumber**localOperationMemory;
        break;
      default:
        MemoryCurrentNumber = +localOperationMemory;
        break;
    }
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = operator;
  }
}

//Обработка нажатия кнопок CE/C
function clearBtnPress(id) {
  if (id === 'ce') {
    display.value = '0';
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = false;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}

//Обработка нажатия кнопки "точка"
function decimalBtnPress() {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

//Квадратный корень
function evalSquare () {
  let localOperationMemory = display.value;
  if ( localOperationMemory < 0 ) {
    display.value = 'error';
    return;
  }
  if ( MemoryPendingOperation === '' || MemoryPendingOperation === '=' ) {
    display.value = Math.sqrt(localOperationMemory);
  }
  
}


//Проверяет наличие дробной части в результате вычислений
function isFloat(num) {
  if ( num % 1 !== 0 ) {
    return true;
  } else {
    return false;
  }
}

//Удаляет лишние нули
function removeExtraZero(str) {  
  while ( str[str.length-1] === '0' ) {
    str = str.slice(0,str.length-1);
  }  
  return str;
}