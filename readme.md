# Mock DB Values

Este projeto é uma aplicação Node.js que insere dados artificiais em um banco de dados MySQL para uma clínica veterinária. Ele utiliza bibliotecas como `inquirer` para interações com o usuário e `@faker-js/faker` para gerar dados falsos.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)
- Yarn ou npm

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/mock-db-values.git
   cd mock-db-values
   ```

2. Instale as dependências:

   ```sh
   yarn install
   # ou
   npm install
   ```

3. Configure o banco de dados MySQL:

   - Atualize as credenciais de conexão com o banco de dados no arquivo `src/utils/db.ts` se necessário.

4. Execute o script SQL para criar as tabelas e realizar as alterações necessárias:
   ```sh
   mysql -u root -p clinica_vet < database/script.sql
   ```

## Uso

```sh
yarn start
	 # ou
npm run start
```
