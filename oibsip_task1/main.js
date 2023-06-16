
// || LIGHT AND DARK MODE THEME
const app = document.querySelector('.app');
const calculator = document.querySelector('.calculator');
const btn = document.querySelector('.btn');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', ()=>{
    calculator.classList.toggle('light-mode')
    btn.classList.toggle('light-mode')
    app.classList.toggle('light-mode')
})

// || MAIN FUNCTIONALITY
let keys = document.querySelectorAll('.key');
let displayInput = document.querySelector('.input');
let displayOutput = document.querySelector('.output');
let input = '';

keys.forEach(key => {
    
    const value = key.dataset.key;

    key.addEventListener('click', ()=> {

        if(value == 'copy')
        {
        copyContent();
        }
       else if(value == 'clear')
        {
            displayInput.innerHTML = '';
            displayOutput.innerHTML = '';
            input = '';
        }
       else if(value == 'backspace')
       {
         input = input.slice(0, -1);
         displayInput.innerHTML = input;
       }
       else if(value == '=')
       {
        let result = eval(checkOperator(input));
        displayInput.innerHTML = input + '=';
        displayOutput.innerHTML = validateOutput(result);
        input = '';
       }
       else {
        if(validateInput(value))
        {
            displayInput.innerHTML = input;
            displayInput.innerHTML += value;
            input += value;
        }
       }

    })

})

// Display result in input field
displayOutput.addEventListener('click', ()=>{
   let pre = displayOutput.innerHTML;
   displayInput.innerHTML = pre + '=';
   pre = pre.replace(/,/g, '');
   input = pre;
})

// Check operator
function checkOperator(input)
{
   let inputArray = input.split('');

   for(let i in inputArray)
   {
    if(inputArray[i] == '%'){
        inputArray[i] ='/100';
    }
   }
   return inputArray.join('');
}


// check whether the input is valied or not
function validateInput(value)
{

   let lastValue = input.slice(-1);
   let operators = ['+', '-', '*', '/', '%', '='];

   if(lastValue == '.' && value == '.') 
   {
    return false;
   }

   else if (operators.includes(value)) {
     if(operators.includes(lastValue)) return false;
     else true
   }
   
   return  true;
}

// Validate output before display 
function validateOutput(output)
{
    let output_string = output.toString();
    let decimal = output_string.split('.')[1];
    output_string = output_string.split('.')[0];
    let ouput_array = output_string.split('')

    if(ouput_array.length > 3){
        for(let i=ouput_array.length -3; i > 0; i -= 3)
        {
            ouput_array.splice(i, 0, ',');
        }
    }

    if(decimal) {
        ouput_array.push('.');
        ouput_array.push(decimal);
    }

    return ouput_array.join("");
}


// Copy result
const copyContent = async () => {
  let  text = displayOutput.innerHTML;
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
} 
                    