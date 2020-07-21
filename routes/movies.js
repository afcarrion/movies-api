const express = require('express');
const MoviesService = require('../service/movies');
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');
const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next){
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({tags});
            res.status(200).json({
                data: movies,
                message: 'Movies Listed'
            });

        } catch (error) {
            next(error);
        }
    });

    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next){
        const {movieId} = req.params;
        try {
            const movie = await moviesService.getMovie({movieId});
            res.status(200).json({
                data: movie,
                message: 'Movie Listed'
            });

        } catch (error) {
            next(error);
        }
    });

    router.post("/", validationHandler(createMovieSchema), async function(req, res, next){
        const { body: movie } = req; 
        try {
            const createdMovieId = await moviesService.createMovie({movie})
            res.status(201).json({
                data: createdMovieId,
                message: 'Movies Created'
            });

        } catch (error) {
            next(error);
        }
    });

    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema),  async function(req, res, next){
        const { body:movie } = req;
        const { movieId } = req.params;
        try {
            const updateMovieId = await moviesService.updateMovie({ movieId, movie});
            res.status(200).json({
                data: updateMovieId,
                message: 'Movies Updated'
            });

        } catch (error) {
            next(error);
        }
    });
    router.delete("/:movieId",  validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next){
        const { movieId } = req.params;
        try {
            const deleteMovieId = await moviesService.deleteMovie({movieId});
            res.status(200).json({
                data: deleteMovieId,
                message: 'Movies Deleted'
            });

        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;
