import fs from 'fs'
import postcss from 'postcss'

import pImport from 'postcss-import'
import pDuplicated from 'postcss-combine-duplicated-selectors'
import pComments from 'postcss-discard-comments'
import pMinify from 'postcss-minify'

const packageFile = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const title = packageFile.name + ' v' + packageFile.version
const license = packageFile.license + ' License'
const link = 'github.com/' + packageFile.repository.split(':')[1]
const header = '/*! ' + [title, license, link].join(' | ') + ' */'

const plugins = [pImport, pDuplicated, pComments, pMinify]

function init(fromName, toName) {
  const [from, to] = [`src/${fromName}.css`, toName + '.css']
  const css = fs.readFileSync(from, 'utf8')
  postcss(plugins)
    .process(css, { from })
    .then(({ css }) => fs.writeFile(to, [header, css].join('\n\n'), () => true))
}

init(10, 10)
init(20, 20)
init('web', 'colors')
