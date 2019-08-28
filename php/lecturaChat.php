<?php
    header("Content-Type: application/json; charset=UTF-8");

    echo '{"chats":['.file_get_contents('chattemp.txt').']}';

    // echo file_get_contents('msgchat.json');
