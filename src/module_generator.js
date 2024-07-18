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

    return [`table.pack(${arg})`, luaGenerator.ORDER_NONE];
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

    return [`[${key}] = ${value}`, luaGenerator.ORDER_NONE];
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