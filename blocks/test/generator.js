const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary-
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Define your custom block handler
luaGenerator.forBlock['custom_math_operation'] = function(block, generator) {
    var operator = block.getFieldValue('OPERATOR');
    var num1 = generator.valueToCode(block, 'NUM1', generator.ORDER_ATOMIC);
    var num2 = generator.valueToCode(block, 'NUM2', generator.ORDER_ATOMIC);

    var operatorSymbol = '';
    switch (operator) {
        case 'ADD':
            operatorSymbol = '+';
            break;
        case 'SUBTRACT':
            operatorSymbol = '-';
            break;
        case 'MULTIPLY':
            operatorSymbol = '*';
            break;
        case 'DIVIDE':
            operatorSymbol = '/';
            break;
        default:
            operatorSymbol = '+';
            break;
    }

    var code = `${num1} ${operatorSymbol} ${num2}`;
    return [code, generator.ORDER_ATOMIC];
};
