# Birbnb - Grupo 9 - K3011
Bienvenido al repositorio del Trabajo Practico Integrador de Desarrollo de Software del Grupo 9 - K3011.

## Instalacion
Para instalar el proyecto deberas clonar el repositorio y posteriormente correr el siguiente comando:

	npm install

Para iniciar el servidor deberas correr alguno de los siguientes dos comandos:

	npm start (inicio normal)
    npm run dev (inicio en modo developer - reinicia el servidor al guardar un cambio)

## Branch Model
Considerando que nuestro trabajo dispondra de 4 entregas a lo largo de la materia, tomamos la decision de utilizar Git Flow levemente modificado como modelo de ramificacion estructurado para nuestro proyecto.

El proyecto dispondra de los siguientes tipos de branches:

	main
	hotfix
	develop
	feature

**main:** La branch principal donde se encuentra la ultima version finalizada del proyecto. Estas "versiones" corresponderan con las entregas. Tendremos v1, v2, v3 y v4 a lo largo de la materia.

**hotfix:** Son branchs que salen directamente de main donde realizaremos cambios o correcciones criticas de ultimo momento que se hacen directamente sobre la entrega finalizada. Este tipo de branch tendra nombre "hotfix/xxxx" e impactaran sobre main y develop por medio de pull requests. Pueden cambiar el versionado de main a v1.1, v1.2, etc.

**develop:** Es la branch principal de desarrollo. En ella se encuentra el estado actual de la version en desarrollo y sobre la cual impactaran los pulls requests de los branch de feature donde se avanza el codigo. No haremos nunca push directo sobre develop, sino que siempre sera por medio de pull requests de branchs feature. Al finalizar una version, se hara pull request para que develop impacte sobre main, pasando el versionado de main a v1, v2, etc.

**feature:** Son branchs que salen directamente de develop donde realizaremos cambios o nuevos desarrollos para ir avanzando con el proyecto. Este tipo de branch tendra nombre "feature/xxxx" e impactaran sobre develop por medio de pull requests para luego ser cerrados. 