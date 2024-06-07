-- Use the newly created database
USE ComicReader;
GO

-- Create the Users table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    join_date DATETIME DEFAULT GETDATE(),
    profile_pic VARCHAR(255)
);
GO

-- Create the Authors table
CREATE TABLE Authors (
    author_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_pic VARCHAR(255)
);
GO

-- Create the Genres table
CREATE TABLE Genres (
    genre_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
GO

-- Create the Comics table
CREATE TABLE Comics (
    comic_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    author_id INT NOT NULL,
    genre_id INT NOT NULL,
    cover_image VARCHAR(255),
    publish_date DATETIME DEFAULT GETDATE(),
    status VARCHAR(50),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);
GO

-- Create the Chapters table
CREATE TABLE Chapters (
    chapter_id INT IDENTITY(1,1) PRIMARY KEY,
    comic_id INT NOT NULL,
    title VARCHAR(100),
    chapter_num INT NOT NULL,
    release_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (comic_id) REFERENCES Comics(comic_id)
);
GO

-- Create the Pages table
CREATE TABLE Pages (
    page_id INT IDENTITY(1,1) PRIMARY KEY,
    chapter_id INT NOT NULL,
    page_num INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
);
GO

-- Create the Comments table
CREATE TABLE Comments (
    comment_id INT IDENTITY(1,1) PRIMARY KEY,
    comic_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    comment_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (comic_id) REFERENCES Comics(comic_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO

-- Create the Favorites table
CREATE TABLE Favorites (
    favorite_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    comic_id INT NOT NULL,
    favorite_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (comic_id) REFERENCES Comics(comic_id)
);
GO

-- Insert data into Authors table
--INSERT INTO Authors (name, bio) VALUES
--('Shigeru Sagasaki', 'none');

-- Insert data into Genres table
--INSERT INTO Genres (name) VALUES
--('Action'),
--('Adventure'),
--('Fantasy');

-- Insert data into Comics table
INSERT INTO Comics(title, description, author_id, genre_id, cover_image, status) 
VALUES
('From Old Country Bumpkin to Master Swordsman', 
'Beryl Gardinant, a self-proclaimed “humble old man,” is a sword instructor at his dojo in a rural, backwater village. In his younger years, he dreamed of glory as a master swordsman, but those days are long behind him. Out of the blue, he receives a visit from a famous former pupil who brings him world-shattering news—he’s been appointed as a special instructor for the knights of the Liberion Order! With his life now turned upside down, Beryl travels to the capital and reunites with some of his former students: elite knights, an ace wizard, and even an adventurer who’s attained the highest guild rank possible. But why do they all want his tutelage?! As far as he’s concerned, they clearly don’t need him anymore. Can Beryl live up to his new position? And will he ever get a moment’s peace away from his adoring students?!', 1, 3, 'https://img.nettruyenfull.com/story/2024/03/07/22567/avatar.png', 'Ongoing');
-- ('Comic Two', 'Description of Comic Two', 2, 2, 'http://example.com/comic2.jpg', '2023-02-01', 'Completed'),
-- ('Comic Three', 'Description of Comic Three', 1, 3, 'http://example.com/comic3.jpg', '2023-03-01', 'Ongoing');

-- api: metadata=res://*/Models.Model1.csdl|res://*/Models.Model1.ssdl|res://*/Models.Model1.msl;provider=System.Data.SqlClient;provider connection string="data source=LAPTOP-RDG6DQUG\COMICREADER;initial catalog=ComicReader;integrated security=True;trustservercertificate=True;MultipleActiveResultSets=True;App=EntityFramework"