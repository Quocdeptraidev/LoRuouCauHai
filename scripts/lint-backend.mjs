import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'
import { resolvePython } from './resolve-python.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const venvWin = path.join(root, 'apps/backend/.venv/Scripts/python.exe')
const venvUnix = path.join(root, 'apps/backend/.venv/bin/python')

const hasBackendVenv = () => existsSync(venvWin) || existsSync(venvUnix)

if (!hasBackendVenv()) {
  console.log('Backend chua duoc cai dat. Dang chay setup:backend ...')
  const setup = spawnSync('node', [path.join(scriptsDir, 'setup-backend.mjs')], {
    stdio: 'inherit',
    cwd: root,
  })

  if (setup.error || setup.status !== 0) {
    process.exit(setup.status ?? 1)
  }
}

const python = resolvePython()

if (!python) {
  console.error('Khong tim thay Python.')
  process.exit(1)
}

const steps = [
  ['-m', 'ruff', 'check', 'apps/backend'],
  ['-m', 'ruff', 'format', '--check', 'apps/backend'],
  ['-m', 'mypy', 'apps/backend/app'],
]

for (const args of steps) {
  const fullArgs = [...python.argsPrefix, ...args]
  const result = spawnSync(python.command, fullArgs, {
    stdio: 'inherit',
    cwd: root,
    shell: python.shell,
  })

  if (result.error) {
    console.error(`Failed to run Python command: ${result.error.message}`)
    process.exit(1)
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
