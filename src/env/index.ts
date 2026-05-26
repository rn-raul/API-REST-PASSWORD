import {config} from 'dotenv'
import zod from 'zod';


if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}



/* 
Validação das variáveis de ambiente usando zod. Se alguma variável obrigatória estiver
 faltando ou for inválida, o processo de inicialização do aplicativo
  falhará com uma mensagem de erro clara.
*/
const envSchema = zod.object({
    NODE_ENV: zod.enum(['development', 'production', 'test']).default('development'), // Define o ambiente de execução, com um valor padrão de 'development'
    DATABASE_CLIENT: zod.enum(['sqlite', 'pg']).default('sqlite'),
    DATABASE_URL: zod.string().nonempty('DATABASE_URL is required'),
    PORT: zod.coerce.number().default(3000), // Converte a variável de ambiente PORT para número e define um valor padrão de 3000 se não for fornecida
    SECRET_KEY: zod.string().nonempty('SECRET_KEY is required')
});

const _env = envSchema.safeParse(process.env); // Valida e parseia as variáveis de ambiente usando o esquema definido acima

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data; // Exporta as variáveis de ambiente validadas para uso em outras partes do aplicativo
