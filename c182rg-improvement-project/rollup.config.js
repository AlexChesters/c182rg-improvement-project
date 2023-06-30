import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import mv from 'rollup-plugin-mv'
import typescript from '@rollup/plugin-typescript'

const stateSaving = {
  input: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    resolve(),
    typescript(),
    copy({
      targets: [
        {
          src: '*.json',
          dest: 'dist'
        },
        {
          src: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.html',
          dest: 'dist/html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving'
        },
        {
          src: 'SimObjects',
          dest: 'dist'
        }
      ]
    }),
    mv([
      {
        src: 'dist/AC182RG.js',
        dest: 'dist/html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.js'
      }
    ])
  ]
}

export default [stateSaving]

