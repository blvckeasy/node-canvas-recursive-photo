const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

async function createRecursiveImage() {
  loadImage(__dirname + '/none.jpeg')
    .then(image => {
      let start = { x: 0, y: 0 }
      let end = { x: image.width, y: image.height }
      // image count
      let count = 4

      const canvas = createCanvas(image.width, image.height)
      const ctx = canvas.getContext('2d')

      ctx.beginPath()

      canvas.width = image.width
      canvas.height = image.height

      for (
        let x = start.x, y = start.y;
        x < end.x && y < end.y;
        _z = Math.ceil(end.x / (count * 2)), x += _z, y -= _z
      ) {
        if (x > image.width - x || y > image.height - y) {
          break
        }

        ctx.drawImage(
          image,
          x,
          Math.abs(y),
          image.width - 2 * x,
          image.height + 2 * y
        )

        const out = fs.createWriteStream(__dirname + '/answer.jpg')
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

createRecursiveImage()
