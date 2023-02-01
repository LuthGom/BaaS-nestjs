# Bank as a Service

#### O projeto é uma Rest API baseada em BaaS (Bank as a Service). Essa aplicação é um sistema feita com Nodejs/TypeScript e nestjs para cadastro de contas bancárias de pessoas. Com essa API é possível: fazer seu cadastro, atualizar seus dados, consultar seu saldo, realizar transferência da sua conta para conta de outra pessoa (dentr da mesma aplicação). Cada pessoa pode ter apenas uma conta.

#### A maiora dos campos para cadastro possuem vlidações, utilizando class-validator. Então, não é possível inserir dados quaisquer.

#### A Atualização, deleção, transferência bancária e consulta de saldo está atrelada à devida autenticação com estratégia JWT. Ou seja, primeiro é preciso realizar login na sua conta bancária e somente depois a realização de operações.

## Tecnologias utilizadas neste projeto:

### - Nodejs/TypeScript
### - Nestjs
### - MongoDB
### - Passport
### JsonWEbToken (JWT)


## ROTAS

### 📚 PERSONS 📚

| Método     | Rota            | Descrição                  |
| ---------- | --------------- | -------------------------- |
| **GET**    | `/persons`        | Lista todos as persons      |
### retorna:
  | **GET**    | `/persons/{id}` | Busca o persons pelo {id}    |
```json
{
    "_id": "Objectid"
    "name": string ("obrigatório"),
    "cpf": string,
    "adress": {
      "zipCode": string,
            "street": string,
            "houseNumber": number,
            "city": string,
            "state": string
    },
    "cellphone": string,
    "email": string,
    "account": number,
    "vd": 1,
    "password": string (criptografa),
    "saldo": string,

}
```


| **GET**    | `/persons/{saldo}` | consulta saldo (necessário realiar login)  |


| **POST**   | `/persons`        | Adiciona um novo person     |
### campos necessários:
```json
{
    
    "name": string ("obrigatório"),
    "cpf": string,
    "adress": {
      "zipCode": string,
            "street": string,
            "houseNumber": number,
            "city": string,
            "state": string
    },
    "cellphone": string,
    "email": string,
    "password": string,
    "saldo": string(não obrigatório, defulto como zero),

}
```


| **POST**   | `/persons/auth/login` | Realiza 
login de uma person cadastrada|

### campos necessários:
```json
{
  "account": string,
  "password": string
}
```
| **PATCH**  | `/persons/:{id}`  | Atualiza o persons pelo {id} (necessário realiar login)|

### exemplo (apenas os campos que quiser atualizar):
```json
{
  "email": string
}
```

| **PATCH**  | `/persons/:{cpf}`  | realiza uma transferência de uma conta para outra (necessário realiar login)|

### campos necessários (no body o cpf é o da pessoa que irá receber a transferência):
```json
{
  "cpf": string,
  "saldo": string
}
```


| **DELETE** | `/persons/:{id}`  | Deleta o persons pelo {id}   (necessário realizar login)|



Author: Luciano mendes
Desenvolver Backend
| <a href="www.linkedin.com/in/dev-luciano-mendes">Linkedin</a> 