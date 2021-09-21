const HtmlWebPackPlugin = require('html-webpack-plugin'); // Forma de importar módulos en NodeJS(Webpack trae NodeJS instalado). El plugin 'html-webpack-plugin' se instala con el comando 'npm i --save-dev html-webpack-plugin'
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Forma de importar módulos en NodeJS(Webpack trae NodeJS instalado). El plugin 'html-webpack-plugin' se instala con el comando 'npm install --save-dev mini-css-extract-plugin'
const CopyPlugin = require("copy-webpack-plugin"); // Forma de importar módulos en NodeJS(Webpack trae NodeJS instalado). El plugin 'copy-webpack-plugin' se instala con el comando 'npm install copy-webpack-plugin --save-dev'

// Configuración de Webpack

module.exports = {

    mode: 'development', // Para usar Webpack en el entorno de Desarrollo
    output: {
        clean: true // Hace que cada vez que ejecutemos el comando 'webpack'('npm run build') se limpie automáticamente el directorio 'dist' de Webpack para volverlo a generar
    },
    module: {
        rules: [
            // Nota: Las reglas se evaluan de arriba hacia abajo y se ejecuta aquella regla donde haya coincidencia con su expresión regular
            // La idea es localizar los archivos .html del proyecto y cargar el módulo 'html-loader' para tratar esos archivos
            {
                test: /\.html$/, // Expresión regular que localiza archivos con extensión .html en todo el proyecto
                loader: 'html-loader', // Este módulo, junto con el plugin 'html-webpack-plugin', nos permite generar archivos html dentro del directorio 'dist' de Webpack. El módulo 'html-loader' se instala con el comando 'npm i --save-dev html-loader'
                options: {
                    sources: false,
                    minimize: false // Para Producción puede ser considerable minimizar, o simplificar, los archivos .html en una sóla línea para que los navegadores web carguen menos información basura(líneas en blanco, comentarios, etc...). Para ello, ponemos esta propiedad en true(Por defecto es false)
                }
            },
            // La idea es localizar los archivos .css, excepto el archivo 'styles.css', para usar los módulos 'style-loader' y 'css-loader'
            {
                test: /\.css$/, // Expresión regular que localiza archivos con extensión .css en todo el proyecto
                exclude: /styles.css$/, // Excluimos de esta regla el archivo css 'styles.css' para darle un tratamiento especial en la regla de abajo
                use: ['style-loader', 'css-loader'] // Estos 2 módulos inyectan en el archivo JS(En este caso 'main.js'), generado dentro del directorio 'dist' de Webpack, código JS que aplica los estilos visales CSS. Los módulos 'style-loader' y 'css-loader' se instalan con el comando 'npm i --save-dev style-loader css-loader'
            },
            // La idea es localizar el archivo 'styles.css' para usar el plugin 'MiniCssExtractPlugin' y el módulo 'css-loader'
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // El plugin 'MiniCssExtractPlugin', junto con el módulo 'css-loader', nos permite generar archivos .css en el directorio 'dist' de Webpack

            },
            {
                test: /\.(png|jpe?g|gif)$/, // Expresión regular que localiza archivos de imagen en todo el proyecto
                type: 'asset/resource' // Para poder importar y usar recursos estáticos, como imágenes, desde Javascript. Crea una copia del recurso estático en la raíz del directorio 'dist' de Webpack usando por defecto un código hash como nombre
            }
        ]
    },
    plugins: [
        // Crea una instancia del módulo(plugin en este caos) 'HtmlWebPackPlugin' a partir de un objeto con nuestra configuración
        new HtmlWebPackPlugin({
            template: './src/index.html', // Colola el archivo .html de esta ruta en la ruta indicada en la propiedad de abajo "filename" dentro del directorio 'dist' de Webpack
            filename: './index.html' // Si no se indica esta propiedad, su valor por defecto es 'index.html'(que es lo mismo que './index.html')
        }),
        // Crea una instancia del módulo(plugin en este caos) 'MiniCssExtractPlugin' a partir de un objeto con nuestra configuración
        new MiniCssExtractPlugin({
            /* filename: 'nuevo-estilo.css', */ /* 'nuevo-estilo.css' es el nombre archivo css que se generará dentro del directorio 'dist' de Webpack */
            /* filename: '[name].[fullhash].css', */ /* '[name]' utiliza el nombre por defecto de Webpack('main') para el archivo css que se generará dentro del directorio 'dist' de Webpack. '[fullhash]' genera un código hash aleatorio y es útil en Producción para eviar la caché del navegador cuando se aplican nuevos cambios */
            filename: '[name].css'
        }),
        // Crea una instancia del módulo(plugin en este caos) 'CopyPlugin' a partir de un objeto con nuestra configuración
        new CopyPlugin({
            patterns: [
                // Copia todos los recuros estáticos de la ruta 'src/assets/' del proyecto a la carpeta 'assets' del directorio 'dist' de Webpack
                {
                    from: 'src/assets/',
                    to: 'assets/'
                }
            ]
        })
    ]
};