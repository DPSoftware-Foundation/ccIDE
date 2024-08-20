// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['peripheral_get_names'] = function(block, generator) {
    return ["peripheral.getNames()", luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_is_present'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);

    return [`peripheral.isPresent(${name})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_get_type'] = function(block, generator) {
    var device = generator.valueToCode(block, 'DEVICE', generator.ORDER_ATOMIC);

    return [`peripheral.getType(${device})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_has_type'] = function(block, generator) {
    var device = generator.valueToCode(block, 'DEVICE', generator.ORDER_ATOMIC);
    var type = generator.valueToCode(block, 'TYPE', generator.ORDER_ATOMIC);

    return [`peripheral.hasType(${device}, ${type})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_get_methods'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);

    return [`peripheral.getMethods(${name})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_get_name'] = function(block, generator) {
    var device = generator.valueToCode(block, 'DEVICE', generator.ORDER_ATOMIC);

    return [`peripheral.getName(${device})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_call'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);
    var method = generator.valueToCode(block, 'METHOD', generator.ORDER_ATOMIC);
    var args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC);

    if (block.outputConnection && block.outputConnection.targetConnection) {
        return [`peripheral.call(${name}, ${method}, ${args})`, luaGenerator.ORDER_NONE];
    } else {
        return `peripheral.call(${name}, ${method}, ${args})\n`
    }    
};

luaGenerator.forBlock['peripheral_wrap'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);

    return [`peripheral.wrap(${name})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['peripheral_find'] = function(block, generator) {
    var name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC);

    return [`peripheral.find(${name})`, luaGenerator.ORDER_NONE];
};