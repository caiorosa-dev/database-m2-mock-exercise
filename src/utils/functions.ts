import { fakerPT_BR as faker } from '@faker-js/faker';

export function generateRandomFormattedCPF() {
  const cpf = faker.string.numeric({ length: 11 });
  const formattedCPF = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );

  return formattedCPF;
}

export function generateRandomPhoneNumber() {
  const areaCode = faker.string.numeric({ length: 2 });
  const number = faker.string.numeric({ length: 9 });

  return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`;
}
