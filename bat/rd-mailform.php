<?php

$formConfigFile = file_get_contents("rd-mailform.config.json");
$formConfig = json_decode($formConfigFile, true);

date_default_timezone_set('Etc/UTC');

try {
    require './phpmailer/PHPMailerAutoload.php';

    $recipients = $formConfig['recipientEmail'];
    $fromEmail = !empty($formConfig['fromEmail']) ? $formConfig['fromEmail'] : $recipients;

    function postValue($key) {
        return isset($_POST[$key]) ? trim($_POST[$key]) : '';
    }

    function cleanText($value) {
        return htmlspecialchars(strip_tags($value), ENT_QUOTES, 'UTF-8');
    }

    preg_match_all("/([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/", $recipients, $addresses, PREG_OFFSET_CAPTURE);

    if (!count($addresses[0])) {
        die('MF001');
    }

    if (postValue('website') !== '') {
        die('MF255');
    }

    if (postValue('privacy') !== '1') {
        die('MF004');
    }

    $email = filter_var(postValue('email'), FILTER_VALIDATE_EMAIL);
    $name = cleanText(postValue('name'));
    $message = cleanText(postValue('message'));

    if (!$email || $name === '' || $message === '') {
        die('MF003');
    }

    $template = file_get_contents('rd-mailform.tpl');

    if (isset($_POST['form-type'])) {
        switch ($_POST['form-type']){
            case 'contact':
                $subject = 'Consulta desde la web de EduConet';
                break;
            case 'register':
                $subject = 'Registro de centro para acceso a tarifas';
                break;
            case 'subscribe':
                $subject = 'Solicitud de suscripción';
                break;
            case 'order':
                $subject = 'Solicitud de presupuesto';
                break;
            default:
                $subject = 'Consulta desde la web de EduConet';
                break;
        }
    }else{
        die('MF004');
    }

    if ($email) {
        $template = str_replace(
            array("<!-- #{FromState} -->", "<!-- #{FromEmail} -->"),
            array("Email:", $email),
            $template);
    }

    if ($message !== '') {
        $template = str_replace(
            array("<!-- #{MessageState} -->", "<!-- #{MessageDescription} -->"),
            array("Mensaje:", nl2br($message)),
            $template);
    }

    // In a regular expression, the character \v is used as "anything", since this character is rare
    preg_match("/(<!-- #\{BeginInfo\} -->)([^\v]*?)(<!-- #\{EndInfo\} -->)/", $template, $matches, PREG_OFFSET_CAPTURE);
    foreach ($_POST as $key => $value) {
        if ($key != "counter" && $key != "email" && $key != "message" && $key != "form-type" && $key != "g-recaptcha-response" && $key != "website" && $key != "privacy" && !empty($value)){
            $info = str_replace(
                array("<!-- #{BeginInfo} -->", "<!-- #{InfoState} -->", "<!-- #{InfoDescription} -->"),
                array("", ucfirst($key) . ':', cleanText($value)),
                $matches[0][0]);

            $template = str_replace("<!-- #{EndInfo} -->", $info, $template);
        }
    }

    $template = str_replace(
        array("<!-- #{Subject} -->", "<!-- #{SiteName} -->"),
        array($subject, $_SERVER['SERVER_NAME']),
        $template);

    $mail = new PHPMailer();


    if ($formConfig['useSmtp']) {
        //Tell PHPMailer to use SMTP
        $mail->isSMTP();

        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;

        $mail->Debugoutput = 'html';

        // Set the hostname of the mail server
        $mail->Host = $formConfig['host'];

        // Set the SMTP port number - likely to be 25, 465 or 587
        $mail->Port = $formConfig['port'];

        // Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "ssl";

        // Username to use for SMTP authentication
        $mail->Username = $formConfig['username'];

        // Password to use for SMTP authentication
        $mail->Password = $formConfig['password'];
    }

    $mail->From = $fromEmail;
    $mail->FromName = 'EduConet Web';
    $mail->addReplyTo($email, $name);

    foreach ($addresses[0] as $key => $value) {
        $mail->addAddress($value[0]);
    }

    $mail->CharSet = 'utf-8';
    $mail->Subject = $subject;
    $mail->MsgHTML($template);
    $mail->send();

    die('MF000');
} catch (phpmailerException $e) {
    die('MF254');
} catch (Exception $e) {
    die('MF255');
}
