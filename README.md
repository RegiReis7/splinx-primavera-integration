
# INTEGRAÇÃO SPLINX E PRIMAVERA

Aplicação que garante a comunicação entre as plataformas **Splynx** e **Primavera** para fins de faturação quando um evento de pagamento é acionado


## AMBIENTE

**Back-End:** Node, Express


## REQUISITOS

- [NodeJs 14.*](https://nodejs.org/en/download/)

## VARIÁVEIS AMBIENTE

Para executar a aplicação em ordem, é necessário que adicione as seguintes variáveis ambiente em um ficheiro .env

#### SPLYNX
`API_KEY = Key da API`

`API_SECRET = Secret da API`

`API_URL = URL da API do sistema/servidor Splynx` 

`API_VERSION = 2.0`

#### PRIMAVERA

`API_URL_PRIMAVERA = URL da WebAPI do Primavera`

`USERNAME_PRIMAVERA = Usuário do Primavera`

`PASSWORD_PRIMAVERA = Palavra-passe do usuário`

`COMPANY_PRIMAVERA = Nome da empresa`

## EXECUÇÃO

Primeiramente, instale as dependências da aplicação usando o comando abaixo:

```bash
  npm install
```
Em seguida execute a aplicação usando os comandos:

```bash
  npm run build
  npm start
```
## SUPORTE

Para suporte, email regi@fisastrategy.com.

