let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        if (value === "=") {
            try {
                let expression = string;
                // Handle percentage calculations
                expression = expression.replace(
                    /(\d+\.?\d*)([\+\-])(\d+\.?\d*)%/g,
                    (match, num1, operator, num2) => {
                        let percentage = (parseFloat(num1) * parseFloat(num2)) / 100;
                        return operator === "+"
                            ? `${parseFloat(num1) + percentage}`
                            : `${parseFloat(num1) - percentage}`;
                    }
                );
                expression = expression.replace(
                    /(\d+\.?\d*)([\*\/])(\d+\.?\d*)%/g,
                    (match, num1, operator, num2) => {
                        let percentage = parseFloat(num2) / 100;
                        return operator === "*"
                            ? `${parseFloat(num1) * percentage}`
                            : `${parseFloat(num1) / percentage}`;
                    }
                );
                string = eval(expression).toString();
                input.value = string;
            }
            catch (error) {
                input.value = "Error";
                string = "";
            }
        }
        else if (value === "AC") {
            string = "";
            input.value = "";
        }
        else if (value === "DEL") {
            string = string.slice(0, -1);
            input.value = string;
        }
        else {
            string += value;
            input.value = string;
        }
    });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '%', '.'].includes(e.key)) {
        string += e.key;
        input.value = string;
    }
    else if (e.key === 'Enter') {
        try {
            string = eval(string).toString();
            input.value = string;
        }
        catch {
            input.value = "Error";
            string = "";
        }
    }
    else if (e.key === 'Backspace') {
        string = string.slice(0, -1);
        input.value = string;
    }
    else if (e.key === 'Delete') {
        string = "";
        input.value = "";
    }
});