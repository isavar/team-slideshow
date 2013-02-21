Fullsize-Slideshow
==================

Ein Best Practice Beispiel für eine vollformatige Slideshow


Bei dieser Slideshow geht es um großformatige Teaser mit Hintergrundbildern, die sich 
an die Größe des Browserfensters anpassen. Verantwortlich dafür ist im Wesentlichen 
die CSS-Eigenschaft **background-size** (erst ab IE9). Browsern, die das nicht können, 
wird hier per JS nachgeholfen. 

Die Slideshow nutzt eine Transition des **opacity**-Wertes für den Überblend-Effekt beim Bildwechsel (ab IE10). 

Wenn nicht mit der Slideshow interagiert wird, beginnt ein automatischer Durchlauf. 

(getestet auf iPad, Chrome, Safari, Firefox and IE7+)


####Tipps:
* Ein dunkler Hintergrund verhindert unschönes helles Aufblitzen beim Überblenden.
* Das umgebende #slideshow Div ist nur nötig, wenn man das automatische
  Durchsliden nutzen will (für das Binden von Mouseevents)
* Wenn IE 7 und 8 nicht berücksichtigt werden müssen, kann auf das imagescaler.js verzichtet werden.
  Aktuelle Browser können den gleichen Effekt per CSS mit background-size:cover erzielen.


####Bilder:
http://www.flickr.com/photos/roberto_ferrari/1091511802/in/photostream/
http://www.flickr.com/photos/blmiers2/6167391543/in/photostream/
http://www.flickr.com/photos/23948654@N04/2383869528/
http://www.flickr.com/photos/fritography/6067842303/in/photostream/

####Modernizr Tests:
* opacity
* backgroundsize
* generatedcontent
