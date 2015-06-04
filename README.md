Magento Advanced HTML Editor
====
<blockquote>
	<p>
		Extends TinyMCE with an advanced HTML source editor that'll make it much more easier to produce clean semantic markup for Magento CMS pages and static blocks.
	</p>
</blockquote>

## Introduction
If you're familiar with Magento and you've spent some time working with CMS pages and static blocks, you'll know that producing clean semantic HTML markup with the TinyMCE editor can be quite a hassle. Especially when fiddling around in the "design view" it'll often result in invalid or unwanted HTML. Of course you can open up the default source editor and go from there. But you probably know that this will not be very pleasant as well, the code looks like a big bowl of tag soup and editing it can give you a real headache.

This extension adds an additional editor to Magento's WYSIWYG editor that is similar to your favorite IDE. It offers several great <a href="#Features">features</a> that will not only save you quite a bit of time but also makes editing HTML a lot easier.

![alt tag](http://github.e-sites.nl/_img/editor-dialog.png)

###CodeMirror
Under the hood this extension uses <a href="https://codemirror.net/">CodeMirror</a> and a handful of it's addons. In case you never heard of CodeMirror, let us quote the author of this great library real quick:

<em>"CodeMirror is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with a number of language modes and addons that implement more advanced editing functionality."</em>

##Features
The following features are available can be enabled or disabled via System > Configuration.

* Fully customizable appearance
* Code formatting
* Syntax highlighting
* <a href="http://emmet.io/" target="_blank">Emmet</a> support / keybindings
* Search functionality
* Code folding
* Auto-close tags
* Highlight match tags
* Highlight occurences of selected text
* Highlighting the active line
* Line wrapping

Also, you can change it's appearance by picking one of the 36 available <a href="https://codemirror.net/demo/theme.html">themes</a> or overriding the default `font-size`.

![alt tag](http://github.e-sites.nl/_img/extension-conf.png)

##Getting started
1. Download the extension
2. Copy / paste the contents in your Magento root directory
3. Log out of the admin panel and remove all cache files
4. Navigate to System > Configuration > E-sites > Advanced HTML Editor and enable the extension

##Browser support
Browser support is similar to the support that CodeMirror offers. This means the desktop versions of the following browsers, in standards mode (HTML5 `<!doctype html>` recommended) are supported:

* Firefox: version 4 and up
* Chrome: any version
* Safari: version 5.2 and up
* Internet Explorer: version 8 and up
* Opera: version 9 and up

##Credits
We really must give credit to Marijn Haverbeke (of <a href="https://codemirror.net/">CodeMirror</a> fame) and of course all it's contributors. All we did was wrap the library up in a TinyMCE plugin and make it customizable through the Magento admin.

##License
Copyright (C) 2015 E-sites, <a href="http://www.e-sites.nl/">http://e-sites.nl/</a> Licensed under the OSL v3.0
