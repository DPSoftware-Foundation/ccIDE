const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['redstone_set_output'] = function(block, generator) {
    var state = block.getFieldValue('STATE');
    var side = block.getFieldValue('SIDE');
    
    if (state == "OFF") {
        var code = `rs.setOutput("${side}", true)`;
    } else {
        var code = `rs.setOutput("${side}", false)`;
    }

    return code + "\n";
};

luaGenerator.forBlock['redstone_get_output'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`rs.getOutput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['redstone_read_input'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return [`rs.getInput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['redstone_set_analog_output'] = function(block, generator) {
    var power = generator.valueToCode(block, 'POWER', generator.ORDER_NONE);
    var side = block.getFieldValue('SIDE');
    
    return `rs.setAnalogOutput("${side}", ${power})\n`;
};

luaGenerator.forBlock['redstone_get_analog_output'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return `rs.getAnalogOutput("${side}")\n`;
};

luaGenerator.forBlock['redstone_read_analog_input'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    
    return `rs.getAnalogInput("${side}")\n`;
};
