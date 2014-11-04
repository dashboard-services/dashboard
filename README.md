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
