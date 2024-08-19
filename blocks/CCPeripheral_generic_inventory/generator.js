// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['periph_gen_inv_size'] = function(block, generator) {
    var inv = generator.valueToCode(block, 'INV', generator.ORDER_NONE);

    return [`${inv}.size()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_inv_list'] = function(block, generator) {
    var inv = generator.valueToCode(block, 'INV', generator.ORDER_NONE);

    return [`${inv}.list()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_inv_get_item_detail'] = function(block, generator) {
    var inv = generator.valueToCode(block, 'INV', generator.ORDER_NONE);
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_NONE);

    return [`${inv}.getItemDetail(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_inv_get_item_limit'] = function(block, generator) {
    var inv = generator.valueToCode(block, 'INV', generator.ORDER_NONE);
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_NONE);

    return [`${inv}.getItemLimit(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['periph_gen_inv_transfer_items'] = function(block, generator) {
    var inv1 = generator.valueToCode(block, 'INV1', generator.ORDER_ATOMIC);
    var inv1slot = generator.valueToCode(block, 'INV1SLOT', generator.ORDER_ATOMIC);
    var mode = block.getFieldValue('MODE');
    var inv2 = generator.valueToCode(block, 'INV2', generator.ORDER_ATOMIC);
    var inv2slot = generator.valueToCode(block, 'INV2SLOT', generator.ORDER_ATOMIC);
    var limit = generator.valueToCode(block, 'LIMIT', generator.ORDER_ATOMIC);

    if (mode == "PUSH") {
        return `${inv1}.pushItems(peripheral.getName(${inv2}), ${inv1slot}, ${limit}, ${inv2slot})\n`
    } else {
        return `${inv1}.pullItems(peripheral.getName(${inv2}), ${inv2slot}, ${limit}, ${inv1slot})\n`
    }
};
