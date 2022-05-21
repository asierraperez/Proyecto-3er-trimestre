drop database if exists proyecto;
create database proyecto;
use proyecto;

create table escuderia(
	ID varchar(30),
    nombre varchar(30),
    puntos integer,
    primary key(ID)
);

create table circuito(
	ID varchar(30),
    nombre varchar(30),
    vueltas integer,
    primary key(ID)
);

create table piloto(
	ID varchar(30),
    nombre varchar(30),
    apellidos varchar(30),
    destreza integer,
    suerte integer,
    puntos integer,
    ID_escuderia varchar(30),
    primary key(ID),
    foreign key(ID_escuderia) references escuderia(ID) on delete cascade on update cascade
);

create table coche(
	ID varchar(30),
    velocidad integer,
    manejo integer,
    ID_escuderia varchar(30),
    foreign key(ID_escuderia) references escuderia(ID)on delete cascade on update cascade
);

create table compite(
	ID_piloto varchar(30),
    ID_circuito varchar(30),
    primary key(ID_piloto, ID_circuito),
	foreign key(ID_piloto) references piloto(ID),
	foreign key(ID_circuito) references circuito(ID) on delete cascade on update cascade
);



