<?php
/* Servers configuration */
$i = 0;

/* Server: MySQL [1] */
$i++;
$cfg['Servers'][$i]['verbose'] = 'MySQL';
$cfg['Servers'][$i]['host'] = 'mysql'; // Your MySQL service name
$cfg['Servers'][$i]['port'] = '';
$cfg['Servers'][$i]['socket'] = '';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
$cfg['Servers'][$i]['extension'] = 'mysqli';
$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'P2pug8m8Kaur';
$cfg['Servers'][$i]['AllowNoPassword'] = false;

/* Misc settings */
$cfg['blowfish_secret'] = 'j4MwnsQoDfLH9NcdgewONiki9Maqv9uJ'; // Use a random string of 32 chars

/* SSL settings */
$cfg['ForceSSL'] = false;

/* Directories for saving/loading files from server */
$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';
