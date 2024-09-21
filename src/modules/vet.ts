import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from '../utils/db';
import { generateRandomPhoneNumber } from '../utils/functions';

export async function inserirVeterinarios(quantidade: number) {
  const veterinarios: string[][] = [];
  const enderecos: string[][] = [];

  for (let i = 0; i < quantidade; i++) {
    const nome = faker.person.fullName();
    const crmv = faker.string.alphanumeric(10);
    const email = faker.internet
      .email({
        firstName: nome.split(' ')[0],
        lastName: nome.split(' ')[1],
        allowSpecialCharacters: false,
      })
      .toLowerCase();
    const telefone = generateRandomPhoneNumber();
    const especialidade = faker.helpers.arrayElement([
      'Clínico Geral',
      'Cirurgia',
      'Dermatologia',
      'Cardiologia',
      'Ortopedia',
      'Neurologia',
      'Anestesiologia',
      'Endocrinologia',
    ]);

    const veterinario = [nome, crmv, email, telefone, especialidade];

    veterinarios.push(veterinario);
  }

  const vetResult: any = await db.pool?.query(
    `INSERT INTO Veterinario (nome, crmv, email, fone, especialidade) VALUES ?`,
    [veterinarios]
  );

  const insertedVetIds = vetResult[0].insertId;

  for (let i = 0; i < quantidade; i++) {
    const id_vet = insertedVetIds + i;
    const cep = faker.location.zipCode();
    const rua = faker.location.street();
    const numero = faker.number.int({ min: 1, max: 9999 });
    const cidade = faker.location.city();
    const uf = faker.location.state({ abbreviated: true });

    const endereco = [id_vet, cep, rua, numero, cidade, uf];

    enderecos.push(endereco);
  }

  const enderecoResult: any = await db.pool?.query(
    `INSERT INTO Endereco_veterinario (id_vet, cep, rua, numero, cidade, uf) VALUES ?`,
    [enderecos]
  );

  console.log('Inserção de veterinários e endereços realizada com sucesso');
  console.log({ vetResult, enderecoResult });
  console.log('-------------------------------------------');
}
