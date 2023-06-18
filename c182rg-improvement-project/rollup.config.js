import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import mv from 'rollup-plugin-mv'

export default {
  input: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/AC182RG.js',
  output: {
    dir: 'build',
    format: 'es',
    preserveModules: true
  },
  plugins: [
    resolve(),
    copy({
      targets: [
        {
          src: '*.json',
          dest: 'build'
        },
        {
          src: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/AC182RG.html',
          dest: 'build/html_ui/Pages/VCockpit/Instruments/AlexChesters'
        },
        {
          src: 'SimObjects',
          dest: 'build'
        }
      ]
    }),
    mv([
      {
        src: 'build/AC182RG.js',
        dest: 'build/html_ui/Pages/VCockpit/Instruments/AlexChesters/AC182RG.js'
      }
    ])
  ]
}