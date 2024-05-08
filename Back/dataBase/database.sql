CREATE TABLE "Epis" (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(255),
  validade DATE,
  nome  VARCHAR(255),
  disponibilidade BOOLEAN
)

 CREATE TABLE "Funcionarios" (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  cpf bigint,
  cargo VARCHAR(255)
)

CREATE TABLE "Relatorios"(
  id SERIAL PRIMARY KEY,
  idFuncionario int,
  idEpi int,
  retirada DATE,
  devolucao DATE
)

INSERT INTO Relatorios(idFuncionario, idEpi, retirada, devolucao)
VALUES ('1', '4', "2013-06-01","2013-06-01");


INSERT INTO epis(codigo, validade, nome, disponibilidade)
VALUES ('00000','2013-06-01', 'Capacete norisk 58', false);

INSERT INTO funcionarios(nome, cpf, cargo)
VALUES ('João Fagundes','12345678900', 'Gerente geral');