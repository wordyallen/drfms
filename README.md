# drfms
![alt text](http://i.imgur.com/zJklqzQ.png "banner")


This app demo is meant to get you started prototyping your own data driven apps. The demo included is a basic sms/signals app. However, you could use this stack to model any system. I put this together because I needed a boilerplate that could:
 - Take advantage of Scipy/Numpy's libraries
 - Store lots of data in document form, if needed
 - Render Data Visualizations in a composable way


## Install as docker containers

1. In your docker environment run:
    > $ docker-compose build

    *Please be patient. Numpy is a huge package. If you want a faster numpy installation, click* [here][np-link].

    >$ docker-compose up -d

2. Create a user in the db:
  > $ docker-compose run web /usr/local/bin/python user_create.py

3. Browse to your docker-machine ip at port 5000.

4. If you need to reload the server, run:
>$ docker restart **drfms_web_1**  


## Author

[Joe Narvaez][author-linkedin]

## Unlicenced

Find the full [unlicense][] in the `UNLICENSE` file, but here's a snippet.

>This is free and unencumbered software released into the public domain.
>
>Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

Do what you want. Learn as much as you can. Unlicense more software.

[unlicense]: http://unlicense.org/
[author-linkedin]: https://www.linkedin.com/in/joenarvaez
[np-link]: http://timstaley.co.uk/posts/how-to-pip-install-numpy-in-two-seconds-flat/
