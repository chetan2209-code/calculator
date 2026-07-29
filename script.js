const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    } catch(error){
        display.value = "Error";
    }
}
function backspace(){
    display.value = display.value.slice(0, -1);
}

document.addEventListener("keydown", function(event){
    const key = event.key;

    if(!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)){
        appendToDisplay(key);
    } else if(key === 'Enter' || key === '='){
        calculate();
    } else if(key === 'Backspace'){
        backspace();
    } else if(key === 'Escape' || key.toLowerCase() === 'c')
        clearDisplay();
});