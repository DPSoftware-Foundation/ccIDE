// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['keys_get_key_number'] = function(block, generator) {
    return [block.getFieldValue('KEY'), generator.ORDER_NONE];
};

luaGenerator.forBlock['text_print'] = function(block, generator) {
    var key = generator.valueToCode(block, 'KEY', generator.ORDER_NONE);
    return [`keys.getName(${key})`, luaGenerator.ORDER_NONE];
};

