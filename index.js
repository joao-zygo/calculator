const operators = [
  'soma',
  'subtração',
  'multiplicação',
  'divisão',
  'potência',
]

/**
 * @typedef {(numbers: number[]) => number} CalculatorFunctionType
 * @typedef {Object.<string, CalculatorFunctionType>} CalculatorType
 */

/**
 * @type {CalculatorType} 
 */
const calculator = {
  'soma': ([number1, number2]) => number1 + number2,
  'subtração': ([number1, number2]) => number1 - number2,
  'multiplicação': ([number1, number2]) => number1 * number2,
  'divisão' : ([number1, number2]) => number1 / number2,
  'potência': ([number1, number2]) => Math.pow(number1, number2)
}

function createCalculator() {
  const html = document.createElement("div")
  html.id = 'calculadora'

  const title = document.createElement('h1')
  title.innerText = 'Calculadora'
  html.appendChild(title)

  const select = document.createElement('select')
  const placeholder = document.createElement('option')
  placeholder.innerText = 'Escolha uma operação'
  placeholder.selected = true
  placeholder.disabled = true
  placeholder.hidden = true
  select.appendChild(placeholder)

  operators.forEach(operator => {
    const option = document.createElement('option')
    option.value = operator
    option.innerText = operator

    select.appendChild(option)
  })
  html.appendChild(select)

  const [input, label] = createInput('Primeiro Número', 'number_1')
  label.appendChild(input)
  html.appendChild(label)

  const [input2, label2] = createInput('Segundo Número', 'number_2')
  label2.appendChild(input2)
  html.appendChild(label2)

  const response = document.createElement('div')
  const responseTitle = document.createElement('h1')
  responseTitle.innerText = 'Resultado: '

  const button = document.createElement('button')
  button.innerText = 'Calcular'
  button.addEventListener('click', () => {
    const operation = select.value
    const number1 = Number(input.value)
    const number2 = Number(input2.value)
    
    console.log('asdasd')

    const result = document.createElement('p')
    if (isNaN(number1) || isNaN(number2)) {
      result.innerText = 'Insira um número!'
      response.innerHTML = ''
      response.appendChild(result)

      return
    }
    
    const calculate = calculator[operation]
    if (!calculate) {
      result.innerText = 'Escolha uma operação válida!'
      response.innerHTML = ''
      response.appendChild(result)

      return
    }

    const resultValue = calculate([number1, number2])
    
    console.log(resultValue)
    if (isNaN(resultValue) || resultValue === Infinity) {
      result.innerText = 'Error '
      response.innerHTML = ''
      response.appendChild(result)

      return
    }

    result.innerText = resultValue

    response.innerHTML = ''
    response.appendChild(result)
  })

  html.appendChild(button)
  html.appendChild(responseTitle)
  html.appendChild(response)
  document.querySelector('#root').appendChild(html)
}

/**
 * Retorna um input e um label
 * @param {string} labelText Texto que aparece no label do campo
 * @param {string} id Id do input
 * @returns {[HTMLInputElement, HTMLLabelElement]}
 */
function createInput(labelText, id) {
  const input = document.createElement('input')
  input.type = 'number'
  input.id = id

  const label = document.createElement('label')
  label.innerText = labelText
  input.for = id

  return [input, label]
}

addEventListener('DOMContentLoaded', createCalculator)