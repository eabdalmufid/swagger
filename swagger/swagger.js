const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerThemes = require('swagger-theme-changer');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Affidev APIs',
      version: '1.0.0',
      description: 'This is a documentation of my REST API',
      contact: {
				name: 'Abdul Mufid',
				url: 'https://github.com/eabdalmufid',
			},
    },
    components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);
const theme = swaggerThemes.getTheme('dracula');

const optionstheme = {
  //customCss: theme,
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
};

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, optionstheme));
};