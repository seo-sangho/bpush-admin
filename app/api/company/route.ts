// import { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from 'next/server';

// type ResponseData = {
//   message: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   if (req.method !== 'GET') {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   res.status(200).json({ message: 'OK' });
// }
export function GET() {
  return NextResponse.json(null, { status: 200 });
}
