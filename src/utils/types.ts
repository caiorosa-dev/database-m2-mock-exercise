export interface Tutor {
  cpf: string;
  nome: string;
  email?: string;
  telefone: string;
  data_nascimento: Date;
}

export interface TutorEndereco {
  id_tutor: number;
  cep: string;
  rua?: string;
  numero: number;
  cidade?: string;
  uf?: string;
}

export interface Animal {
  id_tutor: number;
  nome: string;
  peso?: number;
  raca: string;
  especie?: string;
  cor?: string;
  sexo?: string;
  data_nasc?: Date;
}

export interface Veterinario {
  nome: string;
  crmv: string;
  email?: string;
  fone: string;
  especialidade: string;
}

export interface EnderecoVeterinario {
  id_vet: number;
  cep?: string;
  rua?: string;
  numero?: number;
  cidade?: string;
  uf?: string;
}

export interface Consulta {
  id_vet: number;
  id_animal: number;
  id_tutor: number;
  dt: Date;
  horario: Date;
}
