const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary-
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Define your custom block handler
luaGenerator.forBlock['sys_sleep'] = function(block, generator) {
    var sleepfor = generator.valueToCode(block, 'SLEEPSEC', generator.ORDER_OVERRIDES);

    var code = `sleep(${sleepfor})\n`;
    return code;
};

luaGenerator.forBlock['sys_utils_table_variable_pack'] = function(block, generator) {
    var args = generator.valueToCode(block, 'RETURN_ARGS', generator.ORDER_NONE);

    return [`table.pack(${args})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sys_utils_get_value_from_table_with_index'] = function(block, generator) {
    var table = generator.valueToCode(block, 'TABLE', generator.ORDER_NONE);
    var index = generator.valueToCode(block, 'INDEX', generator.ORDER_NONE);

    return [`${table}[${index}]`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sys_utils_get_type'] = function(block, generator) {
    var input = generator.valueToCode(block, 'INPUT', generator.ORDER_NONE);

    return [`type(${input})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sys_table_unpack_to_args'] = function(block, generator) {
    var table = generator.valueToCode(block, 'TABLE', generator.ORDER_NONE);

    return [`table.unpack(${table})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['sys_table_add_key_value'] = function(block, generator) {
    var key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE);
    var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
    var shorted = block.getFieldValue('SHORT') == 'TRUE';
    if (!shorted) {
        return [`[${key}] = ${value}`, luaGenerator.ORDER_NONE];
    } else {
        return [`${key} = ${value}`, luaGenerator.ORDER_NONE];
    }
};

luaGenerator.forBlock['sys_table_append_data'] = function(block, generator) {
    var data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE);
    var table = generator.valueToCode(block, 'TABLE', generator.ORDER_NONE);

    return `table.insert(${table}, ${data})\n`;
};

luaGenerator.forBlock['sys_table_append_data'] = function(block, generator) {
    var data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE);
    var table = generator.valueToCode(block, 'TABLE', generator.ORDER_NONE);

    return `table.insert(${table}, ${data})\n`;
};

// Define your custom block handler
luaGenerator.forBlock['ide_addcode'] = function(block, generator) {
    var codefromuser = generator.valueToCode(block, 'CODE', generator.ORDER_ATOMIC);

    // Remove all occurrences of the matched characters
    const cleanedStr = codefromuser.replace(/[']/g, '');
    return cleanedStr+"\n";
};

luaGenerator.forBlock['ide_start'] = function(block, generator) {
    var docode = generator.statementToCode(block, 'DO');

    var code =
`
function main()
${docode}
end

main()
`
    return code;
};


luaGenerator.forBlock['sys_exit'] = function(block, generator) {
    return `exit()\n`;
};

luaGenerator.forBlock['sys_write'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE);

    return `write(${text})\n`;
};

luaGenerator.forBlock['sys_print_error'] = function(block, generator) {
    var error = generator.valueToCode(block, 'ERROR', generator.ORDER_NONE);

    return `printError(${error})\n`;
};

luaGenerator.forBlock['sys_mc_std_color'] = function(block, generator) {
    var color = block.getFieldValue('COLOR');

    return [`"${color}"`, luaGenerator.ORDER_NONE];
};