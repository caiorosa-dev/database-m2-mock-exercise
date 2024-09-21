import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from '../utils/db';

export async function inserirConsultas(quantidade: number) {
  const consultas: string[][] = [];

  const [vetRows]: any = await db.pool?.query('SELECT id FROM Veterinario');
  const vetIds = vetRows.map((row: any) => row.id);

  const [animalRows]: any = await db.pool?.query(
    'SELECT id, id_tutor FROM Animal'
  );
  const animalData = animalRows.map((row: any) => ({
    id: row.id,
    id_tutor: row.id_tutor,
  }));

  for (let i = 0; i < quantidade; i++) {
    const id_vet: string = faker.helpers.arrayElement(vetIds);
    const animal = faker.helpers.arrayElement(animalData) as {
      id: string;
      id_tutor: string;
    };
    const id_animal: string = animal.id;
    const id_tutor: string = animal.id_tutor;
    const dt = faker.date.recent().toISOString().split('.')[0];
    const horario = faker.date.recent().toISOString().split('.')[0];

    const consulta: string[] = [id_vet, id_animal, id_tutor, dt, horario];

    consultas.push(consulta);
  }

  const consultaResult: any = await db.pool?.query(
    `INSERT INTO Consulta (id_vet, id_animal, id_tutor, dt, horario) VALUES ?`,
    [consultas]
  );

  console.log('Inserção de consultas realizada com sucesso');
  console.log({ consultaResult });
  console.log('-------------------------------------------');
}
