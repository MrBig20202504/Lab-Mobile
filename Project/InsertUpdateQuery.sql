-- Insert data into Authors table
use ComicReader
go
--INSERT INTO Authors (name, bio) VALUES
--('Fujiko F. Fujio', 'none');

-- Insert data into Genres table
--INSERT INTO Genres (name) VALUES
--('Action'),
--('Adventure'),
--('Fantasy');

-- Insert data into Comics table
--INSERT INTO Comics(title, description, author_id, genre_id, cover_image, status) 
--VALUES
--('DOREMON', '"Doraemon" is the masterpiece of Fujiko F. Fujio, one of Japans most famous mangaka duos. Doraemon, a cat-shaped robot from the future, and his best friend Nobita share a fantastical friendship.The mysterious tools taken out of his 4th dimensional pocket made the whole of Japan laugh. Shizu-chan, Suneo, and Gian are also full of energy. The exciting and wonderful tools that give you big dreams will guide you to the heartwarming world of Doraemon.', 3, 3, 'https://img.nettruyenfull.com/story/2023/09/28/16042/avatar.png', 'Completed');
--('Toriko', 'In the world where the taste and texture of food are very important, there is Toriko, a hunter of precious foods regularly hired by restaurants and the rich. He is a man with the inhuman skills necessary to capture the ferocious, evasive, and rare animals to complete his ultimate dinner course! His current accomplice is a weak, timid person who was inspired by Torikos greatness and accompanies him on all his journeys on his quest for the course of his life. Note: Was nominated for the 2nd Manga Taisho Award in 2009.', 2, 2, 'https://img.nettruyenfull.com/story/2022/12/17/1085/avatar.png', 'Completed');
--('From Old Country Bumpkin to Master Swordsman', 
--'Beryl Gardinant, a self-proclaimed “humble old man,” is a sword instructor at his dojo in a rural, backwater village. In his younger years, he dreamed of glory as a master swordsman, but those days are long behind him. Out of the blue, he receives a visit from a famous former pupil who brings him world-shattering news—he’s been appointed as a special instructor for the knights of the Liberion Order! With his life now turned upside down, Beryl travels to the capital and reunites with some of his former students: elite knights, an ace wizard, and even an adventurer who’s attained the highest guild rank possible. But why do they all want his tutelage?! As far as he’s concerned, they clearly don’t need him anymore. Can Beryl live up to his new position? And will he ever get a moment’s peace away from his adoring students?!', 1, 3, 'https://img.nettruyenfull.com/story/2024/03/07/22567/avatar.png', 'Ongoing');
-- ('Comic Three', 'Description of Comic Three', 1, 3, 'http://example.com/comic3.jpg', 'Ongoing');--
--UPDATE Comics
--SET description = 'In the world where the taste and texture of food are very important, there is Toriko, a hunter of precious foods regularly hired by restaurants and the rich. He is a man with the inhuman skills necessary to capture the ferocious, evasive, and rare animals to complete his ultimate dinner course! His current accomplice is a weak, timid person who was inspired by Torikos greatness and accompanies him on all his journeys on his quest for the course of his life. Note: Was nominated for the 2nd Manga Taisho Award in 2009.'
--WHERE title = 'Toriko';

--INSERT INTO Chapters (comic_id ,title ,chapter_num) 
--VALUES
--(3, 'Chapter 1', 1);

INSERT INTO Pages (chapter_id, page_num,image_url)
VALUES
(1, 2, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/2.jpg'),
(1, 3, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/3.jpg'),
(1, 4, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/4.jpg'),
(1, 5, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/5.jpg'),
(1, 6, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/6.jpg'),
(1, 7, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/7.jpg'),
(1, 8, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/8.jpg'),
(1, 9, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/9.jpg'),
(1, 10, 'https://img.nettruyenfull.com/story/2024/03/07/22567/1/lf7lxyx7b2/10.jpg');