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

// Generator for Player Detector

luaGenerator.forBlock['advanced_peripherals_player_detector_get_player_pos'] = function(block, generator) {
    var player = generator.valueToCode(block, "PLAYER", generator.ORDER_ATOMIC)
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getPlayer(${player})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_get_online_player'] = function(block, generator) {
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getOnlinePlayers()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_get_player_in_range'] = function(block, generator) {
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getPlayersInRange(${range})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_get_players_in_coords'] = function(block, generator) {
    var FX = generator.valueToCode(block, 'FX', generator.ORDER_ATOMIC);
    var FY = generator.valueToCode(block, 'FY', generator.ORDER_ATOMIC);
    var FZ = generator.valueToCode(block, 'FZ', generator.ORDER_ATOMIC);
    var TX = generator.valueToCode(block, 'TX', generator.ORDER_ATOMIC);
    var TY = generator.valueToCode(block, 'TY', generator.ORDER_ATOMIC);
    var TZ = generator.valueToCode(block, 'TZ', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getPlayersInCoords({x=${FX}, y=${FY}, z=${FZ}}, {x=${TX}, y=${TY}, z=${TZ}})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_get_players_in_cubic'] = function(block, generator) {
    var width = generator.valueToCode(block, 'WIDTH', generator.ORDER_ATOMIC);
    var height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC);
    var depth = generator.valueToCode(block, 'DEPTH', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.getPlayersInCubic(${width}, ${height}, ${depth})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_player_in_range'] = function(block, generator) {
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayerInRange(${range}, ${player})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_player_in_coords'] = function(block, generator) {
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var FX = generator.valueToCode(block, 'FX', generator.ORDER_ATOMIC);
    var FY = generator.valueToCode(block, 'FY', generator.ORDER_ATOMIC);
    var FZ = generator.valueToCode(block, 'FZ', generator.ORDER_ATOMIC);
    var TX = generator.valueToCode(block, 'TX', generator.ORDER_ATOMIC);
    var TY = generator.valueToCode(block, 'TY', generator.ORDER_ATOMIC);
    var TZ = generator.valueToCode(block, 'TZ', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayerInCoords({x=${FX}, y=${FY}, z=${FZ}}, {x=${TX}, y=${TY}, z=${TZ}}, ${player})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_player_in_cubic'] = function(block, generator) {
    var player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC);
    var width = generator.valueToCode(block, 'WIDTH', generator.ORDER_ATOMIC);
    var height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC);
    var depth = generator.valueToCode(block, 'DEPTH', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayerInCubic(${width}, ${height}, ${depth}, ${player})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_players_in_range'] = function(block, generator) {
    var range = generator.valueToCode(block, 'RANGE', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayersInRange(${range})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_players_in_coords'] = function(block, generator) {
    var FX = generator.valueToCode(block, 'FX', generator.ORDER_ATOMIC);
    var FY = generator.valueToCode(block, 'FY', generator.ORDER_ATOMIC);
    var FZ = generator.valueToCode(block, 'FZ', generator.ORDER_ATOMIC);
    var TX = generator.valueToCode(block, 'TX', generator.ORDER_ATOMIC);
    var TY = generator.valueToCode(block, 'TY', generator.ORDER_ATOMIC);
    var TZ = generator.valueToCode(block, 'TZ', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayersInCoords({x=${FX}, y=${FY}, z=${FZ}}, {x=${TX}, y=${TY}, z=${TZ}})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_player_detector_is_players_in_cubic'] = function(block, generator) {
    var width = generator.valueToCode(block, 'WIDTH', generator.ORDER_ATOMIC);
    var height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC);
    var depth = generator.valueToCode(block, 'DEPTH', generator.ORDER_ATOMIC);
    var detector = generator.valueToCode(block, 'DETECTOR', generator.ORDER_ATOMIC);

    return [`${detector}.isPlayersInCubic(${width}, ${height}, ${depth})`, luaGenerator.ORDER_NONE];
};

// Generator for Inventory Manager

luaGenerator.forBlock['advanced_peripherals_inv_manager_add_item_to_player'] = function(block, generator) {
    var item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC);
    var toslot = generator.valueToCode(block, 'TOSLOT', generator.ORDER_ATOMIC);
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return `${manager}.addItemToPlayer("${side}", {name=${item}, toSlot=${toslot}, count=${count}})\n`;
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_remove_item_from_player'] = function(block, generator) {
    var item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC);
    var fromslot = generator.valueToCode(block, 'FROMSLOT', generator.ORDER_ATOMIC);
    var count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC);
    var toslot = generator.valueToCode(block, 'TOSLOT', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return `${manager}.removeItemFromPlayer("${side}", {name=${item}, toSlot=${toslot}, fromSlot=${fromslot}, count=${count}})\n`;
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_armor'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getArmor()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_items'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getItems()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_owner'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getOwner()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_is_player_equipped'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.isPlayerEquipped()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_is_wearing'] = function(block, generator) {
    var slot = generator.valueToCode(block, 'SLOT', generator.ORDER_ATOMIC);
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.isWearing(${slot})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_item_in_hand'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getItemInHand()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_item_in_offhand'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getItemInOffHand()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_free_slot'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getFreeSlot()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_is_space_available'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.isSpaceAvailable()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_inv_manager_get_empty_space'] = function(block, generator) {
    var manager = generator.valueToCode(block, 'MANAGER', generator.ORDER_ATOMIC);

    return [`${manager}.getEmptySpace()`, luaGenerator.ORDER_NONE];
};

// Generator for NBT Storage

luaGenerator.forBlock['advanced_peripherals_nbt_storage_read'] = function(block, generator) {
    var nbtstorage = generator.valueToCode(block, 'NBTDEV', generator.ORDER_ATOMIC);

    return [`${nbtstorage}.read()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_nbt_storage_write_json'] = function(block, generator) {
    var nbtjson = generator.valueToCode(block, 'NBTJSON', generator.ORDER_ATOMIC);
    var nbtstorage = generator.valueToCode(block, 'NBTDEV', generator.ORDER_ATOMIC);

    return `${nbtstorage}.writeJson(${nbtjson})\n`;
};

luaGenerator.forBlock['advanced_peripherals_nbt_storage_write_table'] = function(block, generator) {
    var nbt = generator.valueToCode(block, 'NBT', generator.ORDER_ATOMIC);
    var nbtstorage = generator.valueToCode(block, 'NBTDEV', generator.ORDER_ATOMIC);

    return `${nbtstorage}.writeTable(${nbt})\n`;
};

// Generator for Block Reader

luaGenerator.forBlock['advanced_peripherals_block_reader_get_block_name'] = function(block, generator) {
    var reader = generator.valueToCode(block, 'READER', generator.ORDER_ATOMIC);

    return [`${reader}.getBlockName()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_block_reader_get_block_data'] = function(block, generator) {
    var reader = generator.valueToCode(block, 'READER', generator.ORDER_ATOMIC);

    return [`${reader}.getBlockData()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_block_reader_get_block_states'] = function(block, generator) {
    var reader = generator.valueToCode(block, 'READER', generator.ORDER_ATOMIC);

    return [`${reader}.getBlockStates()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_block_reader_is_tile_entity'] = function(block, generator) {
    var reader = generator.valueToCode(block, 'READER', generator.ORDER_ATOMIC);

    return [`${reader}.isTileEntity()`, luaGenerator.ORDER_NONE];
};

// Generator for Geo Scanner

luaGenerator.forBlock['advanced_peripherals_geo_scanner_get_fuel_level'] = function(block, generator) {
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.getFuelLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_geo_scanner_get_max_fuel_level'] = function(block, generator) {
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.getMaxFuelLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_geo_scanner_cost'] = function(block, generator) {
    var radius = generator.valueToCode(block, 'RADIUS', generator.ORDER_ATOMIC);
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.cost(${radius})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_geo_scanner_scan'] = function(block, generator) {
    var radius = generator.valueToCode(block, 'RADIUS', generator.ORDER_ATOMIC);
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.scan(${radius})`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_geo_get_scan_cooldown'] = function(block, generator) {
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.getScanCooldown()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_geo_chunk_analyze'] = function(block, generator) {
    var scanner = generator.valueToCode(block, 'SCANNER', generator.ORDER_ATOMIC);

    return [`${scanner}.chunkAnalyze()`, luaGenerator.ORDER_NONE];
};

// Generator for Redstone Integrator

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_get_input'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    return [`${integrator}.getInput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_get_output'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    return [`${integrator}.getOutput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_get_analog_input'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    return [`${integrator}.getAnalogInput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_get_analog_output'] = function(block, generator) {
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    return [`${integrator}.getAnalogOutput("${side}")`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_set_output'] = function(block, generator) {
    var powered = block.getFieldValue('POWERED');
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    var ispowerd;
    if (powered == "ON") {
        ispowerd = "true";
    } else {
        ispowerd = "false";
    }

    return `${integrator}.setOutput("${side}", ${ispowerd})\n`;
};

luaGenerator.forBlock['advanced_peripherals_redstone_integrator_set_analog_output'] = function(block, generator) {
    var power = generator.valueToCode(block, 'POWER', generator.ORDER_ATOMIC);
    var side = block.getFieldValue('SIDE');
    var integrator = generator.valueToCode(block, 'INTEGRATOR', generator.ORDER_ATOMIC);

    return `${integrator}.setOutput("${side}", ${power})\n`;
};

// Generator for Minecraft: Beacon

luaGenerator.forBlock['advanced_peripherals_mc_beacon_get_level'] = function(block, generator) {
    var beacon = generator.valueToCode(block, 'BEACON', generator.ORDER_ATOMIC);

    return [`${beacon}.getLevel()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_mc_beacon_get_primary_effect'] = function(block, generator) {
    var beacon = generator.valueToCode(block, 'BEACON', generator.ORDER_ATOMIC);

    return [`${beacon}.getPrimaryEffect()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_mc_beacon_get_secondary_effect'] = function(block, generator) {
    var beacon = generator.valueToCode(block, 'BEACON', generator.ORDER_ATOMIC);

    return [`${beacon}.getSecondaryEffect()`, luaGenerator.ORDER_NONE];
};

// Generator for Minecraft: Note Block

luaGenerator.forBlock['advanced_peripherals_mc_note_block_play_note'] = function(block, generator) {
    var noteblock = generator.valueToCode(block, 'NOTEBLOCK', generator.ORDER_ATOMIC);

    return `${noteblock}.playNote()\n`;
};

luaGenerator.forBlock['advanced_peripherals_mc_note_block_get_note'] = function(block, generator) {
    var noteblock = generator.valueToCode(block, 'NOTEBLOCK', generator.ORDER_ATOMIC);

    return [`${beacon}.getNote()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_mc_note_block_change_note_by'] = function(block, generator) {
    var to = generator.valueToCode(block, 'TO', generator.ORDER_ATOMIC); 
    var noteblock = generator.valueToCode(block, 'NOTEBLOCK', generator.ORDER_ATOMIC);

    return `${noteblock}.changeNoteBy(${to})\n`;
};

luaGenerator.forBlock['advanced_peripherals_mc_note_block_change_note'] = function(block, generator) {
    var noteblock = generator.valueToCode(block, 'NOTEBLOCK', generator.ORDER_ATOMIC);

    return `${noteblock}.changeNote()\n`;
};

// Generator for Botania: Flowers

luaGenerator.forBlock['advanced_peripherals_botania_flowers_get_mana'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.getMana()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_flowers_get_max_mana'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.getMaxMana()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_flowers_is_floating'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.isFloating()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_flowers_is_on_enchanted_soil'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.isOnEnchantedSoil()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_flowers_is_empty'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.isEmpty()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_flowers_is_full'] = function(block, generator) {
    var flower = generator.valueToCode(block, 'FLOWER', generator.ORDER_ATOMIC);

    return [`${flower}.isFull()`, luaGenerator.ORDER_NONE];
};

// Generator for Botania: Mana Pool

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_get_mana'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.getMana()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_get_max_mana'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.getMaxMana()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_get_mana_needed'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.getManaNeeded()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_is_empty'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.isEmpty()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_is_full'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.isFull()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_can_charge_item'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.canChargeItem()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_has_items'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.hasItems()`, luaGenerator.ORDER_NONE];
};

luaGenerator.forBlock['advanced_peripherals_botania_mana_pool_get_items'] = function(block, generator) {
    var pool = generator.valueToCode(block, 'POOL', generator.ORDER_ATOMIC);

    return [`${pool}.getItems()`, luaGenerator.ORDER_NONE];
};