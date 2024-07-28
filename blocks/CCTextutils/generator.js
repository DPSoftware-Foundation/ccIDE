// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

luaGenerator.forBlock['textutils_slow_write'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var rate = generator.valueToCode(block, 'RATE', generator.ORDER_ATOMIC);

    return `textutils.slowWrite(${text}, ${rate})\n`;
};

luaGenerator.forBlock['textutils_slow_print'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var rate = generator.valueToCode(block, 'RATE', generator.ORDER_ATOMIC);

    return `textutils.slowPrint(${text}, ${rate})\n`;
};

luaGenerator.forBlock['textutils_format_time'] = function(block, generator) {
    var time = generator.valueToCode(block, 'TIME', generator.ORDER_ATOMIC);
    var is24hour = generator.valueToCode(block, '24H', generator.ORDER_ATOMIC);

    return [`textutils.formatTime(${time}, ${is24hour})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_paged_print'] = function(block, generator) {
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var freeline = generator.valueToCode(block, 'FREELINES', generator.ORDER_ATOMIC);

    return `textutils.pagedPrint(${text}, ${freeline})\n`;
};

luaGenerator.forBlock['textutils_tabulate'] = function(block, generator) {
    var args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC);

    return `textutils.tabulate(${args})\n`;
};

luaGenerator.forBlock['textutils_paged_tabulate'] = function(block, generator) {
    var args = generator.valueToCode(block, 'ARGS', generator.ORDER_ATOMIC);

    return `textutils.pagedTabulate(${args})\n`;
};

luaGenerator.forBlock['textutils_empty_json_array'] = function(block, generator) {
    return [`textutils.textutils_empty_json_array`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_json_null'] = function(block, generator) {
    return [`textutils.json_null`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_serialize'] = function(block, generator) {
    var object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC);
    var compact = block.getFieldValue('COMPACT') == 'TRUE';
    var repetitions = block.getFieldValue('ALLOWREPETI') == 'TRUE';


    return [`textutils.serialize(${object}, {compact=${compact}, allow_repetitions=${repetitions}})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_unserialize'] = function(block, generator) {
    var object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC);

    return [`textutils.unserialize(${object})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_serialize_json'] = function(block, generator) {
    var object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC);
    var nbt = block.getFieldValue('NBT') == 'TRUE';
    var unicode = block.getFieldValue('UNICODE') == 'TRUE';
    var repetitions = block.getFieldValue('ALLOWREPETI') == 'TRUE';
    
    return [`textutils.serializeJSON(${object}, {nbt_style=${nbt}, unicode_strings=${unicode}, allow_repetitions=${repetitions}})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_unserialize_json'] = function(block, generator) {
    var object = generator.valueToCode(block, 'OBJECT', generator.ORDER_ATOMIC);
    var nbt = block.getFieldValue('NBT') == 'TRUE';
    var parse_null = block.getFieldValue('PARSENULL') == 'TRUE';
    var parse_empty_array = block.getFieldValue('PARSEEA') == 'TRUE';
    
    return [`textutils.unserializeJSON(${object}, {nbt_style=${nbt}, parse_null=${parse_null}, parse_empty_array=${parse_empty_array}})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_url_encode'] = function(block, generator) {
    var url = generator.valueToCode(block, 'URL', generator.ORDER_ATOMIC);

    return [`textutils.urlEncode(${url})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['textutils_complete'] = function(block, generator) {
    var value_search_text = generator.valueToCode(block, 'SEARCH_TEXT', Blockly.Lua.ORDER_ATOMIC) || '""';
    var value_search_table = generator.valueToCode(block, 'SEARCH_TABLE', Blockly.Lua.ORDER_ATOMIC) || '_G';
    
    if (value_search_table == "") {
        return [`textutils.complete(${value_search_text})`];
    } else {
        return [`textutils.complete(${value_search_text}, ${value_search_table})`];
    }
};

