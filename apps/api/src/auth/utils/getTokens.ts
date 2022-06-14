import { JwtPayload, Tokens } from '../types'

async function getAccessToken(jwtPayload: JwtPayload) {
  return await this.jwtService.signAsync(
    {
      sub: jwtPayload.userId,
      email: jwtPayload.email,
    },
    {
      secret: 'access-secret',
      expiresIn: 60 * 15,
    },
  )
}

async function getRefreshToken(jwtPayload: JwtPayload) {
  return await this.jwtService.signAsync(
    {
      sub: jwtPayload.userId,
      email: jwtPayload.email,
    },
    {
      secret: 'refresh-secret',
      expiresIn: 60 * 60 * 24 * 7,
    },
  )
}

export async function getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
  const [accessToken, refreshToken] = await Promise.all([
    getAccessToken(jwtPayload),
    getRefreshToken(jwtPayload),
  ])

  return {
    access_token: accessToken,
    refresh_tokens: refreshToken,
  }
}
