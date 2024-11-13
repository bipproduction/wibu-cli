import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon(): ImageResponse {
  const { width, height } = size

  return new ImageResponse(
    (
      // Element JSX yang berfungsi sebagai ikon
      <div
        style={{
          fontSize: 24,
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    {
      width,
      height,
    }
  )
}

// wibu:1.0.87