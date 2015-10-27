Magento Advanced Code Editor
====
<blockquote>
	<p>
		Extends Magento with an advanced code editor that'll make it much more easier to produce clean semantic markup for CMS related content as well as product pages and Transactional Emails.
	</p>
</blockquote>

##Introduction
If you're familiar with Magento and you've spent some time working with it's WYSIWYG editor, you'll know that producing clean semantic HTML markup with the TinyMCE editor can be quite a hassle. Especially when fiddling around in the "design view" it'll often result in invalid or unwanted HTML. Of course you can open up the default source editor and go from there. But you probably know that this will not be very pleasant as well, the code looks like a big bowl of tag soup and editing it can give you a real headache.

This extension offers both a standalone editor as well as a plugin for Magento's WYSIWYG editor and is similar to your favorite IDE. It offers a lot of great <a href="#Features">features</a> that will not only save you quite a bit of time but also makes editing code a lot easier.

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
* Search + find/replace functionality
* Code folding
* Auto-close tags
* HTML autocomplete
* HTML Lint
* Highlight match tags
* Highlight trailing whitespaces
* Highlight occurences of selected text
* Highlighting the active line
* Custom scrollbars
* Line wrapping

Also, you can change it's appearance by picking one of the 36 available <a href="https://codemirror.net/demo/theme.html">themes</a> or overriding the default `font-size`.

![alt tag](http://github.e-sites.nl/_img/extension-conf.png)

##Getting started
Aside from installing the extension through <a href="http://www.magentocommerce.com/magento-connect/advanced-html-editor.html">Magento Connect</a> you can do this manually as well.

1. Download the extension
2. Copy / paste the contents in your Magento root directory
3. Log out of the admin panel and remove all cache files
4. Navigate to System > Configuration > E-sites > Advanced Code Editor and enable the extension

##Stand-alone editor
As of version 0.5.0 it's possible to turn any `textarea` element (both in the admin panel as well as the front-end) into an advanced editor. By simply passing a matching CSS selector (e.g. a class or an ID) in the configuration panel you can target textarea's and transform them into a full-fledged editor including all available IDE-like features.

![alt tag](http://github.e-sites.nl/_img/selectors.png)

##Transactional Emails
As of version 0.4.0 the editor is available in the Transactional Emails section as well. Because it works as a standalone editor you do not have to install any other extension that provides a WYSIWYG editor in this particular section.

![alt tag](http://github.e-sites.nl/_img/emails.png)

##Browser support
Browser support is similar to the support that CodeMirror offers. This means the desktop versions of the following browsers, in standards mode (HTML5 `<!doctype html>` recommended) are supported:

* Firefox: version 4 and up
* Chrome: any version
* Safari: version 5.2 and up
* Internet Explorer: version 8 and up
* Opera: version 9 and up

##Credits
We really must give credit to Marijn Haverbeke (of <a href="https://codemirror.net/">CodeMirror</a> fame) and of course all it's contributors. Because let's be honest, all we did was wrap the library up in a Magento extension ;).

##License
Copyright (C) 2015 E-sites, <a href="http://www.e-sites.nl/">http://e-sites.nl/</a> Licensed under the OSL v3.0
