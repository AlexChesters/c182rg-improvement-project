import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import mv from 'rollup-plugin-mv'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/AC182RG.ts',
  output: {
    dir: 'build',
    format: 'es',
    preserveModules: true
  },
  plugins: [
    resolve(),
    typescript(),
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