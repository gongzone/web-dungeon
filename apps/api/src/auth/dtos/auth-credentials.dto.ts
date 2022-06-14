import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class AuthCredentialsDto {
  @IsNotEmpty({ message: '공백은 허용되지 않습니다.' })
  @IsString()
  @MinLength(6, { message: '사용자 아이디는 최소 6자로 이루어져야 합니다.' })
  @MaxLength(16, { message: '사용자 아이디는 최대 16자로 이루어져야 합니다.' })
  @Matches(/^[A-Za-z][A-Za-z0-9]*$/, {
    message:
      '사용자 아이디는 특수문자 없이, 영문자와 숫자로만 이루어져야 합니다.(또한, 영문자로 시작하여야 함.)',
  })
  username: string

  @IsNotEmpty({ message: '공백은 허용되지 않습니다.' })
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자로 이루어져야 합니다.' })
  @MaxLength(16, { message: '비밀번호는 최대 16자로 이루어져야 합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]*$/, {
    message:
      '비밀번호는 최소 하나의 문자와 하나의 숫자 및 하나의 특수 문자가 포함되어야 합니다.',
  })
  password: string

  @IsNotEmpty({ message: '공백은 허용되지 않습니다.' })
  @IsEmail({ message: '이메일 형식에 부합되지 않습니다.' })
  email: string

  @IsNotEmpty({ message: '공백은 허용되지 않습니다.' })
  @IsString()
  @MinLength(2, { message: '닉네임은 최소 2자로 이루어져야 합니다.' })
  @MaxLength(8, { message: '닉네임은 최대 8자로 이루어져야 합니다.' })
  @Matches(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]*$/, {
    message: '닉네임은 한글 및 영어 또는 숫자로만 이루어져야 합니다.',
  })
  nickname: string
}
