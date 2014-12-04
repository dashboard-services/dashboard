Dashboard
========

Tiles
----

package.size: "s" //[ "s", "m", "l", "xl" ] => [ 1/4, 2/4, 3/4, 4/4 ] dashboard width


Development
==========

Grunt
-----
You will need grunt to package all the front-end js in one file.

    $ npm i -g grunt-cli
    $ grunt watch


Docker
-----

Using docker as development system.

    $ docker build -t dashboard .

    $ docker run -it --rm --name dashboard dashboard
    
    $ docker run -d -P -e VIRTUAL_HOST=subdomain.domain.com --name dashboard dashboard


Local installation steps
---
clone this repo

    $ git clone  git@github.com:dashboard-services/dashboard.git

step inside

    $ cd dashboard

install magic spells

    $ npm install

run the magic

    $ node .

go to

[http://localhost:3000](http://localhost:3000)

for mounting tiles

[http://localhost:3000/mount-tile](http://localhost:3000/mount-tile)
