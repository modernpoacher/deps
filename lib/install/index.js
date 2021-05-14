"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.installExact=installExact;exports.install=install;exports.execute=execute;exports.getCommands=void 0;var _child_process=require("child_process");var _debug=_interopRequireDefault(require("debug"));var _common=require("../common");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const log=(0,_debug.default)('@modernpoacher/deps:install');log('`install` is awake');const getCommands=(p,c,s,r,e=false)=>['npm','i'].concat((0,_common.transform)(p,c)).concat(s?[]:'--no-save').concat(r?['--registry',r]:[]).concat(e?'--save-exact':[]);exports.getCommands=getCommands;function installExact(d,p,c,s,r){log('installExact');return new Promise((resolve,reject)=>{const commands=getCommands(p,c,s,r,true);(0,_child_process.spawn)(`
#!/bin/sh

cd "${d}"

if [ -f ~/.nvm/nvm.sh ];
then
  . ~/.nvm/nvm.sh

  nvm use # VERSION=$(nvm --version)
elif command -v brew;
then # https://docs.brew.sh/Manpage#--prefix-formula
  BREW_PREFIX=$(brew --prefix nvm)
  if [ -f "$BREW_PREFIX/nvm.sh" ];
  then
    . $BREW_PREFIX/nvm.sh

    nvm use # VERSION=$(nvm --version)
  fi
fi
`,commands,{shell:true,stdio:'inherit'},e=>!e?resolve():reject(e)).on('close',resolve).on('error',reject);});}function install(d,p,c,s,r){return new Promise((resolve,reject)=>{const commands=getCommands(p,c,s,r);(0,_child_process.spawn)(`
#!/bin/sh

cd "${d}"

if [ -f ~/.nvm/nvm.sh ];
then
  . ~/.nvm/nvm.sh

  nvm use # VERSION=$(nvm --version)
elif command -v brew;
then # https://docs.brew.sh/Manpage#--prefix-formula
  BREW_PREFIX=$(brew --prefix nvm)
  if [ -f "$BREW_PREFIX/nvm.sh" ];
  then
    . $BREW_PREFIX/nvm.sh

    nvm use # VERSION=$(nvm --version)
  fi
fi
`,commands,{shell:true,stdio:'inherit'},e=>!e?resolve():reject(e)).on('close',resolve).on('error',reject);});}async function execute(directory='.',packages={},configuration={},save=false,registry='https://registry.npmjs.org'){log('execute');const depsExact=(0,_common.getDepsExact)(packages,configuration);if(depsExact.length)await installExact(directory,depsExact,configuration,save,registry);const deps=(0,_common.getDeps)(packages);if(deps.length)await install(directory,deps,configuration,save,registry);}