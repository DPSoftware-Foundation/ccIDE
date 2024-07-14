const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary-
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Define your custom block handler
luaGenerator.forBlock['ide_addcode'] = function(block, generator) {
    var codefromuser = generator.valueToCode(block, 'CODE', generator.ORDER_ATOMIC);

    // Remove all occurrences of the matched characters
    const cleanedStr = codefromuser.replace(/[']/g, '');
    return cleanedStr+"\n";
};
