CREATE DATABASE raphietro_atelier;

USE raphietro_atelier;

CREATE TABLE usuarios (
    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Senha VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Sexo ENUM('Masculino', 'Feminino', 'Outro'),
    Telefone VARCHAR(20)
);

CREATE TABLE Clientes (
    Cliente_ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Endereco VARCHAR(255),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Sexo ENUM('Masculino', 'Feminino', 'Outro'),
    Telefone VARCHAR(20)
);

CREATE TABLE Servicos (
    Servico_ID INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(150) NOT NULL,
    Descricao TEXT,
    Preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Pedidos (
    Pedido_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    Cliente_ID INT,
    Estado ENUM('Pendente', 'Em andamento', 'Pronto para retirada', 'Entregue' , 'Cancelado') NOT NULL DEFAULT 'Pendente',
    Descricao varchar(255),
    Valor_Total DECIMAL(10, 2),
    Data_Pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_ID) REFERENCES Usuarios(User_ID),
    FOREIGN KEY (Cliente_ID) REFERENCES Clientes(Cliente_ID)
);



INSERT INTO Clientes (Nome, Endereco, Email, Sexo, Telefone) VALUES
('Ana Clara Souza', 'Rua das Flores, 123, São Paulo, SP', 'ana.souza@email.com', 'Feminino', '(11) 98765-4321'),
('Bruno Costa', 'Avenida Principal, 456, Rio de Janeiro, RJ', 'bruno.costa@email.com', 'Masculino', '(21) 91234-5678'),
('Carla Dias', 'Praça da Matriz, 789, Belo Horizonte, MG', 'carla.dias@email.com', 'Feminino', '(31) 99988-7766'),
('Daniel Oliveira', 'Rua dos Pinheiros, 101, Curitiba, PR', 'daniel.oliveira@email.com', 'Masculino', '(41) 98877-6655'),
('Eliane Faria', 'Set   or Comercial Sul, Quadra 2, Brasília, DF', 'eliane.faria@email.com', 'Feminino', '(61) 98765-1234');

insert into usuarios(nome, senha, email, sexo, telefone) values ('123', '123', '123@email.com', 'Masculino', '99999999999');
insert into pedidos (user_id, estado, descricao, valor_total) values (1, 'Pendente', 'pedido teste', 20.00);
select * from usuarios;

select * from pedidos;
create database db1;
DROP database db1;