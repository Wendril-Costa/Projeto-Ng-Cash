interface IRegister {
  username: string
  password: string
}

type RequiredFields = ['username', 'password']

export class RegisterService {
  create (register: IRegister): any {
    const requiredFields: RequiredFields = ['username', 'password']
    for (const field of requiredFields) {
      if (!register[field]) {
        return { error: `O campo "${field}" é obrigatório` }
      }
    }
  }
}
