import inquirer from 'inquirer';

import { db } from './utils/db';

import { inserirAnimais } from './modules/animal';
import { inserirConsultas } from './modules/consulta';
import { inserirTutores } from './modules/tutor';
import { inserirVeterinarios } from './modules/vet';

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'quantidadeTutores',
      message: 'Quantos tutores você deseja inserir?',
      default: '50',
      validate: (input) => {
        const parsed = parseInt(input, 10);

        if (isNaN(parsed) || parsed <= 0) {
          return 'Por favor, insira um número válido maior que zero.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'quantidadeAnimais',
      message: 'Quantos animais você deseja inserir?',
      default: '70',
      validate: (input) => {
        const parsed = parseInt(input, 10);
        if (isNaN(parsed) || parsed <= 0) {
          return 'Por favor, insira um número válido maior que zero.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'quantidadeVeterinarios',
      message: 'Quantos veterinários você deseja inserir?',
      default: '30',
      validate: (input) => {
        const parsed = parseInt(input, 10);

        if (isNaN(parsed) || parsed <= 0) {
          return 'Por favor, insira um número válido maior que zero.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'quantidadeConsultas',
      message: 'Quantas consultas você deseja inserir?',
      default: '100',
      validate: (input) => {
        const parsed = parseInt(input, 10);
        if (isNaN(parsed) || parsed <= 0) {
          return 'Por favor, insira um número válido maior que zero.';
        }
        return true;
      },
    },
  ]);

  const quantidadeTutores = parseInt(answers.quantidadeTutores, 10);
  const quantidadeAnimais = parseInt(answers.quantidadeAnimais, 10);
  const quantidadeVeterinarios = parseInt(answers.quantidadeVeterinarios, 10);
  const quantidadeConsultas = parseInt(answers.quantidadeConsultas, 10);

  await inserirTutores(quantidadeTutores);
  await inserirAnimais(quantidadeAnimais);
  await inserirVeterinarios(quantidadeVeterinarios);
  await inserirConsultas(quantidadeConsultas);

  await db.pool?.end();
}

main();
