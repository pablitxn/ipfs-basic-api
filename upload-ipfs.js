const fs = require('fs')
const IPFS = require('ipfs')

// sube el archivo del path local a IPFS
const uploadIPFS = async (path) => {
  try {
    const node = await IPFS.create()

    const results = await node.add({
      path: path,
      content: fs.readFileSync(path),
    })

    console.log(results)
    console.log(results.cid.toString())
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = uploadIPFS
