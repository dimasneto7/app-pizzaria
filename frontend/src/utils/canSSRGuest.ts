import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'

// funcao para paginas que só podem ser acessadas por visitantes - usuarios nao logados
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    // se o usuario que já esta logado tentar entrar na pagina de login.. redirecionar
    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
