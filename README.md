# microblog

This small Jquery based library is designed for small blogs that need minimal flourish. Everything is contained within a single page, and the blog articles are loaded in when required. This allows articles to use custom CSS if necessary, but global CSS will also work.

This is nowhere near production-ready. It's janky and doesn't entirely work, and I wrote it in about ten minutes. However, it does function well enough for personal use, and you can see it in action here:

http://incoherent.xyz/


Use it if you like, entirely at your own risk. If you make any cool changes, please consider bringing them back here.


# requirements

* Jquery 3 or above
* A central container with the ID "dynamicContainer" (yes, I'll fix this at some point for proper initialisation...)
* A wrapping container around *dynamicContainer* called "scrollContainer" (some strange behaviour from flexboxes here)
* jqueryOverlayScrollbars.js from https://github.com/KingSora/OverlayScrollbars 


# usage

Whack it in. Initialise at the **bottom** of your HTML (I hate *document.ready*). Make sure jquery, overlayscrollbars, and the css are initialised at the **top** of your HTML.

Modify the CSS to use your favourite fonts. Classes that need font management are:
* *.membertitle*
* *.memberdetails*
