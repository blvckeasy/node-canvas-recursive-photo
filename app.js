const { createCanvas, loadImage } = require('canvas')
const Fs = require('fs')
const Path = require('path')

async function createRecursiveImage(imagePath, imageCount) {
  loadImage(Path.join(__dirname, imagePath))
    .then(image => {
      let start = { x: 0, y: 0 }
      let end = { x: image.width, y: image.height }

      const canvas = createCanvas(image.width, image.height)
      const ctx = canvas.getContext('2d')

      ctx.beginPath()

      for (
        let x = start.x, y = start.y;
        x < end.x && y < end.y;
        _z = Math.ceil(end.x / (imageCount * 2)), x += _z, y -= _z
      ) {
        if (x > image.width - x || y > image.height - y) {
          break
        }

        ctx.drawImage(image, x, Math.abs(y), end.x - 2 * x, end.y + 2 * y)

        const out = Fs.createWriteStream(Path.join(__dirname, 'answer.jpg'))
        const stream = canvas.createJPEGStream()
        stream.pipe(out)

        out.on('finish', () => {})
      }
    })
    .then(() => {
      console.log('enjoy.')
    })
    .catch(error => {
      console.log('pff:', error.message)
    })
}

createRecursiveImage('none.jpeg', 5)
