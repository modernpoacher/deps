"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.PLATFORM=void 0;var _debug=_interopRequireDefault(require("debug"));var _os=require("os");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const PLATFORM=(0,_os.platform)();exports.PLATFORM=PLATFORM;const log=(0,_debug.default)('@modernpoacher/deps');log(`\`env\` (${PLATFORM}) is awake`);