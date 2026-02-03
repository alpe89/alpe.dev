import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Alberto Pertusi - Technical Lead & Bug Manufacturer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a25 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ffaa00 0%, #ff6b35 50%, #ff3366 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Alberto Pertusi
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#a1a1aa',
            }}
          >
            Technical Lead & Bug Manufacturer
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#ff6b35',
              marginTop: '24px',
            }}
          >
            alpe.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
