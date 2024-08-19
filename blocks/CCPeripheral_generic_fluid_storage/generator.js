// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['periph_gen_fluid_tanks'] = function(block, generator) {
    var tanks = generator.valueToCode(block, 'TANKS', generator.ORDER_NONE);

    return [`${tanks}.tanks()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_fluid_transfer'] = function(block, generator) {
    var fluidname = generator.valueToCode(block, 'FLUIDNAME', generator.ORDER_ATOMIC);
    var tanks1 = generator.valueToCode(block, 'TANKS1', generator.ORDER_ATOMIC);
    var mode = block.getFieldValue('MODE');
    var tanks2 = generator.valueToCode(block, 'TANKS2', generator.ORDER_ATOMIC);
    var limit = generator.valueToCode(block, 'LIMIT', generator.ORDER_ATOMIC);

    if (mode == "PUSH") {
        return `${tanks1}.pushFluid(peripheral.getName(${tanks2}), ${limit}, ${fluidname})\n`
    } else {
        return `${tanks1}.pullFluid(peripheral.getName(${tanks2}), ${limit}, ${fluidname})\n`
    }
};
