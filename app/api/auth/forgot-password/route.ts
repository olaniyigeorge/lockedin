import User from '@/models/user';
import { encrypt } from '@/lib/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { ForgotPasswordPayload } from './docs';

const DOMAIN = process.env.DOMAIN as string;


/**
 * Handles the POST request to initiate a password reset flow.
 * @route POST /api/forgot-password
 * @param {NextRequest} req - The HTTP request object containing JSON payload `email` and `first_name`
 * @returns {Promise<NextResponse>} - Redirects to password reset page or returns appropriate error response.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, first_name }: ForgotPasswordPayload = await req.json();

    // Validate input
    if (!email || !first_name) {
      return NextResponse.json(
        { error: 'Email and first name are required' },
        { status: 400 }
      );
    }

    // Attempt to find the user (case-insensitive first name match)
    const users = await User.find({
      email: email,
      first_name: new RegExp(`^${first_name}$`, 'i'),
    }).exec();

    const user = users[0];

    // If user not found, return error
    if (!user) {
      return NextResponse.json(
        { error: 'User not found: Provide the correct info' },
        { status: 404 }
      );
    }

    // Build user payload to encrypt
    const userObject = {
      _id: user?._id,
      username: user?.username,
      role: user?.role,
      time: new Date().toISOString(),
    };

    // Encrypt and redirect with token in URL
    const encryptedUserObject = await encrypt(userObject);
    const userStr = `${encryptedUserObject}`;

    return NextResponse.redirect(`${DOMAIN}/reset-password?token=${userStr}`);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `${error}` },
      { status: 500 }
    );
  }
}
