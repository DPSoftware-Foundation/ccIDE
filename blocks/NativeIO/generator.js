const { luaGenerator } = require('blockly/lua');

if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['io_open'] = function(block, generator) {
    const filename = generator.valueToCode(block, 'FILENAME', generator.ORDER_ATOMIC);
    const mode = block.getFieldValue('MODE');
    const code = `io.open(${filename}, "${mode}")`;
    return [code, generator.ORDER_NONE];
};

luaGenerator.forBlock['io_close'] = function(block, generator) {
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const code = `${file}:close()\n`;
    return code;
};

luaGenerator.forBlock['io_read'] = function(block, generator) {
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const format = block.getFieldValue('FORMAT');
    const code = `${file}:read("${format}")`;
    return [code, generator.ORDER_NONE];
};

luaGenerator.forBlock['io_write'] = function(block, generator) {
    const data = generator.valueToCode(block, 'DATA', generator.ORDER_NONE) || '""';
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const code = `${file}:write(${data})\n`;
    return code;
};

luaGenerator.forBlock['io_seek'] = function(block, generator) {
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const position = generator.valueToCode(block, 'POSITION', generator.ORDER_ATOMIC);
    const offset = generator.valueToCode(block, 'OFFSET', generator.ORDER_ATOMIC);
    const code = `${file}:seek("${position}", ${offset})`;
    return [code, generator.ORDER_NONE];
};

luaGenerator.forBlock['io_lines'] = function(block, generator) {
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const code = `${file}:lines()`;
    return [code, generator.ORDER_NONE];
};

luaGenerator.forBlock['io_flush'] = function(block, generator) {
    const file = generator.valueToCode(block, 'FILE', generator.ORDER_ATOMIC);
    const code = `${file}:flush()\n`;
    return code;
};