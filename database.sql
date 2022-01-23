
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    is_user_instructor boolean  NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users(user_name, user_email, user_password) VALUES (
'test', 'test@gmail.com',True,'test1234'
);


INSERT INTO users(user_name, user_email, user_password) VALUES (
'student', 'student@gmail.com',False,'student1234'
);