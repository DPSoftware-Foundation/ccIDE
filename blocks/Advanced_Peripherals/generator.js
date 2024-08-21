// this file not for generator only

const { luaGenerator } = require('blockly/lua');

// Check if luaGenerator.forBlock is defined and initialize if necessary
if (!luaGenerator.forBlock) {
    luaGenerator.forBlock = {};
}

// Generator for chatbox

luaGenerator.forBlock['advanced_peripherals_chatbox_send_message'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendMessage(${text}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

luaGenerator.forBlock['advanced_peripherals_chatbox_send_message_to_player'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendMessageToPlayer(${text}, ${player}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

luaGenerator.forBlock['advanced_peripherals_chatbox_send_toast_to_player'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC);
    var title = generator.valueToCode(block, 'TITLE', generator.ORDER_ATOMIC);
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendToastToPlayer(${text}, ${title}, ${player}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

luaGenerator.forBlock['advanced_peripherals_chatbox_send_message_formatted'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var json = generator.valueToCode(block, 'JSON', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendFormattedMessage(${json}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

luaGenerator.forBlock['advanced_peripherals_chatbox_send_message_formatted_to_player'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var json = generator.valueToCode(block, 'JSON', generator.ORDER_ATOMIC);
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendFormattedMessageToPlayer(${json}, ${player}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

luaGenerator.forBlock['advanced_peripherals_chatbox_send_toast_formatted_to_player'] = function(block, generator) {
    var chatbox = generator.valueToCode(block, 'CHATBOX', generator.ORDER_ATOMIC);
    var json = generator.valueToCode(block, 'JSON', generator.ORDER_ATOMIC);
    var title = generator.valueToCode(block, 'TITLE', generator.ORDER_ATOMIC);
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var prefix = generator.valueToCode(block, 'PREFIX', generator.ORDER_ATOMIC);
    var bracket = generator.valueToCode(block, 'BRACKET', generator.ORDER_ATOMIC);
    var bracketcolor = generator.valueToCode(block, 'BRACKETCOLOR', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);

    return `${chatbox}.sendFormattedToastToPlayer(${json}, ${title}, ${player}, ${prefix}, ${bracket}, ${bracketcolor}, ${range})\n`;
};

// Generator for Energy Detector

luaGenerator.forBlock['advanced_peripherals_energy_detector_get_transfer_rate'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getTransferRate()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_energy_detector_get_transfer_rate_limit'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getTransferRateLimit()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_energy_detector_set_transfer_rate_limit'] = function(block, generator) {
    var limit = generator.valueToCode(block, 'TFRLIMIT', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return `${detector}.setTransferRateLimit(${limit})\n`;
};

// Generator for Environment Detector

luaGenerator.forBlock['advanced_peripherals_env_detector_get_biome'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getBiome()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_block_light_level'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getBlockLightLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_day_light_level'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getDayLightLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_sky_light_level'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getSkyLightLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_dimension_name'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getDimensionName()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_dimension_PaN'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getDimensionPaN()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_dimension_provider'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getDimensionProvider()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_moon_id'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getMoonId()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_moon_name'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getMoonName()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_time'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getTime()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_radiation'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getRadiation()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_get_radiation_raw'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getRadiationRaw()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_dimension'] = function(block, generator) {
    var dimension = generator.valueToCode(block, 'DIMENSION', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isDimension(${dimension})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_moon'] = function(block, generator) {
    var id = generator.valueToCode(block, 'MOONID', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isMoon(${id})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_raining'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isRaining()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_sunny'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isSunny()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_thunder'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isThunder()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_is_slime_chunk'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isSlimeChunk()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_list_dimensions'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.listDimensions()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_env_detector_scan_entities'] = function(block, generator) {
    var blockrange = generator.valueToCode(block, "BLOCKSRANGE", generator.ORDER_ATOMIC)
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.scanEntities(${blockrange})`, luaGenerator.ORDER_NONE];
};