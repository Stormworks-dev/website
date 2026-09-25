(() => {
  // node_modules/vehicle-optimizer/src/components.js
  var defaultRotation = "1,0,0,0,1,0,0,0,1";
  var additiveComponents = /* @__PURE__ */ new Set([
    "additive_block",
    "button_keypad_large",
    "button_lock",
    "button_push",
    "button_push_2side",
    "button_keypad_small",
    "button_throttle_lever",
    "button_toggle",
    "button_toggle_2side",
    "small_light",
    "rotating_light",
    "searchlight",
    "searchlight_small",
    "searchlight_small_2",
    "artificial_horizon",
    "clock",
    "compass",
    "dial",
    "digital_display",
    "gauge_display",
    "indicator",
    "instrument_display",
    "sign"
  ]);
  var nonRotatingComponents = /* @__PURE__ */ new Set([
    "01_block_weight",
    "no_sleep",
    "map_icon"
  ]);
  var bcPreservedWithScComponents = /* @__PURE__ */ new Set([
    "microprocessor",
    "seat_passenger",
    "small_light",
    "multibody_compact_pivot_b",
    "instrument_display",
    "water_inlet",
    "rx_huge_v2",
    "rx_large_v2",
    "rx_med_v2",
    "rx_small_v2",
    "rx_video_r",
    "rx_video_x",
    "radar",
    "rope_hook_winch",
    "gps_sensor",
    "rope_hook_winch_small",
    "connector_electric",
    "door_panel_straight",
    "handle",
    "speaker",
    "mic",
    "button_throttle_lever",
    "button_keypad_small",
    "button_keypad_large",
    "window_1x1",
    "window_2x1",
    "window_narrow",
    "window_2x2",
    "window_3x2",
    "window_large",
    "window_1x1_wedge",
    "window_angle_m_1x2x2",
    "window_narrow_angle",
    "window_angle_xl_1x4x4",
    "window_angle_s_1x2",
    "window_angle_m_2x2x2",
    "window_angle_l_2x3x3",
    "window_angle_xl_2x4x4",
    "window_small_angle",
    "window_angle_m_3x2x2",
    "window_large_angle",
    "window_angle_xl_3x4x4",
    "window_corner_small",
    "window_corner",
    "window_corner_full_1x1",
    "window_corner_full_small",
    "window_corner_full_medium",
    "window_corner_full_large",
    "window_diamond_s_1x1",
    "window_diamond_m_1x2x3",
    "window_diamond_l_1x3x4",
    "window_diamond_xl_1x4x5",
    "window_diamond_m_2x2x3",
    "window_diamond_l_2x3x4",
    "window_diamond_xl_2x4x5",
    "window_diamond_m_3x2x3",
    "window_diamond_l_3x3x4",
    "window_diamond_xl_3x4x5",
    "window_1x1_inv_pyramid",
    "window_2x2_inv_pyramid",
    "window_1x1_pyramid",
    "window_2x2_pyramid",
    "window_corner_2",
    "multibody_robotic_hinge_01_a",
    "multibody_robotic_hinge_01_b",
    "radar_detector",
    "small_light_rgb",
    "radar_advanced_missile_laser",
    "seat_compact",
    "connector_hardpoint_b",
    "physics_sensor",
    "wind_sensor",
    "radar_advanced_phalanx",
    "connector_hardpoint_a",
    "searchlight_small",
    "button_toggle",
    "button_toggle_2side",
    "button_push",
    "button_push_2side",
    "inventory_outfit_parachute",
    "inventory_equipment_defibrillator",
    "trans_block_angle",
    "compass_sensor",
    "rope_hook",
    "laser_distance_sensor",
    "camera_med",
    "altimeter",
    "rotation_sensor",
    "seat_padded",
    "rope_hook_fluid",
    "trans_block_straight",
    "control_fin_small",
    "button_key",
    "indicator",
    "gate_float_constant",
    "sonar_advanced",
    "radar_advanced_dish",
    "dial",
    "compass",
    "multibody_compact_pivot_b",
    "ladder_small",
    "camera_small",
    "clock",
    "door_frame_corner",
    "linear_compact_module",
    "jet_engine_turbine_small",
    "jet_engine_duct_cross",
    "jet_engine_turbine_medium",
    "wing_small_front",
    "wing_large",
    "wing_medium",
    "wing_small",
    "wing_xl"
  ]);
  var scRemovableComponents = /* @__PURE__ */ new Set([
    "test_sc_removable_component",
    "jet_engine_turbine_small",
    "jet_engine_duct_cross",
    "jet_engine_turbine_medium",
    "multibody_compact_pivot_robotic_a",
    "multibody_compact_pivot_torque_a",
    "multibody_compact_pivot_velocity_a",
    "warhead_body_large",
    "warhead_large",
    "warhead_body_medium",
    "warhead_medium",
    "warhead_body_small",
    "warhead_small",
    "wheel_advanced_3",
    "wheel_advanced_3_sus",
    "wheel_advanced_5",
    "wheel_advanced_5_sus",
    "wheel_advanced_7",
    "wheel_advanced_9",
    "wheel_tank_drive_7",
    "wheel_tank_drive_5",
    "wheel_tank_drive_5_2",
    "wheel_tank_drive_1",
    "wheel_tank_drive_1_wide",
    "wheel_tank_7",
    "wheel_tank_5",
    "wheel_tank_5_2",
    "wheel_tank_1",
    "wheel_tank_1_wide",
    "train_wheels_piston_large",
    "train_wheels_piston_mid",
    "train_wheels_piston",
    "modular_engine_flywheel_5x5",
    "modular_engine_flywheel_3x3",
    "modular_engine_flywheel",
    "gyroscopic_stabilizer_small",
    "torque_clutch",
    "connector_hardpoint_b_round",
    "solid_rocket_small_fins",
    "radar_advanced_missile",
    "warhead_emp",
    "seat_saddle",
    "seat_saddle_passenger",
    "rx_directional",
    "rx_directional_large",
    "multibody_suspension_a",
    "trans_angle",
    "trans_corner",
    "trans_cross",
    "trans_cross_corner",
    "trans_omni",
    "trans_straight",
    "trans_t",
    "trans_t_corner",
    "modular_engine_clutch",
    "modular_engine_clutch_3x3",
    "modular_engine_clutch_5x5",
    "azimuth_thruster",
    "aircraft_propeller",
    "giga_prop_small",
    "motor_large",
    "motor_medium",
    "motor_small",
    "propeller_pitch_large",
    "large_propeller",
    "propeller_pitch",
    "rotor_coaxial_large",
    "rotor_coaxial_light",
    "rotor_coaxial_small",
    "rotor_coaxial_light_end",
    "rotor_coaxial_prop",
    "rotor_coaxial_prop_small",
    "rotor_coaxial_prop_end",
    "rotor_coaxial_prop_small_end",
    "solid_rocket_nozzle_huge",
    "solid_rocket_nozzle_large",
    "solid_rocket_nozzle_medium",
    "solid_rocket_nozzle_small",
    "solid_rocket_small",
    "torque_meter",
    "camera_gimbal_laser",
    "camera_gimbal",
    "water_nozzle",
    "foghorn",
    "mineral_drill",
    "rotating_light",
    "searchlight",
    "searchlight_small_2",
    "transponder",
    "radiation_detector",
    "temperature_probe",
    "flag_small",
    "flag_medium",
    "flag_large",
    "tyre_large",
    "tyre_small",
    "railing_segment_corner_diag",
    "railing_segment_corner",
    "railing_segment_curve",
    "railing_segment_end",
    "railing_segment_end_diag",
    "railing_segment_extension",
    "railing_segment_extension_diag",
    "railing_extension_angle",
    "railing_segment_middle",
    "railing_segment_middle_diag",
    "air_filter",
    "modular_engine_air_ram",
    "scoop_intake_2",
    "heat_exchanger_2_2",
    "heat_exchanger_5_5",
    "heat_exchanger_9_9",
    "air_exchanger",
    "air_exchanger_5_2",
    "air_exchanger_5_3",
    "air_exchanger_9_3",
    "air_exchanger_9_5",
    "catalytic_converter",
    "cryo_cooler",
    "desalinator",
    "fluid_exhaust",
    "fluid_valve_flow",
    "fluid_radiator",
    "fluid_radiator_electric",
    "fluid_radiator_electric_5",
    "fluid_heat_sink",
    "fluid_valve_on_off",
    "fluid_valve_on_off_manual",
    "fluid_port_end",
    "fluid_pressure",
    "separator",
    "water_pump",
    "water_pump_manual",
    "fluid_valve_variable",
    "relief_valve_gas",
    "fluid_tank_compressed_gas_5_9",
    "fluid_tank_compressed_gas_3_7",
    "fluid_tank_compressed_gas_1_7",
    "fluid_tank_compressed_gas_1_3",
    "hydrogen_fuel_cell",
    "turbocharger",
    "turbocharger_small",
    "water_pump_large",
    "relief_valve_liquid",
    "intercooler",
    "intercooler_large",
    "slurry_filter",
    "steam_whistle",
    "generator_large",
    "generator_medium",
    "generator_small",
    "jet_engine_combustion_chamber",
    "jet_engine_compressor",
    "jet_engine_duct_angle",
    "jet_engine_duct_diagonal",
    "jet_engine_duct_straight",
    "jet_engine_duct_t",
    "jet_engine_exhaust_basic",
    "jet_engine_exhaust_afterburner",
    "jet_engine_exhaust_rotating",
    "jet_engine_intake_large",
    "jet_engine_intake_small",
    "gun_xl_barrel",
    "gun_xl_barrel_3",
    "gun_xl_barrel_2",
    "gun_xl_barrel_1",
    "gun_belt_corner_flat_xl",
    "gun_belt_receiver_xl",
    "gun_belt_corner_flat_reverse_xl",
    "gun_belt_corner_xl",
    "gun_belt_loader_xl",
    "gun_belt_flex_xl",
    "gun_belt_junction_xl",
    "gun_belt_straight_xl",
    "gun_xl_muzzle",
    "gun_xl_muzzle_2",
    "gun_xl_muzzle_1",
    "gun_drum_large",
    "gun_drum_medium",
    "gun_drum_small",
    "gun_belt_receiver",
    "gun_belt_corner_flat",
    "gun_belt_corner",
    "gun_belt_loader",
    "gun_belt_flex",
    "gun_belt_junction",
    "gun_belt_straight",
    "gun_l_barrel",
    "gun_l_barrel_2",
    "gun_l_barrel_3",
    "gun_l_barrel_1",
    "gun_belt_receiver_l",
    "gun_belt_corner_flat_l",
    "gun_belt_corner_flat_reverse_l",
    "gun_belt_corner_l",
    "gun_belt_loader_l",
    "gun_belt_flex_l",
    "gun_belt_junction_l",
    "gun_belt_straight_l",
    "gun_l_muzzle_2",
    "gun_l_muzzle",
    "gun_l_muzzle_1",
    "gun_xxl_barrel",
    "gun_belt_receiver_xxl",
    "gun_belt_corner_flat_xxl",
    "gun_belt_corner_flat_reverse_xxl",
    "gun_belt_corner_xxl",
    "gun_belt_loader_xxl",
    "gun_belt_flex_xxl",
    "gun_belt_junction_xxl",
    "gun_belt_straight_xxl",
    "gun_m_barrel_3",
    "gun_m_barrel",
    "gun_m_barrel_2",
    "gun_m_barrel_1",
    "gun_m_muzzle",
    "gun_m_muzzle_1",
    "gun_m_muzzle_2",
    "gun_s_barrel",
    "gun_s_muzzle_1",
    "gun_s_muzzle",
    "gun_s_muzzle_2",
    "gun_s_muzzle_3",
    "gun_xs",
    "gun_drum_xsmall",
    "gun_drum_xsmall_2",
    "gun_v_barrel",
    "modular_engine_exhaust_manifold_corner",
    "modular_engine_exhaust_manifold_straight",
    "modular_engine_fluid_pump",
    "modular_engine_power_manifold_5x5",
    "modular_engine_power_manifold_3x3",
    "modular_engine_drive_belt",
    "modular_engine_piston_5x5",
    "modular_engine_piston_3x3",
    "modular_engine_cylinder_straight",
    "modular_engine_crankshaft_converter_5x5",
    "modular_engine_intake_manifold",
    "modular_engine_manifold_straight",
    "modular_engine_manifold_corner",
    "modular_engine_manifold_t",
    "modular_engine_starter",
    "modular_engine_sensor_temperature",
    "steam_coal_duct_m",
    "steam_coal_duct_l",
    "steam_coal_duct",
    "furnace_electric",
    "steam_coal_firebox",
    "steam_coal_firebox_l",
    "steam_coal_flex",
    "steam_coal_funnel",
    "steam_coal_hopper",
    "steam_coal_hopper_l",
    "steam_coal_hopper_m",
    "furnace_industrial",
    "lobster_pot",
    "rope_hook_net",
    "steam_nuclear_control_rod",
    "steam_nuclear_fuel_assembly",
    "steam_nuclear_fuel_rod",
    "oil_rig_drill_grabber",
    "oil_rig_drill_grabber_end",
    "oil_rig_drill_connector",
    "oil_rig_drill_swivel",
    "oil_rig_pumpjack",
    "oil_rig_well_head",
    "steam_boiler",
    "steam_condenser",
    "steam_piston_5x5",
    "steam_piston_3x3",
    "steam_piston",
    "steam_turbine",
    "steam_coal_vacuum",
    "water_extractor",
    "oil_rig_pumpjack_b"
  ]);
  var defaultRotationRemovableComponents = /* @__PURE__ */ new Set([
    "01_block_weight",
    "no_sleep",
    "map_icon",
    "multibody_compact_pivot_b"
  ]);

  // node_modules/vehicle-optimizer/src/parser.js
  function isWhitespace(code) {
    return code === 32 || code === 9 || code === 10 || code === 13;
  }
  function isNameChar(code) {
    return code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95 || code === 45 || code === 58 || code === 46;
  }
  function findNextC(xml, cursor) {
    while (cursor < xml.length) {
      const start = xml.indexOf("<c", cursor);
      if (start === -1) {
        return -1;
      }
      const next = xml.charCodeAt(start + 2);
      if (next === 62 || next === 47 || isWhitespace(next)) {
        return start;
      }
      cursor = start + 2;
    }
    return -1;
  }
  function findTagEnd(xml, cursor) {
    let quote = 0;
    while (cursor < xml.length) {
      const code = xml.charCodeAt(cursor);
      if (quote !== 0) {
        if (code === quote) {
          quote = 0;
        }
      } else if (code === 34 || code === 39) {
        quote = code;
      } else if (code === 62) {
        return cursor;
      }
      cursor++;
    }
    return -1;
  }
  function findComponentEnd(xml, cursor) {
    const start = xml.indexOf("</c>", cursor);
    if (start === -1) {
      return -1;
    }
    return start + 4;
  }
  function findObjectStart(xml, cursor, end) {
    while (cursor < end) {
      const start = xml.indexOf("<o", cursor);
      if (start === -1 || start >= end) {
        return -1;
      }
      const next = xml.charCodeAt(start + 2);
      if (next === 62 || next === 47 || isWhitespace(next)) {
        return start;
      }
      cursor = start + 2;
    }
    return -1;
  }
  function readComponentId(xml, start, end) {
    let cursor = start + 2;
    while (cursor < end) {
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) === 62 || xml.charCodeAt(cursor) === 47) {
        return null;
      }
      const nameStart = cursor;
      while (cursor < end && isNameChar(xml.charCodeAt(cursor))) {
        cursor++;
      }
      const nameEnd = cursor;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) !== 61) {
        cursor++;
        continue;
      }
      cursor++;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end || xml.charCodeAt(cursor) !== 34) {
        cursor++;
        continue;
      }
      cursor++;
      const valueStart = cursor;
      while (cursor < end && xml.charCodeAt(cursor) !== 34) {
        cursor++;
      }
      if (nameEnd - nameStart === 1 && xml.charCodeAt(nameStart) === 100) {
        return xml.slice(valueStart, cursor);
      }
      if (cursor < end) {
        cursor++;
      }
    }
    return null;
  }
  function matches(xml, start, end, value) {
    if (end - start !== value.length) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      if (xml.charCodeAt(start + i) !== value.charCodeAt(i)) {
        return false;
      }
    }
    return true;
  }
  function isDefaultRotation(xml, start, end) {
    return matches(xml, start, end, defaultRotation);
  }
  function isPureRotation(xml, start, end) {
    let cursor = start;
    let count = 0;
    let sum = 0;
    while (cursor < end) {
      while (cursor < end && (xml.charCodeAt(cursor) === 44 || isWhitespace(xml.charCodeAt(cursor)))) {
        cursor++;
      }
      if (cursor >= end) {
        break;
      }
      let sign = 1;
      if (xml.charCodeAt(cursor) === 45) {
        sign = -1;
        cursor++;
      }
      let value = 0;
      let digits = 0;
      while (cursor < end) {
        const code = xml.charCodeAt(cursor);
        if (code < 48 || code > 57) {
          break;
        }
        value = value * 10 + code - 48;
        digits++;
        cursor++;
      }
      if (digits === 0) {
        return false;
      }
      sum += Math.abs(sign * value);
      count++;
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor < end && xml.charCodeAt(cursor) !== 44) {
        return false;
      }
    }
    return count === 9 && sum === 3;
  }
  function isNumericSc(xml, start, end) {
    if (start === end) {
      return false;
    }
    for (let cursor = start; cursor < end; cursor++) {
      const code = xml.charCodeAt(cursor);
      if (code < 48 || code > 57) {
        return false;
      }
    }
    return true;
  }
  function isBcAttribute(xml, start, end) {
    if (end - start === 2) {
      return xml.charCodeAt(start) === 98 && xml.charCodeAt(start + 1) === 99;
    }
    if (end - start < 3 || xml.charCodeAt(start) !== 98 || xml.charCodeAt(start + 1) !== 99) {
      return false;
    }
    for (let cursor = start + 2; cursor < end; cursor++) {
      const code = xml.charCodeAt(cursor);
      if (code < 48 || code > 57) {
        return false;
      }
    }
    return true;
  }
  function addRemoval(removals, start, end) {
    let cursor = removals.length;
    while (cursor > 0 && removals[cursor - 2] > start) {
      cursor -= 2;
    }
    removals.splice(cursor, 0, start, end);
  }
  function isEmptySlot(xml, start, end) {
    let cursor = start + 5;
    while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
      cursor++;
    }
    if (cursor >= end || xml.charCodeAt(cursor) !== 47) {
      return false;
    }
    cursor++;
    while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
      cursor++;
    }
    return cursor < end && xml.charCodeAt(cursor) === 62;
  }
  function isEmptyLogicSlots(xml, start, end) {
    let cursor = start;
    while (cursor < end) {
      while (cursor < end && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= end) {
        return true;
      }
      const slotStart = xml.indexOf("<slot", cursor);
      if (slotStart !== cursor) {
        return false;
      }
      const slotEnd = findTagEnd(xml, slotStart);
      if (slotEnd === -1 || slotEnd >= end || !isEmptySlot(xml, slotStart, slotEnd + 1)) {
        return false;
      }
      cursor = slotEnd + 1;
    }
    return true;
  }
  function processObject(xml, objectStart, objectEnd, componentEnd, componentId) {
    const removals = [];
    const rRanges = [];
    let bcCount = 0;
    let bcRange = null;
    let scPresent = false;
    let scNumeric = false;
    let blocksChanged2 = 0;
    let blocksPreserved2 = 0;
    let cursor = objectStart + 2;
    while (cursor < objectEnd) {
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) === 47) {
        break;
      }
      const nameStart = cursor;
      while (cursor < objectEnd && isNameChar(xml.charCodeAt(cursor))) {
        cursor++;
      }
      const nameEnd = cursor;
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) !== 61) {
        cursor++;
        continue;
      }
      cursor++;
      while (cursor < objectEnd && isWhitespace(xml.charCodeAt(cursor))) {
        cursor++;
      }
      if (cursor >= objectEnd || xml.charCodeAt(cursor) !== 34) {
        cursor++;
        continue;
      }
      cursor++;
      const valueStart = cursor;
      while (cursor < objectEnd && xml.charCodeAt(cursor) !== 34) {
        cursor++;
      }
      const valueEnd = cursor;
      const attrEnd = cursor < objectEnd ? cursor + 1 : cursor;
      const attrStart = nameStart > objectStart && isWhitespace(xml.charCodeAt(nameStart - 1)) ? nameStart - 1 : nameStart;
      if (matches(xml, nameStart, nameEnd, "ac")) {
        if (additiveComponents.has(componentId)) {
          blocksPreserved2++;
        } else {
          addRemoval(removals, attrStart, attrEnd);
          blocksChanged2++;
        }
      } else if (matches(xml, nameStart, nameEnd, "r")) {
        const removableDefaultRotation = isDefaultRotation(xml, valueStart, valueEnd) && defaultRotationRemovableComponents.has(componentId);
        const removablePureRotation = isPureRotation(xml, valueStart, valueEnd) && (componentId === null || nonRotatingComponents.has(componentId));
        if (removableDefaultRotation || removablePureRotation) {
          rRanges.push(attrStart, attrEnd);
        }
      } else if (matches(xml, nameStart, nameEnd, "sc")) {
        scPresent = true;
        scNumeric = isNumericSc(xml, valueStart, valueEnd);
        if (scNumeric || scRemovableComponents.has(componentId)) {
          addRemoval(removals, attrStart, attrEnd);
        }
      } else if (isBcAttribute(xml, nameStart, nameEnd)) {
        bcCount++;
        if (bcCount === 1) {
          bcRange = [attrStart, attrEnd];
        }
      } else if (matches(xml, nameStart, nameEnd, "name")) {
        if (matches(xml, valueStart, valueEnd, "Microcontroller")) {
          addRemoval(removals, attrStart, attrEnd);
        }
      } else if (matches(xml, nameStart, nameEnd, "description")) {
        if (matches(xml, valueStart, valueEnd, "No description set.")) {
          addRemoval(removals, attrStart, attrEnd);
        }
      }
      if (cursor < objectEnd) {
        cursor++;
      }
    }
    if (!scPresent || scNumeric) {
      for (let i = 0; i < rRanges.length; i += 2) {
        addRemoval(removals, rRanges[i], rRanges[i + 1]);
      }
    }
    if (scPresent && !scNumeric && !scRemovableComponents.has(componentId) && bcCount === 1 && bcRange !== null && !bcPreservedWithScComponents.has(componentId)) {
      addRemoval(removals, bcRange[0], bcRange[1]);
    }
    cursor = objectEnd + 1;
    while (cursor < componentEnd - 4) {
      const tagStart = xml.indexOf("<", cursor);
      if (tagStart === -1 || tagStart >= componentEnd - 4) {
        break;
      }
      if (xml.startsWith("<logic_slots", tagStart)) {
        const logicEnd = findTagEnd(xml, tagStart);
        if (logicEnd === -1 || logicEnd >= componentEnd - 4) {
          break;
        }
        if (xml.charCodeAt(logicEnd - 1) === 47) {
          cursor = logicEnd + 1;
          continue;
        }
        const closeStart = xml.indexOf("</logic_slots>", logicEnd + 1);
        if (closeStart === -1 || closeStart >= componentEnd - 4) {
          break;
        }
        if (isEmptyLogicSlots(xml, logicEnd + 1, closeStart)) {
          addRemoval(removals, tagStart, closeStart + 14);
          cursor = closeStart + 14;
          continue;
        }
        cursor = logicEnd + 1;
        continue;
      }
      if (xml.startsWith("<slot", tagStart)) {
        const slotEnd = findTagEnd(xml, tagStart);
        if (slotEnd !== -1 && slotEnd < componentEnd - 4 && isEmptySlot(xml, tagStart, slotEnd + 1)) {
          addRemoval(removals, tagStart, slotEnd + 1);
          cursor = slotEnd + 1;
          continue;
        }
      }
      cursor = tagStart + 1;
    }
    return {
      removals,
      blocksChanged: blocksChanged2,
      blocksPreserved: blocksPreserved2
    };
  }
  function optimizeVehicle(xml) {
    let cursor = 0;
    let copyCursor = 0;
    let output2 = null;
    let blocksChanged2 = 0;
    let blocksPreserved2 = 0;
    while (cursor < xml.length) {
      const componentStart = findNextC(xml, cursor);
      if (componentStart === -1) {
        break;
      }
      const componentTagEnd = findTagEnd(xml, componentStart);
      if (componentTagEnd === -1) {
        break;
      }
      const componentEnd = findComponentEnd(xml, componentTagEnd + 1);
      if (componentEnd === -1) {
        break;
      }
      const componentId = readComponentId(xml, componentStart, componentTagEnd);
      const objectStart = findObjectStart(
        xml,
        componentTagEnd + 1,
        componentEnd - 4
      );
      if (objectStart !== -1) {
        const objectEnd = findTagEnd(xml, objectStart);
        if (objectEnd !== -1 && objectEnd < componentEnd - 4) {
          const result = processObject(
            xml,
            objectStart,
            objectEnd,
            componentEnd,
            componentId
          );
          for (let i = 0; i < result.removals.length; i += 2) {
            const start = result.removals[i];
            const end = result.removals[i + 1];
            if (output2 === null) {
              output2 = [];
            }
            output2.push(xml.slice(copyCursor, start));
            copyCursor = end;
          }
          blocksChanged2 += result.blocksChanged;
          blocksPreserved2 += result.blocksPreserved;
        }
      }
      cursor = componentEnd;
    }
    if (output2 === null) {
      return {
        data: xml,
        blocksChanged: blocksChanged2,
        blocksPreserved: blocksPreserved2
      };
    }
    output2.push(xml.slice(copyCursor));
    return {
      data: output2.join(""),
      blocksChanged: blocksChanged2,
      blocksPreserved: blocksPreserved2
    };
  }

  // web/static/vehicle-optimizer.js
  var input = document.querySelector(".veOpt-input .veOpt-editor");
  var output = document.querySelector(".veOpt-output-editor");
  var status = document.querySelector("#veOpt-status");
  var blocksChanged = document.querySelector("#veOpt-blocks-changed");
  var blocksPreserved = document.querySelector("#veOpt-blocks-preserved");
  var sizeBefore = document.querySelector("#veOpt-size-before");
  var sizeAfter = document.querySelector("#veOpt-size-after");
  var sizeReduction = document.querySelector("#veOpt-size-reduction");
  var processTimeElement = document.querySelector("#veOpt-process-time");
  var fileDrop = document.querySelector("#veOpt-file");
  var fileSelect = document.querySelector("#veOpt-select");
  var fileInput = document.querySelector("#veOpt-file-input");
  var download = document.querySelector("#veOpt-download");
  var copy = document.querySelector("#veOpt-copy");
  var outputFilename = "processed.xml";
  function formatBytes(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 ** 2) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    if (bytes < 1024 ** 3) {
      return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
    }
    return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  }
  function formatTime(ms) {
    if (ms < 1e3) {
      return `${ms.toFixed(2)} ms`;
    }
    if (ms < 6e4) {
      return `${(ms / 1e3).toFixed(2)} s`;
    }
    return `${(ms / 6e4).toFixed(2)} min`;
  }
  function processInput() {
    const xml = input.value;
    if (!xml.trim()) {
      outputFilename = "processed.xml";
      status.textContent = "Ready";
      output.value = "";
      blocksChanged.textContent = "0";
      blocksPreserved.textContent = "0";
      sizeBefore.textContent = "0 B";
      sizeAfter.textContent = "0 B";
      sizeReduction.textContent = "0% smaller";
      processTimeElement.textContent = "0 ms";
      return;
    }
    const start = performance.now();
    const result = optimizeVehicle(xml);
    const processTime = performance.now() - start;
    const sizeBeforeBytes = new Blob([xml]).size;
    const sizeAfterBytes = new Blob([result.data]).size;
    telemetry.toolProcess({
      tool: "vehicle_optimizer",
      inputBytes: sizeBeforeBytes,
      outputBytes: sizeAfterBytes,
      processingMs: processTime,
      blocksChanged: result.blocksChanged,
      blocksPreserved: result.blocksPreserved
    });
    output.value = result.data;
    blocksChanged.textContent = result.blocksChanged;
    blocksPreserved.textContent = result.blocksPreserved;
    sizeBefore.textContent = formatBytes(sizeBeforeBytes);
    sizeAfter.textContent = formatBytes(sizeAfterBytes);
    const reduction = (sizeBeforeBytes - sizeAfterBytes) / sizeBeforeBytes * 100;
    sizeReduction.textContent = `${reduction.toFixed(1)}% smaller`;
    processTimeElement.textContent = formatTime(processTime);
    status.textContent = "Processed";
  }
  function loadFile(file) {
    if (!file.name.toLowerCase().endsWith(".xml")) {
      return;
    }
    outputFilename = file.name;
    file.text().then((xml) => {
      input.value = xml;
      processInput();
    });
  }
  input.addEventListener("input", processInput);
  fileSelect.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }
    loadFile(file);
  });
  fileDrop.addEventListener("dragenter", (event) => {
    if (event.dataTransfer.types.includes("Files")) {
      event.preventDefault();
      fileDrop.classList.add("dragging");
    }
  });
  fileDrop.addEventListener("dragover", (event) => {
    if (event.dataTransfer.types.includes("Files")) {
      event.preventDefault();
      fileDrop.classList.add("dragging");
    }
  });
  fileDrop.addEventListener("dragleave", () => {
    fileDrop.classList.remove("dragging");
  });
  fileDrop.addEventListener("drop", (event) => {
    if (!event.dataTransfer.types.includes("Files")) {
      return;
    }
    event.preventDefault();
    fileDrop.classList.remove("dragging");
    const file = event.dataTransfer.files[0];
    if (!file) {
      return;
    }
    loadFile(file);
  });
  copy.addEventListener("click", async () => {
    if (!output.value) {
      return;
    }
    await navigator.clipboard.writeText(output.value);
  });
  download.addEventListener("click", () => {
    if (!output.value) {
      return;
    }
    const blob = new Blob([output.value], {
      type: "application/xml"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = outputFilename;
    link.click();
    URL.revokeObjectURL(url);
  });
})();
