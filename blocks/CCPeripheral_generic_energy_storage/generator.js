// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['periph_gen_energy_get'] = function(block, generator) {
    var energy = generator.valueToCode(block, 'ENERGY', generator.ORDER_NONE);

    return [`${energy}.getEnergy()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_energy_get_capacity'] = function(block, generator) {
    var energy = generator.valueToCode(block, 'ENERGY', generator.ORDER_NONE);

    return [`${energy}.getEnergyCapacity()`, luaGenerator.ORDER_NONE];
};