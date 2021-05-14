"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getDepsExact=getDepsExact;exports.getDeps=getDeps;exports.transform=transform;exports.transformDependency=exports.isExact=exports.getPeerDependencies=exports.getBundleDependencies=exports.getOptionalDependencies=exports.getDevDependencies=exports.getProdDependencies=exports.initialiseAt=void 0;var _debug=_interopRequireDefault(require("debug"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const log=(0,_debug.default)('@modernpoacher/deps');log('`common` is awake');const initialiseAt=d=>`
#!/bin/sh

set -e

cd "${d}"

if [ -f ~/.nvm/nvm.sh ];
then
  . ~/.nvm/nvm.sh

  nvm use
elif command -v brew;
then
  NVM=$(brew --prefix nvm)
  if [ -f "$NVM/nvm.sh" ];
  then
    . $NVM/nvm.sh

    nvm use
  fi
fi
`;exports.initialiseAt=initialiseAt;const getProdDependencies=({dependencies={}}={})=>dependencies;exports.getProdDependencies=getProdDependencies;const getDevDependencies=({devDependencies={}}={})=>devDependencies;exports.getDevDependencies=getDevDependencies;const getOptionalDependencies=({optionalDependencies={}}={})=>optionalDependencies;exports.getOptionalDependencies=getOptionalDependencies;const getBundleDependencies=({bundleDependencies=[]}={})=>bundleDependencies;exports.getBundleDependencies=getBundleDependencies;const getPeerDependencies=({peerDependencies}={})=>peerDependencies;exports.getPeerDependencies=getPeerDependencies;const isExact=v=>/^\d/.test(v);exports.isExact=isExact;function getDepsExact(values,configuration){log('getDepsExact');return Object.entries(values).reduce((accumulator,[name,version])=>isExact(version)?accumulator.concat({name,version:Reflect.has(configuration,name)?Reflect.get(configuration,name):version}):accumulator,[]);}function getDeps(values){log('getDeps');return Object.entries(values).reduce((accumulator,[name,version])=>isExact(version)?accumulator:accumulator.concat({name,version:'latest'}),[]);}const transformDependency=({name='@modernpoacher/deps',version='latest'}={})=>`${name}@${version}`;exports.transformDependency=transformDependency;function transform(value){log('transform');return Array.isArray(value)?value.map(transformDependency).join(String.fromCharCode(32)).trim():transformDependency(value);}