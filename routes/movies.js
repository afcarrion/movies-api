const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    router.get("/", async function(req, res, next){
        try {
            const movies = await Promise.resolve(moviesMock);
            res.status(200).json({
                data: movies,
                message: 'Movies Listed'
            });

        } catch (error) {
            next(error);
        }
    });

    router.get("/:movieId", async function(req, res, next){
        try {
            const movie = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                data: movie,
                message: 'Movie Listed'
            });

        } catch (error) {
            next(error);
        }
    });

    router.post("/", async function(req, res, next){
        try {
            const createdMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(201).json({
                data: createdMovieId,
                message: 'Movies Created'
            });

        } catch (error) {
            next(error);
        }
    });

    router.put("/:movieId", async function(req, res, next){
        try {
            const updateMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: updateMovieId,
                message: 'Movies Updated'
            });

        } catch (error) {
            next(error);
        }
    });

    router.delete("/:movieId", async function(req, res, next){
        try {
            const deleteMovieId = await Promise.resolve(moviesMock[0].id);
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