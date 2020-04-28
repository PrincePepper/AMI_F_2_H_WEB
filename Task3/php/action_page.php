<?php
  $name = trim(strip_tags($_POST["name"]));
  $email = trim(strip_tags($_POST["email"]));
  $subject = "Регистрация на сайте url_вашего_сайта";
  $msg = "Ваши данные формы регистрации:\n" ."Имя: $name\n" ."Пол: $sex\n" ."Ваш email: $email\n" ."Страна: $country";
  $headers = "Content-type: text/plain; charset=UTF-8" . "\r\n";
  $headers .= "From: Семен<semyon3336@gmail.com>" . "\r\n";
  $headers .= "Bcc: semyon3336@gmail.com". "\r\n";
  if(!empty($name) && !empty($sex) && !empty($email) && !empty($country) && filter_var($email, FILTER_VALIDATE_EMAIL)){
    mail($email, $subject, $msg, $headers);
    echo "Спасибо! Вы успешно зарегистрировались.";
    }
?>