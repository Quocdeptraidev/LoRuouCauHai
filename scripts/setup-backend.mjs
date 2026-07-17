import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { resolvePython } from './resolve-python.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendDir = path.join(root, 'apps/backend')
const venvWin = path.join(backendDir, '.venv/Scripts/python.exe')
const venvUnix = path.join(backendDir, '.venv/bin/python')

const run = (python, args, options = {}) => {
  const fullArgs = [...python.argsPrefix, ...args]
  const result = spawnSync(python.command, fullArgs, {
    stdio: 'inherit',
    cwd: backendDir,
    shell: python.shell,
    ...options,
  })

  if (result.error) {
    console.error(`Failed to run command: ${result.error.message}`)
    process.exit(1)
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const python = resolvePython()

if (!python) {
  console.error('Khong tim thay Python.')
  console.error('Hay cai Python 3.10+ tu https://www.python.org/downloads/')
  process.exit(1)
}

if (!existsSync(venvWin) && !existsSync(venvUnix)) {
  console.log('Creating Python virtual environment at apps/backend/.venv ...')
  run(python, ['-m', 'venv', '.venv'])
}

const venvPython = existsSync(venvWin)
  ? { command: venvWin, argsPrefix: [], shell: false }
  : { command: venvUnix, argsPrefix: [], shell: false }

console.log('Installing backend dependencies ...')
run(venvPython, ['-m', 'pip', 'install', '--upgrade', 'pip'])
run(venvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt'])

console.log('Backend environment is ready.')
