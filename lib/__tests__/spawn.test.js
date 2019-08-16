/* globals test, expect, NSString */
const spawn = require('../spawn')

test('should spawn', () =>
  new Promise((resolve, reject) => {
    const child = spawn('pwd', [], { cwd: '~/Desktop' })

    expect(child.pid).not.toBe(undefined)

    let data = ''

    child.stdout.on('data', s => {
      data += s
    })

    child.on('close', () => {
      resolve(data)
    })

    child.on('error', err => {
      reject(err)
    })
  }).then(data => {
    expect(data.trim()).toBe(
      String(
        NSString.stringWithString('~/Desktop').stringByExpandingTildeInPath()
      )
    )
  }))
