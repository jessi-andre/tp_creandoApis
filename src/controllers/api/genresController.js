const db = require('../../database/models');

const throwError = (res, error) => {
    console.log(error)
    return res.status(error.status).json({
        meta: {
            status: error.status || 500
        },
        data: error.massage
    })
}

module.exports = {
    list: async (req, res) => { //'async' función asincrónica
        try {
            let genres = await db.Genre.findAll(); //en esta variable (let) voy a recibir todos los géneros, AWAIT espera y guarda la información en este caso los géneros

            let response = {
                meta: {
                    status: 200,
                    total: genres.length,
                    link: 'api/genres'
                },
                data: genres
            }

            return res.status(200).json(response) //hago un JSON, le pasamos la respuesta osea la información (el objeto literal'response') en esta caso la variable response.

        } catch (error) {
            throwError(res, error)
        }


    },

    detail: async (req, res) => {
        try {

            if (isNaN(req.params.id)) {
                let error = new Error('ID incorrecto');
                error.status = 422;
                throw error
            }

            let genre = await db.Genre.frindByPk(req.params.id) //le ponemos un (id) por que mi ENDPOINT espera un id(este endpoint es el que esta en genresRouter).

            let response = {
                meta: {
                    status: 200,
                    link: 'apis/genres/' + req.params.id
                },
                data: genre
            }

            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    }
}