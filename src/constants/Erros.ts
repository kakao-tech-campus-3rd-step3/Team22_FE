// 존재하지 않는 유저가. 로그인을 시도할때
export class Login403Error extends Error {
  status = 403
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
    Object.setPrototypeOf(this, Login403Error.prototype)
  }
}

// 이미 존재하는 회원(이메일 동일)한데 재가입 시도시
export class Register409Error extends Error {
  status = 409
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
    Object.setPrototypeOf(this, Register409Error.prototype)
  }
}

// server 내부 에러
export class Server500Error extends Error {
  status = 500
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
    Object.setPrototypeOf(this, Server500Error.prototype)
  }
}
