import { spawnSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const venvWin = path.join(root, 'apps/backend/.venv/Scripts/python.exe')
const venvUnix = path.join(root, 'apps/backend/.venv/bin/python')

const isWindowsAppsStub = (command) =>
  command.toLowerCase().includes(`${path.sep}windowsapps${path.sep}`)

const canRun = (command, args, shell = false) => {
  if (isWindowsAppsStub(command)) {
    return false
  }

  const result = spawnSync(command, args, {
    stdio: 'ignore',
    shell,
    windowsHide: true,
  })

  return !result.error && result.status === 0
}

const uniqueCandidates = (candidates) => {
  const seen = new Set()

  return candidates.filter((candidate) => {
    const key = `${candidate.command}|${candidate.argsPrefix.join(',')}|${candidate.shell}`
    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

const findWindowsInstallPaths = () => {
  const candidates = []
  const versions = ['313', '312', '311', '310']

  // Python 3.13+ / Python Install Manager often installs here:
  // %LOCALAPPDATA%\Python\bin\python.exe
  const modernPythonBin = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, 'Python/bin/python.exe')
    : null
  if (modernPythonBin && existsSync(modernPythonBin)) {
    candidates.push({ command: modernPythonBin, argsPrefix: [], shell: false })
  }

  const baseDirs = [
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs/Python'),
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Python'),
    process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'Python'),
    'C:/Python',
  ].filter(Boolean)

  for (const baseDir of baseDirs) {
    if (!existsSync(baseDir)) {
      continue
    }

    for (const entry of readdirSync(baseDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue
      }

      const pythonExe = path.join(baseDir, entry.name, 'python.exe')
      if (existsSync(pythonExe)) {
        candidates.push({ command: pythonExe, argsPrefix: [], shell: false })
      }
    }
  }

  for (const version of versions) {
    const localPython = process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, `Programs/Python/Python${version}/python.exe`)
      : null
    const programFilesPython = process.env.ProgramFiles
      ? path.join(process.env.ProgramFiles, `Python${version}/python.exe`)
      : null

    if (localPython && existsSync(localPython)) {
      candidates.push({ command: localPython, argsPrefix: [], shell: false })
    }

    if (programFilesPython && existsSync(programFilesPython)) {
      candidates.push({ command: programFilesPython, argsPrefix: [], shell: false })
    }
  }

  return candidates
}

const findWhereCandidates = () => {
  if (process.platform !== 'win32') {
    return []
  }

  const candidates = []
  const commands = ['py', 'python', 'python3']

  for (const command of commands) {
    const result = spawnSync('where.exe', [command], {
      encoding: 'utf8',
      shell: false,
      windowsHide: true,
    })

    if (result.status !== 0 || !result.stdout) {
      continue
    }

    for (const line of result.stdout.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || isWindowsAppsStub(trimmed)) {
        continue
      }

      if (command === 'py') {
        candidates.push({ command: trimmed, argsPrefix: ['-3'], shell: false })
      } else {
        candidates.push({ command: trimmed, argsPrefix: [], shell: false })
      }
    }
  }

  return candidates
}

const buildCandidates = () => {
  const candidates = []

  if (process.platform === 'win32') {
    candidates.push(
      ...findWhereCandidates(),
      ...findWindowsInstallPaths(),
      { command: 'py', argsPrefix: ['-3'], shell: true },
      { command: 'python3', argsPrefix: [], shell: true },
      { command: 'python', argsPrefix: [], shell: true },
    )
  } else {
    candidates.push(
      { command: 'python3', argsPrefix: [], shell: false },
      { command: 'python', argsPrefix: [], shell: false },
    )
  }

  return uniqueCandidates(candidates)
}

export const resolvePython = () => {
  if (existsSync(venvWin)) {
    return { command: venvWin, argsPrefix: [], shell: false }
  }

  if (existsSync(venvUnix)) {
    return { command: venvUnix, argsPrefix: [], shell: false }
  }

  for (const candidate of buildCandidates()) {
    if (canRun(candidate.command, [...candidate.argsPrefix, '--version'], candidate.shell)) {
      return candidate
    }
  }

  return null
}

export const runPython = (args, options = {}) => {
  const python = resolvePython()

  if (!python) {
    console.error('Khong tim thay Python.')
    console.error('Hay cai Python 3.10+ va dong/mo lai terminal/IDE, sau do chay: npm run setup:backend')
    process.exit(1)
  }

  const fullArgs = [...python.argsPrefix, ...args]
  const result = spawnSync(python.command, fullArgs, {
    stdio: 'inherit',
    cwd: root,
    shell: python.shell,
    windowsHide: true,
    ...options,
  })

  if (result.error) {
    console.error(`Failed to run Python command: ${result.error.message}`)
    process.exit(1)
  }

  process.exit(result.status ?? 1)
}
