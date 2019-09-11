import {
  spawn
} from 'child_process'

const transform = (v) => Array.isArray(v) ? v.map(([module, version]) => `${module}@${version || 'latest'}`).join(String.fromCharCode(32)).trim() : v.trim()

const install = (d, v, s, r) => (
  new Promise((resolve, reject) => {
    const commands = (
      ['install']
        .concat(s ? [] : ['--no-save'])
        .concat(transform(v))
        .concat(r ? ['--registry', r] : [])
    )

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export const execute = async (dir = '.', dependencies = {}, { save, registry }) => install(dir, Object.entries(dependencies), save, registry)
