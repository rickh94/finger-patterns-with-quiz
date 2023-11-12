import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

export const config = {
  runtime: 'edge',
};

export async function GET() {
  const fontData = fs.readFileSync(
    path.resolve('./public/fonts/LibreBaskerville-Bold.ttf')
  );

  try {
    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            fontSize: 80,
            background: 'linear-gradient(135deg, #fef5ff 0%, #fefafe 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 128,
            paddingRight: 128,
            paddingLeft: 128,
            paddingBottom: 16 + 128,
          },
          children: [
            {
              type: 'img',
              props: {
                src: 'https://violinfingerpatterns.com/favicon.svg',
                width: 384,
                height: 384,
              },
            },
            'Violin Finger Patterns',
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Libre Baskerville',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    if ('message' in e) {
      console.log(`${e.message}`);
    } else {
      console.log(e);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
