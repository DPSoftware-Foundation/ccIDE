const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['rednet_open'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');

    var code = '';
    if (side == "all") {
        code = `peripheral.find("modem", rednet.open)`;
    } else {
        code = `rednet.open("${side}")`
    }

    return code + "\n";
};

luaGenerator.forBlock['rednet_close'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');

    var code = '';
    if (side == "all") {
        code = `peripheral.find("modem", rednet.close)`;
    } else {
        code = `rednet.close("${side}")`
    }

    return code + "\n";
};

luaGenerator.forBlock['rednet_isopen'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');

    var code = '';
    if (side == "all") {
        code = `rednet.isOpen()`;
    } else {
        code = `rednet.isOpen("${side}")`
    }

    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['rednet_send'] = function(block, generator) {
    var data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE);
    var id = generator.valueToCode(block, 'ID', generator.ORDER_NONE);
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);

    return `rednet.send(${id}, ${data}, ${protocol})\n`;
};

luaGenerator.forBlock['rednet_broadcast'] = function(block, generator) {
    var data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE);
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);

    return `rednet.broadcast(${data}, ${protocol})\n`;
};

luaGenerator.forBlock['rednet_receive'] = function(block, generator) {
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);
    var timeout = generator.valueToCode(block, 'TIMEOUT', generator.ORDER_NONE);

    var code = '';
    if (timeout == 0) {
        code = `rednet.receive(${protocol})`
    } else {
        code = `rednet.receive(${protocol}, ${timeout})`
    }

    return [code, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['rednet_host'] = function(block, generator) {
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);
    var hostname = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return `rednet.host(${protocol}, ${hostname})\n`;
};

luaGenerator.forBlock['rednet_unhost'] = function(block, generator) {
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);

    return `rednet.unhost(${protocol})\n`;
};

luaGenerator.forBlock['rednet_lookup'] = function(block, generator) {
    var protocol = generator.valueToCode(block, 'PROTO', generator.ORDER_NONE);
    var hostname = generator.valueToCode(block, 'NAME', generator.ORDER_NONE);

    return [`rednet.lookup(${protocol}, ${hostname})`, luaGenerator.ORDER_NONE];
};
