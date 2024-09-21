-- 	**** M2 - ATIVIDADE EM SALA 02 ****
/* Com base o uso do banco de dados clinica_vet (código para criação do 
 esquema no final deste arquivo), efetue as seguintes atividades: */
 
 -- OBS: Estregar este arquivo com o codigo solicitado em cada tarefa em ordem cronológica.

/* 	1. Pesquisar e apresentar uma forma de inserir uma grande quantidade de 
		dados artificiais no banco de dados. 
	2. Com o uso da técnica apresentada no item 1, efetue a inserção da seguinte 
		quantidade de dados: 50 tutores com seus respectivos endereços; 
		30 veterinário com seus respectivos endereços; 70 animais; e 100 consultas. */
	
/*	3. Com o uso do comando ALTER, efetue as seguintes modificações no esquema clinica_vet: */
	-- a. Adicione um novo campo à tabela Tutor nomeado data_nascimento, para armazenar a data de nascimento dos tutores.       
       
	-- b. Modifique o campo cpf na tabela Tutor para aceitar até 14 caracteres (para incluir a formatação de CPF com pontos e traços).

	-- C. Modifique o nome da coluna fone da tabela Tutor para telefone, para tornar o nome mais claro.

    -- D. Adicione uma restrição de unicidade ao campo telefone na tabela Veterinario para garantir que não haja duplicatas.

	-- E. Remova o campo complemento da tabela Tutor_endereco, pois ele não será mais utilizado.

	-- F. Renomeie a tabela Veterinario_endereco para Endereco_veterinario, tornando o nome mais claro e consistente.

    -- G. Adicione uma chave estrangeira à tabela Consulta para garantir que cada consulta tenha um tutor associado, vinculando a tabela Tutor.

	-- H. Modifique o campo especialidade na tabela Veterinario para torná-lo obrigatório (não aceitar NULL) e, em seguida, faça o mesmo com o campo rua na tabela Endereco_veterinario.
        
	-- I.  Modifique os tipos de dados de duas colunas da tabela Consulta: altere o campo horario para DATETIME e o campo dt para TIMESTAMP.




-- **** CÓDIGO PARA A CRIAÇÃO DO ESQUEMA CLINICA_VET ****
-- CRIAÇÃO DE ESQUEMA E TABELAS
CREATE SCHEMA clinica_vet;
use clinica_vet;
SET SQL_SAFE_UPDATES = 0;
-- DROP SCHEMA clinica_vet;

-- Tutor(id, cpf, nome, email, fone)]
-- DROP TABLE Tutor;
CREATE TABLE Tutor (
    id integer PRIMARY KEY auto_increment,    
    cpf varchar(12) NOT NULL UNIQUE,
	nome varchar(100) NOT NULL,
    email varchar(200) UNIQUE,
    fone varchar(16) NOT NULL
);

-- Animal(id, id_tutor, peso, raca, especie, cor, sexo, data_nasc)
-- DROP TABLE Animal;
CREATE TABLE Animal (
    id INT PRIMARY KEY auto_increment,
	id_tutor INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    peso decimal(5,2),
    raca VARCHAR(100) NOT NULL,
    especie VARCHAR(100),
	cor VARCHAR(100),
	sexo VARCHAR(10),
	data_nasc date,
    CONSTRAINT fk_animal_tutor FOREIGN KEY (id_tutor) REFERENCES Tutor(id)
);

-- Tutor_endereço(id, id_tutor, cep, rua, numero, complemento, cidade, uf)
-- DROP TABLE Tutor_endereco;
CREATE TABLE Tutor_endereco (
    id INT PRIMARY KEY auto_increment,
	id_tutor integer NOT NULL,
	cep varchar(12) NOT NULL,
    rua varchar(100),
    numero integer NOT NULL,
    complemento varchar(50),
    cidade varchar(50),
    uf varchar(2),
	CONSTRAINT fk_tutend_tut FOREIGN KEY (id_tutor) REFERENCES Tutor (id)
);

-- Veterinário(id, nome, crmv, email, fone, especialidade)
-- DROP TABLE Veterinario;
CREATE TABLE Veterinario (
    id INT PRIMARY KEY auto_increment,
    nome VARCHAR(100),
    crmv VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(200) UNIQUE,
    fone VARCHAR(16),
	especialidade VARCHAR(100)
);

-- Veterinario_endereço(id, id_vet, cep, rua, numero, complemento, cidade, uf)
-- DROP TABLE Veterinario_endereço;
CREATE TABLE Veterinario_endereco (
    id INT PRIMARY KEY auto_increment,
	id_vet INT NOT NULL,
	cep VARCHAR(12),
    rua VARCHAR(100),
    numero INT,
    complemento VARCHAR(50),
    cidade VARCHAR(50),
    uf char(2),
	CONSTRAINT fk_vetend_vet FOREIGN KEY (id_vet) REFERENCES Veterinario(id)
);

-- Consulta(id, id_vet, id_animal, dt, horario)
-- DROP TABLE Consulta;
CREATE TABLE Consulta (
    id INT PRIMARY KEY auto_increment,
	id_vet INT NOT NULL,
    id_animal INT NOT NULL,
    dt DATE NOT NULL,
    horario TIME NOT NULL,
    CONSTRAINT fk_cons_vet FOREIGN KEY (id_vet) REFERENCES Veterinario(id), 
    CONSTRAINT fk_cons_anim FOREIGN KEY (id_Animal) REFERENCES Animal(id)
);

-- **** CÓDIGO DA ATIVIDADE ****

-- a.
ALTER TABLE Tutor
ADD COLUMN data_nascimento DATE;

-- b.
ALTER TABLE Tutor
MODIFY COLUMN cpf VARCHAR(14) NOT NULL UNIQUE;

-- c.
ALTER TABLE Tutor
CHANGE COLUMN fone telefone VARCHAR(16) NOT NULL;

-- d.
ALTER TABLE Veterinario
ADD CONSTRAINT unique_telefone_vet UNIQUE (fone);

-- e.
ALTER TABLE Tutor_endereco
DROP COLUMN complemento;

-- f.
ALTER TABLE Veterinario_endereco
RENAME TO Endereco_veterinario;

-- g.
ALTER TABLE Consulta
ADD COLUMN id_tutor INT,
ADD CONSTRAINT fk_consulta_tutor FOREIGN KEY (id_tutor) REFERENCES Tutor(id);

-- h.
ALTER TABLE Veterinario
MODIFY COLUMN especialidade VARCHAR(100) NOT NULL;

ALTER TABLE Endereco_veterinario
MODIFY COLUMN rua VARCHAR(100) NOT NULL;

-- i.
ALTER TABLE Consulta
MODIFY COLUMN horario DATETIME NOT NULL,
MODIFY COLUMN dt TIMESTAMP NOT NULL;