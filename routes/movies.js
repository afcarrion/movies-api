const express = require('express');
const MoviesService = require('../service/movies');

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

    router.get("/:movieId", async function(req, res, next){
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

    router.post("/", async function(req, res, next){
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

    router.put("/:movieId", async function(req, res, next){
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

    router.delete("/:movieId", async function(req, res, next){
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