
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
interface AuthRequest{
    email: string;
    password: string;
}


class AuthUserService{
    async execute({ email, password } : AuthRequest){
        //Verifica se o email
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário incorretos")
        }

        //Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Senha incorreta")
        }


        // se deu tudo certo vamos gerar o token  pro usuario
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }