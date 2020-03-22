DROP DATABASE IF EXISTS top_songsDB;
CREATE DATABASE top_songsDB
USE top_songsDB;
CREATE TABLE Top5000 (
	id INTEGER NOT NULL AUTO_INCREMENT,
    artist_name VARCHAR(100) NOT NULL,
    song_name VARCHAR(45) NOT NULL,
    year INTEGER default 0,
    raw_score DECIMAL (65,2),
    usa_score DECIMAL (65,2),
    uk_score DECIMAL (65,2),
    europe_score DECIMAL (65,2),
    non_english_score DECIMAL (65,2),
    rest_of_world_score DECIMAL (65,2),
    PRIMARY KEY(id)
);