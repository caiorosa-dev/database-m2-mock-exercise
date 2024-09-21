import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from '../utils/db';

export async function inserirAnimais(quantidade: number) {
  const animais: string[][] = [];

  const [tutorRows]: any = await db.pool?.query('SELECT id FROM Tutor');
  const tutorIds = tutorRows.map((row: any) => row.id);

  for (let i = 0; i < quantidade; i++) {
    const id_tutor: string = faker.helpers.arrayElement(tutorIds);
    const nome = faker.animal.dog();
    const peso = faker.number.float({ min: 1, max: 50 }).toFixed(2);
    const raca = faker.animal.dog();
    const especie = 'Cachorro';
    const cor = faker.color.human();
    const sexo = faker.helpers.arrayElement(['Macho', 'Fêmea']);
    const data_nasc = faker.date.birthdate().toISOString().split('T')[0];

    const animal: string[] = [
      id_tutor,
      nome,
      peso,
      raca,
      especie,
      cor,
      sexo,
      data_nasc,
    ];

    animais.push(animal);
  }

  const animalResult: any = await db.pool?.query(
    `INSERT INTO Animal (id_tutor, nome, peso, raca, especie, cor, sexo, data_nasc) VALUES ?`,
    [animais]
  );

  console.log('Inserção de animais realizada com sucesso');
  console.log({ animalResult });
  console.log('-------------------------------------------');
}
