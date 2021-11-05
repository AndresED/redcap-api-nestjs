
# Servicio Rest - SandWords

  

# Consideraciones

  

- El presente proyecto fue desarrollado en [NestJS](http://nestjs.com/)

- Para la conexión al gestor de base de datos se uso a [Sequelize](https://sequelize.org/) como ORM en su versión para [Typescript](https://www.npmjs.com/package/sequelize-typescript)

- Se usó como gestor de base de datos PostgresSQL aunque puede ser cambiado por otro gestor siempre y cuando sea uno relacional.

- Se usó como servidor de correos a GMAIL.

- Se uso el paquete [quicktumb](https://www.npmjs.com/package/quickthumb) para la optimización de imagenes. Se recomienda leer la documentación de esta para sacar el máximo provecho de las imágenes almacenadas en el api.

# Instalación de dependencias

- Para el desarrollo de la aplicación se uso yarn como gestor de dependencias pero tambien puede usarse npm.

Para la instalación ejecutar `npm install` o `yarn install`

- Quicktumb require la instalación de la dependencia llamada imagemagick a nivel de sistema operativo. Para instalar ejecutar el siguiente comando

```

Ubuntu

apt-get install imagemagick

  

Mac OS X

brew install imagemagick

  

Fedora/CentOS

yum install imagemagick

```

  

# Configuración

Dividiremos la siguiente sección en los siguientes puntos:

  

- Configuración de la base de datos
- Configuración de firebase y one signal
- Configuración del servidor de correos
- Configuración de las variables de entorno

  

1. **Configuración de la base de datos**

  

Como se mencionó en las consideraciones , estamos trabajando con postgresql como gestor de base de datos por lo que los scripts que se generaron para la creación de la base de datos están orientados con la sintaxis de este gestor. Si bien gracias al ORM podemos trabajar con diferentes gestores debes tener en consideración la sintaxis de los scripts que usaremos.

Los scripts los encontrarán en el repositorio correspondiente a la base de datos. Ejecutarlos en el siguiente orden:
- script.sql
En el mismo repositorio se encuentra el diagrama de la BD el cual puede ser abierto con MySQL Workbench pero de todas maneras se esta subiendo el modelado en versión pdf.  


2. **Configuración de Firebase y One Signal**

Nos dirigimos a la [consola de firebase](https://console.firebase.google.com/) y le damos agregar proyecto

![enter image description here](https://i.imgur.com/3aJmMUr.png)

  

Seguimos los pasos que nos indican para crear nuestro proyecto:

![enter image description here](https://i.imgur.com/YCrrpBN.png)


3. **Configuración del servidor de correos**

  

No hay mucha ciencia en esta sección para la configuración del servidor de correos haremos uso de la misma información que el mismo google nos da

  

- **servidor smtp:** smtp.gmail.com

- **puerto:** 465

- **ssl:** true

- **usuario:** un correo de gmail

- **contraseña:** una contraseña de aplicación generada

para el correo de gmail.

  

Lo unico que se debe gestionar aqui es la clave de aplicación pero para ello recomendamos [leer la misma documentación que google nos da para ello.](https://support.google.com/mail/answer/185833?hl=es-419)

**4. Configuración de las variables de entorno**

Llegamos a la parte final de las configuraciones. Aqui colocaremos información de la conexion a la base de datos y información que en los pasos anteriores obtuvimos

Como primera instancia creamos un archivo llamado .env en la raiz de la carpeta del api y copiamos el contenido del archivo llamado .env.example que esta en la raiz y que tiene la siguiente estructura:

  

```
# STAGE
# VALUES: production, development
STAGE = development
  
# DATABASE
USERNAME_DB =
DATABASE =
PASSWORD_DB =
HOST_DATABASE =
DIALECT =
TYPE_SGBD =
LOGGIN_DATABASE =
OPERATORSALIASES =
PORT_DB =

  

# SERVER
PORT =
PORT_SOCKET =
# WEBAPP
ROUTE_WEB_APP =
# JWT
SECRET = SECRET
EXPIRESIN = 1d
DEFAULTSTRATEGY = jwt

# STORAGE
STORAGE =
LIMIT_UPLOAD = 300mb

# MAIL
MAIL_HOST =
MAIL_SERVICE =
MAIL_USER =
MAIL_PASSWORD =
MAIL_EMAIL_FR0M =
MAIL_PORT =
MAIL_SECURE =
MAIL_REJECT_UNAUTHORIZED =
`````

Pasaremos a explicar bloque por bloque este archivo y como configurarlo:

  

Como primer instancia tenemos el modo en que será ejecutada el api si

bien en el package.json se han creado comandos en especifico para

poder ejecutar ambos entornos esta variable nos permite a nivel de codigo realizar ciertas validaciones para la busqueda de path de archivos. Los valores que puede tomar son production y development.

`````

# STAGE

# VALUES: production, development

STAGE = development

`````

  

El presente bloque hace referencia a la conexión a la base de datos , para tener una mayor referencia acerca de estas variables les recomendamo [leer la documentación de sequelize](https://sequelize.org/master/manual/dialect-specific-things.html)

  

`````

# DATABASE

USERNAME_DB = root

DATABASE = birudb

PASSWORD_DB = 123456

HOST_DATABASE = localhost

DIALECT = mysql

TYPE_SGBD = mysql

LOGGIN_DATABASE = false

OPERATORSALIASES = false

PORT_DB = 3306

`````

  

El presente bloque hace referencia a los puertos que haran uso e servicio rest y el servidor de sockets. Pueden trabajar bajo el mismo puerto pero no se recomienda.

  

`````

# SERVER

PORT = 3000

PORT_SOCKET = 5000

`````

  

Una de las caracteristicas de la aplicación es el envio de emails para la recuperación de la contraseña. Ante esta operación el api envia un url para la recuperación pero para poder generar el enlace correctamente en este bloque debemos colocar el link de la aplicación ya subida a produccion o en desarrollo.

`````

# WEBAPP

ROUTE_WEB_APP = http://localhost:4200

`````

  

La aplicación para su seguridad hace uso de la generación de tokens mediante JWT en el presente bloque solicitamos necesaria para la generación de los tokens como son el secret que viene a ser una cadena alfanumerica que sirve para generar los tokens (se recomienda usar uno seguro que contenga numeros,letras,caracteres especiales,etc). el expiresin qu hace referencia al tieempo de vida del token y el defaultstrategy que en si es el tipo o método que usaremos para generar el token en nuestro caso estamos usando jwt.

  

`````

# JWT

SECRET = SECRET

EXPIRESIN = 365d

DEFAULTSTRATEGY = jwt

`````

  

Una de las caracteristicas de la aplicación es que nos permite almacenar archivos y acceder a estos cuando se los requiera , para ello la manera como te los devuelve es como un enlace directo al api para ello se requiere especificar el url del api ya en production o desarrollo para que al momento de hacer una consulta te traiga correctamente el enlace del archivo al cual se quiere acceder.

La variable LIMIT_UPLOAD hace mención al tamaño maximo de subida de un archivo.

  

`````

# STORAGE

STORAGE = http://localhost:3000/

LIMIT_UPLOAD = 300mb

`````

  

En esta sección usaremos los datos que nos proporciiona google asi como la contraseña que se genero anteriormente.

`````

# MAIL

MAIL_HOST = smtp.gmail.com

MAIL_SERVICE = gmail

MAIL_USER = @gmail.com

MAIL_PASSWORD = micorreo@gmail.com

MAIL_EMAIL_FR0M = contacto@biru.com.pe

MAIL_PORT = 465

MAIL_SECURE = true

MAIL_REJECT_UNAUTHORIZED = false

`````


Para finalizar necesitamos colocar el url de la base de datos de firebase

`````

#FIREBASE

FIREBASE_DATABASE_URL = https://biru-7a6cb.firebaseio.com

Servidor de desarrollo y Despliegue

`````

Para ello nos dirigimo a la consola de firebase , nos vamos a nuestro proyecto y en la opcion Descripción general y configuración de proyecto:

  

![enter image description here](https://i.imgur.com/TzGusBL.png)

  

En la pestaña cuentas de servicio encontraremos el databaseUrl, lo copiamos y pegamos en nuestra variable de entorno

  

![enter image description here](https://i.imgur.com/UnnefuF.png)

  

Realizado esto pasos correctamente ya podemos levantar nuestro servidor ya sea en desarrollo o producción

  

# Levantar el servidor

  

### Desarrollo

`npm run start:dev` - Permite levantar el servidor de desarrollo que estará disponible en `http://localhost:3000/`

### Producción

`npm run start ` - Permite levantar el servidor de desarrollo que estará disponible en `http://localhost:3000/`

  

Deben tener en cuenta la variable de entorno STAGE al momento de ejecutar los comandos de lo contrario tendran errores.
