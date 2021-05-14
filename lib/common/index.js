"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getDepsExact=getDepsExact;exports.getDeps=getDeps;exports.transform=transform;exports.transformDependency=exports.isExact=exports.getPeerDependencies=exports.getBundleDependencies=exports.getOptionalDependencies=exports.getDevDependencies=exports.getProdDependencies=exports.initialiseAt=void 0;var _debug=_interopRequireDefault(require("debug"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const log=(0,_debug.default)('@modernpoacher/deps');log('`common` is awake');const initialiseAt=d=>{log('initialiseAt');return`
#!/bin/sh

cd "${d}"

if [ -f ~/.nvm/nvm.sh ];
then
  . ~/.nvm/nvm.sh

  VERSION=$(nvm --version)
else
  if command -v brew &> /dev/null;
  then
    NVM=$(brew --prefix nvm)

    if [ -f "$NVM/nvm.sh" ];
    then
      . $NVM/nvm.sh

      VERSION=$(nvm --version)
    fi
  fi
fi

if [ -z "$VERSION" ];
then
  echo NVM not available
else
  echo NVM version $VERSION available

  set -e

  nvm use

  if [[ $? != 0 ]];
  then
    echo NVM not configured
  else
    echo NVM configured
  fi
fi

exit 0
  `;};exports.initialiseAt=initialiseAt;const getProdDependencies=({dependencies={}}={})=>dependencies;exports.getProdDependencies=getProdDependencies;const getDevDependencies=({devDependencies={}}={})=>devDependencies;exports.getDevDependencies=getDevDependencies;const getOptionalDependencies=({optionalDependencies={}}={})=>optionalDependencies;exports.getOptionalDependencies=getOptionalDependencies;const getBundleDependencies=({bundleDependencies=[]}={})=>bundleDependencies;exports.getBundleDependencies=getBundleDependencies;const getPeerDependencies=({peerDependencies}={})=>peerDependencies;exports.getPeerDependencies=getPeerDependencies;const isExact=v=>/^\d/.test(v);exports.isExact=isExact;function getDepsExact(values,configuration){log('getDepsExact');return Object.entries(values).reduce((accumulator,[name,version])=>isExact(version)?accumulator.concat({name,version:Reflect.has(configuration,name)?Reflect.get(configuration,name):version}):accumulator,[]);}function getDeps(values){log('getDeps');return Object.entries(values).reduce((accumulator,[name,version])=>isExact(version)?accumulator:accumulator.concat({name,version:'latest'}),[]);}const transformDependency=({name='@modernpoacher/deps',version='latest'}={})=>`${name}@${version}`;exports.transformDependency=transformDependency;function transform(value){log('transform');return Array.isArray(value)?value.map(transformDependency).join(String.fromCharCode(32)).trim():transformDependency(value);}