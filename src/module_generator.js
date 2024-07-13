const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary-
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Define your custom block handler
luaGenerator.forBlock['sys_sleep'] = function(block, generator) {
    var sleepfor = generator.valueToCode(block, 'SLEEPSEC', generator.ORDER_OVERRIDES);

    var code = `sleep(${sleepfor})`;
    return code;
};
