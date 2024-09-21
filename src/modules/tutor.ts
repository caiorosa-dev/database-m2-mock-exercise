import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from '../utils/db';
import {
  generateRandomFormattedCPF,
  generateRandomPhoneNumber,
} from '../utils/functions';

export async function inserirTutores(quantidade: number) {
  const tutores: string[][] = [];
  const enderecos: string[][] = [];

  for (let i = 0; i < quantidade; i++) {
    const nome = faker.person.fullName();
    const cpf = generateRandomFormattedCPF();
    const email = faker.internet
      .email({
        firstName: nome.split(' ')[0],
        lastName: nome.split(' ')[1] + faker.number.int({ min: 1, max: 9999 }),
        allowSpecialCharacters: false,
      })
      .toLowerCase();
    const telefone = generateRandomPhoneNumber();
    const dataNascimento = faker.date.birthdate().toISOString().split('T')[0];

    const tutor = [nome, cpf, email, telefone, dataNascimento];

    tutores.push(tutor);
  }

  const tutorResult: any = await db.pool?.query(
    `INSERT INTO Tutor (nome, cpf, email, telefone, data_nascimento) VALUES ?`,
    [tutores]
  );

  const insertedTutorIds = tutorResult[0].insertId;

  for (let i = 0; i < quantidade; i++) {
    const id_tutor = insertedTutorIds + i;
    const cep = faker.location.zipCode();
    const rua = faker.location.street();
    const numero = faker.number.int({ min: 1, max: 9999 });
    const cidade = faker.location.city();
    const uf = faker.location.state({ abbreviated: true });

    const endereco = [id_tutor, cep, rua, numero, cidade, uf];

    enderecos.push(endereco);
  }

  const enderecoResult: any = await db.pool?.query(
    `INSERT INTO Tutor_endereco (id_tutor, cep, rua, numero, cidade, uf) VALUES ?`,
    [enderecos]
  );

  console.log('Inserção de tutores e endereços realizada com sucesso');
  console.log({ tutorResult, enderecoResult });
  console.log('-------------------------------------------');
}
