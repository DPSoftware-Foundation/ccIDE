const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['colors_color_picker'] = function(block, generator) {
    var color = block.getFieldValue('COLOR');

    return [color, generator.ORDER_NONE];
};

luaGenerator.forBlock['colors_combine'] = function(block, generator) {
    var colorArray = generator.valueToCode(block, 'COLORARRAY', generator.ORDER_ATOMIC);

    return [`colors.combine(table.unpack(${colorArray}))`, generator.ORDER_NONE];
};

luaGenerator.forBlock['colors_subtract'] = function(block, generator) {
    var colorArray = generator.valueToCode(block, 'COLORARRAY', generator.ORDER_ATOMIC);
    var color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC);

    return [`colors.subtract(${color}, table.unpack(${colorArray}))`, generator.ORDER_NONE];
};

