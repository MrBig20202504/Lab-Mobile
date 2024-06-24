-- Insert data into Authors table
use ComicReader
go
INSERT INTO Authors (name) VALUES
('Hamuo'),
('Fujiko F. Fujio'),
('Shimabukuro Mitsutoshi'),
('Shigeru Sagasaki');

-- Insert data into Genres table
INSERT INTO Genres (name) VALUES
('Action'),
('Adventure'),
('Fantasy'),
('SCI-FI');

-- Insert data into Comics table
INSERT INTO Comics(title, description, authorid, genreid, coverimage,PublishDate,status) 
VALUES
('HELL MODE', 'Yamada Kenichi, a single, 35-year-old businessman, has spent the majority of his adult life playing every MMORPG to hit the market. Tired of the constant cycle of repetitive, newbie-centric gameplay, he is immediately drawn in by the promise of a new game that, on top of being never-ending, offers up a "Hell Mode" — a difficulty level that makes it nigh impossible to level up but also promises uncapped growth potential. Upon selecting the newly released Summoner class, Kenichi finds himself reborn as Allen, an infant in a serf family, with nothing but his wits and old memories to guide him. Allen works diligently to level himself up despite Hell Mode requiring vast amounts of experience between levels. In doing so, he hopes to uncover the secrets the Summoner class holds. All the while, he dedicates himself to freeing his new family from serfdom.', 4, 3, 'https://img.nettruyenfull.com/story/2023/07/30/14019/avatar.png',getdate(),'Ongoing');
--('DOREMON', '"Doraemon" is the masterpiece of Fujiko F. Fujio, one of Japans most famous mangaka duos. Doraemon, a cat-shaped robot from the future, and his best friend Nobita share a fantastical friendship.The mysterious tools taken out of his 4th dimensional pocket made the whole of Japan laugh. Shizu-chan, Suneo, and Gian are also full of energy. The exciting and wonderful tools that give you big dreams will guide you to the heartwarming world of Doraemon.', 1, 4, 'https://img.nettruyenfull.com/story/2023/09/28/16042/avatar.png',GETDATE(), 'Completed');
--('Toriko', 'In the world where the taste and texture of food are very important, there is Toriko, a hunter of precious foods regularly hired by restaurants and the rich. He is a man with the inhuman skills necessary to capture the ferocious, evasive, and rare animals to complete his ultimate dinner course! His current accomplice is a weak, timid person who was inspired by Torikos greatness and accompanies him on all his journeys on his quest for the course of his life. Note: Was nominated for the 2nd Manga Taisho Award in 2009.', 2, 2, 'https://img.nettruyenfull.com/story/2022/12/17/1085/avatar.png',getdate(),'Completed');
--('From Old Country Bumpkin to Master Swordsman', 'Beryl Gardinant, a self-proclaimed “humble old man,” is a sword instructor at his dojo in a rural, backwater village. In his younger years, he dreamed of glory as a master swordsman, but those days are long behind him. Out of the blue, he receives a visit from a famous former pupil who brings him world-shattering news—he’s been appointed as a special instructor for the knights of the Liberion Order! With his life now turned upside down, Beryl travels to the capital and reunites with some of his former students: elite knights, an ace wizard, and even an adventurer who’s attained the highest guild rank possible. But why do they all want his tutelage?! As far as he’s concerned, they clearly don’t need him anymore. Can Beryl live up to his new position? And will he ever get a moment’s peace away from his adoring students?!', 3, 4, 'https://img.nettruyenfull.com/story/2024/03/07/22567/avatar.png', GETDATE(),'Ongoing');

--UPDATE Comics
--SET description = 'In the world where the taste and texture of food are very important, there is Toriko, a hunter of precious foods regularly hired by restaurants and the rich. He is a man with the inhuman skills necessary to capture the ferocious, evasive, and rare animals to complete his ultimate dinner course! His current accomplice is a weak, timid person who was inspired by Torikos greatness and accompanies him on all his journeys on his quest for the course of his life. Note: Was nominated for the 2nd Manga Taisho Award in 2009.'
--WHERE title = 'Toriko';

INSERT INTO Chapters (Title, ComicId, ReleaseDate) 
VALUES
('Chapter 3', 1, getdate());

--HellMode https://img.nettruyenfull.com/story/2023/07/30/14019/1/969p73mqan/2.jpg
INSERT INTO Pages(chapterid, PageNumber,imageurl)
VALUES
(6, 1, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/1.jpg'),
(6, 2, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/2.jpg'),
(6, 3, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/3.jpg'),
(6, 4, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/4.jpg'),
(6, 5, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/5.jpg'),
(6, 6, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/6.jpg'),
(6, 7, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/7.jpg'),
(6, 8, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/8.jpg'),
(6, 9, 'https://img.nettruyenfull.com/story/2023/09/28/16042/2/ensjv3kk6m/9.jpg');

--master
INSERT INTO Pages(chapterid, PageNumber,imageurl)
VALUES
(3, 2, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/2.jpg'),
(3, 3, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/3.jpg'),
(3, 4, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/4.jpg'),
(3, 5, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/5.jpg'),
(3, 6, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/6.jpg'),
(3, 7, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/7.jpg'),
(3, 8, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/8.jpg'),
(3, 9, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/9.jpg'),
(3, 10, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/10.jpg');
--doraemon
INSERT INTO Pages(chapterid, PageNumber,imageurl)
VALUES
(1, 1, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/1.jpg'),
(1, 2, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/2.jpg'),
(1, 3, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/3.jpg'),
(1, 4, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/4.jpg'),
(1, 5, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/5.jpg'),
(1, 6, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/6.jpg'),
(1, 7, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/7.jpg'),
(1, 8, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/8.jpg'),
(1, 9, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/9.jpg'),
(1, 10, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/10.jpg');

INSERT INTO Pages(chapterid, PageNumber,imageurl)
VALUES
(4, 1, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/1.jpg'),
(4, 2, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/2.jpg'),
(4, 3, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/3.jpg'),
(4, 4, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/4.jpg'),
(4, 5, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/5.jpg'),
(4, 6, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/6.jpg'),
(4, 7, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/7.jpg'),
(4, 8, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/8.jpg'),
(4, 9, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/9.jpg'),
(4, 10, 'https://img.nettruyenfull.com/story/2023/09/28/16042/823/lyg1ux9ho6/10.jpg');
--toriko
INSERT INTO Pages (chapterid, PageNumber,imageurl)
VALUES
(2, 1, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/1.jpg'),
(2, 2, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/2.jpg'),
(2, 3, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/3.jpg'),
(2, 4, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/4.jpg'),
(2, 5, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/5.jpg'),
(2, 6, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/6.jpg'),
(2, 7, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/7.jpg'),
(2, 8, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/8.jpg'),
(2, 9, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/9.jpg'),
(2, 10, 'https://img.nettruyenfull.com/story/2022/12/17/1085/1/a35psfkjz6/10.jpg');