import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import mv from 'rollup-plugin-mv'
import typescript from '@rollup/plugin-typescript'

const stateSaving = {
  input: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.ts',
  output: {
    dir: 'build',
    format: 'es'
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
          src: 'html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.html',
          dest: 'build/html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving'
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
        dest: 'build/html_ui/Pages/VCockpit/Instruments/AlexChesters/StateSaving/AC182RG.js'
      }
    ])
  ]
}

const kap140 = {
  input: 'html_ui/Pages/VCockpit/Instruments/NavSystems/Carenado/KAP140/KAP140.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    resolve(),
    typescript(),
    mv([
      {
        src: 'build/KAP140.js',
        dest: 'build/html_ui/Pages/VCockpit/Instruments/NavSystems/Carenado/KAP140/KAP140.js'
      }
    ])
  ]
}

export default [stateSaving, kap140]

