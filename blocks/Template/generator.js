const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Math operation block
luaGenerator.forBlock['math_operation'] = function(block, generator) {
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

// Print text block
luaGenerator.forBlock['text_print'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || '\'\'';
    var code = `print(${text})\n`;
    return code;
};

// If condition block
luaGenerator.forBlock['controls_if'] = function(block, generator) {
    var condition = generator.valueToCode(block, 'IF0', generator.ORDER_NONE) || 'false';
    var branch = generator.statementToCode(block, 'DO0');
    var code = `if ${condition} then\n${branch}\nend\n`;
    return code;
};

// Set variable block
luaGenerator.forBlock['variables_set'] = function(block, generator) {
    var variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
    var code = `${variable} = ${value}\n`;
    return code;
};
