import test from 'ava'
import devServer from '../devServer'

const webpack = {
  HotModuleReplacementPlugin: function HotModuleReplacementPluginMock () {}
}

test('devServer() add himself to every entries', (t) => {
  const currentConfig = {
    entry: {
      main: ['./test.js'],
      second: ['./second.js']
    }
  }

  const context = { webpack }
  const block = devServer('entry')
  block(context, currentConfig)

  const config = block.post(context, currentConfig)
  t.deepEqual(config.entry, { main: ['entry'], second: ['entry'] })
})

test('devServer() use webpack/hot/only-dev-server as default', (t) => {
  const currentConfig = {
    entry: {
      main: ['./test.js']
    }
  }

  const context = { webpack }
  const block = devServer()
  block(context, currentConfig)

  const config = block.post(context, currentConfig)
  t.deepEqual(config.entry.main, ['webpack/hot/only-dev-server'])
})
