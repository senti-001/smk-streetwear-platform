import fs from 'fs'
import path from 'path'
import Image from 'next/image'

export default function ImageGallery() {
  const productsDir = path.join(process.cwd(), 'public', 'products')
  const files = fs.readdirSync(productsDir)
  const images = files.filter(file => file.startsWith('smk_') || file === 'oc-barcode-hoodie.png' || file === 'doberman-tee.png' || file === 'built-different-ls.png' || file === 'night-walk-pitbull.png' || file === 'truck-bed-pitbull.png' || file === 'smk_press_ready_placement.png' || file === 'smk_technical_placement_design.png')

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', backgroundColor: 'white', color: 'black' }}>
      {images.map(img => (
        <div key={img} style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>{img}</h3>
          <img src={`/products/${img}`} alt={img} width={300} style={{ objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}
