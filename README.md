# JS + MySQL 

Está é uma simples aplicação utilizando NodeJS e MySQL para mostrar os dados de uma query em um frontend simples construído usando HTML, JS e Pico CSS.

Este projeto foi feito devido a minha curiosidade e vontade de explorar a linguagem Javascript para o backend durante uma aula de Laboratório de Banco de Dados.

## **Requisitos**
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) ou [MariaDB](https://mariadb.org/download/)
- [NodeJS](https://nodejs.org/)

## **Como executar**
1. **Clone o Repositório**
```bash
git clone 
```
2. **Configuração do MySQL**

Para que o programa retorne alguns dados é necessário que você popule o banco de dados e crie uma procedure no banco que é chamada quando o usuário quer fazer uma busca.

Segue abaixo os comandos necessários para a execução

```sql
create database Loja;

use Loja;

-- Criando as tabelas
create table Fornecedor (
    codigo int not null,
    nome varchar(255) not null,
    unidadeFederativa varchar(2)   not null,
    primary key (codigo)
);

create table Produto (
    codigo int not null,
    nome varchar(255) not null,
    estoque int not null,
    valor int not null,
    codigoFornecedor int not null,
    desconto int not null,
    primary key (codigo),
    foreign key (codigoFornecedor) references Fornecedor (codigo)
);

-- Inserindo dados nas tabelas
insert into Fornecedor(codigo, nome, unidadeFederativa)
values ('1', 'DELL', 'SP'),
       ('2', 'HP', 'BH'),
       ('3', 'ASUS', 'RJ');

insert into Produto (codigo, nome, estoque, valor, codigoFornecedor, desconto)
values ('1', 'Teclado', '12', '38', '2', '10'),
       ('2', 'Mouse', '28', '22', '1', '10'),
       ('3', 'Placa', '6', '164', '3', '20'),
       ('4', 'Monitor', '42', '230', '1', '30'),
       ('5', 'Fonte', '33', '64', '3', '20');

-- Criando a procedure que chama pelo estoque
create procedure QuantidadePorEstoque(in quantidadeNoEstoque int)
begin
    select *
    from vwProduto
    where estoque >= quantidadeNoEstoque;
end;
``` 

3. **Modificar o arquivo app.js**
O arquivo app.js cria um servidor local que acessar os dados do MySQL, mas provavelmente será necessario modificar algumas linhas deste arquivo para que ele rode perfeitamente.

As linhas são as seguinte:
```js
const connection = createConnection({
  host: "localhost",     // Use o host do seu computador
  user: "root",         // Coloque seu usuario
  password: "",        // Insira a senha
  database: "loja",   // Coloque a database criada
});
```

4. **Executar o comando**
Agora você só precisa executar o comando para iniciar o backend da aplicação usando o seguinte comando:

```bash
npm run start-mysql
```

Com isso feito, você só precisa abrir o arquivo HTML no seu navegador e fazer uma pesquisa.

> ### **Observação**
>> Caso aconteça algum problema durante a execução do projeto verificque se você tem todos os requisitos instalados. Caso continuar com problema procure ajuda na seção de Issues do repositório.