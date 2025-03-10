import User from '@/models/user';
import { decrypt } from '@/utils/helpers';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { ResetPasswordPayload } from './docs';

const DOMAIN = process.env.DOMAIN as string;
const RESET_PASSWORD_TOKEN_VALIDITY_DURATION = 3; 

/**
 * Handles the POST request to reset the user's password.
 * 
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(req: NextRequest): Promise<NextResponse<any>> {
    try {
        const { password, token }: ResetPasswordPayload = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: 'Email and first name are required' },
                { status: 400 }
            );
        }

        const decryptedUserObject = await decrypt(token);
        const issuedTime = new Date(decryptedUserObject.time).getTime();
        const expiryTime = issuedTime + RESET_PASSWORD_TOKEN_VALIDITY_DURATION * 60 * 1000;

        if (Date.now() > expiryTime) {
            return NextResponse.json(
                { error: "This password reset link has expired. Please try 'Forgot Password' again." },
                { status: 410 }
            );
        }

        if (decryptedUserObject._id) {
            const user = await User.findById(decryptedUserObject._id);
            const hashedPassword = await bcrypt.hash(password, 10);

            user.password = hashedPassword;
            await user.save();

            return NextResponse.redirect(`${DOMAIN}/auth/signin`);
        }

        return NextResponse.json(
            { error: "Something went wrong. Please try again." }, 
            { status: 400 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: `${error}` },
            { status: 500 }
        );
    }
}